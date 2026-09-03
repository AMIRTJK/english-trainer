import { useMemo, useSyncExternalStore } from 'react';
import { getLevelIndex, getVocabularyIndex, type VocabularyIndex } from '@content/registry';
import type { Topic, Unit } from '@content/types';
import { useActiveLevelId } from '@/app/store/app-store';
import {
  getVersion, levelProgress, subscribe, type VocabLevelProgress,
} from '@/entities/vocab';
import { soundSummaries, soundTaskReadiness, totals, type SoundSummary, type SoundTaskReadiness, type VocabTotals } from './stats';

export interface VocabularyData {
  levelId: string;
  hasVocabulary: boolean;
  index: VocabularyIndex | null;
  /** Units and topics of the level, for grouping the word list. */
  units: readonly Unit[];
  topics: readonly Topic[];
  progress: VocabLevelProgress;
  totals: VocabTotals;
  sounds: SoundSummary[];
  readiness: SoundTaskReadiness;
}

/**
 * Vocabulary content joined with the learner's progress.
 *
 * The store is read through `useSyncExternalStore`, so answering a card
 * re-renders the vocabulary screens only — never the dashboard
 * (Performance.md §2).
 */
export function useVocabulary(): VocabularyData {
  const levelId = useActiveLevelId();
  const version = useSyncExternalStore(subscribe, getVersion, getVersion);
  const index = getVocabularyIndex(levelId);
  const level = getLevelIndex(levelId);

  return useMemo<VocabularyData>(() => {
    const progress = levelProgress(levelId);
    const words = index?.bank.words ?? [];
    return {
      levelId,
      hasVocabulary: index !== null,
      index,
      units: level?.content.units ?? [],
      topics: level?.content.topics ?? [],
      progress,
      totals: totals(words, progress),
      sounds: index ? soundSummaries(index.bank.sounds, index.bySound, progress) : [],
      readiness: soundTaskReadiness(index?.soundTaskWords ?? [], progress),
    };
    // `version` is the store's change signal; the progress object is mutated in place.
  }, [levelId, index, level, version]);
}
