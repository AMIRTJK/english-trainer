/**
 * Shared content types. Framework-free: this layer must never import from src/.
 */

export type CategoryId = 'grammar' | 'vocabulary' | 'pronunciation' | 'word-stress';

export type QuestionStatus =
  | 'draft'
  | 'needs_review'
  | 'verified'
  | 'rejected'
  | 'archived';

export type QuestionType =
  | 'gap-fill'
  | 'choose-word'
  | 'odd-one-out'
  | 'response'
  | 'different-sound'
  | 'word-stress';

export interface SourceRef {
  /** SB = Student's Book, WB = Workbook. */
  book: 'SB' | 'WB';
  page: number;
  /** Human readable location, e.g. "Grammar Bank 10A". */
  ref: string;
}

export interface StressMeta {
  word: string;
  /** Syllables in order, e.g. ['won', 'der', 'ful']. */
  syllables: string[];
  /** Index of the syllable that carries the main stress. */
  stressed: number;
  ipa: string;
}

export interface SoundMeta {
  /** Sound Bank key of the odd word, e.g. 'chair'. */
  target: string;
  /** Sound Bank key shared by the two other words. */
  others: string;
  /** IPA per option word. */
  ipa: Record<string, string>;
}

export interface Question {
  id: string;
  levelId: string;
  unitId: string;
  categoryId: CategoryId;
  topicId: string;
  type: QuestionType;
  /** Sentence or instruction shown to the user. `___` marks the gap. */
  prompt: string;
  /**
   * Exactly three options as authored. For `word-stress` each option is a
   * syllable string using `|` separators with `'` before the stressed syllable,
   * e.g. `"'won|der|ful"`.
   */
  options: [string, string, string];
  /** Index of the correct option in `options` as authored. */
  answer: 0 | 1 | 2;
  explanation: string;
  source: SourceRef;
  /** Questions that test the same underlying rule share a constructId. */
  constructId: string;
  /** Set when this item is a controlled variation of another question. */
  variantOf?: string;
  difficulty: 1 | 2 | 3;
  status: QuestionStatus;
  verifiedOn?: string;
  stress?: StressMeta;
  sound?: SoundMeta;
}

export interface Topic {
  id: string;
  levelId: string;
  categoryId: CategoryId;
  unitId: string;
  title: string;
  /** Short description of what the topic tests. */
  summary: string;
}

export interface Unit {
  id: string;
  levelId: string;
  number: number;
  title: string;
}

export interface LevelMeta {
  id: string;
  name: string;
  order: number;
  /** Bumped whenever the question bank changes in a user-visible way. */
  contentVersion: string;
  book: string;
}


/** How a Sound Bank sound behaves, used for grouping in the UI. */
export type SoundType =
  | 'short-vowel'
  | 'long-vowel'
  | 'diphthong'
  | 'weak-vowel'
  | 'consonant';

/** One Sound Bank entry, e.g. `cat /æ/`. */
export interface SoundGroup {
  /** Sound Bank key word, e.g. 'cat'. Stable id used everywhere. */
  key: string;
  /** Bare IPA symbol without slashes, e.g. 'æ'. */
  ipa: string;
  type: SoundType;
  /** Short Russian description of the sound. */
  ru: string;
}

/** A pair of sounds the book asks the learner to tell apart. */
export type SoundContrast = [string, string];

/**
 * One vocabulary item. The word list is not a second, independent dictionary:
 * it is the book vocabulary already held in `content/<level>/`, joined with a
 * Russian gloss. See `docs/decisions.md` §6.
 */
export interface VocabWord {
  /** Stable id, e.g. `beg-w-coffee`. Never renumbered — progress refers to it. */
  id: string;
  levelId: string;
  word: string;
  /** Russian translation. */
  ru: string;
  /** Full IPA of the word, with slashes, e.g. `/ˈkɒfi/`. */
  ipa: string;
  unitId: string;
  /** Vocabulary or pronunciation topic this word belongs to. */
  topicId: string;
  /** Primary Sound Bank key — the sound the book teaches this word for. */
  sound: string;
  /** Further Sound Bank keys the word illustrates (usually consonants). */
  also: string[];
  /** Syllables, when the book teaches this word's stress. */
  syllables?: string[];
  /** Index of the stressed syllable, when known. */
  stressed?: number;
  /** True when the word is used in a "different sound" question. */
  inSoundTask: boolean;
}

export interface VocabularyBank {
  levelId: string;
  sounds: SoundGroup[];
  contrasts: SoundContrast[];
  words: VocabWord[];
}

export interface LevelContent {
  meta: LevelMeta;
  units: Unit[];
  topics: Topic[];
  questions: Question[];
  /** Every word form the level is allowed to use, lowercased. */
  lexicon: ReadonlySet<string>;
  /** The studied word list. Absent while a level has no vocabulary data yet. */
  vocabulary?: VocabularyBank;
}
