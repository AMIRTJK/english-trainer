/**
 * Namespaced, fault-tolerant localStorage access.
 *
 * Every read and write is guarded: private mode, disabled storage and quota
 * errors must degrade to in-memory operation, never crash the app
 * (Performance.md §5).
 */
const PREFIX = 'eft:v1:';
const memory = new Map();
let storageWorks = true;
function backend() {
    if (!storageWorks)
        return null;
    try {
        const probe = `${PREFIX}__probe__`;
        window.localStorage.setItem(probe, '1');
        window.localStorage.removeItem(probe);
        return window.localStorage;
    }
    catch {
        storageWorks = false;
        return null;
    }
}
export function readRaw(key) {
    const store = backend();
    if (!store)
        return memory.get(PREFIX + key) ?? null;
    try {
        return store.getItem(PREFIX + key);
    }
    catch {
        return memory.get(PREFIX + key) ?? null;
    }
}
export function writeRaw(key, value) {
    memory.set(PREFIX + key, value);
    const store = backend();
    if (!store)
        return;
    try {
        store.setItem(PREFIX + key, value);
    }
    catch {
        storageWorks = false;
    }
}
export function removeRaw(key) {
    memory.delete(PREFIX + key);
    const store = backend();
    if (!store)
        return;
    try {
        store.removeItem(PREFIX + key);
    }
    catch {
        /* ignore */
    }
}
export function readJson(key, fallback) {
    const raw = readRaw(key);
    if (raw === null)
        return fallback;
    try {
        return JSON.parse(raw);
    }
    catch {
        return fallback;
    }
}
export function writeJson(key, value) {
    try {
        writeRaw(key, JSON.stringify(value));
    }
    catch {
        /* value not serialisable — drop the write rather than crash */
    }
}
/** Remove every key this app owns. */
export function clearAll() {
    for (const key of [...memory.keys()])
        memory.delete(key);
    const store = backend();
    if (!store)
        return;
    try {
        const doomed = [];
        for (let i = 0; i < store.length; i += 1) {
            const key = store.key(i);
            if (key && key.startsWith(PREFIX))
                doomed.push(key);
        }
        for (const key of doomed)
            store.removeItem(key);
    }
    catch {
        /* ignore */
    }
}
export function storageAvailable() {
    return backend() !== null;
}
export const KEYS = {
    user: 'user',
    session: 'session',
};
