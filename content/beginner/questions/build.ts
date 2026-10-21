import { createQuestionMaker } from '../../common/questions';
import { BEGINNER_LEVEL_ID } from '../meta';

export type { Draft, GroupConfig } from '../../common/questions';
export { stressOption } from '../../common/questions';

/**
 * Turn compact drafts into full Beginner Question records.
 * Ids are positional and stable: never reorder or delete an existing draft —
 * append instead (see AGENTS.md §2).
 */
export const makeQuestions = createQuestionMaker({
  levelId: BEGINNER_LEVEL_ID,
  unitPrefix: 'beg-u',
  verifiedOn: '2026-09-02',
});
