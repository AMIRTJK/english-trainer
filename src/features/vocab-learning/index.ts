export { useVocabulary, type VocabularyData } from './model/use-vocabulary';
export {
  answerWord, clearVocab, clearVocabLevel, exportVocab, flushVocab, forgetWord,
  levelProgress, replaceVocab,
} from '@/entities/vocab';
export { countScope, selectWords, DEFAULT_SESSION_SIZE, type ScopeCounts } from './model/session';
export { isDue, needsRepeat, weakSounds, BOX_INTERVAL_DAYS } from '@/entities/vocab';
export { totals, soundSummaries, soundTaskReadiness } from './model/stats';
export {
  EMPTY_FILTER, filterWords, groupWords,
  type GroupBy, type GroupContext, type WordFilter, type WordGroupView,
} from './model/grouping';
export type { SoundSummary, SoundTaskReadiness, VocabTotals } from './model/stats';
export { createVocabData, scopeKey, VOCAB_SCHEMA_VERSION } from '@/entities/vocab';
export type {
  SessionScope, VocabData, VocabLevelProgress, WordProgress, WordStatus,
} from '@/entities/vocab';
