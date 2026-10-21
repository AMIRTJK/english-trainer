import type { Question } from '../../types';
import { makeQuestions, type Draft } from './build';
import { SOUND_TABLE } from './sound-table';

const SOUND_IPA: Record<string, string> = {
  fish: '/ɪ/', tree: '/iː/', cat: '/æ/', car: '/ɑː/', clock: '/ɒ/', horse: '/ɔː/',
  bull: '/ʊ/', boot: '/uː/', bird: '/ɜː/', egg: '/e/', up: '/ʌ/', train: '/eɪ/',
  phone: '/əʊ/', bike: '/aɪ/', owl: '/aʊ/', boy: '/ɔɪ/', ear: '/ɪə/', chair: '/eə/',
  computer: '/ə/', tourist: '/ʊə/', 'weak-i': '/i/', 'weak-u': '/u/',
};

/**
 * Each row: two words of one Sound Bank row, then a third word from another
 * row. Authored with the odd word last; the position is rotated below so the
 * answer is not always C.
 *
 * Every row follows the strict form of the rule in `docs/decisions.md` §18:
 * the odd word shares **no vowel at all** with either of the other two, so
 * there is exactly one defensible answer however the learner listens.
 * `tests/elementary-content.test.ts` checks this for every row.
 *
 * Never reorder or delete a row: ids are positional (AGENTS.md §2). New rows
 * go at the end.
 */
export const vowelRows: Array<[string, string, string]> = [
  // fish /ɪ/
  ['six', 'film', 'meet'], ['his', 'swim', 'eat'], ['big', 'this', 'speak'],
  ['english', 'women', 'stop'], ['busy', 'six', 'ten'],
  // tree /iː/
  ['meet', 'three', 'his'], ['eat', 'speak', 'swim'], ['me', 'we', 'my'],
  ['people', 'key', 'big'], ['police', 'niece', 'hot'],
  // cat /æ/
  ['thanks', 'flat', 'hot'], ['black', 'have', 'start'], ['japan', 'tablet', 'food'],
  // car /ɑː/
  ['party', 'start', 'cut'], ['father', 'dance', 'flat'], ['glasses', 'aunt', 'black'], ['charger', 'start', 'put'],
  // clock /ɒ/
  ['hot', 'stop', 'home'], ['coffee', 'long', 'old'], ['not', 'box', 'saw'],
  ['what', 'watch', 'talk'], ['want', 'stop', 'road'],
  // horse /ɔː/
  ['sport', 'door', 'stop'], ['talk', 'small', 'not'], ['saw', 'draw', 'box'],
  ['water', 'four', 'what'], ['bought', 'thought', 'hot'],
  // bull /ʊ/
  ['full', 'put', 'food'], ['good', 'book', 'school'], ['look', 'cook', 'blue'],
  ['could', 'would', 'do'], ['woman', 'good', 'new'],
  // boot /uː/
  ['school', 'food', 'good'], ['june', 'blue', 'book'], ['new', 'flew', 'look'],
  ['fruit', 'juice', 'full'], ['do', 'shoe', 'could'],
  // bird /ɜː/
  ['her', 'verb', 'red'], ['first', 'third', 'ten'], ['nurse', 'turn', 'help'],
  ['learn', 'work', 'yes'], ['world', 'word', 'pet'],
  // egg /e/
  ['yes', 'help', 'her'], ['ten', 'red', 'turn'], ['very', 'friend', 'first'],
  ['weather', 'breakfast', 'nurse'], ['any', 'said', 'word'],
  // up /ʌ/
  ['bus', 'lunch', 'book'], ['run', 'cut', 'put'], ['ugly', 'lucky', 'full'],
  ['come', 'son', 'could'], ['brother', 'young', 'good'], ['does', 'bus', 'cook'],
  // train /eɪ/
  ['name', 'make', 'nine'], ['rain', 'paint', 'night'], ['play', 'day', 'my'],
  ['break', 'steak', 'buy'], ['great', 'eight', 'high'], ['they', 'grey', 'why'],
  // phone /əʊ/
  ['old', 'home', 'out'], ['close', 'road', 'down'], ['toast', 'don’t', 'how'], ['slow', 'low', 'count'],
  // bike /aɪ/
  ['nine', 'twice', 'name'], ['my', 'why', 'day'], ['high', 'night', 'play'], ['buy', 'nine', 'make'],
  // owl /aʊ/
  ['out', 'how', 'old'], ['down', 'count', 'road'], ['cloudy', 'thousand', 'slow'],
  // boy /ɔɪ/
  ['coin', 'noise', 'nine'], ['toilet', 'enjoy', 'high'], ['noise', 'coin', 'buy'],
  // ear /ɪə/
  ['beer', 'here', 'hair'], ['dear', 'hear', 'pair'], ['we’re', 'here', 'their'],
  ['really', 'beer', 'stairs'], ['engineer', 'beer', 'stop'], ['idea', 'really', 'book'],
  // chair /eə/
  ['airport', 'stairs', 'here'], ['pair', 'hair', 'beer'], ['square', 'careful', 'dear'],
  ['their', 'there', 'hear'], ['wear', 'hair', 'we’re'],
  // tourist /ʊə/
  ['euro', 'europe', 'six'], ['sure', 'plural', 'flat'],
  // computer /ə/ and the two weak vowels: the odd word has none of their vowels
  ['teacher', 'umbrella', 'book'], ['famous', 'ago', 'six'], ['america', 'second', 'book'],
  ['happy', 'angry', 'book'], ['thirsty', 'happy', 'stop'],
  ['usually', 'situation', 'stop'], ['education', 'usually', 'hot'],
  ['unemployed', 'coin', 'stop'],
];

/** Words are authored as the book prints them; the table is keyed lowercase. */
const soundOf = (word: string): [string, string] | undefined =>
  SOUND_TABLE[word.toLowerCase().replace(/’/g, "'")];

/** The page prints its two weak vowels as bare symbols, so they are named by a word. */
const KEY_WORD: Record<string, string> = { 'weak-i': 'happy', 'weak-u': 'situation' };
const nameOf = (sound: string): string => KEY_WORD[sound] ?? sound;

const drafts: Draft[] = vowelRows.map((authored, i) => {
  const shift = i % 3;
  const words = authored.map((_, k) => authored[(k + 3 - shift) % 3] as string) as [string, string, string];
  const odd = soundOf(authored[2])?.[0] ?? '';
  const other = soundOf(authored[0])?.[0] ?? '';
  const answer = words.indexOf(authored[2]) as 0 | 1 | 2;
  const rest = words.filter((_, k) => k !== answer).join(' and ');
  return {
    q: 'Which word has a different sound?',
    o: words,
    a: answer,
    e: `${authored[2]} has the sound ${SOUND_IPA[odd]} (${nameOf(odd)}). `
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
    topicId: 'ele-p-sound-vowels',
    categoryId: 'pronunciation',
    unit: 1,
    type: 'different-sound',
    source: { book: 'SB', page: 166, ref: 'Sound Bank — vowel sounds' },
    slug: 'vw',
  },
  drafts,
);
