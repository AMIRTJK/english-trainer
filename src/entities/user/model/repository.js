import { KEYS, readJson, writeJson, clearAll } from '@/shared/storage/local-store';
import { SCHEMA_VERSION, createLevelProgress } from './types';
import { migrate } from './migrations';
let cache = null;
let flushTimer = null;
/** Read once at start-up, then keep the in-memory copy authoritative. */
export function loadUser() {
    if (cache)
        return cache;
    const raw = readJson(KEYS.user, null);
    if (!raw)
        return null;
    cache = migrate(raw);
    return cache;
}
export function setUser(data) {
    cache = data;
    scheduleFlush();
}
/**
 * Writes are debounced so answering a question costs at most one write and
 * rapid updates coalesce (Performance.md §5).
 */
function scheduleFlush() {
    if (flushTimer !== null)
        return;
    flushTimer = setTimeout(() => {
        flushTimer = null;
        if (cache)
            writeJson(KEYS.user, cache);
    }, 400);
}
/** Force a synchronous write, e.g. before unload or export. */
export function flushUser() {
    if (flushTimer !== null) {
        clearTimeout(flushTimer);
        flushTimer = null;
    }
    if (cache)
        writeJson(KEYS.user, cache);
}
export function resetUser() {
    if (flushTimer !== null) {
        clearTimeout(flushTimer);
        flushTimer = null;
    }
    cache = null;
    clearAll();
}
export function ensureLevelProgress(data, levelId, contentVersion) {
    const existing = data.progress[levelId];
    if (existing) {
        if (existing.contentVersion !== contentVersion)
            existing.contentVersion = contentVersion;
        return existing;
    }
    const created = createLevelProgress(levelId, contentVersion);
    data.progress[levelId] = created;
    return created;
}
export function emptyUser(profileName, levelId, contentVersion) {
    const data = {
        schemaVersion: SCHEMA_VERSION,
        profile: {
            name: profileName,
            activeLevelId: levelId,
            createdAt: new Date().toISOString(),
            goals: { [levelId]: { quick: 45, official: 90 } },
            settings: { timerEnabled: true, allowBack: true, shuffleOptions: true },
        },
        progress: {},
    };
    ensureLevelProgress(data, levelId, contentVersion);
    return data;
}
