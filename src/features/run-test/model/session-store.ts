import { KEYS, readJson, removeRaw, writeJson } from '@/shared/storage/local-store';
import type { TestSession } from './session';

/**
 * The in-progress test is persisted separately from the profile so a refresh
 * does not lose it, and so answering a question never rewrites the history
 * (Performance.md §5).
 */
let pending: TestSession | null = null;
let timer: ReturnType<typeof setTimeout> | null = null;

export function saveSession(session: TestSession): void {
  pending = session;
  if (timer !== null) return;
  timer = setTimeout(() => {
    timer = null;
    if (pending) writeJson(KEYS.session, pending);
  }, 300);
}

export function flushSession(): void {
  if (timer !== null) {
    clearTimeout(timer);
    timer = null;
  }
  if (pending) writeJson(KEYS.session, pending);
}

export function loadSession(): TestSession | null {
  if (pending) return pending;
  const stored = readJson<TestSession | null>(KEYS.session, null);
  pending = stored;
  return stored;
}

export function clearSession(): void {
  if (timer !== null) {
    clearTimeout(timer);
    timer = null;
  }
  pending = null;
  removeRaw(KEYS.session);
}
