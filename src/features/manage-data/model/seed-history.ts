import {
  IMPORTED_ITEMS, IMPORTED_TEST_META, MISTAKE_DETAIL,
} from '@content/beginner/imported-quick-test';
import type { AnswerRecord, Attempt } from '@/entities/attempt/model/types';
import type { LevelProgress } from '@/entities/user/model/types';
import { applyAttempt } from '@/entities/attempt/model/statistics';
import { getLevelIndex } from '@content/registry';

export const IMPORTED_ATTEMPT_ID = 'imported-file10-quick-test';

/**
 * Seed the history with the real paper Quick Test (PROJECT_SPEC §14).
 *
 * All 50 items are recorded with their section, topic and result, so the
 * starting statistics are the learner's real ones. The question text is only
 * available for the 12 mistakes, which is why `detailAvailable` is false and
 * the note says so.
 */
export function buildImportedAttempt(levelId: string): Attempt | null {
  const index = getLevelIndex(levelId);
  if (!index) return null;

  const answers: AnswerRecord[] = IMPORTED_ITEMS.map((item) => {
    const key = `${item.section}-${item.number}`;
    const detail = MISTAKE_DETAIL[key];
    const topicId = item.topicId ?? 'unclassified';
    return {
      questionId: `imported-${key}`,
      topicId,
      categoryId: item.categoryId,
      constructId: `${topicId}::imported`,
      chosenIndex: null,
      chosenText: detail?.chosen ?? null,
      correctText: detail?.answer ?? '',
      correct: item.correct,
      reason: item.correct ? 'coverage' : 'previous-mistake',
      firstSeen: true,
      elapsedMs: 0,
    };
  });

  const now = new Date().toISOString();
  const correct = answers.filter((a) => a.correct).length;

  return {
    id: IMPORTED_ATTEMPT_ID,
    levelId,
    kind: 'imported',
    startedAt: now,
    finishedAt: now,
    durationMs: 0,
    total: answers.length,
    correct,
    wrong: answers.length - correct,
    percent: Math.round((correct / answers.length) * 100),
    selectedTopicIds: [],
    answers,
    detailAvailable: false,
    note:
      `Imported from the paper ${IMPORTED_TEST_META.paper}. ` +
      `All 50 items are recorded with their section and topic; the question text ` +
      `is available for the ${IMPORTED_TEST_META.wrong} mistakes only.`,
  };
}

/** Apply the imported paper test once, if it is not already in the history. */
export function seedImportedHistory(progress: LevelProgress): boolean {
  if (progress.attempts.some((a) => a.id === IMPORTED_ATTEMPT_ID)) return false;
  const attempt = buildImportedAttempt(progress.levelId);
  if (!attempt) return false;
  applyAttempt(progress, attempt);
  return true;
}
