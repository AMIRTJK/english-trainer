import type { Question } from '../../types';
import { gramBeSingularIYou, gramBeSingularHeShe, gramBePlural, gramWhQuestionsBe } from './gram-be';
import { gramNounsAAn, gramThisThat, gramPossessives, gramAdjectives } from './gram-nouns';
import {
  gramPresentSimplePosNeg, gramPresentSimpleQuestions,
  gramPresentSimpleHeShe, gramAdverbsFrequency,
} from './gram-present-simple';
import {
  gramWordOrder, gramImperatives, gramCan, gramLikeIng,
  gramPresentContinuous, gramContOrSimple,
} from './gram-modals';
import { gramThereIsAre } from './gram-there-is-are';
import { gramPastBe } from './gram-past-be';
import { gramPastRegular, gramPastIrregular } from './gram-past-simple';
import {
  vocabClassroom, vocabSmallThings, vocabFamily, vocabFood, vocabColours,
} from './vocab-core';
import {
  vocabJobs, vocabTypicalDay, vocabFreeTime, vocabTravel, vocabNumbers, vocabCountries,
} from './vocab-daily';
import {
  vocabDates, vocabTime, vocabVerbPhrases, vocabFilms, vocabActivities, vocabClothes,
} from './vocab-extra';
import { vocabHotels } from './vocab-hotels';
import { vocabPrepositions } from './vocab-prepositions';
import { pronEarChair } from './pron-ear-chair';
import { pronVowels } from './pron-vowels';
import { pronConsonants } from './pron-consonants';
import { stressWords } from './stress-words';
import { stressPatterns } from './stress-patterns';

export const questions: Question[] = [
  ...gramBeSingularIYou, ...gramBeSingularHeShe, ...gramBePlural, ...gramWhQuestionsBe,
  ...gramNounsAAn, ...gramThisThat, ...gramPossessives, ...gramAdjectives,
  ...gramPresentSimplePosNeg, ...gramPresentSimpleQuestions,
  ...gramPresentSimpleHeShe, ...gramAdverbsFrequency,
  ...gramWordOrder, ...gramImperatives, ...gramCan, ...gramLikeIng,
  ...gramPresentContinuous, ...gramContOrSimple,
  ...gramThereIsAre, ...gramPastBe, ...gramPastRegular, ...gramPastIrregular,
  ...vocabClassroom, ...vocabSmallThings, ...vocabFamily, ...vocabFood, ...vocabColours,
  ...vocabJobs, ...vocabTypicalDay, ...vocabFreeTime, ...vocabTravel,
  ...vocabNumbers, ...vocabCountries, ...vocabHotels, ...vocabPrepositions,
  ...vocabDates, ...vocabTime, ...vocabVerbPhrases, ...vocabFilms,
  ...vocabActivities, ...vocabClothes,
  ...pronEarChair, ...pronVowels, ...pronConsonants,
  ...stressWords, ...stressPatterns,
];
