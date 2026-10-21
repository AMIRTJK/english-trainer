import type { SoundType, SpellingPattern, VowelLevel, VowelSound, VowelWord } from '../types';

/**
 * Turns the transcription of a level's "Vowel sounds" page into the two lists
 * the app needs: the sounds with their spelling rules, and every word the page
 * prints, tagged with the spelling that explains it.
 *
 * The page differs from book to book (Beginner SB p.134, Elementary SB p.166),
 * the rules for reading it do not — so each level keeps its own table and this
 * builder is shared. Everything is built once at module init (Performance.md §1).
 */
export type PatternRow = [letters: string, ru: string, examples: string, magicE?: 1];

export type VowelRow = [
  key: string,
  ipa: string,
  type: SoundType,
  ru: string,
  hint: string,
  patterns: PatternRow[],
  /** The book's "! but also" column. */
  exceptions: string,
];

export interface BuiltVowelBank {
  vowelSounds: VowelSound[];
  vowelSoundByKey: ReadonlyMap<string, VowelSound>;
  vowelWords: VowelWord[];
  levelOf: (letters: string | null) => VowelLevel;
  confusableSounds: (key: string, letters: string | null) => string[];
  ambiguousWords: ReadonlySet<string>;
  isAskable: (item: VowelWord) => boolean;
}

function words(list: string): string[] {
  return list.split(/\s+/).filter(Boolean);
}

function slug(word: string): string {
  return word.toLowerCase().replace(/’/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/** Letters -> every sound they spell somewhere on the page. */
export function soundsPerLetters(sounds: VowelSound[]): Map<string, Set<string>> {
  const out = new Map<string, Set<string>>();
  for (const sound of sounds) {
    for (const pattern of sound.patterns) {
      const seen = out.get(pattern.letters) ?? new Set<string>();
      seen.add(sound.key);
      out.set(pattern.letters, seen);
    }
  }
  return out;
}

/**
 * @param levelId  the level the page belongs to
 * @param idPrefix prefix of word ids, e.g. `beg-vs`
 */
export function buildVowelBank(levelId: string, idPrefix: string, table: VowelRow[]): BuiltVowelBank {
  const vowelSounds: VowelSound[] = table.map(
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

  /**
   * How many different sounds the same letters make somewhere on the page.
   * This is the whole difficulty scale: `ee` only ever reads /iː/, so a word
   * spelled with it is guessable; `a` reads several ways, so the word has to be
   * known. Letters the book gives no rule for (`—`) are as hard as an exception.
   */
  const perLetters = soundsPerLetters(vowelSounds);

  const levelOf = (letters: string | null): VowelLevel => {
    if (letters === null || letters === '—') return 3;
    return (perLetters.get(letters)?.size ?? 1) > 1 ? 2 : 1;
  };

  const confusableSounds = (key: string, letters: string | null): string[] => {
    if (letters === null) return [];
    return [...(perLetters.get(letters) ?? [])].filter((other) => other !== key);
  };

  const makeWord = (word: string, sound: string, letters: string | null): VowelWord => ({
    id: `${idPrefix}-${slug(word)}-${sound}`,
    levelId,
    word,
    sound,
    letters,
    level: levelOf(letters),
  });

  const vowelWords: VowelWord[] = vowelSounds.flatMap((sound) => [
    ...sound.patterns.flatMap((pattern) =>
      pattern.examples.map((word) => makeWord(word, sound.key, pattern.letters)),
    ),
    ...sound.exceptions.map((word) => makeWord(word, sound.key, null)),
  ]);

  /**
   * Words the page lists under two different sounds (`window` in Beginner: its
   * `i` gives /ɪ/ and its `ow` gives /əʊ/). "Which vowel is in it?" has no
   * single answer, so such words are shown but never asked about.
   */
  const timesListed = new Map<string, number>();
  for (const item of vowelWords) {
    const key = item.word.toLowerCase();
    timesListed.set(key, (timesListed.get(key) ?? 0) + 1);
  }
  const ambiguousWords: ReadonlySet<string> = new Set(
    [...timesListed].filter(([, times]) => times > 1).map(([word]) => word),
  );

  return {
    vowelSounds,
    vowelSoundByKey: new Map(vowelSounds.map((sound) => [sound.key, sound])),
    vowelWords,
    levelOf,
    confusableSounds,
    ambiguousWords,
    isAskable: (item) => !ambiguousWords.has(item.word.toLowerCase()),
  };
}

/**
 * The words a Vowel sounds page uses to talk about sounds, rather than the
 * words it teaches: the group headings it prints and every letter string in
 * its "usual spelling" column (`ee`, `igh`, `ere`…). The Sound Bank rules test
 * shows these to the learner, so a level's lexicon must allow them. They are
 * derived from the table, never re-typed (`docs/decisions.md` §19).
 */
export function soundBankTermsOf(vowelSounds: VowelSound[]): string {
  const groupHeadings = 'vowel vowels diphthong diphthongs';
  const spellingLetters = vowelSounds
    .flatMap((sound) => sound.patterns.map((pattern) => pattern.letters))
    .filter((letters) => letters !== '—')
    .join(' ');
  return `${groupHeadings} ${spellingLetters}`;
}
