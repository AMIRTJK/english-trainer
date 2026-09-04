import type { WordGroupView } from './grouping';

/**
 * Pages of the word list.
 *
 * A page is filled with whole groups until it holds about `budget` words, so a
 * group is never split across two pages and a heading never appears without its
 * words. A single group larger than the budget gets a page to itself
 * (`Performance.md` §7: long lists must not render in one go).
 */
export const WORDS_PER_PAGE = 40;

export function paginateGroups(
  groups: readonly WordGroupView[],
  budget: number = WORDS_PER_PAGE,
): WordGroupView[][] {
  const pages: WordGroupView[][] = [];
  let current: WordGroupView[] = [];
  let count = 0;

  for (const group of groups) {
    if (current.length > 0 && count + group.words.length > budget) {
      pages.push(current);
      current = [];
      count = 0;
    }
    current.push(group);
    count += group.words.length;
  }

  if (current.length > 0) pages.push(current);
  return pages;
}

/** Keep a page number inside the available range, counting from 1. */
export function clampPage(page: number, pageCount: number): number {
  if (pageCount <= 0) return 1;
  return Math.min(Math.max(page, 1), pageCount);
}
