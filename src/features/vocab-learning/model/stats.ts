import type { SoundGroup, VocabWord } from '@content/types';
import { isDue, needsRepeat, type VocabLevelProgress, type WordStatus } from '@/entities/vocab';

export interface VocabTotals {
  total: number;
  known: number;
  learning: number;
  fresh: number;
  /** Words waiting to be revised right now. */
  due: number;
  /** Words the learner has answered "Не знаю" and not yet fixed. */
  repeat: number;
  percent: number;
}

function statusOf(progress: VocabLevelProgress, wordId: string): WordStatus {
  return progress.words[wordId]?.status ?? 'new';
}

export function totals(
  words: readonly VocabWord[],
  progress: VocabLevelProgress,
  now: Date = new Date(),
): VocabTotals {
  let known = 0;
  let learning = 0;
  let fresh = 0;
  let due = 0;
  let repeat = 0;

  for (const word of words) {
    const stored = progress.words[word.id];
    const status = stored?.status ?? 'new';
    if (status === 'known') known += 1;
    else if (status === 'learning') learning += 1;
    else fresh += 1;
    if (stored && isDue(stored, now) && status !== 'new') due += 1;
    if (needsRepeat(stored)) repeat += 1;
  }

  const total = words.length;
  return {
    total,
    known,
    learning,
    fresh,
    due,
    repeat,
    percent: total === 0 ? 0 : Math.round((known / total) * 100),
  };
}

export interface SoundSummary {
  sound: SoundGroup;
  total: number;
  known: number;
  learning: number;
  fresh: number;
  percent: number;
  /** More wrong than right answers on this sound in the flashcards. */
  weak: boolean;
}

/** One row per Sound Bank group, built from the pre-indexed word lists. */
export function soundSummaries(
  sounds: readonly SoundGroup[],
  bySound: ReadonlyMap<string, VocabWord[]>,
  progress: VocabLevelProgress,
): SoundSummary[] {
  return sounds.map((sound) => {
    const words = bySound.get(sound.key) ?? [];
    let known = 0;
    let learning = 0;
    for (const word of words) {
      const status = statusOf(progress, word.id);
      if (status === 'known') known += 1;
      else if (status === 'learning') learning += 1;
    }
    const stat = progress.sounds[sound.key];
    return {
      sound,
      total: words.length,
      known,
      learning,
      fresh: words.length - known - learning,
      percent: words.length === 0 ? 0 : Math.round((known / words.length) * 100),
      weak: stat !== undefined && stat.unknown > stat.known,
    };
  });
}

export interface SoundTaskReadiness {
  total: number;
  known: number;
  percent: number;
}

/** How ready the learner is for the "different sound" questions. */
export function soundTaskReadiness(
  soundTaskWords: readonly VocabWord[],
  progress: VocabLevelProgress,
): SoundTaskReadiness {
  let known = 0;
  for (const word of soundTaskWords) {
    if (statusOf(progress, word.id) === 'known') known += 1;
  }
  const total = soundTaskWords.length;
  return { total, known, percent: total === 0 ? 0 : Math.round((known / total) * 100) };
}
