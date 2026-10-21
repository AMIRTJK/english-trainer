import type { Question } from '../../types';
import { soundRuleDrafts } from '../../common/sound-rules';
import { confusableSounds, vowelSounds } from '../pronunciation';
import { makeQuestions } from './build';

/**
 * The Sound Bank rules test (SB p.134), derived from `vowelTable` by the
 * builder every level shares (`docs/decisions.md` §19).
 */
export const pronRules: Question[] = makeQuestions(
  {
    topicId: 'beg-p-sound-rules',
    categoryId: 'pronunciation',
    unit: 3,
    type: 'choose-word',
    source: { book: 'SB', page: 134, ref: 'Sound Bank — vowel sounds, spelling rules' },
    slug: 'rl',
  },
  soundRuleDrafts(vowelSounds, confusableSounds),
);
