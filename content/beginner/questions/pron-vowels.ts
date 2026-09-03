import type { Question } from '../../types';
import { makeQuestions, type Draft } from './build';
import { SOUND_TABLE } from './sound-table';

const SOUND_IPA: Record<string, string> = {
  fish: '/ɪ/', tree: '/iː/', cat: '/æ/', car: '/ɑː/', clock: '/ɒ/', horse: '/ɔː/',
  bull: '/ʊ/', boot: '/uː/', bird: '/ɜː/', egg: '/e/', up: '/ʌ/', train: '/eɪ/',
  phone: '/əʊ/', bike: '/aɪ/', owl: '/aʊ/', boy: '/ɔɪ/',
};

/** Each row: three words where exactly one has a different vowel sound. */
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
];

const drafts: Draft[] = vowelRows.map((words) => {
  const sounds = words.map((w) => SOUND_TABLE[w]?.[0] ?? '');
  const answer = sounds.findIndex((s, i) => sounds.filter((x) => x === s).length === 1 && i >= 0);
  const odd = sounds[answer] ?? '';
  const other = sounds.find((_, i) => i !== answer) ?? '';
  const rest = words.filter((_, i) => i !== answer).join(' and ');
  return {
    q: 'Which word has a different sound?',
    o: words as [string, string, string],
    a: answer as 0 | 1 | 2,
    e: `${words[answer]} has the sound ${SOUND_IPA[odd]} (${odd}). ${rest} both have ${SOUND_IPA[other]} (${other}).`,
    c: [odd, other].sort().join('-vs-'),
    d: 2 as const,
    sound: {
      target: odd,
      others: other,
      ipa: Object.fromEntries(words.map((w) => [w, SOUND_TABLE[w]?.[1] ?? ''])),
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
