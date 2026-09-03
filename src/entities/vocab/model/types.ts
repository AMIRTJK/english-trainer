/** Persisted vocabulary progress. Kept apart from test history (AGENTS.md §4). */

export type WordStatus = 'new' | 'learning' | 'known';

export interface WordProgress {
  wordId: string;
  /** Leitner box: 0 = just missed, 4 = long interval. */
  box: number;
  status: WordStatus;
  seen: number;
  known: number;
  unknown: number;
  lastSeenAt: string | null;
  /** When the word should come back. `null` means "as soon as possible". */
  dueAt: string | null;
}

/** Per Sound Bank group, so a shaky sound can be revised as a whole. */
export interface SoundProgress {
  sound: string;
  known: number;
  unknown: number;
}

export interface VocabLevelProgress {
  levelId: string;
  words: Record<string, WordProgress>;
  sounds: Record<string, SoundProgress>;
  updatedAt: string | null;
}

export const VOCAB_SCHEMA_VERSION = 1;

export interface VocabData {
  schemaVersion: number;
  levels: Record<string, VocabLevelProgress>;
}

export function createLevelProgress(levelId: string): VocabLevelProgress {
  return { levelId, words: {}, sounds: {}, updatedAt: null };
}

export function createVocabData(): VocabData {
  return { schemaVersion: VOCAB_SCHEMA_VERSION, levels: {} };
}

export function createWordProgress(wordId: string): WordProgress {
  return {
    wordId,
    box: 0,
    status: 'new',
    seen: 0,
    known: 0,
    unknown: 0,
    lastSeenAt: null,
    dueAt: null,
  };
}

/** What the learner is studying in one session. */
export type SessionScope =
  | { kind: 'all' }
  | { kind: 'unit'; unitId: string }
  | { kind: 'topic'; topicId: string }
  | { kind: 'sound'; sound: string }
  | { kind: 'contrast'; sound: string }
  | { kind: 'sound-task' }
  | { kind: 'review' };

export function scopeKey(scope: SessionScope): string {
  switch (scope.kind) {
    case 'unit':
      return `unit:${scope.unitId}`;
    case 'topic':
      return `topic:${scope.topicId}`;
    case 'sound':
      return `sound:${scope.sound}`;
    case 'contrast':
      return `contrast:${scope.sound}`;
    default:
      return scope.kind;
  }
}
