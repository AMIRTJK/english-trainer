import { keyOf, type KnownWord } from '../../common/words';
import { consonantRows } from '../questions/pron-consonants';
import { vowelRows } from '../questions/pron-vowels';
import { SOUND_TABLE } from '../questions/sound-table';
import { stressRows } from '../questions/stress';

/**
 * Phonetic facts the Elementary content already holds, joined into one lookup:
 * the Vowel sounds page (row and IPA), the consonant rows (IPA and consonant
 * group) and the word-stress rows (syllables). Built once at module init.
 */
const known = new Map<string, KnownWord>();

function entry(word: string): KnownWord {
  const k = keyOf(word);
  const existing = known.get(k);
  if (existing) return existing;
  const created: KnownWord = { consonants: [] };
  known.set(k, created);
  return created;
}

for (const [word, [vowel, ipa]] of Object.entries(SOUND_TABLE)) {
  const e = entry(word);
  e.vowel ??= vowel.startsWith('weak-') ? undefined : vowel;
  e.ipa ??= ipa;
}

for (const [words, shared, odd, ipa] of consonantRows) {
  words.forEach((word, i) => {
    const e = entry(word);
    e.ipa ??= ipa[i];
    const sound = i === 2 ? odd : shared;
    if (!e.consonants.includes(sound)) e.consonants.push(sound);
  });
}

for (const [word, syllables, stressed, , ipa] of stressRows) {
  const e = entry(word);
  e.ipa ??= ipa;
  e.syllables ??= syllables;
  e.stressed ??= stressed;
}

export const KNOWN: ReadonlyMap<string, KnownWord> = known;

/** Words that appear as an option in a "different sound" question. */
export const SOUND_TASK_WORDS: ReadonlySet<string> = new Set<string>([
  ...vowelRows.flat().map(keyOf),
  ...consonantRows.flatMap(([words]) => words.map(keyOf)),
]);
