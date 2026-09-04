import { describe, expect, it } from 'vitest';
import type { VocabWord } from '@content/types';
import { clampPage, paginateGroups, type WordGroupView } from '@/features/vocab-learning';

function group(key: string, size: number): WordGroupView {
  const words = Array.from({ length: size }, (_, i) => ({ id: `${key}-${i}` } as VocabWord));
  return { key, title: key, subtitle: '', words, scope: { kind: 'all' } };
}

const sizes = (pages: WordGroupView[][]): number[][] =>
  pages.map((page) => page.map((g) => g.words.length));

describe('paginateGroups', () => {
  it('fills a page with whole groups up to the budget', () => {
    expect(sizes(paginateGroups([group('a', 15), group('b', 20), group('c', 10)], 40)))
      .toEqual([[15, 20], [10]]);
  });

  it('never splits a group, even one larger than the budget', () => {
    expect(sizes(paginateGroups([group('a', 90), group('b', 5)], 40)))
      .toEqual([[90], [5]]);
  });

  it('returns no pages for an empty list', () => {
    expect(paginateGroups([], 40)).toEqual([]);
  });

  it('keeps every group exactly once', () => {
    const groups = [group('a', 12), group('b', 33), group('c', 7), group('d', 41)];
    const flat = paginateGroups(groups, 40).flat();
    expect(flat.map((g) => g.key)).toEqual(['a', 'b', 'c', 'd']);
  });
});

describe('clampPage', () => {
  it('keeps the page inside the range', () => {
    expect(clampPage(0, 5)).toBe(1);
    expect(clampPage(9, 5)).toBe(5);
    expect(clampPage(3, 5)).toBe(3);
  });

  it('falls back to the first page when there is nothing to show', () => {
    expect(clampPage(4, 0)).toBe(1);
  });
});
