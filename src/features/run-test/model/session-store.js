import { KEYS, readJson, removeRaw, writeJson } from '@/shared/storage/local-store';
/**
 * The in-progress test is persisted separately from the profile so a refresh
 * does not lose it, and so answering a question never rewrites the history
 * (Performance.md §5).
 */
let pending = null;
let timer = null;
export function saveSession(session) {
    pending = session;
    if (timer !== null)
        return;
    timer = setTimeout(() => {
        timer = null;
        if (pending)
            writeJson(KEYS.session, pending);
    }, 300);
}
export function flushSession() {
    if (timer !== null) {
        clearTimeout(timer);
        timer = null;
    }
    if (pending)
        writeJson(KEYS.session, pending);
}
export function loadSession() {
    if (pending)
        return pending;
    const stored = readJson(KEYS.session, null);
    pending = stored;
    return stored;
}
export function clearSession() {
    if (timer !== null) {
        clearTimeout(timer);
        timer = null;
    }
    pending = null;
    removeRaw(KEYS.session);
}
