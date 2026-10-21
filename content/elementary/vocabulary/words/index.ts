import type { VocabWord } from '../../../types';
import { basicsWords } from './basics';
import { peopleWords } from './people';
import { routineWords } from './routine';
import { homeFoodWords } from './home-food';
import { cityVerbWords } from './city-verbs';
import { soundBankWords } from './sound-bank';

/** Every word of the Elementary vocabulary, in book order. */
export const words: VocabWord[] = [
  ...basicsWords,
  ...peopleWords,
  ...routineWords,
  ...homeFoodWords,
  ...cityVerbWords,
  ...soundBankWords,
];
