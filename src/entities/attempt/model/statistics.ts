import type { CategoryId } from '@content/types';
import type { LevelProgress } from '@/entities/user/model/types';
import type { Attempt, Confidence, TopicStat, TopicSummary } from './types';

/** Below this many observations a topic verdict is not trustworthy. */
export const MIN_OBSERVATIONS = 6;
export const MIN_UNIQUE_QUESTIONS = 4;

function emptyStat(topicId: string, categoryId: CategoryId): TopicStat {
  return {
    topicId,
    categoryId,
    seen: 0,
    correct: 0,
    seenQuestionIds: [],
    seenConstructIds: [],
    firstTryCorrect: 0,
    firstTrySeen: 0,
    lastErrorAt: null,
    lastSeenAt: null,
  };
}

function addUnique(list: string[], value: string): void {
  if (!list.includes(value)) list.push(value);
}

/**
 * Fold one finished attempt into the stored aggregates.
 * Cost is O(answers); the history is never rescanned (Performance.md §4).
 */
export function applyAttempt(progress: LevelProgress, attempt: Attempt): void {
  for (const answer of attempt.answers) {
    const stat = progress.topicStats[answer.topicId] ?? emptyStat(answer.topicId, answer.categoryId);
    stat.seen += 1;
    if (answer.correct) stat.correct += 1;
    else stat.lastErrorAt = attempt.finishedAt;
    stat.lastSeenAt = attempt.finishedAt;

    if (answer.firstSeen) {
      stat.firstTrySeen += 1;
      if (answer.correct) stat.firstTryCorrect += 1;
    }

    addUnique(stat.seenQuestionIds, answer.questionId);
    addUnique(stat.seenConstructIds, answer.constructId);
    progress.topicStats[answer.topicId] = stat;

    const qStat = progress.questionStats[answer.questionId] ?? {
      questionId: answer.questionId,
      seen: 0,
      correct: 0,
      lastSeenAt: attempt.finishedAt,
      lastWrongAt: null,
      streak: 0,
    };
    qStat.seen += 1;
    qStat.lastSeenAt = attempt.finishedAt;
    if (answer.correct) {
      qStat.correct += 1;
      qStat.streak += 1;
    } else {
      qStat.streak = 0;
      qStat.lastWrongAt = attempt.finishedAt;
    }
    progress.questionStats[answer.questionId] = qStat;
  }

  progress.attempts.unshift(attempt);
  capHistory(progress);
}

/**
 * Keep full per-answer detail for recent attempts only; older attempts keep
 * their totals (Performance.md §5). Aggregates above are already folded in.
 */
const FULL_DETAIL_ATTEMPTS = 40;
const MAX_ATTEMPTS = 300;

function capHistory(progress: LevelProgress): void {
  if (progress.attempts.length > FULL_DETAIL_ATTEMPTS) {
    for (let i = FULL_DETAIL_ATTEMPTS; i < progress.attempts.length; i += 1) {
      const attempt = progress.attempts[i];
      if (attempt && attempt.answers.length > 0) {
        attempt.answers = [];
        attempt.detailAvailable = false;
      }
    }
  }
  if (progress.attempts.length > MAX_ATTEMPTS) {
    progress.attempts.length = MAX_ATTEMPTS;
  }
}

export function confidenceOf(stat: TopicStat): Confidence {
  if (stat.seen === 0) return 'no-data';
  if (stat.seen < MIN_OBSERVATIONS || stat.seenQuestionIds.length < MIN_UNIQUE_QUESTIONS) {
    return 'low';
  }
  if (stat.seen < MIN_OBSERVATIONS * 3) return 'medium';
  return 'high';
}

export function summarise(stat: TopicStat): TopicSummary {
  const percent = stat.seen === 0 ? 0 : Math.round((stat.correct / stat.seen) * 100);
  const confidence = confidenceOf(stat);
  let status: TopicSummary['status'];
  if (confidence === 'no-data' || confidence === 'low') status = 'not-enough-data';
  else if (percent >= 85) status = 'strong';
  else if (percent >= 70) status = 'review';
  else status = 'weak';
  return {
    ...stat,
    percent,
    uniqueQuestions: stat.seenQuestionIds.length,
    uniqueConstructs: stat.seenConstructIds.length,
    confidence,
    status,
  };
}

export interface CategoryBreakdown {
  categoryId: CategoryId;
  seen: number;
  correct: number;
  percent: number;
}

function foldCategories(
  rows: Iterable<{ categoryId: CategoryId; seen: number; correct: number }>,
): CategoryBreakdown[] {
  const map = new Map<CategoryId, CategoryBreakdown>();
  for (const row of rows) {
    const acc = map.get(row.categoryId) ?? {
      categoryId: row.categoryId, seen: 0, correct: 0, percent: 0,
    };
    acc.seen += row.seen;
    acc.correct += row.correct;
    map.set(row.categoryId, acc);
  }
  for (const acc of map.values()) {
    acc.percent = acc.seen === 0 ? 0 : Math.round((acc.correct / acc.seen) * 100);
  }
  return [...map.values()];
}

/** Aggregate stored per-topic numbers by category. Cheap: topics, not answers. */
export function categoryBreakdown(stats: Record<string, TopicStat>): CategoryBreakdown[] {
  return foldCategories(Object.values(stats));
}

/** Per-attempt score by category, used on the results screen. */
export function attemptCategoryBreakdown(attempt: Attempt): CategoryBreakdown[] {
  return foldCategories(
    attempt.answers.map((a) => ({ categoryId: a.categoryId, seen: 1, correct: a.correct ? 1 : 0 })),
  );
}
