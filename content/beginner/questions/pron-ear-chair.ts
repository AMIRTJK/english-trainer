import type { Question } from '../../types';
import { makeQuestions } from './build';

export const EAR_CHAIR_IPA: Record<string, string> = {
  here: '/hɪə/', near: '/nɪə/', year: '/jɪə/', beer: '/bɪə/', "we're": '/wɪə/',
  really: '/ˈrɪəli/', idea: '/aɪˈdɪə/', cereal: '/ˈsɪəriəl/', hear: '/hɪə/',
  ear: '/ɪə/', where: '/weə/', there: '/ðeə/', their: '/ðeə/', chair: '/tʃeə/',
  airport: '/ˈeəpɔːt/', repair: '/rɪˈpeə/', careful: '/ˈkeəfl/', wear: '/weə/',
  hair: '/heə/',
};

const P = 'Which word has a different sound?';

/** [option words, index of the odd word, which sound the odd word has] */
export type EarChairRow = [[string, string, string], 0 | 1 | 2, 'ear' | 'chair'];

export const earChairRows: EarChairRow[] = [
  [['here', 'where', 'near'], 1, 'chair'],
  [['chair', 'year', 'beer'], 0, 'chair'],
  [['there', 'their', 'here'], 2, 'ear'],
  [['really', 'idea', 'wear'], 2, 'chair'],
  [['airport', 'repair', 'we’re'], 2, 'ear'],
  [['hair', 'cereal', 'careful'], 1, 'ear'],
  [['beer', 'near', 'their'], 2, 'chair'],
  [['where', 'hear', 'there'], 1, 'ear'],
  [['idea', 'chair', 'cereal'], 1, 'chair'],
  [['we’re', 'year', 'hair'], 2, 'chair'],
  [['careful', 'airport', 'beer'], 2, 'ear'],
  [['their', 'really', 'where'], 1, 'ear'],
  [['near', 'wear', 'here'], 1, 'chair'],
  [['repair', 'hear', 'chair'], 1, 'ear'],
  [['cereal', 'idea', 'there'], 2, 'chair'],
  [['hair', 'where', 'year'], 2, 'ear'],
  [['beer', 'careful', 'cereal'], 1, 'chair'],
  [['there', 'wear', 'idea'], 2, 'ear'],
  [['year', 'repair', 'we’re'], 1, 'chair'],
  [['airport', 'their', 'near'], 2, 'ear'],
  [['really', 'here', 'hair'], 2, 'chair'],
  [['chair', 'wear', 'hear'], 2, 'ear'],
  [['beer', 'idea', 'careful'], 2, 'chair'],
  [['where', 'airport', 'cereal'], 2, 'ear'],
];

const key = (w: string) => w.replace('’', "'");

export const pronEarChair: Question[] = makeQuestions(
  {
    topicId: 'beg-p-sound-ear-chair',
    categoryId: 'pronunciation',
    unit: 10,
    type: 'different-sound',
    source: { book: 'SB', page: 134, ref: 'Sound Bank — ear /ɪə/ and chair /eə/' },
    slug: 'ec',
  },
  earChairRows.map(([words, answer, odd]) => {
    const others = odd === 'ear' ? 'chair' : 'ear';
    const oddSound = odd === 'ear' ? '/ɪə/ (ear)' : '/eə/ (chair)';
    const otherSound = odd === 'ear' ? '/eə/ (chair)' : '/ɪə/ (ear)';
    const rest = words.filter((_, i) => i !== answer).join(' and ');
    return {
      q: P,
      o: words,
      a: answer,
      e: `${words[answer]} has the sound ${oddSound}. ${rest} both have ${otherSound}.`,
      c: 'ear-vs-chair',
      d: 3 as const,
      sound: {
        target: odd,
        others,
        ipa: Object.fromEntries(words.map((w) => [w, EAR_CHAIR_IPA[key(w)] ?? ''])),
      },
    };
  }),
);
