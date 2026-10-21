import type { Question } from '../../types';
import { gramFile1 } from './gram-file1';
import { gramFile2 } from './gram-file2';
import { gramFile3 } from './gram-file3';
import { gramFile4 } from './gram-file4';
import { gramFile5 } from './gram-file5';
import { gramFile6 } from './gram-file6';
import { gramFile7 } from './gram-file7';
import { gramFile8 } from './gram-file8';
import { gramFile9 } from './gram-file9';
import { gramFile10 } from './gram-file10';
import { gramFile11 } from './gram-file11';
import { gramFile12 } from './gram-file12';
import { vocabFiles1to2 } from './vocab-files1-2';
import { vocabFiles2to3 } from './vocab-files2-3';
import { vocabFiles4to6 } from './vocab-files4-6';
import { vocabFiles7to9 } from './vocab-files7-9';
import { vocabFiles10to12 } from './vocab-files10-12';
import { pronVowels } from './pron-vowels';
import { pronConsonants } from './pron-consonants';
import { pronEndings, pronLetters, pronRules } from './pron-endings-letters';
import { stressPatterns, stressWords } from './stress';

/** The whole Elementary question bank, in book order. */
export const questions: Question[] = [
  ...gramFile1, ...gramFile2, ...gramFile3, ...gramFile4, ...gramFile5, ...gramFile6,
  ...gramFile7, ...gramFile8, ...gramFile9,
  ...gramFile10, ...gramFile11, ...gramFile12,
  ...vocabFiles1to2, ...vocabFiles2to3, ...vocabFiles4to6, ...vocabFiles7to9, ...vocabFiles10to12,
  ...pronVowels, ...pronConsonants, ...pronEndings, ...pronLetters, ...pronRules,
  ...stressWords, ...stressPatterns,
];
