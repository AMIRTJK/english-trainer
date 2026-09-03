import { describe, expect, it } from 'vitest';
import type { VocabWord } from '@content/types';
import { createLevelProgress, recordAnswer } from '@/entities/vocab';
import { countScope, selectWords } from '@/features/vocab-learning';

const NOW = new Date('2026-09-03T09:00:00.000Z');

function word(id: string, overrides: Partial<VocabWord> = {}): VocabWord {
  return {
    id,
    levelId: 'beginner',
    word: id,
    ru: 'слово',
    ipa: '/w/',
    unitId: 'beg-u1',
    topicId: 'beg-v-classroom',
    sound: 'cat',
    also: [],
    inSoundTask: false,
    ...overrides,
  };
}

const WORDS: VocabWord[] = [
  word('a'),
  word('b', { sound: 'tree' }),
  word('c', { unitId: 'beg-u2', topicId: 'beg-v-numbers', sound: 'egg' }),
  word('d', { sound: 'car', inSoundTask: true }),
  word('e', { sound: 'cat', also: ['thumb'] }),
];

describe('selectWords', () => {
  it('puts missed words before due words and both before new ones', () => {
    const progress = createLevelProgress('beginner');
    recordAnswer(progress, 'b', ['tree'], true, new Date('2026-08-01T09:00:00.000Z'));
    recordAnswer(progress, 'c', ['egg'], false, NOW);

    const picked = selectWords(WORDS, progress, { scope: { kind: 'all' }, now: NOW, seed: 7 });
    expect(picked[0]?.id).toBe('c');
    expect(picked[1]?.id).toBe('b');
    expect(picked.slice(2).map((w) => w.id).sort()).toEqual(['a', 'd', 'e']);
  });

  it('respects the session limit', () => {
    const progress = createLevelProgress('beginner');
    const picked = selectWords(WORDS, progress, {
      scope: { kind: 'all' }, now: NOW, seed: 3, limit: 2,
    });
    expect(picked).toHaveLength(2);
  });

  it('keeps words that share a sound next to each other', () => {
    const progress = createLevelProgress('beginner');
    const picked = selectWords(WORDS, progress, { scope: { kind: 'all' }, now: NOW, seed: 11 });
    const catPositions = picked
      .map((w, i) => (w.sound === 'cat' ? i : -1))
      .filter((i) => i >= 0);
    expect(catPositions[1]! - catPositions[0]!).toBe(1);
  });

  it('is deterministic for a given seed', () => {
    const progress = createLevelProgress('beginner');
    const options = { scope: { kind: 'all' } as const, now: NOW, seed: 42 };
    expect(selectWords(WORDS, progress, options).map((w) => w.id))
      .toEqual(selectWords(WORDS, progress, options).map((w) => w.id));
  });

  it('filters by unit, topic and sound', () => {
    const progress = createLevelProgress('beginner');
    const ids = (scope: Parameters<typeof selectWords>[2]['scope']): string[] =>
      selectWords(WORDS, progress, { scope, now: NOW, seed: 1 }).map((w) => w.id);

    expect(ids({ kind: 'unit', unitId: 'beg-u2' })).toEqual(['c']);
    expect(ids({ kind: 'topic', topicId: 'beg-v-numbers' })).toEqual(['c']);
    expect(ids({ kind: 'sound', sound: 'cat' }).sort()).toEqual(['a', 'e']);
    expect(ids({ kind: 'sound', sound: 'thumb' })).toEqual(['e']);
    expect(ids({ kind: 'sound-task' })).toEqual(['d']);
  });

  it('includes the sounds a sound is contrasted with', () => {
    const progress = createLevelProgress('beginner');
    const picked = selectWords(WORDS, progress, {
      scope: { kind: 'contrast', sound: 'cat' },
      now: NOW,
      seed: 1,
      contrastsFor: (sound) => (sound === 'cat' ? ['car'] : []),
    });
    expect(picked.map((w) => w.id).sort()).toEqual(['a', 'd', 'e']);
  });

  it('only revises words that were studied when the scope is review', () => {
    const progress = createLevelProgress('beginner');
    recordAnswer(progress, 'a', ['cat'], false, NOW);
    const picked = selectWords(WORDS, progress, { scope: { kind: 'review' }, now: NOW, seed: 1 });
    expect(picked.map((w) => w.id)).toEqual(['a']);
  });

  it('offers learned words again only when asked for', () => {
    const progress = createLevelProgress('beginner');
    for (const item of WORDS) {
      recordAnswer(progress, item.id, [item.sound], true, NOW);
      recordAnswer(progress, item.id, [item.sound], true, NOW);
    }
    expect(selectWords(WORDS, progress, { scope: { kind: 'all' }, now: NOW, seed: 1 }))
      .toHaveLength(0);
    expect(selectWords(WORDS, progress, {
      scope: { kind: 'all' }, now: NOW, seed: 1, includeKnown: true,
    })).toHaveLength(WORDS.length);
  });
});

describe('countScope', () => {
  it('counts each bucket of the selection', () => {
    const progress = createLevelProgress('beginner');
    recordAnswer(progress, 'a', ['cat'], false, NOW);
    const counts = countScope(WORDS, progress, { kind: 'all' }, NOW);
    expect(counts).toEqual({ total: 5, repeat: 1, due: 0, fresh: 4, known: 0 });
  });
});
