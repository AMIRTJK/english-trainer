import type { CategoryId, Question, QuestionType, SourceRef, SoundMeta, StressMeta } from '../types';

/** Compact authoring shape so question files stay small and readable. */
export interface Draft {
  /** Sentence or instruction. `___` marks the gap. */
  q: string;
  o: [string, string, string];
  a: 0 | 1 | 2;
  e: string;
  /** Construct suffix; groups items that test the same rule. Defaults to `main`. */
  c?: string;
  d?: 1 | 2 | 3;
  stress?: StressMeta;
  sound?: SoundMeta;
}

export interface GroupConfig {
  topicId: string;
  categoryId: CategoryId;
  unit: number;
  type: QuestionType;
  source: SourceRef;
  /** Short slug used inside question ids, e.g. 'there'. */
  slug: string;
}

export interface LevelQuestionConfig {
  levelId: string;
  /** Prefix of unit ids, e.g. `beg-u` gives `beg-u10`. */
  unitPrefix: string;
  verifiedOn: string;
}

export type MakeQuestions = (cfg: GroupConfig, drafts: Draft[]) => Question[];

/**
 * A `makeQuestions` bound to one level.
 *
 * Ids are positional and stable: never reorder or delete an existing draft —
 * append instead (see AGENTS.md §2).
 */
export function createQuestionMaker(level: LevelQuestionConfig): MakeQuestions {
  return (cfg, drafts) =>
    drafts.map((draft, index) => ({
      id: `${cfg.topicId}-${cfg.slug}-${String(index + 1).padStart(4, '0')}`,
      levelId: level.levelId,
      unitId: `${level.unitPrefix}${cfg.unit}`,
      categoryId: cfg.categoryId,
      topicId: cfg.topicId,
      type: cfg.type,
      prompt: draft.q,
      options: draft.o,
      answer: draft.a,
      explanation: draft.e,
      source: cfg.source,
      constructId: `${cfg.topicId}::${draft.c ?? 'main'}`,
      difficulty: draft.d ?? 2,
      status: 'verified',
      verifiedOn: level.verifiedOn,
      ...(draft.stress ? { stress: draft.stress } : {}),
      ...(draft.sound ? { sound: draft.sound } : {}),
    }));
}

/** Helper for word-stress options: `"'won|der|ful"`. */
export function stressOption(syllables: string[], stressed: number): string {
  return syllables.map((s, i) => (i === stressed ? `'${s}` : s)).join('|');
}
