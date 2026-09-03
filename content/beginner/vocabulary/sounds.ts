import type { SoundContrast, SoundGroup, SoundType } from '../../types';

/**
 * The Sound Bank of English File 4th edition Beginner (SB pp.134-135).
 *
 * The key words are exactly the ones already listed in
 * `content/beginner/lexicon/pronunciation-words.ts` and used as group keys by
 * `content/beginner/questions/sound-table.ts`, so the vocabulary screen and the
 * "different sound" questions speak about the same 44 sounds.
 */
type Row = [key: string, ipa: string, type: SoundType, ru: string];

const rows: Row[] = [
  // Short vowels
  ['fish', 'ɪ', 'short-vowel', 'краткий и — между «и» и «ы»'],
  ['cat', 'æ', 'short-vowel', 'краткий открытый а/э'],
  ['clock', 'ɒ', 'short-vowel', 'краткий о с округлёнными губами'],
  ['bull', 'ʊ', 'short-vowel', 'краткий у без вытягивания губ'],
  ['egg', 'e', 'short-vowel', 'краткий э'],
  ['up', 'ʌ', 'short-vowel', 'краткий а, ближе к «а» в «пара»'],
  ['computer', 'ə', 'weak-vowel', 'нейтральный безударный звук «шва»'],
  // Long vowels
  ['tree', 'iː', 'long-vowel', 'долгий и'],
  ['car', 'ɑː', 'long-vowel', 'долгий задний а'],
  ['horse', 'ɔː', 'long-vowel', 'долгий о'],
  ['boot', 'uː', 'long-vowel', 'долгий у'],
  ['bird', 'ɜː', 'long-vowel', 'долгий ё-образный звук'],
  // Diphthongs
  ['train', 'eɪ', 'diphthong', 'дифтонг эй'],
  ['phone', 'əʊ', 'diphthong', 'дифтонг оу'],
  ['bike', 'aɪ', 'diphthong', 'дифтонг ай'],
  ['owl', 'aʊ', 'diphthong', 'дифтонг ау'],
  ['boy', 'ɔɪ', 'diphthong', 'дифтонг ой'],
  ['ear', 'ɪə', 'diphthong', 'дифтонг иэ'],
  ['chair', 'eə', 'diphthong', 'дифтонг эа'],
  ['tourist', 'ʊə', 'diphthong', 'дифтонг уэ'],
  // Consonants
  ['parrot', 'p', 'consonant', 'глухой п с придыханием'],
  ['bag', 'b', 'consonant', 'звонкий б'],
  ['key', 'k', 'consonant', 'глухой к с придыханием'],
  ['girl', 'g', 'consonant', 'звонкий г'],
  ['flower', 'f', 'consonant', 'глухой ф'],
  ['vase', 'v', 'consonant', 'звонкий в'],
  ['tie', 't', 'consonant', 'глухой т, кончик языка у альвеол'],
  ['dog', 'd', 'consonant', 'звонкий д, кончик языка у альвеол'],
  ['snake', 's', 'consonant', 'глухой с'],
  ['zebra', 'z', 'consonant', 'звонкий з'],
  ['shower', 'ʃ', 'consonant', 'мягкий ш'],
  ['television', 'ʒ', 'consonant', 'мягкий ж'],
  ['thumb', 'θ', 'consonant', 'глухой межзубный'],
  ['mother', 'ð', 'consonant', 'звонкий межзубный'],
  ['chess', 'tʃ', 'consonant', 'ч'],
  ['jazz', 'dʒ', 'consonant', 'дж'],
  ['leg', 'l', 'consonant', 'светлый л'],
  ['right', 'r', 'consonant', 'английский р без вибрации'],
  ['witch', 'w', 'consonant', 'губной у-образный'],
  ['yacht', 'j', 'consonant', 'й'],
  ['monkey', 'm', 'consonant', 'м'],
  ['nose', 'n', 'consonant', 'н'],
  ['singer', 'ŋ', 'consonant', 'носовой нг'],
  ['house', 'h', 'consonant', 'лёгкий выдох х'],
];

export const sounds: SoundGroup[] = rows.map(([key, ipa, type, ru]) => ({ key, ipa, type, ru }));

export const soundByKey: ReadonlyMap<string, SoundGroup> = new Map(
  sounds.map((s) => [s.key, s]),
);

/**
 * Every sound pair the level's "different sound" questions actually contrast.
 * `tests/vocabulary.test.ts` asserts this list stays in step with the question
 * bank, so the Vocabulary screen can never promise practice the tests do not give.
 */
export const contrasts: SoundContrast[] = [
  ['fish', 'tree'], ['cat', 'car'], ['clock', 'horse'], ['clock', 'phone'],
  ['bull', 'boot'], ['bull', 'up'], ['egg', 'bird'], ['bird', 'horse'],
  ['train', 'bike'], ['phone', 'owl'], ['phone', 'fish'], ['owl', 'up'],
  ['boy', 'clock'], ['ear', 'chair'],
  ['thumb', 'mother'], ['snake', 'zebra'], ['snake', 'shower'],
  ['shower', 'chess'], ['chess', 'jazz'], ['jazz', 'yacht'],
  ['key', 'girl'], ['nose', 'singer'], ['flower', 'vase'],
  ['witch', 'house'], ['parrot', 'bag'], ['tie', 'dog'],
];

/** Sound keys contrasted with `key` somewhere in the question bank. */
export function contrastsFor(key: string): string[] {
  const out: string[] = [];
  for (const [a, b] of contrasts) {
    if (a === key) out.push(b);
    else if (b === key) out.push(a);
  }
  return out;
}
