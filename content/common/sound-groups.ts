import type { SoundContrast, SoundGroup, SoundType } from '../types';

/**
 * The 44 sounds of the English File Sound Bank.
 *
 * Every level of the course prints the same chart with the same key words —
 * Beginner SB pp.134-135 and Elementary SB pp.166-167 both use fish, tree, cat…
 * through to singer and house — so the inventory is shared. What each level
 * teaches *with* it (its words, its spelling rules, its contrasts) stays in the
 * level's own folder.
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

export const soundGroups: SoundGroup[] = rows.map(([key, ipa, type, ru]) => ({ key, ipa, type, ru }));

export const soundGroupByKey: ReadonlyMap<string, SoundGroup> = new Map(
  soundGroups.map((s) => [s.key, s]),
);

/** Sound keys contrasted with `key` in a level's list of contrasts. */
export function contrastsIn(contrasts: SoundContrast[], key: string): string[] {
  const out: string[] = [];
  for (const [a, b] of contrasts) {
    if (a === key) out.push(b);
    else if (b === key) out.push(a);
  }
  return out;
}

/**
 * Vowel symbols of the chart, longest first so a diphthong is matched before
 * its first half. The two weak vowels /i/ and /u/ are not Sound Bank keys.
 */
const VOWELS: Array<[string, string]> = soundGroups
  .filter((s) => s.type !== 'consonant')
  .map((s): [string, string] => [s.ipa, s.key])
  .sort((a, b) => b[0].length - a[0].length);

/**
 * The Sound Bank key of the stressed vowel of a transcription.
 *
 * `/ˈvedʒtəblz/` → `egg`, `/ʌmˈbrelə/` → `egg`, `/sɪks/` → `fish`. The vowel
 * after the primary stress mark, or the first vowel of a word with none. Used
 * to place a word whose transcription the book prints but whose sound row it
 * does not (`docs/decisions.md` §22).
 */
export function stressedVowelKey(ipa: string): string | null {
  const bare = ipa.replace(/\//g, '');
  const mark = bare.indexOf('ˈ');
  const tail = mark >= 0 ? bare.slice(mark + 1) : bare;
  for (let i = 0; i < tail.length; i += 1) {
    for (const [symbol, key] of VOWELS) {
      if (tail.startsWith(symbol, i)) return key;
    }
  }
  return null;
}
