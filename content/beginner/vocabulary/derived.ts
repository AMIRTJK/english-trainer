import { SOUND_TABLE } from '../questions/sound-table';
import { consonantRows } from '../questions/pron-consonants';
import { EAR_CHAIR_IPA, earChairRows } from '../questions/pron-ear-chair';
import { vowelRows } from '../questions/pron-vowels';
import { stressRows } from '../questions/stress-words';

/**
 * Phonetic facts the repository already holds, joined into one lookup.
 *
 * Nothing here is new content: `SOUND_TABLE` gives the vowel group and IPA of
 * every Sound Bank word, the consonant question rows give consonant groups and
 * IPA, the ear/chair rows give the two diphthongs, and the stress rows give
 * syllables. The word files then only have to add a Russian translation for a
 * word that is already fully described (AGENTS.md §3, Performance.md §1: this
 * runs once at module init, never per render).
 */
export interface KnownWord {
  ipa?: string;
  /** Vowel Sound Bank key, when the Sound Bank lists the word. */
  vowel?: string;
  /** Consonant Sound Bank keys the word illustrates. */
  consonants: string[];
  syllables?: string[];
  stressed?: number;
}

const known = new Map<string, KnownWord>();

/** Normalise a headword: lowercase, curly apostrophe to straight. */
export function keyOf(word: string): string {
  return word.toLowerCase().replace(/\u2019/g, "'").trim();
}

function entry(word: string): KnownWord {
  const k = keyOf(word);
  const existing = known.get(k);
  if (existing) return existing;
  const created: KnownWord = { consonants: [] };
  known.set(k, created);
  return created;
}

function addIpa(word: string, ipa: string): void {
  if (!ipa) return;
  const e = entry(word);
  e.ipa ??= ipa;
}

/** `'/θ/ (thumb)'` -> `'thumb'`. */
function labelKey(label: string): string {
  const match = /\(([^)]+)\)/.exec(label);
  return match?.[1] ?? label;
}

for (const [word, [vowel, ipa]] of Object.entries(SOUND_TABLE)) {
  const e = entry(word);
  e.vowel ??= vowel;
  e.ipa ??= ipa;
}

for (const [words, answer, oddLabel, otherLabel, ipa] of consonantRows) {
  words.forEach((word, i) => {
    addIpa(word, ipa[i] ?? '');
    const sound = labelKey(i === answer ? oddLabel : otherLabel);
    const e = entry(word);
    if (!e.consonants.includes(sound)) e.consonants.push(sound);
  });
}

for (const [word, ipa] of Object.entries(EAR_CHAIR_IPA)) addIpa(word, ipa);

for (const [words, answer, odd] of earChairRows) {
  words.forEach((word, i) => {
    addIpa(word, EAR_CHAIR_IPA[keyOf(word)] ?? '');
    const e = entry(word);
    e.vowel ??= i === answer ? odd : odd === 'ear' ? 'chair' : 'ear';
  });
}

for (const [word, syllables, stressed, , ipa] of stressRows) {
  const e = entry(word);
  e.ipa ??= ipa;
  e.syllables ??= syllables;
  e.stressed ??= stressed;
}

/** Everything the repository already knows about a word's pronunciation. */
export const KNOWN: ReadonlyMap<string, KnownWord> = known;

/** Words that appear as an option in a "different sound" question. */
export const SOUND_TASK_WORDS: ReadonlySet<string> = new Set<string>([
  ...vowelRows.flat().map(keyOf),
  ...consonantRows.flatMap(([words]) => words.map(keyOf)),
  ...earChairRows.flatMap(([words]) => words.map(keyOf)),
]);
