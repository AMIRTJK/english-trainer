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
import { toLearn1to6 } from './to-learn-1-6';
import { toLearn7to12 } from './to-learn-7-12';
import { verbWords } from './verbs';

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
  ...toLearn1to6,
  ...toLearn7to12,
  ...verbWords,
];
