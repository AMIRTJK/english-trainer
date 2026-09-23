import type { Question } from '../../types';
import { makeQuestions, type Draft } from './build';
import { SOUND_TABLE } from './sound-table';

const SOUND_IPA: Record<string, string> = {
  fish: '/ɪ/', tree: '/iː/', cat: '/æ/', car: '/ɑː/', clock: '/ɒ/', horse: '/ɔː/',
  bull: '/ʊ/', boot: '/uː/', bird: '/ɜː/', egg: '/e/', up: '/ʌ/', train: '/eɪ/',
  phone: '/əʊ/', bike: '/aɪ/', owl: '/aʊ/', boy: '/ɔɪ/',
  computer: '/ə/', tourist: '/ʊə/', 'weak-i': '/i/', 'weak-u': '/u/',
};

/**
 * Each row: three words where exactly one has a different vowel sound. This is
 * the only format the test uses — it is the format of the exam paper.
 *
 * A word with more than one vowel (`sister` is /ɪ/ + /ə/) is fair game, but
 * only in a row built to the rule in `docs/decisions.md` §18: the two matching
 * words share the row's sound, and the odd word shares **no** vowel with
 * either. Without that, "which is different?" has a second defensible answer —
 * pair `sister` with `actor` against `six` and the learner can just as well say
 * *actor*, because `six` and `sister` both have /ɪ/.
 *
 * Never reorder or delete a row: ids are positional (AGENTS.md §2). New rows go
 * at the end.
 */
export const vowelRows: Array<[string, string, string]> = [
  ['six', 'three', 'film'], ['please', 'meet', 'window'], ['she', 'we', 'gym'],
  ['bag', 'park', 'black'], ['father', 'fast', 'thanks'], ['man', 'bad', 'are'],
  ['not', 'stop', 'no'], ['sorry', 'coffee', 'open'], ['watch', 'want', 'coat'],
  ['short', 'tall', 'stop'], ['four', 'water', 'not'], ['football', 'draw', 'from'],
  ['good', 'book', 'food'], ['look', 'cook', 'blue'], ['full', 'could', 'two'],
  ['too', 'juice', 'sugar'], ['new', 'beautiful', 'woman'], ['you', 'shoes', 'good'],
  ['person', 'girl', 'red'], ['nurse', 'work', 'seven'], ['thirsty', 'word', 'friend'],
  ['spell', 'ten', 'girl'], ['bread', 'breakfast', 'world'], ['twenty', 'mexico', 'verb'],
  ['number', 'brush', 'book'], ['husband', 'son', 'good'], ['brother', 'young', 'woman'],
  ['name', 'late', 'nice'], ['day', 'say', 'my'], ['eight', 'great', 'night'],
  ['open', 'coat', 'out'], ['hello', 'photo', 'town'], ['close', 'old', 'house'],
  ['hi', 'bye', 'day'], ['night', 'white', 'grey'], ['buy', 'wife', 'email'],
  ['out', 'down', 'no'], ['house', 'brown', 'photo'], ['pound', 'sound', 'old'],
  ['toilet', 'noise', 'not'], ['boyfriend', 'enjoy', 'coffee'],
  ['three', 'people', 'six'], ['key', 'cheese', 'is'], ['italy', 'it', 'read'],
  ['cap', 'hat', 'car'], ['bar', 'afternoon', 'that'], ['door', 'important', 'job'],
  ['shirt', 'skirt', 'short'], ['go', 'photo', 'gym'], ['brown', 'shower', 'brother'],
  // Page words the test used to skip (docs/decisions.md §18).
  ['english', 'women', 'three'], ['what', 'want', 'no'], ['but', 'brush', 'book'],
  ['spain', 'they', 'six'], ['I', 'right', 'meet'], ['sure', 'four', 'short'],
  // The rows the page prints with a second, weak vowel. The odd word shares no
  // vowel at all with the other two, so only one answer is defensible.
  ['sister', 'actor', 'book'], ['famous', 'about', 'six'],
  ['policeman', 'famous', 'book'], ['umbrella', 'brush', 'book'],
  ['excuse', 'food', 'bag'], ['turkey', 'girl', 'stop'],
  ['euro', 'plural', 'six'], ['europe', 'sure', 'bag'],
  ['happy', 'angry', 'book'], ['hungry', 'happy', 'stop'],
  ['usually', 'situation', 'stop'], ['education', 'situation', 'bag'],
];

/** Words are authored as the book prints them; the table is keyed lowercase. */
const soundOf = (word: string): [string, string] | undefined => SOUND_TABLE[word.toLowerCase()];

/**
 * The key word an explanation names the sound by. The page prints its two weak
 * vowels as bare symbols, so those are named by one of their own words rather
 * than by the internal key.
 */
const KEY_WORD: Record<string, string> = { 'weak-i': 'happy', 'weak-u': 'situation' };
const nameOf = (sound: string): string => KEY_WORD[sound] ?? sound;

const drafts: Draft[] = vowelRows.map((words) => {
  const sounds = words.map((w) => soundOf(w)?.[0] ?? '');
  const answer = sounds.findIndex((s, i) => sounds.filter((x) => x === s).length === 1 && i >= 0);
  const odd = sounds[answer] ?? '';
  const other = sounds.find((_, i) => i !== answer) ?? '';
  const rest = words.filter((_, i) => i !== answer).join(' and ');
  return {
    q: 'Which word has a different sound?',
    o: words as [string, string, string],
    a: answer as 0 | 1 | 2,
    e: `${words[answer]} has the sound ${SOUND_IPA[odd]} (${nameOf(odd)}). `
      + `${rest} both have ${SOUND_IPA[other]} (${nameOf(other)}).`,
    c: [odd, other].sort().join('-vs-'),
    d: 2 as const,
    sound: {
      target: odd,
      others: other,
      ipa: Object.fromEntries(words.map((w) => [w, soundOf(w)?.[1] ?? ''])),
    },
  };
});

export const pronVowels: Question[] = makeQuestions(
  {
    topicId: 'beg-p-sound-vowels',
    categoryId: 'pronunciation',
    unit: 3,
    type: 'different-sound',
    source: { book: 'SB', page: 134, ref: 'Sound Bank — vowel sounds' },
    slug: 'vw',
  },
  drafts,
);
