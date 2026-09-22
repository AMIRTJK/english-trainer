import type { SpellingPattern, VowelLevel, VowelSound, VowelWord } from '../../types';
import { BEGINNER_LEVEL_ID } from '../meta';
import { vowelTable } from './vowel-table';

/**
 * SB p.134 turned into the two lists the app needs: the sounds with their
 * spelling rules, and every word the page prints, tagged with the spelling that
 * explains it.
 *
 * Both are built once at module init and reused (Performance.md §1).
 */

function words(list: string): string[] {
  return list.split(/\s+/).filter(Boolean);
}

export const vowelSounds: VowelSound[] = vowelTable.map(
  ([key, ipa, type, ru, hint, patterns, exceptions]) => ({
    key,
    ipa,
    type,
    ru,
    hint,
    patterns: patterns.map(([letters, patternRu, examples, magicE]): SpellingPattern => ({
      letters,
      ru: patternRu,
      examples: words(examples),
      ...(magicE ? { magicE: true } : {}),
    })),
    exceptions: words(exceptions),
  }),
);

export const vowelSoundByKey: ReadonlyMap<string, VowelSound> = new Map(
  vowelSounds.map((sound) => [sound.key, sound]),
);

/**
 * How many different sounds the same letters make somewhere on the page.
 *
 * This is the whole difficulty scale: `ee` only ever reads /iː/, so a word
 * spelled with it is guessable; `a` reads three different ways, so the word has
 * to be known. Letters the book gives no rule for (`—`) are as hard as an
 * exception.
 */
const soundsPerLetters = new Map<string, Set<string>>();
for (const sound of vowelSounds) {
  for (const pattern of sound.patterns) {
    const seen = soundsPerLetters.get(pattern.letters) ?? new Set<string>();
    seen.add(sound.key);
    soundsPerLetters.set(pattern.letters, seen);
  }
}

export function levelOf(letters: string | null): VowelLevel {
  if (letters === null || letters === '—') return 3;
  return (soundsPerLetters.get(letters)?.size ?? 1) > 1 ? 2 : 1;
}

/** Sounds other than `key` that the same letters can spell. */
export function confusableSounds(key: string, letters: string | null): string[] {
  if (letters === null) return [];
  return [...(soundsPerLetters.get(letters) ?? [])].filter((other) => other !== key);
}

function slug(word: string): string {
  return word.toLowerCase().replace(/’/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function makeWord(word: string, sound: string, letters: string | null): VowelWord {
  return {
    id: `beg-vs-${slug(word)}-${sound}`,
    levelId: BEGINNER_LEVEL_ID,
    word,
    sound,
    letters,
    level: levelOf(letters),
  };
}

export const vowelWords: VowelWord[] = vowelSounds.flatMap((sound) => [
  ...sound.patterns.flatMap((pattern) =>
    pattern.examples.map((word) => makeWord(word, sound.key, pattern.letters)),
  ),
  ...sound.exceptions.map((word) => makeWord(word, sound.key, null)),
]);

/**
 * Words the page lists under two different sounds.
 *
 * `window` is the book's own example: the `i` gives /ɪ/ and the `ow` gives /əʊ/,
 * so it appears in both rows. Asking "which vowel is in *window*?" has no single
 * answer, so such words are shown in the word list but never used as a question.
 */
const timesListed = new Map<string, number>();
for (const item of vowelWords) {
  const key = item.word.toLowerCase();
  timesListed.set(key, (timesListed.get(key) ?? 0) + 1);
}

export const ambiguousWords: ReadonlySet<string> = new Set(
  [...timesListed].filter(([, times]) => times > 1).map(([word]) => word),
);

export function isAskable(item: VowelWord): boolean {
  return !ambiguousWords.has(item.word.toLowerCase());
}
