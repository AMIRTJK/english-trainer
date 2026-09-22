import type { VowelSound, VowelWord } from '@content/types';
import { isDue, needsRepeat, type SoundProgress, type WordProgress } from '@/entities/vocab';

export type WordStore = Record<string, WordProgress>;

export interface VowelTotals {
  total: number;
  known: number;
  learning: number;
  fresh: number;
  due: number;
  repeat: number;
  percent: number;
}

/** Progress over every word of the Vowel sounds page. */
export function vowelTotals(
  words: readonly VowelWord[],
  store: WordStore,
  now: Date = new Date(),
): VowelTotals {
  let known = 0;
  let learning = 0;
  let due = 0;
  let repeat = 0;

  for (const word of words) {
    const stored = store[word.id];
    const status = stored?.status ?? 'new';
    if (status === 'known') known += 1;
    else if (status === 'learning') learning += 1;
    if (stored && status !== 'new' && isDue(stored, now)) due += 1;
    if (needsRepeat(stored)) repeat += 1;
  }

  const total = words.length;
  return {
    total,
    known,
    learning,
    fresh: total - known - learning,
    due,
    repeat,
    percent: total === 0 ? 0 : Math.round((known / total) * 100),
  };
}

export interface VowelSoundRow {
  sound: VowelSound;
  total: number;
  known: number;
  percent: number;
  /** More wrong than right answers on this vowel. */
  weak: boolean;
  /** Example words, in book order, for the reference list. */
  words: VowelWord[];
}

/** One row per vowel, built from the pre-indexed word lists (Performance.md §1). */
export function soundRows(
  sounds: readonly VowelSound[],
  bySound: ReadonlyMap<string, VowelWord[]>,
  store: WordStore,
  counters: Record<string, SoundProgress>,
): VowelSoundRow[] {
  return sounds.map((sound) => {
    const words = bySound.get(sound.key) ?? [];
    const known = words.filter((w) => store[w.id]?.status === 'known').length;
    const stat = counters[sound.key];
    return {
      sound,
      total: words.length,
      known,
      percent: words.length === 0 ? 0 : Math.round((known / words.length) * 100),
      weak: stat !== undefined && stat.unknown > stat.known,
      words,
    };
  });
}
