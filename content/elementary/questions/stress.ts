import type { Question } from '../../types';
import { makeQuestions, stressOption, type Draft } from './build';

/**
 * [word, syllables, stressed index, the three option positions, IPA].
 * The stress is the one the book marks — underlined in the Vocabulary Bank
 * (pp.148-164), in the lessons and in the Revise and Check pages — and it
 * agrees with the ˈ of the transcription.
 */
export type StressRow = [string, string[], number, [number, number, number], string];

const ALL: [number, number, number] = [0, 1, 2];

export const stressRows: StressRow[] = [
  ['yesterday', ['yes', 'ter', 'day'], 0, ALL, '/ˈjestədeɪ/'],
  ['expensive', ['ex', 'pen', 'sive'], 1, ALL, '/ɪkˈspensɪv/'],
  ['sunglasses', ['sun', 'glass', 'es'], 0, ALL, '/ˈsʌnglɑːsɪz/'],
  ['umbrella', ['um', 'brel', 'la'], 1, ALL, '/ʌmˈbrelə/'],
  ['dictionary', ['dic', 'tion', 'ar', 'y'], 0, ALL, '/ˈdɪkʃənri/'],
  ['magazine', ['mag', 'a', 'zine'], 2, ALL, '/mægəˈziːn/'],
  ['newspaper', ['news', 'pa', 'per'], 0, ALL, '/ˈnjuːzpeɪpə/'],
  ['identity', ['i', 'den', 'ti', 'ty'], 1, ALL, '/aɪˈdentəti/'],
  ['beautiful', ['beau', 'ti', 'ful'], 0, ALL, '/ˈbjuːtɪfl/'],
  ['difficult', ['dif', 'fi', 'cult'], 0, ALL, '/ˈdɪfɪkəlt/'],
  ['dangerous', ['dan', 'ger', 'ous'], 0, ALL, '/ˈdeɪndʒərəs/'],
  ['fantastic', ['fan', 'tas', 'tic'], 1, ALL, '/fænˈtæstɪk/'],
  ['terrible', ['ter', 'ri', 'ble'], 0, ALL, '/ˈterəbl/'],
  ['animals', ['an', 'i', 'mals'], 0, ALL, '/ˈænɪmlz/'],
  ['cinema', ['cin', 'e', 'ma'], 0, ALL, '/ˈsɪnəmə/'],
  ['vegetables', ['veg', 'e', 'ta', 'bles'], 0, ALL, '/ˈvedʒtəblz/'],
  ['accountant', ['ac', 'count', 'ant'], 1, ALL, '/əˈkaʊntənt/'],
  ['administrator', ['ad', 'min', 'is', 'tra', 'tor'], 1, ALL, '/ədˈmɪnɪstreɪtə/'],
  ['architect', ['ar', 'chi', 'tect'], 0, ALL, '/ˈɑːkɪtekt/'],
  ['engineer', ['en', 'gi', 'neer'], 2, ALL, '/endʒɪˈnɪə/'],
  ['hairdresser', ['hair', 'dress', 'er'], 0, ALL, '/ˈheədresə/'],
  ['journalist', ['jour', 'nal', 'ist'], 0, ALL, '/ˈdʒɜːnəlɪst/'],
  ['musician', ['mu', 'si', 'cian'], 1, ALL, '/mjuˈzɪʃn/'],
  ['receptionist', ['re', 'cep', 'tion', 'ist'], 1, ALL, '/rɪˈsepʃənɪst/'],
  ['assistant', ['as', 'sis', 'tant'], 1, ALL, '/əˈsɪstənt/'],
  ['grandmother', ['grand', 'moth', 'er'], 0, ALL, '/ˈgrænmʌðə/'],
  ['grandparents', ['grand', 'par', 'ents'], 0, ALL, '/ˈgrænpeərənts/'],
  ['Saturday', ['Sat', 'ur', 'day'], 0, ALL, '/ˈsætədeɪ/'],
  ['September', ['Sep', 'tem', 'ber'], 1, ALL, '/sepˈtembə/'],
  ['October', ['Oc', 'to', 'ber'], 1, ALL, '/ɒkˈtəʊbə/'],
  ['November', ['No', 'vem', 'ber'], 1, ALL, '/nəʊˈvembə/'],
  ['December', ['De', 'cem', 'ber'], 1, ALL, '/dɪˈsembə/'],
  ['January', ['Jan', 'u', 'ar', 'y'], 0, ALL, '/ˈdʒænjuəri/'],
  ['February', ['Feb', 'ru', 'ar', 'y'], 0, ALL, '/ˈfebruəri/'],
  ['Italian', ['I', 'tal', 'ian'], 1, ALL, '/ɪˈtælɪən/'],
  ['Japanese', ['Jap', 'a', 'nese'], 2, ALL, '/dʒæpəˈniːz/'],
  ['Hungarian', ['Hun', 'gar', 'i', 'an'], 1, ALL, '/hʌŋˈgeərɪən/'],
  ['Argentina', ['Ar', 'gen', 'ti', 'na'], 2, ALL, '/ɑːdʒənˈtiːnə/'],
  ['Australia', ['Aus', 'tra', 'li', 'a'], 1, ALL, '/ɒˈstreɪlɪə/'],
  ['Brazilian', ['Bra', 'zil', 'ian'], 1, ALL, '/brəˈzɪlɪən/'],
  ['Mexican', ['Mex', 'i', 'can'], 0, ALL, '/ˈmeksɪkən/'],
  ['Germany', ['Ger', 'ma', 'ny'], 0, ALL, '/ˈdʒɜːməni/'],
  ['Egyptian', ['E', 'gyp', 'tian'], 1, ALL, '/iˈdʒɪpʃn/'],
  ['European', ['Eu', 'ro', 'pe', 'an'], 2, ALL, '/jʊərəˈpiːən/'],
  ['America', ['A', 'mer', 'i', 'ca'], 1, ALL, '/əˈmerɪkə/'],
  ['banana', ['ba', 'na', 'na'], 1, ALL, '/bəˈnɑːnə/'],
  ['potatoes', ['po', 'ta', 'toes'], 1, ALL, '/pəˈteɪtəʊz/'],
  ['tomatoes', ['to', 'ma', 'toes'], 1, ALL, '/təˈmɑːtəʊz/'],
  ['pineapple', ['pine', 'ap', 'ple'], 0, ALL, '/ˈpaɪnæpl/'],
  ['strawberries', ['straw', 'ber', 'ries'], 0, ALL, '/ˈstrɔːbəriz/'],
  ['chocolate', ['choc', 'o', 'late'], 0, ALL, '/ˈtʃɒklət/'],
  ['supermarket', ['su', 'per', 'mar', 'ket'], 0, ALL, '/ˈsuːpəmɑːkɪt/'],
  ['interesting', ['in', 'ter', 'est', 'ing'], 0, ALL, '/ˈɪntrəstɪŋ/'],
  ['hospital', ['hos', 'pi', 'tal'], 0, ALL, '/ˈhɒspɪtl/'],
  ['museum', ['mu', 'se', 'um'], 1, ALL, '/mjuˈziːəm/'],
  ['department', ['de', 'part', 'ment'], 1, ALL, '/dɪˈpɑːtmənt/'],
  ['cathedral', ['ca', 'the', 'dral'], 1, ALL, '/kəˈθiːdrəl/'],
  ['synagogue', ['syn', 'a', 'gogue'], 0, ALL, '/ˈsɪnəgɒg/'],
  ['pharmacy', ['phar', 'ma', 'cy'], 0, ALL, '/ˈfɑːməsi/'],
  ['gallery', ['gal', 'ler', 'y'], 0, ALL, '/ˈgæləri/'],
  ['computer', ['com', 'pu', 'ter'], 1, ALL, '/kəmˈpjuːtə/'],
  ['internet', ['in', 'ter', 'net'], 0, ALL, '/ˈɪntənet/'],
  ['university', ['u', 'ni', 'ver', 'si', 'ty'], 2, ALL, '/ˌjuːnɪˈvɜːsəti/'],
  ['policeman', ['po', 'lice', 'man'], 1, ALL, '/pəˈliːsmən/'],
  ['unemployed', ['un', 'em', 'ployed'], 2, ALL, '/ˌʌnɪmˈplɔɪd/'],
  ['remember', ['re', 'mem', 'ber'], 1, ALL, '/rɪˈmembə/'],
  ['fiftieth', ['fif', 'ti', 'eth'], 0, ALL, '/ˈfɪftiəθ/'],
  ['saxophone', ['sax', 'o', 'phone'], 0, ALL, '/ˈsæksəfəʊn/'],
  ['pianist', ['pi', 'a', 'nist'], 0, ALL, '/ˈpiːənɪst/'],
  ['violin', ['vi', 'o', 'lin'], 2, ALL, '/vaɪəˈlɪn/'],
  ['accordion', ['ac', 'cor', 'di', 'on'], 1, ALL, '/əˈkɔːdiən/'],
  ['guitarist', ['gui', 'tar', 'ist'], 1, ALL, '/gɪˈtɑːrɪst/'],
  ['scientist', ['sci', 'en', 'tist'], 0, ALL, '/ˈsaɪəntɪst/'],
  ['dishwasher', ['dish', 'wash', 'er'], 0, ALL, '/ˈdɪʃwɒʃə/'],
  ['microwave', ['mi', 'cro', 'wave'], 0, ALL, '/ˈmaɪkrəweɪv/'],
  ['balcony', ['bal', 'co', 'ny'], 0, ALL, '/ˈbælkəni/'],
  ['politely', ['po', 'lite', 'ly'], 1, ALL, '/pəˈlaɪtli/'],
  ['dangerously', ['dan', 'ger', 'ous', 'ly'], 0, ALL, '/ˈdeɪndʒərəsli/'],
  ['attachment', ['at', 'tach', 'ment'], 1, ALL, '/əˈtætʃmənt/'],
  ['comfortable', ['com', 'for', 'ta', 'ble'], 0, ALL, '/ˈkʌmftəbl/'],
  ['favourite', ['fa', 'vour', 'ite'], 0, ALL, '/ˈfeɪvərɪt/'],
  ['holiday', ['hol', 'i', 'day'], 0, ALL, '/ˈhɒlədeɪ/'],
  ['important', ['im', 'por', 'tant'], 1, ALL, '/ɪmˈpɔːtnt/'],
  ['tomorrow', ['to', 'mor', 'row'], 1, ALL, '/təˈmɒrəʊ/'],
  ['eleven', ['e', 'lev', 'en'], 1, ALL, '/ɪˈlevn/'],
  ['afternoon', ['af', 'ter', 'noon'], 2, ALL, '/ˌɑːftəˈnuːn/'],
  ['together', ['to', 'geth', 'er'], 1, ALL, '/təˈgeðə/'],
  ['celebrate', ['cel', 'e', 'brate'], 0, ALL, '/ˈselɪbreɪt/'],
  ['delicious', ['de', 'li', 'cious'], 1, ALL, '/dɪˈlɪʃəs/'],
  ['amazing', ['a', 'ma', 'zing'], 1, ALL, '/əˈmeɪzɪŋ/'],
  ['popular', ['pop', 'u', 'lar'], 0, ALL, '/ˈpɒpjələ/'],
  ['traditional', ['tra', 'di', 'tion', 'al'], 1, ALL, '/trəˈdɪʃənl/'],
];

const ORD = ['first', 'second', 'third', 'fourth', 'fifth'];

const wordDrafts: Draft[] = stressRows.map(([word, syl, correct, picks, ipa]) => {
  const options = picks.map((p) => stressOption(syl, p)) as [string, string, string];
  return {
    q: 'Which is the stressed syllable?',
    o: options,
    a: picks.indexOf(correct) as 0 | 1 | 2,
    e: `${word} ${ipa} — the stress is on the ${ORD[correct]} syllable: ${syl
      .map((s, i) => (i === correct ? s.toUpperCase() : s))
      .join('·')}.`,
    c: 'word-stress',
    d: 3 as const,
    stress: { word, syllables: syl, stressed: correct, ipa },
  };
});

/** Two-syllable contrasts: VB p.148 (13 / 30) and lesson 10C (80% are stressed on the first). */
const P = (o: [string, string, string], a: 0 | 1 | 2, e: string, c: string): Draft =>
  ({ q: 'Which word has a different stress pattern?', o, a, e, c, d: 3 });

const patternDrafts: Draft[] = [
  P(['thirteen', 'thirty', 'forty'], 0, 'thirTEEN is stressed on the second syllable; THIRty and FORty on the first.', 'teens-vs-tens'),
  P(['fifty', 'fifteen', 'sixty'], 1, 'fifTEEN is stressed on the second syllable; FIFty and SIXty on the first.', 'teens-vs-tens'),
  P(['eighteen', 'nineteen', 'ninety'], 2, 'NINEty is stressed on the first syllable; eighTEEN and nineTEEN on the second.', 'teens-vs-tens'),
  P(['seventy', 'fourteen', 'sixteen'], 0, 'SEVenty is stressed on the first syllable; fourTEEN and sixTEEN on the second.', 'teens-vs-tens'),
  P(['eighty', 'seventeen', 'twenty'], 1, 'sevenTEEN is stressed on the last syllable; EIGHty and TWENty on the first.', 'teens-vs-tens'),
  P(['argue', 'money', 'believe'], 2, 'beLIEVE is stressed on the second syllable; ARgue and MOney on the first.', 'two-syllable'),
  P(['idea', 'lucky', 'problem'], 0, 'iDEA is stressed on the second syllable; LUCky and PROblem on the first.', 'two-syllable'),
  P(['travel', 'surprise', 'worry'], 1, 'surPRISE is stressed on the second syllable; TRAvel and WOrry on the first.', 'two-syllable'),
  P(['future', 'fortune', 'today'], 2, 'toDAY is stressed on the second syllable; FUture and FORtune on the first.', 'two-syllable'),
  P(['July', 'August', 'April'], 0, 'juLY is stressed on the second syllable; AUgust and April on the first.', 'months'),
  P(['China', 'Japan', 'Turkey'], 1, 'jaPAN is stressed on the second syllable; CHIna and TURkey on the first.', 'countries'),
  P(['Poland', 'Egypt', 'Brazil'], 2, 'braZIL is stressed on the second syllable; POland and Egypt on the first.', 'countries'),
  P(['Chinese', 'Russian', 'Polish'], 0, 'chiNESE is stressed on the second syllable; RUSsian and POlish on the first.', 'countries'),
  P(['sandwich', 'ago', 'pizza'], 1, 'aGO is stressed on the second syllable; SANDwich and PIzza on the first.', 'two-syllable'),
  P(['pasta', 'salad', 'hotel'], 2, 'hoTEL is stressed on the second syllable; PASta and SAlad on the first.', 'two-syllable'),
  P(['dessert', 'coffee', 'salad'], 0, 'deSSERT is stressed on the second syllable; COffee and SAlad on the first.', 'two-syllable'),
  P(['website', 'decide', 'airport'], 1, 'deCIDE is stressed on the second syllable; WEBsite and AIRport on the first.', 'two-syllable'),
  P(['shower', 'dinner', 'relax'], 2, 'reLAX is stressed on the second syllable; SHOWer and DInner on the first.', 'two-syllable'),
  P(['because', 'dentist', 'Monday'], 0, 'beCAUSE is stressed on the second syllable; DENtist and MONday on the first.', 'two-syllable'),
  P(['tennis', 'guitar', 'music'], 1, 'guiTAR is stressed on the second syllable; TEnnis and MUsic on the first.', 'two-syllable'),
  P(['address', 'between', 'sister'], 2, 'SISter is stressed on the first syllable; aDDRESS and beTWEEN on the second.', 'two-syllable'),
];

export const stressWords: Question[] = makeQuestions(
  { topicId: 'ele-s-stress-words', categoryId: 'word-stress', unit: 1, type: 'word-stress',
    source: { book: 'SB', page: 148, ref: 'Vocabulary Bank — word stress' }, slug: 'ws' },
  wordDrafts,
);

export const stressPatterns: Question[] = makeQuestions(
  { topicId: 'ele-s-stress-patterns', categoryId: 'word-stress', unit: 1, type: 'odd-one-out',
    source: { book: 'SB', page: 82, ref: 'Vocabulary Bank p.148 and lesson 10C — word stress' }, slug: 'sp' },
  patternDrafts,
);
