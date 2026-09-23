/**
 * Marking a typed word.
 *
 * The exam asks the learner to write the word, so the check has to be stricter
 * than a flashcard's "I knew it" — but it must also tell them *where* they went
 * wrong, which a yes/no verdict cannot. The alignment below is a plain LCS over
 * two words of at most a couple of dozen letters: it runs once per submitted
 * answer, never per keystroke (Performance.md §2).
 */

export type LetterState = 'ok' | 'extra' | 'missing';

export interface LetterMark {
  char: string;
  state: LetterState;
}

export interface SpellingResult {
  correct: boolean;
  /** The answer was right apart from a capital letter. */
  caseOnly: boolean;
  /** The target starts with a capital, so the capital is part of the spelling. */
  capitalMatters: boolean;
  typed: string;
  target: string;
  /** The typed answer aligned against the target, for letter-by-letter feedback. */
  marks: LetterMark[];
  /** How many single-letter edits away the answer was. 0 when correct. */
  distance: number;
  /** Whether the answer is a minor typo (1-2 edits) rather than a completely different word. */
  isTypo: boolean;
}

/** Straighten curly apostrophes and collapse whitespace; nothing else. */
export function normalise(value: string): string {
  return value.replace(/’/g, "'").replace(/\s+/g, ' ').trim();
}

/** Damerau-Levenshtein distance (insertions, deletions, substitutions, adjacent transpositions). */
export function damerauLevenshtein(a: string, b: string): number {
  const al = a.length;
  const bl = b.length;
  if (al === 0) return bl;
  if (bl === 0) return al;

  const d: number[][] = Array.from({ length: al + 1 }, () => new Array<number>(bl + 1).fill(0));
  for (let i = 0; i <= al; i++) d[i]![0] = i;
  for (let j = 0; j <= bl; j++) d[0]![j] = j;

  for (let i = 1; i <= al; i++) {
    for (let j = 1; j <= bl; j++) {
      const cost = a[i - 1]?.toLowerCase() === b[j - 1]?.toLowerCase() ? 0 : 1;
      d[i]![j] = Math.min(d[i - 1]![j]! + 1, d[i]![j - 1]! + 1, d[i - 1]![j - 1]! + cost);
      if (i > 1 && j > 1 && a[i - 1]?.toLowerCase() === b[j - 2]?.toLowerCase() &&
          a[i - 2]?.toLowerCase() === b[j - 1]?.toLowerCase()) {
        d[i]![j] = Math.min(d[i]![j]!, d[i - 2]![j - 2]! + 1);
      }
    }
  }
  return d[al]![bl]!;
}

/**
 * Checks whether an answer is a small typo (1-2 edits) rather than an entirely different word.
 */
export function isTypo(typed: string, target: string): boolean {
  const clean = normalise(typed).toLowerCase();
  const want = normalise(target).toLowerCase();
  if (!clean || clean === want) return false;
  const dist = damerauLevenshtein(clean, want);
  if (want.length <= 3) return dist === 1;
  return dist <= 2;
}

export interface AlignedDiff {
  typedMarks: LetterMark[];
  targetMarks: LetterMark[];
  mergedMarks: LetterMark[];
}

/**
 * Aligns typed answer against target, producing separate letter arrays for each line
 * so the learner's answer and the correct answer are never merged into one line,
 * as well as a merged array for backwards compatibility.
 */
export function alignDiff(typed: string, target: string): AlignedDiff {
  const a = [...typed];
  const b = [...target];
  const table: number[][] = Array.from({ length: a.length + 1 }, () =>
    new Array<number>(b.length + 1).fill(0),
  );

  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      const row = table[i] as number[];
      const next = table[i + 1] as number[];
      row[j] = a[i]?.toLowerCase() === b[j]?.toLowerCase()
        ? (next[j + 1] as number) + 1
        : Math.max(next[j] as number, row[j + 1] as number);
    }
  }

  const typedMarks: LetterMark[] = [];
  const targetMarks: LetterMark[] = [];
  const mergedMarks: LetterMark[] = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i]?.toLowerCase() === b[j]?.toLowerCase()) {
      const char = b[j] as string;
      typedMarks.push({ char: a[i] as string, state: 'ok' });
      targetMarks.push({ char, state: 'ok' });
      mergedMarks.push({ char, state: 'ok' });
      i += 1;
      j += 1;
    } else if ((table[i + 1]?.[j] ?? 0) >= (table[i]?.[j + 1] ?? 0)) {
      const char = a[i] as string;
      typedMarks.push({ char, state: 'extra' });
      mergedMarks.push({ char, state: 'extra' });
      i += 1;
    } else {
      const char = b[j] as string;
      targetMarks.push({ char, state: 'missing' });
      mergedMarks.push({ char, state: 'missing' });
      j += 1;
    }
  }
  while (i < a.length) {
    const char = a[i++] as string;
    typedMarks.push({ char, state: 'extra' });
    mergedMarks.push({ char, state: 'extra' });
  }
  while (j < b.length) {
    const char = b[j++] as string;
    targetMarks.push({ char, state: 'missing' });
    mergedMarks.push({ char, state: 'missing' });
  }

  return { typedMarks, targetMarks, mergedMarks };
}

/**
 * Align `typed` with `target` and mark every letter.
 *
 * Longest common subsequence: cheap at this size and, unlike a naive
 * position-by-position comparison, it survives a missing or an extra letter
 * without reporting every following letter as wrong.
 */
export function alignLetters(typed: string, target: string): LetterMark[] {
  return alignDiff(typed, target).mergedMarks;
}

/**
 * Mark one answer.
 *
 * A capital is part of the spelling whenever the book prints one — it teaches
 * "Brazil **NOT** brazil" (SB p.117) and "Months begin with a CAPITAL letter"
 * (SB p.127) — so `Monday` typed as `monday` is wrong. For an ordinary word a
 * stray capital is not an error.
 */
export function checkSpelling(typed: string, target: string): SpellingResult {
  const clean = normalise(typed);
  const want = normalise(target);
  const capitalMatters = want !== want.toLowerCase();
  const exact = clean === want;
  const sameLetters = clean.toLowerCase() === want.toLowerCase();
  const caseOnly = sameLetters && !exact;
  const marks = exact ? [...want].map((char) => ({ char, state: 'ok' as const })) : alignLetters(clean, want);

  return {
    correct: exact || (caseOnly && !capitalMatters),
    caseOnly,
    capitalMatters,
    typed: clean,
    target: want,
    marks,
    distance: marks.filter((m) => m.state !== 'ok').length,
    isTypo: isTypo(clean, want),
  };
}

/**
 * The hint the learner gets after `used` requests.
 *
 * It grows a letter at a time from the front, which is how the book's own
 * "How do you spell it?" drill works — and it never gives the whole word away.
 */
export function hintFor(target: string, used: number): string {
  const letters = [...normalise(target)];
  const shown = Math.min(used, Math.max(1, letters.length - 1));
  return letters
    .map((char, index) => (index < shown || char === ' ' || char === '-' ? char : '·'))
    .join('');
}

/** A hint has nothing left to reveal once the word is all but complete. */
export function hintsLeft(target: string, used: number): number {
  return Math.max(0, [...normalise(target)].length - 1 - used);
}

/** One answered card of a spelling round. */
export interface SpellingAnswer {
  word: string;
  ru: string;
  /** What the learner typed, already normalised. */
  typed: string;
  /** The letters were right. */
  correct: boolean;
  /** A hint was opened before answering. */
  hinted: boolean;
}

/** A word to look at again, and why. */
export interface SpellingReview {
  word: string;
  ru: string;
  /** Set only when the word was actually misspelled. */
  typed?: string;
  /** Set when the spelling was right but needed help. */
  note?: string;
}

export const HINTED_NOTE = 'spelled right, but with a hint';

/**
 * Score one round.
 *
 * Two different things send a word back: misspelling it, and needing a hint to
 * spell it. They are counted the same — neither was produced unaided, which is
 * what the exam asks for — but they are *reported* differently, because telling
 * someone "you wrote: monkey" under a word they spelled correctly is wrong.
 */
export function summariseRound(answers: readonly SpellingAnswer[]): {
  known: number;
  unknown: number;
  review: SpellingReview[];
} {
  const known = answers.filter((a) => a.correct && !a.hinted).length;
  const review = answers
    .filter((a) => !a.correct || a.hinted)
    .map((a): SpellingReview => (a.correct
      ? { word: a.word, ru: a.ru, note: HINTED_NOTE }
      : { word: a.word, ru: a.ru, typed: a.typed }));
  return { known, unknown: answers.length - known, review };
}
