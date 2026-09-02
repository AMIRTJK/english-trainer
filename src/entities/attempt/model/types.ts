import type { CategoryId } from '@content/types';

export type TestKind =
  | 'quick'
  | 'official'
  | 'full'
  | 'custom'
  | 'weak-areas'
  | 'mistakes'
  | 'quick-practice'
  | 'imported';

/** Why a question was put into a test — shown to the user (PROJECT_SPEC §17). */
export type SelectionReason =
  | 'new'
  | 'previous-mistake'
  | 'weak-topic'
  | 'recent-error'
  | 'needs-review'
  | 'coverage';

export interface AnswerRecord {
  questionId: string;
  topicId: string;
  categoryId: CategoryId;
  constructId: string;
  /** Index into the shuffled options the user actually saw. */
  chosenIndex: number | null;
  chosenText: string | null;
  correctText: string;
  correct: boolean;
  reason: SelectionReason;
  /** True when the user had never seen this question before this attempt. */
  firstSeen: boolean;
  elapsedMs: number;
}

export interface Attempt {
  id: string;
  levelId: string;
  kind: TestKind;
  startedAt: string;
  finishedAt: string;
  durationMs: number;
  total: number;
  correct: number;
  wrong: number;
  percent: number;
  /** Topic ids the user selected, when the test was a custom one. */
  selectedTopicIds: string[];
  answers: AnswerRecord[];
  /** Set when detail is unavailable, e.g. an imported paper test. */
  detailAvailable: boolean;
  note?: string;
}

export interface TopicStat {
  topicId: string;
  categoryId: CategoryId;
  seen: number;
  correct: number;
  /** Distinct question ids answered at least once, kept incrementally. */
  seenQuestionIds: string[];
  /** Distinct constructIds answered at least once, kept incrementally. */
  seenConstructIds: string[];
  /** Correct answers on questions the user had never seen before. */
  firstTryCorrect: number;
  firstTrySeen: number;
  lastErrorAt: string | null;
  lastSeenAt: string | null;
}

export type Confidence = 'no-data' | 'low' | 'medium' | 'high';

export interface TopicSummary extends TopicStat {
  percent: number;
  uniqueQuestions: number;
  uniqueConstructs: number;
  confidence: Confidence;
  status: 'strong' | 'review' | 'weak' | 'not-enough-data';
}

/** Per-question memory used by the adaptive selector. */
export interface QuestionStat {
  questionId: string;
  seen: number;
  correct: number;
  lastSeenAt: string;
  lastWrongAt: string | null;
  /** Consecutive correct answers; used to lower the weight of a known item. */
  streak: number;
}
