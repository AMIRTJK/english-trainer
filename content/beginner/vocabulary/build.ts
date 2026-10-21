import { createWordMaker } from '../../common/words';
import { BEGINNER_LEVEL_ID } from '../meta';
import { KNOWN, SOUND_TASK_WORDS } from './derived';

export type { WordGroup, WordRow } from '../../common/words';

/**
 * Turn compact authoring groups into full Beginner word records.
 *
 * Only the translation is always written by hand: the IPA and the Sound Bank
 * group are taken from the phonetic tables the repository already has
 * (`derived.ts`) and are only spelled out in a row when those tables do not
 * cover the word, or when the Sound Bank lists the word under a consonant so the
 * stressed vowel has to be named.
 */
export const makeWords = createWordMaker({
  levelId: BEGINNER_LEVEL_ID,
  idPrefix: 'beg-w',
  unitPrefix: 'beg-u',
  known: KNOWN,
  soundTaskWords: SOUND_TASK_WORDS,
});
