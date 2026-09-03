/**
 * Namespaced, fault-tolerant localStorage access.
 *
 * Every read and write is guarded: private mode, disabled storage and quota
 * errors must degrade to in-memory operation, never crash the app
 * (Performance.md §5).
 */
const PREFIX = 'eft:v1:';

const memory = new Map<string, string>();
let storageWorks = true;

function backend(): Storage | null {
  if (!storageWorks) return null;
  try {
    const probe = `${PREFIX}__probe__`;
    window.localStorage.setItem(probe, '1');
    window.localStorage.removeItem(probe);
    return window.localStorage;
  } catch {
    storageWorks = false;
    return null;
  }
}

export function readRaw(key: string): string | null {
  const store = backend();
  if (!store) return memory.get(PREFIX + key) ?? null;
  try {
    return store.getItem(PREFIX + key);
  } catch {
    return memory.get(PREFIX + key) ?? null;
  }
}

export function writeRaw(key: string, value: string): void {
  memory.set(PREFIX + key, value);
  const store = backend();
  if (!store) return;
  try {
    store.setItem(PREFIX + key, value);
  } catch {
    storageWorks = false;
  }
}

export function removeRaw(key: string): void {
  memory.delete(PREFIX + key);
  const store = backend();
  if (!store) return;
  try {
    store.removeItem(PREFIX + key);
  } catch {
    /* ignore */
  }
}

export function readJson<T>(key: string, fallback: T): T {
  const raw = readRaw(key);
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJson(key: string, value: unknown): void {
  try {
    writeRaw(key, JSON.stringify(value));
  } catch {
    /* value not serialisable — drop the write rather than crash */
  }
}

/** Remove every key this app owns. */
export function clearAll(): void {
  for (const key of [...memory.keys()]) memory.delete(key);
  const store = backend();
  if (!store) return;
  try {
    const doomed: string[] = [];
    for (let i = 0; i < store.length; i += 1) {
      const key = store.key(i);
      if (key && key.startsWith(PREFIX)) doomed.push(key);
    }
    for (const key of doomed) store.removeItem(key);
  } catch {
    /* ignore */
  }
}

export function storageAvailable(): boolean {
  return backend() !== null;
}

export const KEYS = {
  user: 'user',
  session: 'session',
  vocab: 'vocab',
} as const;
