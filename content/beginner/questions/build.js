import { BEGINNER_LEVEL_ID } from '../meta';
const VERIFIED_ON = '2026-09-02';
/**
 * Turn compact drafts into full Question records.
 * Ids are positional and stable: never reorder or delete an existing draft —
 * append instead (see AGENTS.md §2).
 */
export function makeQuestions(cfg, drafts) {
    return drafts.map((draft, index) => ({
        id: `${cfg.topicId}-${cfg.slug}-${String(index + 1).padStart(4, '0')}`,
        levelId: BEGINNER_LEVEL_ID,
        unitId: `beg-u${cfg.unit}`,
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
        verifiedOn: VERIFIED_ON,
        ...(draft.stress ? { stress: draft.stress } : {}),
        ...(draft.sound ? { sound: draft.sound } : {}),
    }));
}
/** Helper for word-stress options: `"'won|der|ful"`. */
export function stressOption(syllables, stressed) {
    return syllables.map((s, i) => (i === stressed ? `'${s}` : s)).join('|');
}
