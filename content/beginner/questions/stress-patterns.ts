import type { Question } from '../../types';
import { makeQuestions, type Draft } from './build';

const SRC = { book: 'SB', page: 117, ref: 'Vocabulary Bank — word stress boxes' } as const;

/**
 * Two-syllable stress contrasts. The Student's Book flags these explicitly
 * ("Word stress - be careful!" 30 thirty / 13 thirteen) and for countries and
 * nationalities. Options are whole words, so the type is odd-one-out while the
 * category stays word-stress.
 */
const drafts: Draft[] = [
  { q: 'Which word has a different stress pattern?', o: ['thirteen', 'thirty', 'forty'], a: 0,
    e: 'thirTEEN has the stress on the second syllable. THIRty and FORty have it on the first.',
    c: 'teens-vs-tens', d: 3 },
  { q: 'Which word has a different stress pattern?', o: ['fifty', 'fifteen', 'sixty'], a: 1,
    e: 'fifTEEN has the stress on the second syllable. FIFty and SIXty have it on the first.',
    c: 'teens-vs-tens', d: 3 },
  { q: 'Which word has a different stress pattern?', o: ['eighteen', 'nineteen', 'ninety'], a: 2,
    e: 'NINEty has the stress on the first syllable. eighTEEN and nineTEEN have it on the second.',
    c: 'teens-vs-tens', d: 3 },
  { q: 'Which word has a different stress pattern?', o: ['fourteen', 'sixteen', 'seventy'], a: 2,
    e: 'SEVenty has the stress on the first syllable. fourTEEN and sixTEEN have it on the second.',
    c: 'teens-vs-tens', d: 3 },
  { q: 'Which word has a different stress pattern?', o: ['twenty', 'eighty', 'seventeen'], a: 2,
    e: 'sevenTEEN has the stress on the last syllable. TWENty and EIGHty have it on the first.',
    c: 'teens-vs-tens', d: 3 },

  { q: 'Which word has a different stress pattern?', o: ['Japan', 'China', 'Turkey'], a: 0,
    e: 'JaPAN has the stress on the second syllable. CHIna and TURkey have it on the first.',
    c: 'countries', d: 3 },
  { q: 'Which word has a different stress pattern?', o: ['England', 'Brazil', 'Poland'], a: 1,
    e: 'BraZIL has the stress on the second syllable. ENGland and POland have it on the first.',
    c: 'countries', d: 3 },
  { q: 'Which word has a different stress pattern?', o: ['Russia', 'Egypt', 'Chinese'], a: 2,
    e: 'chiNESE has the stress on the second syllable. RUSsia and Egypt have it on the first.',
    c: 'countries', d: 3 },
  { q: 'Which word has a different stress pattern?', o: ['Spanish', 'Polish', 'Italian'], a: 2,
    e: 'iTALian has the stress on the second syllable. SPANish and POLish have it on the first.',
    c: 'countries', d: 3 },
  { q: 'Which word has a different stress pattern?', o: ['German', 'Japanese', 'British'], a: 1,
    e: 'japaNESE has the stress on the last syllable. GERman and BRITish have it on the first.',
    c: 'countries', d: 3 },
  { q: 'Which word has a different stress pattern?', o: ['Mexican', 'Egyptian', 'Turkish'], a: 1,
    e: 'eGYPtian has the stress on the second syllable. MEXican and TURKish have it on the first.',
    c: 'countries', d: 3 },

  { q: 'Which word has a different stress pattern?', o: ['sister', 'brother', 'hotel'], a: 2,
    e: 'hoTEL has the stress on the second syllable. SISter and BROther have it on the first.',
    c: 'mixed', d: 3 },
  { q: 'Which word has a different stress pattern?', o: ['coffee', 'police', 'water'], a: 1,
    e: 'poLICE has the stress on the second syllable. COFfee and WAter have it on the first.',
    c: 'mixed', d: 3 },
  { q: 'Which word has a different stress pattern?', o: ['before', 'morning', 'evening'], a: 0,
    e: 'beFORE has the stress on the second syllable. MORNing and EVEning have it on the first.',
    c: 'mixed', d: 3 },
  { q: 'Which word has a different stress pattern?', o: ['breakfast', 'dinner', 'hello'], a: 2,
    e: 'helLO has the stress on the second syllable. BREAKfast and DINner have it on the first.',
    c: 'mixed', d: 3 },
];

export const stressPatterns: Question[] = makeQuestions(
  {
    topicId: 'beg-s-stress-numbers-countries',
    categoryId: 'word-stress',
    unit: 2,
    type: 'odd-one-out',
    source: SRC,
    slug: 'sp',
  },
  drafts,
);
