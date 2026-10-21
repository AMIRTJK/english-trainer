import type { VowelBank } from '../../types';
import { ELEMENTARY_LEVEL_ID } from '../meta';
import { vowelSounds, vowelWords } from './vowel-sounds';

/** The Vowel sounds page of the Sound Bank as one bank (SB p.166). */
export const vowels: VowelBank = {
  levelId: ELEMENTARY_LEVEL_ID,
  page: 166,
  wordsTopicId: 'ele-p-sound-vowels',
  rulesTopicId: 'ele-p-sound-rules',
  sounds: vowelSounds,
  words: vowelWords,
};
