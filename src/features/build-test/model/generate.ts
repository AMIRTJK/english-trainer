import type { CategoryId, Question } from '@content/types';
import { getLevelIndex } from '@content/registry';
import type { LevelProgress } from '@/entities/user/model/types';
import type { SelectionReason, TestKind } from '@/entities/attempt/model/types';
import { createRng, shuffleInPlace, type Rng } from '@/shared/lib/random';
import { scoreQuestion, type Scored } from './weights';

export interface TestRequest {
  levelId: string;
  kind: TestKind;
  count: number;
  /** Empty means "all topics of the level". */
  topicIds: string[];
  categoryIds: CategoryId[];
  adaptive: boolean;
  /** Restrict to questions the user has previously answered wrongly. */
  mistakesOnly: boolean;
  /**
   * Fill the test to `count` by asking small pools more than once, instead of
   * running a shorter test (`docs/decisions.md` §20).
   */
  allowRepeats: boolean;
  seed: number;
}

export interface PlannedQuestion {
  questionId: string;
  reason: SelectionReason;
  /** Option order the learner will see, as indexes into the authored options. */
  optionOrder: number[];
}

export interface TestPlan {
  request: TestRequest;
  items: PlannedQuestion[];
  /** Fewer questions than asked for, because the pool is too small. */
  shortfall: number;
  poolSize: number;
  /** Questions asked more than once so the test could reach its full length. */
  repeats: number;
  warnings: string[];
}

/** Questions the request is allowed to draw from. */
function candidatePool(request: TestRequest, progress: LevelProgress): Question[] {
  const index = getLevelIndex(request.levelId);
  if (!index) return [];

  const topicFilter = new Set(request.topicIds);
  const categoryFilter = new Set(request.categoryIds);
  const pool: Question[] = [];

  // Draw from the smallest available index rather than scanning everything.
  const source: Question[] = topicFilter.size > 0
    ? request.topicIds.flatMap((id) => index.byTopic.get(id) ?? [])
    : categoryFilter.size > 0
      ? request.categoryIds.flatMap((id) => index.byCategory.get(id) ?? [])
      : index.content.questions;

  for (const q of source) {
    if (topicFilter.size > 0 && !topicFilter.has(q.topicId)) continue;
    if (categoryFilter.size > 0 && !categoryFilter.has(q.categoryId)) continue;
    if (request.mistakesOnly) {
      const stat = progress.questionStats[q.id];
      const construct = stat?.lastWrongAt != null;
      if (!construct) continue;
    }
    pool.push(q);
  }
  return pool;
}

/**
 * Weighted sampling without replacement.
 * O(n) per pick over a shrinking array; no repeated scans of the full bank
 * (Performance.md §3).
 */
function pickWeighted(scored: Scored[], count: number, rng: Rng): Scored[] {
  const items = [...scored];
  const chosen: Scored[] = [];
  let total = items.reduce((sum, item) => sum + item.weight, 0);

  while (chosen.length < count && items.length > 0) {
    let target = rng.next() * total;
    let index = items.length - 1;
    for (let i = 0; i < items.length; i += 1) {
      target -= items[i]!.weight;
      if (target <= 0) {
        index = i;
        break;
      }
    }
    const picked = items[index]!;
    chosen.push(picked);
    total -= picked.weight;
    items[index] = items[items.length - 1]!;
    items.pop();
  }
  return chosen;
}

/** Spread picks over constructs so a test does not hammer one rule. */
function diversify(chosen: Scored[], rng: Rng): Scored[] {
  const byConstruct = new Map<string, Scored[]>();
  for (const item of chosen) {
    const list = byConstruct.get(item.question.constructId);
    if (list) list.push(item);
    else byConstruct.set(item.question.constructId, [item]);
  }
  const buckets = shuffleInPlace([...byConstruct.values()], rng);
  const out: Scored[] = [];
  let added = true;
  while (added) {
    added = false;
    for (const bucket of buckets) {
      const next = bucket.shift();
      if (next) {
        out.push(next);
        added = true;
      }
    }
  }
  return out;
}

/**
 * Keep dealing the whole pool, reshuffled every pass, until the test is full.
 *
 * Every question is asked once before any is asked twice, so a repeat never
 * costs coverage. A pass boundary is the only place the same item could land
 * twice in a row, so that one case is swapped away.
 */
function padWithRepeats(picked: Scored[], pool: Scored[], count: number, rng: Rng): Scored[] {
  const out = [...picked];
  while (out.length < count && pool.length > 0) {
    const pass = shuffleInPlace([...pool], rng);
    if (pass.length > 1 && pass[0] === out.at(-1)) {
      const swap = pass[1] as Scored;
      pass[1] = pass[0] as Scored;
      pass[0] = swap;
    }
    for (const item of pass) {
      if (out.length >= count) break;
      out.push(item);
    }
  }
  return out;
}

export function generateTest(request: TestRequest, progress: LevelProgress): TestPlan {
  const rng = createRng(request.seed);
  const warnings: string[] = [];
  const pool = candidatePool(request, progress);

  if (pool.length === 0) {
    return {
      request,
      items: [],
      shortfall: request.count,
      poolSize: 0,
      repeats: 0,
      warnings: ['No questions match this selection.'],
    };
  }

  const now = Date.now();
  const scored = pool.map((q) => scoreQuestion(q, progress, now, request.adaptive));
  const take = Math.min(request.count, pool.length);
  const unique = diversify(pickWeighted(scored, take, rng), rng);
  const picked = request.allowRepeats
    ? padWithRepeats(unique, scored, request.count, rng)
    : unique;
  const repeats = picked.length - unique.length;

  const shortfall = request.count - picked.length;
  if (shortfall > 0) {
    warnings.push(
      `Only ${picked.length} unique questions are available for this selection, ` +
      `so this test has ${picked.length} instead of ${request.count}. ` +
      'Questions are never repeated inside one test.',
    );
  } else if (repeats > 0) {
    warnings.push(
      `This selection has ${unique.length} questions, so ${repeats} of them come round ` +
      `a second time to make ${request.count}. Every question is asked at least once.`,
    );
  }

  // Judged on the distinct questions: repeats say nothing about variety.
  const constructs = new Set(unique.map((p) => p.question.constructId));
  if (unique.length >= 10 && constructs.size < unique.length / 3) {
    warnings.push(
      'This selection has few distinct structures, so several questions test the same rule.',
    );
  }

  const items: PlannedQuestion[] = picked.map((item) => ({
    questionId: item.question.id,
    reason: item.reason,
    optionOrder: shuffleInPlace([0, 1, 2], rng),
  }));

  return { request, items, shortfall, poolSize: pool.length, repeats, warnings };
}
