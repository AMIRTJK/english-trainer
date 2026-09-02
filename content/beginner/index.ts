import type { LevelContent } from '../types';
import { meta, units } from './meta';
import { topics } from './topics';
import { questions } from './questions';
import { lexicon } from './lexicon';

/** Only verified items may be served in normal tests (AGENTS.md §3). */
const activeQuestions = questions.filter((q) => q.status === 'verified');

export const beginner: LevelContent = {
  meta,
  units,
  topics,
  questions: activeQuestions,
  lexicon,
};

export { meta as beginnerMeta };
