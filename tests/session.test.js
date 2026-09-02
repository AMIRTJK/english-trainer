import { describe, expect, it } from 'vitest';
import { getLevelIndex } from '@content/registry';
import { createLevelProgress } from '@/entities/user/model/types';
import { planTest } from '@/features/build-test/model/plan-test';
import { OFFICIAL_MIX } from '@/features/build-test/model/presets';
import { correctDisplayIndex, createSession, displayOptions, finishSession, } from '@/features/run-test/model/session';
import { buildExport, parseImport } from '@/features/manage-data/model/export-import';
import { emptyUser } from '@/entities/user/model/repository';
const LEVEL = 'beginner';
function makeSession(count = 10) {
    const progress = createLevelProgress(LEVEL, '1.0.0');
    const plan = planTest({
        levelId: LEVEL, kind: 'quick', count, topicIds: [], categoryIds: [],
        adaptive: false, mistakesOnly: false, mix: OFFICIAL_MIX, seed: 123,
    }, progress);
    return createSession(plan, {
        timed: false, allowBack: true, freshIds: plan.items.map((i) => i.questionId),
    });
}
describe('session', () => {
    it('shows options in the shuffled order and tracks the right answer', () => {
        const index = getLevelIndex(LEVEL);
        const session = makeSession(20);
        for (const item of session.items) {
            const question = index.byId.get(item.questionId);
            const shown = displayOptions(question, item.optionOrder);
            const correctIndex = correctDisplayIndex(question, item.optionOrder);
            expect(shown).toHaveLength(3);
            expect(shown[correctIndex]).toBe(question.options[question.answer]);
        }
    });
    it('scores a completed session correctly', () => {
        const index = getLevelIndex(LEVEL);
        const session = makeSession(10);
        session.items = session.items.map((item, i) => {
            const question = index.byId.get(item.questionId);
            const correctIndex = correctDisplayIndex(question, item.optionOrder);
            // Answer the first five correctly, then deliberately wrongly.
            const chosen = i < 5 ? correctIndex : (correctIndex + 1) % 3;
            return { ...item, chosen };
        });
        const attempt = finishSession(session);
        expect(attempt.total).toBe(10);
        expect(attempt.correct).toBe(5);
        expect(attempt.wrong).toBe(5);
        expect(attempt.percent).toBe(50);
        expect(attempt.answers.every((a) => a.firstSeen)).toBe(true);
    });
    it('counts an unanswered question as wrong', () => {
        const session = makeSession(3);
        const attempt = finishSession(session);
        expect(attempt.correct).toBe(0);
        expect(attempt.answers.every((a) => a.chosenText === null)).toBe(true);
    });
});
describe('export and import', () => {
    it('round-trips a profile', () => {
        const user = emptyUser('Amir', LEVEL, '1.0.0');
        const text = JSON.stringify(buildExport(user));
        const result = parseImport(text);
        expect(result.ok).toBe(true);
        expect(result.data.profile.name).toBe('Amir');
        expect(result.warnings).toHaveLength(0);
    });
    it('rejects a file that is not a backup', () => {
        expect(parseImport('{"hello":1}').ok).toBe(false);
        expect(parseImport('not json').ok).toBe(false);
    });
    it('warns when the content version has moved on', () => {
        const user = emptyUser('Amir', LEVEL, '1.0.0');
        const bundle = buildExport(user);
        bundle.contentVersions[LEVEL] = '0.0.1';
        const result = parseImport(JSON.stringify(bundle));
        expect(result.ok).toBe(true);
        expect(result.warnings.length).toBeGreaterThan(0);
    });
});
