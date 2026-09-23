import type { VowelLevel, VowelWord } from '@content/types';
import { createRng, shuffleInPlace } from '@/shared/lib/random';
import { isDue, needsRepeat, type WordProgress } from '@/entities/vocab';

/**
 * The queue for one vowel-sound session.
 *
 * The learner's complaint is that they can pick the right answer without
 * knowing why, so the order matters as much as the content: words whose letters
 * only ever make one sound come first, then words whose letters are ambiguous,
 * and only then the book's "! but also" exceptions.
 *
 * The order is a suggestion, never a gate. A round is always offered: when
 * nothing is due, the learned words are revised instead, so "Train this level"
 * can never answer "nothing to practise" (see `docs/decisions.md` §17).
 */

export const DEFAULT_ROUND_SIZE = 15;
/** Share of a level that must be learned before the next one opens. */
export const UNLOCK_AT = 0.7;
/** How far ahead a missed word is pushed before it comes round again. */
export const REQUEUE_GAP = 4;

export type WordStore = Record<string, WordProgress>;

function learnedShare(words: readonly VowelWord[], store: WordStore): number {
  if (words.length === 0) return 1;
  const known = words.filter((w) => store[w.id]?.status === 'known').length;
  return known / words.length;
}

/** The hardest level the learner has earned. */
export function unlockedLevel(
  byLevel: ReadonlyMap<number, VowelWord[]>,
  store: WordStore,
): VowelLevel {
  if (learnedShare(byLevel.get(1) ?? [], store) < UNLOCK_AT) return 1;
  if (learnedShare(byLevel.get(2) ?? [], store) < UNLOCK_AT) return 2;
  return 3;
}

/** How close the learner is to opening the next level, as a percentage. */
export function levelProgressPercent(
  words: readonly VowelWord[],
  store: WordStore,
): number {
  return Math.round(learnedShare(words, store) * 100);
}

export interface RoundOptions {
  /** Only ask about words at this level; `null` means "up to the unlocked one". */
  level?: VowelLevel | null;
  size?: number;
  seed?: number;
  now?: Date;
  /** Put learned words in the queue straight away, not only as a fallback. */
  includeKnown?: boolean;
}

type Bucket = 'repeat' | 'due' | 'fresh' | 'known';

function bucketOf(stored: WordProgress | undefined, now: Date): Bucket {
  if (!stored) return 'fresh';
  if (needsRepeat(stored)) return 'repeat';
  if (stored.status === 'known' && !isDue(stored, now)) return 'known';
  return isDue(stored, now) ? 'due' : 'known';
}

/**
 * Choose the words for one round.
 *
 * Missed words first, then words whose interval has elapsed, then unseen ones —
 * the same priority as the vocabulary flashcards — but always within the level
 * band, and easiest level first so a mixed round teaches the rule before the
 * exception.
 *
 * Words that are learned and not yet due are held back while there is other
 * work, and used to fill the round when there is not. A level with words in it
 * therefore always yields a round.
 */
export function selectRound(
  byLevel: ReadonlyMap<number, VowelWord[]>,
  store: WordStore,
  options: RoundOptions = {},
): VowelWord[] {
  const now = options.now ?? new Date();
  const size = options.size ?? DEFAULT_ROUND_SIZE;
  const rng = createRng(options.seed ?? 1);
  const ceiling = options.level ?? unlockedLevel(byLevel, store);

  const levels: VowelLevel[] = options.level
    ? [options.level]
    : ([1, 2, 3] as VowelLevel[]).filter((n) => n <= ceiling);

  const out: VowelWord[] = [];
  const revision: VowelWord[] = [];
  for (const level of levels) {
    const buckets: Record<Bucket, VowelWord[]> = { repeat: [], due: [], fresh: [], known: [] };
    for (const word of byLevel.get(level) ?? []) {
      buckets[bucketOf(store[word.id], now)].push(word);
    }
    const ordered = [
      ...shuffleInPlace(buckets.repeat, rng),
      ...shuffleInPlace(buckets.due, rng),
      ...shuffleInPlace(buckets.fresh, rng),
      ...(options.includeKnown ? shuffleInPlace(buckets.known, rng) : []),
    ];
    out.push(...ordered);
    if (!options.includeKnown) revision.push(...shuffleInPlace(buckets.known, rng));
    if (out.length >= size) break;
  }

  // Nothing due does not mean nothing to do: revise what is already learned.
  if (out.length < size) out.push(...revision);
  return out.slice(0, size);
}

/**
 * Put a missed word back into the queue a few cards later.
 *
 * Requirement 6 of the brief: a word answered wrong must return in the same
 * session, not only in the next one. Pure, so the page keeps no queue logic.
 */
export function requeue(
  queue: readonly VowelWord[],
  position: number,
  gap: number = REQUEUE_GAP,
): VowelWord[] {
  const item = queue[position];
  if (!item) return [...queue];
  const next = [...queue];
  const target = Math.min(position + gap + 1, next.length);
  next.splice(target, 0, item);
  return next;
}
