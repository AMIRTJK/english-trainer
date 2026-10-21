import type { VowelBank } from '../../types';
import { BEGINNER_LEVEL_ID } from '../meta';
import { vowelSounds, vowelWords } from './vowel-sounds';

/** The Vowel sounds page of the Sound Bank as one bank (SB p.134). */
export const vowels: VowelBank = {
  levelId: BEGINNER_LEVEL_ID,
  page: 134,
  wordsTopicId: 'beg-p-sound-vowels',
  rulesTopicId: 'beg-p-sound-rules',
  sounds: vowelSounds,
  words: vowelWords,
};
