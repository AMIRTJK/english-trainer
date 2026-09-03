import type { VocabWord } from '../../../types';
import { basicsWords } from './basics';
import { classroomWords } from './classroom';
import { peopleWords } from './people';
import { foodWords } from './food';
import { workWords } from './work';
import { leisureWords } from './leisure';
import { travelWords } from './travel';
import { soundBankWords } from './sound-bank';
import { soundPracticeWords } from './sound-practice';

/** Every word of the Beginner vocabulary, in book order. */
export const words: VocabWord[] = [
  ...basicsWords,
  ...classroomWords,
  ...peopleWords,
  ...foodWords,
  ...workWords,
  ...leisureWords,
  ...travelWords,
  ...soundBankWords,
  ...soundPracticeWords,
];
