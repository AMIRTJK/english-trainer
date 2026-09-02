import { describe, expect, it } from 'vitest';
import { createLevelProgress } from '@/entities/user/model/types';
import { applyAttempt, categoryBreakdown, summarise } from '@/entities/attempt/model/statistics';
import { seedImportedHistory } from '@/features/manage-data/model/seed-history';
import { IMPORTED_TEST_META } from '@content/beginner/imported-quick-test';
function answer(overrides = {}) {
    return {
        questionId: 'q1', topicId: 't1', categoryId: 'grammar', constructId: 'c1',
        chosenIndex: 0, chosenText: 'a', correctText: 'a', correct: true,
        reason: 'new', firstSeen: true, elapsedMs: 0,
        ...overrides,
    };
}
function attempt(answers, id = 'a1') {
    const correct = answers.filter((a) => a.correct).length;
    return {
        id, levelId: 'beginner', kind: 'quick',
        startedAt: '2026-09-01T10:00:00.000Z', finishedAt: '2026-09-01T10:10:00.000Z',
        durationMs: 600000, total: answers.length, correct, wrong: answers.length - correct,
        percent: answers.length === 0 ? 0 : Math.round((correct / answers.length) * 100),
        selectedTopicIds: [], answers, detailAvailable: true,
    };
}
describe('applyAttempt', () => {
    it('accumulates topic and question stats', () => {
        const progress = createLevelProgress('beginner', '1.0.0');
        applyAttempt(progress, attempt([
            answer({ questionId: 'q1', correct: true }),
            answer({ questionId: 'q2', correct: false }),
        ]));
        const stat = progress.topicStats.t1;
        expect(stat.seen).toBe(2);
        expect(stat.correct).toBe(1);
        expect(stat.seenQuestionIds).toHaveLength(2);
        expect(stat.lastErrorAt).not.toBeNull();
        expect(progress.questionStats.q1.streak).toBe(1);
        expect(progress.questionStats.q2.streak).toBe(0);
        expect(progress.questionStats.q2.lastWrongAt).not.toBeNull();
    });
    it('does not double count unique questions across attempts', () => {
        const progress = createLevelProgress('beginner', '1.0.0');
        applyAttempt(progress, attempt([answer({ questionId: 'q1' })], 'a1'));
        applyAttempt(progress, attempt([answer({ questionId: 'q1' })], 'a2'));
        expect(progress.topicStats.t1.seen).toBe(2);
        expect(progress.topicStats.t1.seenQuestionIds).toEqual(['q1']);
    });
    it('resets a streak after a wrong answer', () => {
        const progress = createLevelProgress('beginner', '1.0.0');
        applyAttempt(progress, attempt([answer({ correct: true })], 'a1'));
        applyAttempt(progress, attempt([answer({ correct: true })], 'a2'));
        expect(progress.questionStats.q1.streak).toBe(2);
        applyAttempt(progress, attempt([answer({ correct: false })], 'a3'));
        expect(progress.questionStats.q1.streak).toBe(0);
    });
});
describe('summarise', () => {
    it('refuses to call a topic weak without enough data', () => {
        const progress = createLevelProgress('beginner', '1.0.0');
        applyAttempt(progress, attempt([answer({ correct: false })]));
        const summary = summarise(progress.topicStats.t1);
        expect(summary.percent).toBe(0);
        expect(summary.status).toBe('not-enough-data');
        expect(summary.confidence).toBe('low');
    });
    it('marks a genuinely weak topic once there is evidence', () => {
        const progress = createLevelProgress('beginner', '1.0.0');
        const answers = Array.from({ length: 10 }, (_, i) => answer({ questionId: `q${i}`, correct: i < 3 }));
        applyAttempt(progress, attempt(answers));
        const summary = summarise(progress.topicStats.t1);
        expect(summary.percent).toBe(30);
        expect(summary.status).toBe('weak');
    });
});
describe('categoryBreakdown', () => {
    it('groups topic stats by section', () => {
        const progress = createLevelProgress('beginner', '1.0.0');
        applyAttempt(progress, attempt([
            answer({ questionId: 'g1', topicId: 'g', categoryId: 'grammar', correct: true }),
            answer({ questionId: 'p1', topicId: 'p', categoryId: 'pronunciation', correct: false }),
        ]));
        const rows = categoryBreakdown(progress.topicStats);
        expect(rows.find((r) => r.categoryId === 'grammar').percent).toBe(100);
        expect(rows.find((r) => r.categoryId === 'pronunciation').percent).toBe(0);
    });
});
describe('imported paper test', () => {
    it('seeds the real 38/50 result exactly once', () => {
        const progress = createLevelProgress('beginner', '1.0.0');
        expect(seedImportedHistory(progress)).toBe(true);
        expect(seedImportedHistory(progress)).toBe(false);
        const imported = progress.attempts[0];
        expect(imported.total).toBe(50);
        expect(imported.correct).toBe(38);
        expect(imported.wrong).toBe(12);
        expect(imported.percent).toBe(76);
        expect(imported.answers).toHaveLength(IMPORTED_TEST_META.total);
        expect(imported.detailAvailable).toBe(false);
    });
    it('records the pronunciation and preposition mistakes against real topics', () => {
        const progress = createLevelProgress('beginner', '1.0.0');
        seedImportedHistory(progress);
        expect(progress.topicStats['beg-p-sound-ear-chair'].correct).toBe(2);
        expect(progress.topicStats['beg-p-sound-ear-chair'].seen).toBe(5);
        expect(progress.topicStats['beg-v-prepositions-place'].seen).toBe(6);
        expect(progress.topicStats['beg-g-there-is-are'].seen).toBe(12);
    });
});
