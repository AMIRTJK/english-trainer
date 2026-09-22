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

/**
 * The three things a word can be practised for are three different skills, and
 * a learner is routinely good at one and weak at another: they may recognise
 * *beautiful* instantly, still misspell it, and still not hear its /uː/. So each
 * skill keeps its own Leitner boxes rather than sharing one number.
 */
export type TrackId = 'words' | 'spelling' | 'vowels';

export interface VocabLevelProgress {
  levelId: string;
  /** Recognition: word → translation. */
  words: Record<string, WordProgress>;
  /** Per Sound Bank sound, from the recognition cards. */
  sounds: Record<string, SoundProgress>;
  /** Spelling: translation → typed word. Keyed by the same word ids. */
  spelling: Record<string, WordProgress>;
  /** Vowel sounds: keyed by the ids of `content/<level>/pronunciation`. */
  vowels: Record<string, WordProgress>;
  /** Per vowel, from the vowel-sound questions. */
  vowelSounds: Record<string, SoundProgress>;
  updatedAt: string | null;
}

export const VOCAB_SCHEMA_VERSION = 2;

export interface VocabData {
  schemaVersion: number;
  levels: Record<string, VocabLevelProgress>;
}

export function createLevelProgress(levelId: string): VocabLevelProgress {
  return {
    levelId,
    words: {},
    sounds: {},
    spelling: {},
    vowels: {},
    vowelSounds: {},
    updatedAt: null,
  };
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
