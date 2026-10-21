import { buildVowelBank } from '../../common/vowel-bank';
import { ELEMENTARY_LEVEL_ID } from '../meta';
import { vowelTable } from './vowel-table';

/** SB p.166 as the app's sound list and word list, built by the shared builder. */
const bank = buildVowelBank(ELEMENTARY_LEVEL_ID, 'ele-vs', vowelTable);

export const {
  vowelSounds, vowelSoundByKey, vowelWords, levelOf, confusableSounds, ambiguousWords, isAskable,
} = bank;
