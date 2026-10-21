import type { Question } from '../../types';
import { makeQuestions, type Draft } from './build';

const SRC = { book: 'SB', page: 167, ref: 'Sound Bank — consonant sounds' } as const;

/**
 * [two words with the shared sound, the odd word, shared key, odd key, IPA of the three].
 * Every word is from SB p.167. The odd word never contains the shared sound and
 * the other two never contain the odd one, so only one answer is possible
 * (checked in `tests/elementary-content.test.ts`).
 */
export type ConsonantRow = [[string, string, string], string, string, [string, string, string]];

export const consonantRows: ConsonantRow[] = [
  [['think', 'thirty', 'the'], 'thumb', 'mother', ['/θɪŋk/', '/ˈθɜːti/', '/ðə/']],
  [['bathroom', 'fourth', 'these'], 'thumb', 'mother', ['/ˈbɑːθruːm/', '/fɔːθ/', '/ðiːz/']],
  [['other', 'with', 'tenth'], 'mother', 'thumb', ['/ˈʌðə/', '/wɪð/', '/tenθ/']],
  [['then', 'that', 'theatre'], 'mother', 'thumb', ['/ðen/', '/ðæt/', '/ˈθɪətə/']],
  [['sister', 'stress', 'zoo'], 'snake', 'zebra', ['/ˈsɪstə/', '/stres/', '/zuː/']],
  [['nice', 'city', 'music'], 'snake', 'zebra', ['/naɪs/', '/ˈsɪti/', '/ˈmjuːzɪk/']],
  [['zero', 'Brazil', 'stops'], 'zebra', 'snake', ['/ˈzɪərəʊ/', '/brəˈzɪl/', '/stɒps/']],
  [['please', 'dogs', 'actress'], 'zebra', 'snake', ['/pliːz/', '/dɒgz/', '/ˈæktrəs/']],
  [['shopping', 'shoes', 'sister'], 'shower', 'snake', ['/ˈʃɒpɪŋ/', '/ʃuːz/', '/ˈsɪstə/']],
  [['sugar', 'sure', 'centre'], 'shower', 'snake', ['/ˈʃʊgə/', '/ʃʊə/', '/ˈsentə/']],
  [['revision', 'decision', 'shoes'], 'television', 'shower', ['/rɪˈvɪʒn/', '/dɪˈsɪʒn/', '/ʃuːz/']],
  [['usually', 'garage', 'fish'], 'television', 'shower', ['/ˈjuːʒuəli/', '/ˈgærɑːʒ/', '/fɪʃ/']],
  [['cheap', 'children', 'jacket'], 'chess', 'jazz', ['/tʃiːp/', '/ˈtʃɪldrən/', '/ˈdʒækɪt/']],
  [['watch', 'match', 'bridge'], 'chess', 'jazz', ['/wɒtʃ/', '/mætʃ/', '/brɪdʒ/']],
  [['picture', 'church', 'fridge'], 'chess', 'jazz', ['/ˈpɪktʃə/', '/tʃɜːtʃ/', '/frɪdʒ/']],
  [['German', 'manager', 'cheap'], 'jazz', 'chess', ['/ˈdʒɜːmən/', '/ˈmænɪdʒə/', '/tʃiːp/']],
  [['January', 'July', 'chess'], 'jazz', 'chess', ['/ˈdʒænjuəri/', '/dʒuˈlaɪ/', '/tʃes/']],
  [['kitchen', 'school', 'green'], 'key', 'girl', ['/ˈkɪtʃɪn/', '/skuːl/', '/griːn/']],
  [['black', 'back', 'big'], 'key', 'girl', ['/blæk/', '/bæk/', '/bɪg/']],
  [['eggs', 'bigger', 'Christmas'], 'girl', 'key', ['/egz/', '/ˈbɪgə/', '/ˈkrɪsməs/']],
  [['office', 'photo', 'river'], 'flower', 'vase', ['/ˈɒfɪs/', '/ˈfəʊtəʊ/', '/ˈrɪvə/']],
  [['very', 'eleven', 'wife'], 'vase', 'flower', ['/ˈveri/', '/ɪˈlevn/', '/waɪf/']],
  [['travel', 'love', 'coffee'], 'vase', 'flower', ['/ˈtrævl/', '/lʌv/', '/ˈkɒfi/']],
  [['of', 'live', 'fifteen'], 'vase', 'flower', ['/ɒv/', '/lɪv/', '/ˌfɪfˈtiːn/']],
  [['tea', 'letter', 'dance'], 'tie', 'dog', ['/tiː/', '/ˈletə/', '/dɑːns/']],
  [['bottle', 'sit', 'bad'], 'tie', 'dog', ['/ˈbɒtl/', '/sɪt/', '/bæd/']],
  [['address', 'middle', 'take'], 'dog', 'tie', ['/əˈdres/', '/ˈmɪdl/', '/teɪk/']],
  [['played', 'bad', 'liked'], 'dog', 'tie', ['/pleɪd/', '/bæd/', '/laɪkt/']],
  [['pilot', 'paper', 'job'], 'parrot', 'bag', ['/ˈpaɪlət/', '/ˈpeɪpə/', '/dʒɒb/']],
  [['apple', 'happy', 'number'], 'parrot', 'bag', ['/ˈæpl/', '/ˈhæpi/', '/ˈnʌmbə/']],
  [['table', 'hobby', 'sleep'], 'bag', 'parrot', ['/ˈteɪbl/', '/ˈhɒbi/', '/sliːp/']],
  [['window', 'wait', 'hotel'], 'witch', 'house', ['/ˈwɪndəʊ/', '/weɪt/', '/həʊˈtel/']],
  [['why', 'when', 'who'], 'witch', 'house', ['/waɪ/', '/wen/', '/huː/']],
  [['one', 'once', 'hungry'], 'witch', 'house', ['/wʌn/', '/wʌns/', '/ˈhʌŋgri/']],
  [['hall', 'head', 'Wednesday'], 'house', 'witch', ['/hɔːl/', '/hed/', '/ˈwenzdeɪ/']],
  [['yellow', 'yesterday', 'July'], 'yacht', 'jazz', ['/ˈjeləʊ/', '/ˈjestədeɪ/', '/dʒuˈlaɪ/']],
  [['use', 'university', 'jacket'], 'yacht', 'jazz', ['/juːz/', '/ˌjuːnɪˈvɜːsəti/', '/ˈdʒækɪt/']],
  [['little', 'plane', 'rice'], 'leg', 'right', ['/ˈlɪtl/', '/pleɪn/', '/raɪs/']],
  [['rich', 'try', 'small'], 'right', 'leg', ['/rɪtʃ/', '/traɪ/', '/smɔːl/']],
  [['write', 'wrong', 'spelling'], 'right', 'leg', ['/raɪt/', '/rɒŋ/', '/ˈspelɪŋ/']],
  [['summer', 'swim', 'nine'], 'monkey', 'nose', ['/ˈsʌmə/', '/swɪm/', '/naɪn/']],
  [['summer', 'swimming', 'dinner'], 'monkey', 'nose', ['/ˈsʌmə/', '/ˈswɪmɪŋ/', '/ˈdɪnə/']],
  [['know', 'ran', 'swim'], 'nose', 'monkey', ['/nəʊ/', '/ræn/', '/swɪm/']],
  [['song', 'thing', 'nine'], 'singer', 'nose', ['/sɒŋ/', '/θɪŋ/', '/naɪn/']],
  [['language', 'long', 'dinner'], 'singer', 'nose', ['/ˈlæŋgwɪdʒ/', '/lɒŋ/', '/ˈdɪnə/']],
  [['think', 'bank', 'ran'], 'singer', 'nose', ['/θɪŋk/', '/bæŋk/', '/ræn/']],
  [['going', 'thing', 'thinner'], 'singer', 'nose', ['/ˈgəʊɪŋ/', '/θɪŋ/', '/ˈθɪnə/']],
];

const LABEL: Record<string, string> = {
  thumb: '/θ/ (thumb)', mother: '/ð/ (mother)', snake: '/s/ (snake)', zebra: '/z/ (zebra)',
  shower: '/ʃ/ (shower)', television: '/ʒ/ (television)', chess: '/tʃ/ (chess)', jazz: '/dʒ/ (jazz)',
  key: '/k/ (key)', girl: '/g/ (girl)', flower: '/f/ (flower)', vase: '/v/ (vase)', tie: '/t/ (tie)',
  dog: '/d/ (dog)', parrot: '/p/ (parrot)', bag: '/b/ (bag)', witch: '/w/ (witch)', house: '/h/ (house)',
  yacht: '/j/ (yacht)', leg: '/l/ (leg)', right: '/r/ (right)', monkey: '/m/ (monkey)', nose: '/n/ (nose)',
  singer: '/ŋ/ (singer)',
};

const drafts: Draft[] = consonantRows.map(([authored, shared, odd, ipa], i) => {
  const shift = i % 3;
  const order = [0, 1, 2].map((k) => (k + 3 - shift) % 3);
  const words = order.map((k) => authored[k] as string) as [string, string, string];
  const answer = order.indexOf(2) as 0 | 1 | 2;
  return {
    q: 'Which word has a different sound?',
    o: words,
    a: answer,
    e: `${authored[2]} has the sound ${LABEL[odd]}. ${authored[0]} and ${authored[1]} have ${LABEL[shared]}.`,
    c: [odd, shared].sort().join('-vs-'),
    d: 2 as const,
    sound: {
      target: odd,
      others: shared,
      ipa: Object.fromEntries(order.map((k) => [authored[k] as string, ipa[k] as string])),
    },
  };
});

export const pronConsonants: Question[] = makeQuestions(
  { topicId: 'ele-p-sound-consonants', categoryId: 'pronunciation', unit: 1, type: 'different-sound', source: SRC, slug: 'cs' },
  drafts,
);
