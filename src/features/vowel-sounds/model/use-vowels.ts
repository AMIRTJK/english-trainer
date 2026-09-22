import { useMemo, useSyncExternalStore } from 'react';
import { getVowelIndex, type VowelIndex } from '@content/registry';
import type { VowelLevel, VowelWord } from '@content/types';
import { useActiveLevelId } from '@/app/store/app-store';
import {
  getVersion, levelProgress, subscribe, weakOf,
  type SoundProgress, type VocabLevelProgress,
} from '@/entities/vocab';
import { levelProgressPercent, unlockedLevel } from './session';
import { soundRows, vowelTotals, type VowelSoundRow, type VowelTotals } from './stats';

export interface LevelBand {
  level: VowelLevel;
  title: string;
  hint: string;
  total: number;
  known: number;
  percent: number;
  unlocked: boolean;
}

export interface VowelData {
  levelId: string;
  hasVowels: boolean;
  index: VowelIndex | null;
  progress: VocabLevelProgress;
  totals: VowelTotals;
  bands: LevelBand[];
  rows: VowelSoundRow[];
  weak: SoundProgress[];
  unlocked: VowelLevel;
}

const BANDS: Array<[VowelLevel, string, string]> = [
  [1, 'Обычное написание', 'Буквы читаются только так: ee, ar, igh, air…'],
  [2, 'Спорные буквы', 'Те же буквы дают разные звуки: a, o, u, oo, ere…'],
  [3, 'Исключения «! but also»', 'Написание не подсказывает: women, friend, two, buy…'],
];

/**
 * The Vowel sounds page joined with the learner's progress.
 *
 * Read through `useSyncExternalStore`, so answering a question re-renders the
 * pronunciation screens only (Performance.md §2).
 */
export function useVowels(): VowelData {
  const levelId = useActiveLevelId();
  const version = useSyncExternalStore(subscribe, getVersion, getVersion);
  const index = getVowelIndex(levelId);

  return useMemo<VowelData>(() => {
    const progress = levelProgress(levelId);
    const store = progress.vowels;
    const byLevel: ReadonlyMap<number, VowelWord[]> = index?.byLevel ?? new Map();
    const unlocked = unlockedLevel(byLevel, store);

    return {
      levelId,
      hasVowels: index !== null,
      index,
      progress,
      totals: vowelTotals(index?.bank.words ?? [], store),
      bands: BANDS.map(([level, title, hint]) => {
        const words = byLevel.get(level) ?? [];
        return {
          level,
          title,
          hint,
          total: words.length,
          known: words.filter((w) => store[w.id]?.status === 'known').length,
          percent: levelProgressPercent(words, store),
          unlocked: level <= unlocked,
        };
      }),
      rows: index ? soundRows(index.bank.sounds, index.bySound, store, progress.vowelSounds) : [],
      weak: weakOf(progress.vowelSounds),
      unlocked,
    };
    // `version` is the store's change signal; the progress object is mutated in place.
  }, [levelId, index, version]);
}
