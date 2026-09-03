import type { VocabWord } from '@content/types';
import { createRng, shuffleInPlace, type Rng } from '@/shared/lib/random';
import {
  isDue, needsRepeat,
  type SessionScope, type VocabLevelProgress, type WordProgress,
} from '@/entities/vocab';

export interface SessionOptions {
  scope: SessionScope;
  /** How many cards one session holds. */
  limit?: number;
  now?: Date;
  seed?: number;
  /** Also show words already learned, for reinforcement. */
  includeKnown?: boolean;
  /** Sounds contrasted with a given sound, for the `contrast` scope. */
  contrastsFor?: (sound: string) => string[];
}

export const DEFAULT_SESSION_SIZE = 20;

function matchesScope(
  word: VocabWord,
  scope: SessionScope,
  progress: VocabLevelProgress,
  now: Date,
  contrastsFor: (sound: string) => string[],
): boolean {
  switch (scope.kind) {
    case 'all':
      return true;
    case 'unit':
      return word.unitId === scope.unitId;
    case 'topic':
      return word.topicId === scope.topicId;
    case 'sound':
      return word.sound === scope.sound || word.also.includes(scope.sound);
    case 'contrast': {
      const wanted = new Set([scope.sound, ...contrastsFor(scope.sound)]);
      return wanted.has(word.sound) || word.also.some((s) => wanted.has(s));
    }
    case 'sound-task':
      return word.inSoundTask;
    case 'review': {
      const stored = progress.words[word.id];
      return needsRepeat(stored) || (stored !== undefined && isDue(stored, now));
    }
  }
}

/** Keep words that share a sound next to each other, but vary the group order. */
function groupBySound(words: VocabWord[], rng: Rng): VocabWord[] {
  const groups = new Map<string, VocabWord[]>();
  for (const word of words) {
    const list = groups.get(word.sound);
    if (list) list.push(word);
    else groups.set(word.sound, [word]);
  }
  const keys = shuffleInPlace([...groups.keys()], rng);
  return keys.flatMap((key) => groups.get(key) ?? []);
}

type Bucket = 'repeat' | 'due' | 'fresh' | 'known';

function bucketOf(stored: WordProgress | undefined, now: Date): Bucket {
  if (!stored) return 'fresh';
  if (needsRepeat(stored)) return 'repeat';
  if (stored.status === 'known' && !isDue(stored, now)) return 'known';
  return isDue(stored, now) ? 'due' : 'known';
}

/**
 * Choose the words for one learning session.
 *
 * Order of priority: words the learner marked "Не знаю", then words whose
 * interval has elapsed, then words never studied. Already-learned words only
 * fill the remaining space, and only when asked for. Pure and deterministic
 * given a seed, so it can be unit-tested.
 */
export function selectWords(
  words: readonly VocabWord[],
  progress: VocabLevelProgress,
  options: SessionOptions,
): VocabWord[] {
  const now = options.now ?? new Date();
  const limit = options.limit ?? DEFAULT_SESSION_SIZE;
  const rng = createRng(options.seed ?? 1);
  const contrastsFor = options.contrastsFor ?? (() => []);

  const buckets: Record<Bucket, VocabWord[]> = { repeat: [], due: [], fresh: [], known: [] };
  for (const word of words) {
    if (!matchesScope(word, options.scope, progress, now, contrastsFor)) continue;
    buckets[bucketOf(progress.words[word.id], now)].push(word);
  }

  const ordered = [
    ...groupBySound(buckets.repeat, rng),
    ...groupBySound(buckets.due, rng),
    ...groupBySound(buckets.fresh, rng),
  ];

  if (ordered.length >= limit) return ordered.slice(0, limit);
  if (!options.includeKnown) return ordered;

  return [...ordered, ...groupBySound(buckets.known, rng)].slice(0, limit);
}

/** How many words each bucket holds, for the session picker. */
export interface ScopeCounts {
  total: number;
  repeat: number;
  due: number;
  fresh: number;
  known: number;
}

export function countScope(
  words: readonly VocabWord[],
  progress: VocabLevelProgress,
  scope: SessionScope,
  now: Date = new Date(),
  contrastsFor: (sound: string) => string[] = () => [],
): ScopeCounts {
  const counts: ScopeCounts = { total: 0, repeat: 0, due: 0, fresh: 0, known: 0 };
  for (const word of words) {
    if (!matchesScope(word, scope, progress, now, contrastsFor)) continue;
    counts.total += 1;
    counts[bucketOf(progress.words[word.id], now)] += 1;
  }
  return counts;
}
