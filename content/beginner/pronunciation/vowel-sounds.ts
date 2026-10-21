import { buildVowelBank } from '../../common/vowel-bank';
import { BEGINNER_LEVEL_ID } from '../meta';
import { vowelTable } from './vowel-table';

/**
 * SB p.134 turned into the two lists the app needs: the sounds with their
 * spelling rules, and every word the page prints, tagged with the spelling that
 * explains it. The builder is shared with the other levels; the page is this
 * level's own (see `docs/decisions.md` §14).
 */
const bank = buildVowelBank(BEGINNER_LEVEL_ID, 'beg-vs', vowelTable);

export const {
  vowelSounds, vowelSoundByKey, vowelWords, levelOf, confusableSounds, ambiguousWords, isAskable,
} = bank;
