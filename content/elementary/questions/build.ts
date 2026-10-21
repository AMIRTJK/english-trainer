import { createQuestionMaker, type Draft } from '../../common/questions';
import type { SourceRef } from '../../types';
import { ELEMENTARY_LEVEL_ID } from '../meta';

export type { Draft, GroupConfig } from '../../common/questions';
export { stressOption } from '../../common/questions';

/** Grammar Bank pages of the Elementary Student's Book, by lesson. */
export const GB = (page: number, lesson: string) =>
  ({ book: 'SB', page, ref: `Grammar Bank ${lesson}` }) as const;

/**
 * Turn compact drafts into full Elementary Question records.
 * Ids are positional and stable: never reorder or delete an existing draft —
 * append instead (see AGENTS.md §2).
 */
export const makeQuestions = createQuestionMaker({
  levelId: ELEMENTARY_LEVEL_ID,
  unitPrefix: 'ele-u',
  verifiedOn: '2026-10-21',
});

/** One Grammar Bank topic: gap-fill items of `ele-g-<topic>`. */
export function grammarTopic(
  topic: string, slug: string, unit: number, source: SourceRef, drafts: Draft[],
) {
  return makeQuestions(
    { topicId: `ele-g-${topic}`, categoryId: 'grammar', unit, type: 'gap-fill', source, slug },
    drafts,
  );
}

/** Vocabulary Bank pages and lesson vocabulary. */
export const VB = (page: number, ref: string): SourceRef => ({ book: 'SB', page, ref: `Vocabulary Bank — ${ref}` });

/** One vocabulary topic: `ele-v-<topic>`. */
export function vocabTopic(topic: string, slug: string, unit: number, source: SourceRef, drafts: Draft[]) {
  return makeQuestions(
    { topicId: `ele-v-${topic}`, categoryId: 'vocabulary', unit, type: 'choose-word', source, slug },
    drafts,
  );
}
