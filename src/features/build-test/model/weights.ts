import type { Question } from '@content/types';
import type { LevelProgress } from '@/entities/user/model/types';
import type { SelectionReason } from '@/entities/attempt/model/types';
import { confidenceOf } from '@/entities/attempt/model/statistics';

export interface Scored {
  question: Question;
  weight: number;
  reason: SelectionReason;
}

const DAY_MS = 86_400_000;

/**
 * Score one question for adaptive selection.
 *
 * The rules come from PROJECT_SPEC §16:
 *  - unseen questions on a weak topic come first
 *  - previous mistakes come back, but only after a sensible interval
 *  - a question loses weight after several correct answers in a row
 *  - a topic with too little data is boosted for coverage, not called weak
 */
export function scoreQuestion(
  question: Question,
  progress: LevelProgress,
  now: number,
  adaptive: boolean,
): Scored {
  const qStat = progress.questionStats[question.id];
  const tStat = progress.topicStats[question.topicId];

  let weight = 1;
  let reason: SelectionReason = 'new';

  if (!qStat) {
    // Never seen: the best kind of question, it tests understanding not memory.
    weight = adaptive ? 3 : 1.6;
    reason = 'new';
  } else {
    const daysSince = (now - Date.parse(qStat.lastSeenAt)) / DAY_MS;
    const recencyPenalty = daysSince < 1 ? 0.25 : daysSince < 3 ? 0.6 : 1;
    const masteryPenalty = 1 / (1 + qStat.streak * 0.9);
    weight = 1.1 * recencyPenalty * masteryPenalty;

    if (qStat.lastWrongAt) {
      const daysSinceWrong = (now - Date.parse(qStat.lastWrongAt)) / DAY_MS;
      // Bring a mistake back, but not immediately after it was made.
      const spacing = daysSinceWrong < 0.2 ? 0.5 : 2.4;
      weight *= spacing;
      reason = daysSinceWrong < 3 ? 'recent-error' : 'previous-mistake';
    } else if (qStat.streak >= 3) {
      reason = 'needs-review';
    }
  }

  if (adaptive && tStat) {
    const confidence = confidenceOf(tStat);
    const percent = tStat.seen === 0 ? 100 : (tStat.correct / tStat.seen) * 100;
    if (confidence === 'no-data' || confidence === 'low') {
      // Not enough evidence: sample it to find out, do not label it weak.
      weight *= 1.5;
      if (reason === 'new') reason = 'coverage';
    } else if (percent < 70) {
      weight *= 2.4;
      reason = reason === 'new' ? 'weak-topic' : reason;
    } else if (percent < 85) {
      weight *= 1.5;
      if (reason === 'new') reason = 'weak-topic';
    } else {
      weight *= 0.65;
    }
  }

  if (adaptive && !tStat) {
    weight *= 1.4;
    if (reason === 'new') reason = 'coverage';
  }

  return { question, weight: Math.max(weight, 0.05), reason };
}
