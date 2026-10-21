import { stressedVowelKey } from '../../common/sound-groups';
import { createWordMaker } from '../../common/words';
import { ELEMENTARY_LEVEL_ID } from '../meta';
import { KNOWN, SOUND_TASK_WORDS } from './derived';

export type { WordGroup, WordRow } from '../../common/words';

/**
 * Turn compact authoring groups into Elementary word records.
 *
 * The transcription is the one the Vocabulary Bank prints next to the word
 * (SB pp.148-165). The Sound Bank group is the row of p.166 when the page lists
 * the word, otherwise the stressed vowel of that transcription
 * (`docs/decisions.md` §22).
 */
export const makeWords = createWordMaker({
  levelId: ELEMENTARY_LEVEL_ID,
  idPrefix: 'ele-w',
  unitPrefix: 'ele-u',
  known: KNOWN,
  soundTaskWords: SOUND_TASK_WORDS,
  fallbackSound: stressedVowelKey,
});
