import type { SoundProgress, VocabLevelProgress, WordProgress } from './types';
import { createWordProgress } from './types';

/**
 * A small Leitner scheme.
 *
 * "Не знаю" sends a word back to box 0, where it is due immediately and so
 * reappears in this session and the next one. "Знаю" promotes it, and each box
 * waits longer before asking again. A word counts as learned from box 2 on,
 * which is the first box whose interval survives a break of a few days.
 */
export const BOX_INTERVAL_DAYS: readonly number[] = [0, 1, 3, 7, 21];
export const KNOWN_FROM_BOX = 2;
export const MAX_BOX = BOX_INTERVAL_DAYS.length - 1;

const DAY_MS = 24 * 60 * 60 * 1000;

function dueDate(box: number, now: Date): string {
  const days = BOX_INTERVAL_DAYS[Math.min(box, MAX_BOX)] ?? 0;
  return new Date(now.getTime() + days * DAY_MS).toISOString();
}

export function getWordProgress(
  progress: VocabLevelProgress,
  wordId: string,
): WordProgress | undefined {
  return progress.words[wordId];
}

function ensureWord(progress: VocabLevelProgress, wordId: string): WordProgress {
  const existing = progress.words[wordId];
  if (existing) return existing;
  const created = createWordProgress(wordId);
  progress.words[wordId] = created;
  return created;
}

function ensureSound(progress: VocabLevelProgress, sound: string): SoundProgress {
  const existing = progress.sounds[sound];
  if (existing) return existing;
  const created: SoundProgress = { sound, known: 0, unknown: 0 };
  progress.sounds[sound] = created;
  return created;
}

/** Statistics are updated in place, one word at a time (Performance.md §4). */
export function recordAnswer(
  progress: VocabLevelProgress,
  wordId: string,
  sounds: readonly string[],
  knew: boolean,
  now: Date = new Date(),
): WordProgress {
  const word = ensureWord(progress, wordId);
  word.seen += 1;
  word.lastSeenAt = now.toISOString();

  if (knew) {
    word.known += 1;
    word.box = Math.min(word.box + 1, MAX_BOX);
    word.status = word.box >= KNOWN_FROM_BOX ? 'known' : 'learning';
  } else {
    word.unknown += 1;
    word.box = 0;
    word.status = 'learning';
  }
  word.dueAt = dueDate(word.box, now);

  for (const sound of sounds) {
    if (!sound) continue;
    const stat = ensureSound(progress, sound);
    if (knew) stat.known += 1;
    else stat.unknown += 1;
  }

  progress.updatedAt = now.toISOString();
  return word;
}

/** A word is due when it has never been studied or its interval has elapsed. */
export function isDue(word: WordProgress | undefined, now: Date = new Date()): boolean {
  if (!word) return true;
  if (!word.dueAt) return true;
  return new Date(word.dueAt).getTime() <= now.getTime();
}

/** Words the learner marked "Не знаю" and has not since got right. */
export function needsRepeat(word: WordProgress | undefined): boolean {
  return word !== undefined && word.status !== 'known' && word.unknown > 0;
}

/** Sound groups where the learner misses more than they get right. */
export function weakSounds(progress: VocabLevelProgress, minAnswers = 3): SoundProgress[] {
  return Object.values(progress.sounds)
    .filter((s) => s.known + s.unknown >= minAnswers && s.unknown > 0)
    .sort((a, b) => {
      const ratio = (s: SoundProgress): number => s.known / (s.known + s.unknown);
      return ratio(a) - ratio(b);
    });
}

/** Forget one word's history, e.g. to study it again from scratch. */
export function resetWord(progress: VocabLevelProgress, wordId: string): void {
  delete progress.words[wordId];
}
