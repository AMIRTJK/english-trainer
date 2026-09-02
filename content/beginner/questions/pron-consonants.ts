import type { Question } from '../../types';
import { makeQuestions, type Draft } from './build';

const SRC = { book: 'SB', page: 135, ref: 'Sound Bank — consonant sounds' } as const;

/** [three words, index of the odd one, odd sound label, shared sound label, IPA per word] */
type Row = [[string, string, string], 0 | 1 | 2, string, string, [string, string, string]];

const rows: Row[] = [
  [['think', 'thanks', 'this'], 2, '/ð/ (mother)', '/θ/ (thumb)', ['/θɪŋk/', '/θæŋks/', '/ðɪs/']],
  [['father', 'the', 'birthday'], 2, '/θ/ (thumb)', '/ð/ (mother)', ['/ˈfɑːðə/', '/ðə/', '/ˈbɜːθdeɪ/']],
  [['month', 'Thursday', 'their'], 2, '/ð/ (mother)', '/θ/ (thumb)', ['/mʌnθ/', '/ˈθɜːzdeɪ/', '/ðeə/']],
  [['that', 'with', 'thing'], 2, '/θ/ (thumb)', '/ð/ (mother)', ['/ðæt/', '/wɪð/', '/θɪŋ/']],

  [['sit', 'stand', 'zero'], 2, '/z/ (zebra)', '/s/ (snake)', ['/sɪt/', '/stænd/', '/ˈzɪərəʊ/']],
  [['bags', 'cars', 'city'], 2, '/s/ (snake)', '/z/ (zebra)', ['/bægz/', '/kɑːz/', '/ˈsɪti/']],
  [['easy', 'husband', 'actress'], 2, '/s/ (snake)', '/z/ (zebra)', ['/ˈiːzi/', '/ˈhʌzbənd/', '/ˈæktrəs/']],
  [['nice', 'Swiss', 'Brazil'], 2, '/z/ (zebra)', '/s/ (snake)', ['/naɪs/', '/swɪs/', '/brəˈzɪl/']],

  [['shop', 'Spanish', 'children'], 2, '/tʃ/ (chess)', '/ʃ/ (shower)', ['/ʃɒp/', '/ˈspænɪʃ/', '/ˈtʃɪldrən/']],
  [['watch', 'match', 'finish'], 2, '/ʃ/ (shower)', '/tʃ/ (chess)', ['/wɒtʃ/', '/mætʃ/', '/ˈfɪnɪʃ/']],
  [['Japan', 'job', 'chess'], 2, '/tʃ/ (chess)', '/dʒ/ (jazz)', ['/dʒəˈpæn/', '/dʒɒb/', '/tʃes/']],
  [['juice', 'bridge', 'lunch'], 2, '/tʃ/ (chess)', '/dʒ/ (jazz)', ['/dʒuːs/', '/brɪdʒ/', '/lʌntʃ/']],
  [['sugar', 'sure', 'sit'], 2, '/s/ (snake)', '/ʃ/ (shower)', ['/ˈʃʊgə/', '/ʃɔː/', '/sɪt/']],

  [['colour', 'clock', 'green'], 2, '/g/ (girl)', '/k/ (key)', ['/ˈkʌlə/', '/klɒk/', '/griːn/']],
  [['big', 'blog', 'back'], 2, '/k/ (key)', '/g/ (girl)', ['/bɪg/', '/blɒg/', '/bæk/']],
  [['coke', 'credit', 'eggs'], 2, '/g/ (girl)', '/k/ (key)', ['/kəʊk/', '/ˈkredɪt/', '/egz/']],

  [['thing', 'single', 'nine'], 2, '/n/ (nose)', '/ŋ/ (singer)', ['/θɪŋ/', '/ˈsɪŋgl/', '/naɪn/']],
  [['going', 'doing', 'dinner'], 2, '/n/ (nose)', '/ŋ/ (singer)', ['/ˈgəʊɪŋ/', '/ˈduːɪŋ/', '/ˈdɪnə/']],
  [['men', 'fine', 'wrong'], 2, '/ŋ/ (singer)', '/n/ (nose)', ['/men/', '/faɪn/', '/rɒŋ/']],

  [['very', 'have', 'fifteen'], 2, '/f/ (flower)', '/v/ (vase)', ['/ˈveri/', '/hæv/', '/fɪfˈtiːn/']],
  [['photo', 'phone', 'have'], 2, '/v/ (vase)', '/f/ (flower)', ['/ˈfəʊtəʊ/', '/fəʊn/', '/hæv/']],
  [['office', 'different', 'live'], 2, '/v/ (vase)', '/f/ (flower)', ['/ˈɒfɪs/', '/ˈdɪfrənt/', '/lɪv/']],

  [['yellow', 'yes', 'jazz'], 2, '/dʒ/ (jazz)', '/j/ (yacht)', ['/ˈjeləʊ/', '/jes/', '/dʒæz/']],
  [['watch', 'white', 'who'], 2, '/h/ (house)', '/w/ (witch)', ['/wɒtʃ/', '/waɪt/', '/huː/']],
  [['paper', 'Poland', 'British'], 2, '/b/ (bag)', '/p/ (parrot)', ['/ˈpeɪpə/', '/ˈpəʊlənd/', '/ˈbrɪtɪʃ/']],
  [['time', 'tell', 'did'], 2, '/d/ (dog)', '/t/ (tie)', ['/taɪm/', '/tel/', '/dɪd/']],
];

const drafts: Draft[] = rows.map(([words, answer, oddLabel, otherLabel, ipa]) => {
  const rest = words.filter((_, i) => i !== answer).join(' and ');
  return {
    q: 'Which word has a different sound?',
    o: words,
    a: answer,
    e: `${words[answer]} has ${oddLabel}. ${rest} both have ${otherLabel}.`,
    c: `${otherLabel}-vs-${oddLabel}`,
    d: 3 as const,
    sound: {
      target: oddLabel,
      others: otherLabel,
      ipa: Object.fromEntries(words.map((w, i) => [w, ipa[i] ?? ''])),
    },
  };
});

export const pronConsonants: Question[] = makeQuestions(
  {
    topicId: 'beg-p-sound-consonants',
    categoryId: 'pronunciation',
    unit: 1,
    type: 'different-sound',
    source: SRC,
    slug: 'cn',
  },
  drafts,
);
