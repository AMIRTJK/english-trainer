import { KEYS, readJson, removeRaw, writeJson } from '@/shared/storage/local-store';
import {
  VOCAB_SCHEMA_VERSION, createLevelProgress, createVocabData,
  type VocabData, type VocabLevelProgress,
} from './types';
import { recordAnswer, resetWord } from './srs';

/**
 * Vocabulary progress lives under its own storage key.
 *
 * Test history and word learning are different concerns and must not share a
 * key (AGENTS.md §4), and answering a card must not rewrite the whole profile
 * (Performance.md §5). Writes are debounced; the in-memory copy is the source
 * of truth once it has been read.
 */
let cache: VocabData | null = null;
let timer: ReturnType<typeof setTimeout> | null = null;
let version = 0;
const listeners = new Set<() => void>();

function migrate(raw: VocabData): VocabData {
  const data: VocabData = raw.levels ? raw : createVocabData();
  data.schemaVersion = VOCAB_SCHEMA_VERSION;
  return data;
}

export function loadVocab(): VocabData {
  if (cache) return cache;
  const raw = readJson<VocabData | null>(KEYS.vocab, null);
  cache = raw ? migrate(raw) : createVocabData();
  return cache;
}

function scheduleFlush(): void {
  if (timer !== null) return;
  timer = setTimeout(() => {
    timer = null;
    if (cache) writeJson(KEYS.vocab, cache);
  }, 400);
}

export function flushVocab(): void {
  if (timer !== null) {
    clearTimeout(timer);
    timer = null;
  }
  if (cache) writeJson(KEYS.vocab, cache);
}

function publish(): void {
  version += 1;
  scheduleFlush();
  for (const listener of listeners) listener();
}

export function levelProgress(levelId: string): VocabLevelProgress {
  const data = loadVocab();
  const existing = data.levels[levelId];
  if (existing) return existing;
  const created = createLevelProgress(levelId);
  data.levels[levelId] = created;
  return created;
}

/** Record "Знаю" / "Не знаю" for one word. */
export function answerWord(
  levelId: string,
  wordId: string,
  sounds: readonly string[],
  knew: boolean,
  now: Date = new Date(),
): void {
  recordAnswer(levelProgress(levelId), wordId, sounds, knew, now);
  publish();
}

/** Study one word from scratch again. */
export function forgetWord(levelId: string, wordId: string): void {
  resetWord(levelProgress(levelId), wordId);
  publish();
}

export function clearVocabLevel(levelId: string): void {
  loadVocab().levels[levelId] = createLevelProgress(levelId);
  publish();
}

export function clearVocab(): void {
  if (timer !== null) {
    clearTimeout(timer);
    timer = null;
  }
  cache = createVocabData();
  removeRaw(KEYS.vocab);
  version += 1;
  for (const listener of listeners) listener();
}

/** Replace everything, e.g. when a backup is imported. */
export function replaceVocab(data: VocabData): void {
  cache = migrate(data);
  publish();
  flushVocab();
}

export function exportVocab(): VocabData {
  return loadVocab();
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Snapshot for `useSyncExternalStore`: a counter, so identity stays stable. */
export function getVersion(): number {
  return version;
}
