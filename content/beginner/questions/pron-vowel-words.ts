import type { Question } from '../../types';
import { makeQuestions, type Draft } from './build';
import { SOUND_IPA } from './pron-vowels';
import { SOUND_TABLE } from './sound-table';

/**
 * "Which word has the sound …?" — the second half of the Vowel sounds test.
 *
 * SB p.134 teaches several rows with words that carry more than one vowel:
 * `sister` is on the /ə/ row but starts with /ɪ/, `euro` is on the /ʊə/ row but
 * ends with /əʊ/, `happy` is on the weak /i/ row but starts with /æ/. Asking
 * "which word is different?" about those has more than one right answer, so
 * they are asked the other way round: name the sound, and the learner picks the
 * word that contains it. The two distractors contain none of it.
 *
 * Together with `pron-vowels.ts` this covers every word the page prints
 * (`docs/decisions.md` §18). Ids are positional — append, never reorder.
 */

/** [sound key, the word being taught, two words that do not contain the sound] */
type Row = [sound: string, word: string, a: string, b: string];

const rows: Row[] = [
  // computer /ə/ — the book's own row, unstressed in every word
  ['computer', 'sister', 'black', 'six'],
  ['computer', 'actor', 'film', 'red'],
  ['computer', 'famous', 'meet', 'stop'],
  ['computer', 'about', 'book', 'ten'],
  ['computer', 'policeman', 'cook', 'bag'],
  // words whose row sound is the stressed one, but which have a weak vowel too
  ['up', 'umbrella', 'film', 'book'],
  ['boot', 'excuse', 'bag', 'stop'],
  ['bird', 'turkey', 'stop', 'bag'],
  // tourist /ʊə/ — the page calls it a very unusual sound, so learn the list
  ['tourist', 'euro', 'meet', 'stop'],
  ['tourist', 'europe', 'six', 'bag'],
  ['tourist', 'plural', 'ten', 'film'],
  // the two weak vowels the page prints as bare symbols
  ['weak-i', 'happy', 'my', 'book'],
  ['weak-i', 'angry', 'bye', 'stop'],
  ['weak-i', 'hungry', 'my', 'bag'],
  ['weak-u', 'usually', 'stop', 'bag'],
  ['weak-u', 'situation', 'ten', 'book'],
  ['weak-u', 'education', 'six', 'stop'],
];

/** The key word the book prints beside the symbol; the weak vowels have none. */
const KEY_WORD: Record<string, string> = {
  computer: 'computer', up: 'up', boot: 'boot', bird: 'bird', tourist: 'tourist',
};

/**
 * The prompt names the sound, and never the answer.
 *
 * The two weak vowels have no key word on the page, so they are pinned against
 * the long vowel they are easiest to confuse with instead.
 */
function prompt(sound: string): string {
  if (sound === 'weak-i') return 'Which word has the sound /i/ (not /iː/)?';
  if (sound === 'weak-u') return 'Which word has the sound /u/ (not /uː/)?';
  return `Which word has the sound ${SOUND_IPA[sound]} (${KEY_WORD[sound]})?`;
}

function explain(sound: string, word: string, a: string, b: string): string {
  const ipa = (w: string): string => SOUND_TABLE[w.toLowerCase()]?.[1] ?? '';
  return (
    `${word} ${ipa(word)} has ${SOUND_IPA[sound]}. ` +
    `${a} ${ipa(a)} and ${b} ${ipa(b)} do not.`
  );
}

const drafts: Draft[] = rows.map(([sound, word, a, b]) => ({
  q: prompt(sound),
  o: [word, a, b] as [string, string, string],
  a: 0 as const,
  e: explain(sound, word, a, b),
  c: `has-${sound}`,
  d: sound.startsWith('weak-') ? (3 as const) : (2 as const),
}));

export const pronVowelWords: Question[] = makeQuestions(
  {
    topicId: 'beg-p-sound-vowels',
    categoryId: 'pronunciation',
    unit: 3,
    type: 'choose-word',
    source: { book: 'SB', page: 134, ref: 'Sound Bank — vowel sounds' },
    slug: 'vwd',
  },
  drafts,
);
