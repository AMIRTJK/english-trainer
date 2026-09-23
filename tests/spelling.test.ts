import { describe, expect, it } from 'vitest';
import {
  alignDiff, alignLetters, checkSpelling, damerauLevenshtein, hintFor, hintsLeft, isTypo,
  normalise, summariseRound, HINTED_NOTE,
  type SpellingAnswer,
} from '@/features/vocab-learning';

describe('checkSpelling', () => {
  it('accepts the exact word', () => {
    const result = checkSpelling('beautiful', 'beautiful');
    expect(result.correct).toBe(true);
    expect(result.distance).toBe(0);
    expect(result.marks.every((m) => m.state === 'ok')).toBe(true);
  });

  it('ignores surrounding space and curly apostrophes', () => {
    expect(checkSpelling('  we’re ', "we're").correct).toBe(true);
    expect(normalise('  a   b ')).toBe('a b');
  });

  it('forgives a stray capital on an ordinary word', () => {
    const result = checkSpelling('Coffee', 'coffee');
    expect(result.correct).toBe(true);
    expect(result.caseOnly).toBe(true);
    expect(result.capitalMatters).toBe(false);
  });

  it('requires the capital the book insists on', () => {
    // SB p.117 "CAPITAL letters: Brazil NOT brazil", SB p.127 for the months.
    const result = checkSpelling('monday', 'Monday');
    expect(result.correct).toBe(false);
    expect(result.caseOnly).toBe(true);
    expect(result.capitalMatters).toBe(true);
  });

  it('counts a single wrong letter as one edit', () => {
    const result = checkSpelling('teh', 'the');
    expect(result.correct).toBe(false);
    expect(result.distance).toBeGreaterThan(0);
    expect(result.isTypo).toBe(true);
  });

  it('reports a missing letter without spoiling the rest of the word', () => {
    const result = checkSpelling('beutiful', 'beautiful');
    expect(result.correct).toBe(false);
    expect(result.marks.filter((m) => m.state === 'missing').map((m) => m.char)).toEqual(['a']);
    expect(result.marks.filter((m) => m.state === 'extra')).toHaveLength(0);
    expect(result.isTypo).toBe(true);
  });

  it('identifies completely wrong answers as not typos', () => {
    const result = checkSpelling('bathroom', 'toilet');
    expect(result.correct).toBe(false);
    expect(result.isTypo).toBe(false);
  });
});

describe('damerauLevenshtein & isTypo', () => {
  it('detects single insertion, deletion, substitution, and transposition', () => {
    expect(damerauLevenshtein('tolet', 'toilet')).toBe(1);
    expect(damerauLevenshtein('toilett', 'toilet')).toBe(1);
    expect(damerauLevenshtein('toilat', 'toilet')).toBe(1);
    expect(damerauLevenshtein('teh', 'the')).toBe(1);
  });

  it('distinguishes minor typos from completely different words', () => {
    expect(isTypo('tolet', 'toilet')).toBe(true);
    expect(isTypo('toilett', 'toilet')).toBe(true);
    expect(isTypo('teh', 'the')).toBe(true);
    expect(isTypo('bathroom', 'toilet')).toBe(false);
    expect(isTypo('abc', 'xyz')).toBe(false);
  });
});

describe('alignDiff', () => {
  it('separates typed and target letters cleanly without mashup', () => {
    const { typedMarks, targetMarks } = alignDiff('tolet', 'toilet');
    expect(typedMarks.map((m) => m.char).join('')).toBe('tolet');
    expect(typedMarks.every((m) => m.state === 'ok')).toBe(true);
    expect(targetMarks.map((m) => m.char).join('')).toBe('toilet');
    expect(targetMarks.find((m) => m.char === 'i')?.state).toBe('missing');
  });

  it('marks extra characters on typed without polluting target', () => {
    const { typedMarks, targetMarks } = alignDiff('toilett', 'toilet');
    expect(typedMarks.find((m) => m.state === 'extra')?.char).toBe('t');
    expect(targetMarks.every((m) => m.state === 'ok')).toBe(true);
  });
});

describe('alignLetters', () => {
  it('marks an extra letter as extra and keeps the shared ones', () => {
    const marks = alignLetters('sixx', 'six');
    expect(marks.filter((m) => m.state === 'ok')).toHaveLength(3);
    expect(marks.filter((m) => m.state === 'extra').map((m) => m.char)).toEqual(['x']);
  });

  it('handles a completely different answer', () => {
    const marks = alignLetters('abc', 'xyz');
    expect(marks.filter((m) => m.state === 'extra')).toHaveLength(3);
    expect(marks.filter((m) => m.state === 'missing')).toHaveLength(3);
  });

  it('reads the target back when the answer is empty', () => {
    expect(alignLetters('', 'cat').map((m) => m.char).join('')).toBe('cat');
  });
});

describe('hints', () => {
  it('reveals one more letter each time and never the whole word', () => {
    expect(hintFor('coffee', 1)).toBe('c·····');
    expect(hintFor('coffee', 3)).toBe('cof···');
    expect(hintFor('coffee', 99)).toBe('coffe·');
  });

  it('keeps spaces and hyphens visible', () => {
    expect(hintFor('t-shirt', 1)).toBe('t-·····');
  });

  it('counts down to nothing left to reveal', () => {
    expect(hintsLeft('six', 0)).toBe(2);
    expect(hintsLeft('six', 2)).toBe(0);
    expect(hintsLeft('six', 5)).toBe(0);
  });
});

describe('summariseRound', () => {
  const answer = (over: Partial<SpellingAnswer>): SpellingAnswer => ({
    word: 'monkey', ru: 'обезьяна', typed: 'monkey', correct: true, hinted: false, ...over,
  });

  it('counts only unaided correct answers as known', () => {
    const score = summariseRound([
      answer({}),
      answer({ word: 'repair', hinted: true }),
      answer({ word: 'their', typed: 'them', correct: false }),
    ]);
    expect(score.known).toBe(1);
    expect(score.unknown).toBe(2);
  });

  it('never claims a correctly spelled word was mistyped', () => {
    // The bug this test exists for: "monkey — you wrote: monkey".
    const [review] = summariseRound([answer({ hinted: true })]).review;
    expect(review?.word).toBe('monkey');
    expect(review?.typed).toBeUndefined();
    expect(review?.note).toBe(HINTED_NOTE);
  });

  it('shows what was typed when the word really was misspelled', () => {
    const [review] = summariseRound([
      answer({ word: 'unemployed', typed: 'retaired', correct: false }),
    ]).review;
    expect(review?.typed).toBe('retaired');
    expect(review?.note).toBeUndefined();
  });

  it('leaves an unaided correct answer out of the review list', () => {
    expect(summariseRound([answer({})]).review).toHaveLength(0);
  });
});
