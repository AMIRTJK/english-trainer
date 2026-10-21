import type { LevelMeta, Unit } from '../types';

export const ELEMENTARY_LEVEL_ID = 'elementary';

export const meta: LevelMeta = {
  id: ELEMENTARY_LEVEL_ID,
  name: 'Elementary',
  order: 2,
  contentVersion: '1.0.0',
  book: "English File 4th edition Elementary (Student's Book)",
};

/** The three lesson titles of each File, as the contents page prints them (SB pp.2-3). */
const titles: Array<[number, string]> = [
  [1, 'Welcome to the class / One world / What’s your email?'],
  [2, 'Are you tidy or untidy? / Made in America / Slow down!'],
  [3, 'Britain: the good and the bad / 9 to 5 / Love me, love my dog'],
  [4, 'Family photos / From morning to night / Blue Zones'],
  [5, 'Vote for me! / A quiet life? / A city for all seasons'],
  [6, 'A North African story / The third Friday in June / Making music'],
  [7, 'Selfies / Wrong name, wrong place / Happy New Year?'],
  [8, 'A murder mystery / A house with a history / Room 333'],
  [9, '#mydinnerlastnight / White gold / Facts and figures'],
  [10, 'The most dangerous place… / Five continents in a day / The fortune teller'],
  [11, 'Culture shock / Experiences or things? / How smart is your phone?'],
  [12, 'I’ve seen it ten times! / He’s been everywhere! / The English File interview'],
];

export const units: Unit[] = titles.map(([number, title]) => ({
  id: `ele-u${number}`,
  levelId: ELEMENTARY_LEVEL_ID,
  number,
  title,
}));
