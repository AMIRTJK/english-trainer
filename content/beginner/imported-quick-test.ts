import type { CategoryId } from '../types';

/**
 * The real "English File Beginner — 10 Quick Test" paper in `test/`.
 *
 * Every one of the 50 items was read from the photographs, the learner's ticks
 * were recorded, and the teacher's marks in the margin were cross-checked
 * against an independent analysis of the correct answers. Both agree exactly:
 * 38/50 with 12 mistakes.
 *
 * Section totals: Grammar 17/20, Vocabulary 15/20, Pronunciation 6/10
 * (sounds 2/5, word stress 4/5).
 *
 * Because this is the File 10 paper, the topic of each item is known from the
 * paper's own structure, so the whole test can be attributed reliably. The one
 * exception is Vocabulary 4, which is left unclassified on purpose.
 */
export interface ImportedItem {
  section: 'grammar' | 'vocabulary' | 'pronunciation';
  number: number;
  categoryId: CategoryId;
  /** Topic id in this level, or null when it cannot be identified reliably. */
  topicId: string | null;
  correct: boolean;
  text?: string;
  chosen?: string;
  answer?: string;
  uncertain?: boolean;
  note?: string;
}

export const IMPORTED_TEST_META = {
  paper: 'English File 4th edition Beginner — 10 Quick Test',
  publisher: 'Oxford University Press, 2019',
  total: 50,
  correct: 38,
  wrong: 12,
  percent: 76,
  sections: [
    { name: 'Grammar', correct: 17, total: 20 },
    { name: 'Vocabulary', correct: 15, total: 20 },
    { name: 'Pronunciation', correct: 6, total: 10 },
  ],
} as const;

const T = {
  there: 'beg-g-there-is-are',
  pastBe: 'beg-g-past-simple-be',
  hotels: 'beg-v-hotels',
  prep: 'beg-v-prepositions-place',
  sound: 'beg-p-sound-ear-chair',
  stress: 'beg-s-stress-words',
} as const;

/** Grammar 1-20: items 10, 12 and 17 were wrong. */
const GRAMMAR_TOPICS: Array<typeof T.there | typeof T.pastBe> = [
  T.there, T.pastBe, T.there, T.pastBe, T.there, T.there, T.there, T.pastBe,
  T.there, T.there, T.pastBe, T.there, T.pastBe, T.there, T.pastBe, T.pastBe,
  T.there, T.there, T.pastBe, T.there,
];
const GRAMMAR_WRONG = new Set([10, 12, 17]);

/** Vocabulary 1-20: 1-14 hotel words, 15-20 prepositions. 4, 5, 16, 17, 20 wrong. */
const VOCAB_WRONG = new Set([4, 5, 16, 17, 20]);

/** Pronunciation 1-5 sounds, 6-10 word stress. 1, 2, 4 and 8 were wrong. */
const PRON_WRONG = new Set([1, 2, 4, 8]);

function grammarItems(): ImportedItem[] {
  return GRAMMAR_TOPICS.map((topicId, i) => ({
    section: 'grammar' as const,
    number: i + 1,
    categoryId: 'grammar' as CategoryId,
    topicId,
    correct: !GRAMMAR_WRONG.has(i + 1),
  }));
}

function vocabItems(): ImportedItem[] {
  return Array.from({ length: 20 }, (_, i) => {
    const number = i + 1;
    const topicId = number === 4 ? null : number <= 14 ? T.hotels : T.prep;
    return {
      section: 'vocabulary' as const,
      number,
      categoryId: 'vocabulary' as CategoryId,
      topicId,
      correct: !VOCAB_WRONG.has(number),
    };
  });
}

function pronItems(): ImportedItem[] {
  return Array.from({ length: 10 }, (_, i) => {
    const number = i + 1;
    const isStress = number > 5;
    return {
      section: 'pronunciation' as const,
      number,
      categoryId: (isStress ? 'word-stress' : 'pronunciation') as CategoryId,
      topicId: isStress ? T.stress : T.sound,
      correct: !PRON_WRONG.has(number),
    };
  });
}

/** All 50 items with their section, topic and result. */
export const IMPORTED_ITEMS: ImportedItem[] = [
  ...grammarItems(), ...vocabItems(), ...pronItems(),
];

/** Detail for the 12 mistakes: what was chosen, what was right, and why. */
export const MISTAKE_DETAIL: Record<string, { text: string; chosen: string; answer: string; note: string; uncertain?: boolean }> = {
  'grammar-10': {
    text: '___ any towels in the bathroom?', chosen: 'Is there', answer: 'Are there',
    note: 'towels is plural, so the question needs Are there',
  },
  'grammar-12': {
    text: 'Are there ___ good stories in that magazine?', chosen: 'some', answer: 'any',
    note: 'any is used with plural nouns in questions',
  },
  'grammar-17': {
    text: 'There ___ swimming pool in the hotel.', chosen: 'isn’t any', answer: 'isn’t a',
    note: 'a singular countable noun takes a, not any',
  },
  'vocabulary-4': {
    text: 'Which word is different? a supermarket — a spa / a hospital / a street',
    chosen: 'a spa', answer: 'a street', uncertain: true,
    note:
      'The marked answer is wrong, so the key is "a hospital" or "a street". ' +
      '"a street" is the better reading — a supermarket, a spa and a hospital are ' +
      'all places you go inside — but the official key was not available, so this ' +
      'item is left unclassified rather than assigned a topic on a guess.',
  },
  'vocabulary-5': {
    text: 'Which word is different? a restaurant — reception / a gift shop / a pillow',
    chosen: 'reception', answer: 'a pillow',
    note: 'a restaurant, reception and a gift shop are places in a hotel; a pillow is an object',
  },
  'vocabulary-16': {
    text: 'It’s raining. Come ___ the umbrella.', chosen: 'on', answer: 'under',
    note: 'under the umbrella',
  },
  'vocabulary-17': {
    text: 'Sam and Kevin are running ___ the park.', chosen: 'on', answer: 'in',
    note: 'in the park',
  },
  'vocabulary-20': {
    text: 'My room is ___ the third floor.', chosen: 'at', answer: 'on',
    note: 'on the third floor',
  },
  'pronunciation-1': {
    text: 'Which word has a different sound? where / here / airport',
    chosen: 'airport', answer: 'here', note: 'here is /ɪə/; where and airport are /eə/',
  },
  'pronunciation-2': {
    text: 'Which word has a different sound? really / idea / wear',
    chosen: 'idea', answer: 'wear', note: 'wear is /eə/; really and idea are /ɪə/',
  },
  'pronunciation-4': {
    text: 'Which word has a different sound? we’re / where / chair',
    chosen: 'chair', answer: 'we’re', note: 'we’re is /ɪə/; where and chair are /eə/',
  },
  'pronunciation-8': {
    text: 'Which is the stressed syllable? de|tec|tive',
    chosen: 'de', answer: 'tec', note: 'deTECtive — the stress is on the second syllable',
  },
};
