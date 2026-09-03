import type { Question } from '../../types';
import { makeQuestions, stressOption, type Draft } from './build';

/** [word, syllables, stressed index, the three option positions, IPA] */
export type StressRow = [string, string[], number, [number, number, number], string];

export const stressRows: StressRow[] = [
  ['wonderful', ['won', 'der', 'ful'], 0, [0, 1, 2], '/ˈwʌndəfl/'],
  ['detective', ['de', 'tec', 'tive'], 1, [0, 1, 2], '/dɪˈtektɪv/'],
  ['reception', ['re', 'cep', 'tion'], 1, [0, 1, 2], '/rɪˈsepʃn/'],
  ['visitor', ['vis', 'i', 'tor'], 0, [0, 1, 2], '/ˈvɪzɪtə/'],
  ['yesterday', ['yes', 'ter', 'day'], 0, [0, 1, 2], '/ˈjestədeɪ/'],
  ['expensive', ['ex', 'pen', 'sive'], 1, [0, 1, 2], '/ɪkˈspensɪv/'],
  ['beautiful', ['beau', 'ti', 'ful'], 0, [0, 1, 2], '/ˈbjuːtɪfl/'],
  ['difficult', ['dif', 'fi', 'cult'], 0, [0, 1, 2], '/ˈdɪfɪkəlt/'],
  ['important', ['im', 'por', 'tant'], 1, [0, 1, 2], '/ɪmˈpɔːtnt/'],
  ['afternoon', ['af', 'ter', 'noon'], 2, [0, 1, 2], '/ˌɑːftəˈnuːn/'],
  ['restaurant', ['res', 'tau', 'rant'], 0, [0, 1, 2], '/ˈrestrɒnt/'],
  ['umbrella', ['um', 'brel', 'la'], 1, [0, 1, 2], '/ʌmˈbrelə/'],
  ['computer', ['com', 'pu', 'ter'], 1, [0, 1, 2], '/kəmˈpjuːtə/'],
  ['September', ['Sep', 'tem', 'ber'], 1, [0, 1, 2], '/sepˈtembə/'],
  ['October', ['Oc', 'to', 'ber'], 1, [0, 1, 2], '/ɒkˈtəʊbə/'],
  ['November', ['No', 'vem', 'ber'], 1, [0, 1, 2], '/nəʊˈvembə/'],
  ['December', ['De', 'cem', 'ber'], 1, [0, 1, 2], '/dɪˈsembə/'],
  ['newspaper', ['news', 'pa', 'per'], 0, [0, 1, 2], '/ˈnjuːzpeɪpə/'],
  ['journalist', ['jour', 'na', 'list'], 0, [0, 1, 2], '/ˈdʒɜːnəlɪst/'],
  ['assistant', ['as', 'sis', 'tant'], 1, [0, 1, 2], '/əˈsɪstənt/'],
  ['policeman', ['po', 'lice', 'man'], 1, [0, 1, 2], '/pəˈliːsmən/'],
  ['factory', ['fac', 'to', 'ry'], 0, [0, 1, 2], '/ˈfæktəri/'],
  ['holiday', ['hol', 'i', 'day'], 0, [0, 1, 2], '/ˈhɒlədeɪ/'],
  ['family', ['fam', 'i', 'ly'], 0, [0, 1, 2], '/ˈfæməli/'],
  ['cinema', ['cin', 'e', 'ma'], 0, [0, 1, 2], '/ˈsɪnəmə/'],
  ['grandmother', ['grand', 'mo', 'ther'], 0, [0, 1, 2], '/ˈgrænmʌðə/'],
  ['grandfather', ['grand', 'fa', 'ther'], 0, [0, 1, 2], '/ˈgrænfɑːðə/'],
  ['potatoes', ['po', 'ta', 'toes'], 1, [0, 1, 2], '/pəˈteɪtəʊz/'],
  ['tomorrow', ['to', 'mor', 'row'], 1, [0, 1, 2], '/təˈmɒrəʊ/'],
  ['eleven', ['e', 'lev', 'en'], 1, [0, 1, 2], '/ɪˈlevn/'],
  ['unemployed', ['un', 'em', 'ployed'], 2, [0, 1, 2], '/ˌʌnɪmˈplɔɪd/'],
  ['Brazilian', ['Bra', 'zil', 'ian'], 1, [0, 1, 2], '/brəˈzɪliən/'],
  ['destination', ['des', 'ti', 'na', 'tion'], 2, [0, 2, 3], '/ˌdestɪˈneɪʃn/'],
  ['information', ['in', 'for', 'ma', 'tion'], 2, [0, 2, 3], '/ˌɪnfəˈmeɪʃn/'],
  ['reservation', ['re', 'ser', 'va', 'tion'], 2, [0, 2, 3], '/ˌrezəˈveɪʃn/'],
  ['dictionary', ['dic', 'tion', 'ar', 'y'], 0, [0, 1, 2], '/ˈdɪkʃənri/'],
  ['vegetables', ['veg', 'e', 'ta', 'bles'], 0, [0, 1, 2], '/ˈvedʒtəblz/'],
  ['receptionist', ['re', 'cep', 'tion', 'ist'], 1, [0, 1, 2], '/rɪˈsepʃənɪst/'],
  ['university', ['u', 'ni', 'ver', 'si', 'ty'], 2, [0, 1, 2], '/ˌjuːnɪˈvɜːsəti/'],
  ['economics', ['e', 'co', 'nom', 'ics'], 2, [0, 1, 2], '/ˌekəˈnɒmɪks/'],
];

const ORD = ['first', 'second', 'third', 'fourth', 'fifth'];

const drafts: Draft[] = stressRows.map(([word, syl, correct, picks, ipa]) => {
  const options = picks.map((p) => stressOption(syl, p)) as [string, string, string];
  const answer = picks.indexOf(correct) as 0 | 1 | 2;
  return {
    q: 'Which is the stressed syllable?',
    o: options,
    a: answer,
    e: `${word} ${ipa} — the stress is on the ${ORD[correct]} syllable: ${syl
      .map((s, i) => (i === correct ? s.toUpperCase() : s))
      .join('·')}.`,
    c: 'word-stress',
    d: 3 as const,
    stress: { word, syllables: syl, stressed: correct, ipa },
  };
});

export const stressWords: Question[] = makeQuestions(
  {
    topicId: 'beg-s-stress-words',
    categoryId: 'word-stress',
    unit: 2,
    type: 'word-stress',
    source: { book: 'SB', page: 116, ref: 'Vocabulary Bank — word stress' },
    slug: 'ws',
  },
  drafts,
);
