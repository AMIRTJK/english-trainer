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

export interface LevelContent {
  meta: LevelMeta;
  units: Unit[];
  topics: Topic[];
  questions: Question[];
  /** Every word form the level is allowed to use, lowercased. */
  lexicon: ReadonlySet<string>;
}
