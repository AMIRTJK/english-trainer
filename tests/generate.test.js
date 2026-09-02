import { describe, expect, it } from 'vitest';
import { getLevelIndex } from '@content/registry';
import { createLevelProgress } from '@/entities/user/model/types';
import { planTest } from '@/features/build-test/model/plan-test';
import { OFFICIAL_MIX, splitByMix } from '@/features/build-test/model/presets';
import { generateTest } from '@/features/build-test/model/generate';
const LEVEL = 'beginner';
const fresh = () => createLevelProgress(LEVEL, '1.0.0');
describe('splitByMix', () => {
    it('keeps the requested total', () => {
        for (const total of [10, 20, 33, 50, 100, 150]) {
            const parts = splitByMix(total, OFFICIAL_MIX);
            expect(parts.reduce((sum, [, n]) => sum + n, 0)).toBe(total);
        }
    });
    it('follows the measured exam shape for 50 questions', () => {
        const parts = new Map(splitByMix(50, OFFICIAL_MIX));
        expect(parts.get('grammar')).toBe(20);
        expect(parts.get('vocabulary')).toBe(20);
        expect(parts.get('pronunciation')).toBe(5);
        expect(parts.get('word-stress')).toBe(5);
    });
});
describe('generateTest', () => {
    it('never repeats a question inside one test', () => {
        const plan = planTest({
            levelId: LEVEL, kind: 'official', count: 100, topicIds: [], categoryIds: [],
            adaptive: false, mistakesOnly: false, mix: OFFICIAL_MIX, seed: 42,
        }, fresh());
        const ids = plan.items.map((i) => i.questionId);
        expect(new Set(ids).size).toBe(ids.length);
    });
    it('fills the Quick, Official and Full tests completely', () => {
        for (const count of [50, 100, 150]) {
            const plan = planTest({
                levelId: LEVEL, kind: 'quick', count, topicIds: [], categoryIds: [],
                adaptive: false, mistakesOnly: false, mix: OFFICIAL_MIX, seed: 7,
            }, fresh());
            expect(plan.items.length).toBe(count);
            expect(plan.shortfall).toBe(0);
        }
    });
    it('only uses the selected topics', () => {
        const topicIds = ['beg-g-there-is-are', 'beg-p-sound-ear-chair'];
        const plan = planTest({
            levelId: LEVEL, kind: 'custom', count: 20, topicIds, categoryIds: [],
            adaptive: false, mistakesOnly: false, mix: null, seed: 3,
        }, fresh());
        const index = getLevelIndex(LEVEL);
        for (const item of plan.items) {
            expect(topicIds).toContain(index.byId.get(item.questionId).topicId);
        }
    });
    it('warns instead of padding when the pool is too small', () => {
        const plan = planTest({
            levelId: LEVEL, kind: 'custom', count: 100, topicIds: ['beg-v-colours-adjectives'],
            categoryIds: [], adaptive: false, mistakesOnly: false, mix: null, seed: 5,
        }, fresh());
        const ids = plan.items.map((i) => i.questionId);
        expect(new Set(ids).size).toBe(ids.length);
        expect(plan.shortfall).toBeGreaterThan(0);
        expect(plan.warnings.join(' ')).toMatch(/unique questions/i);
    });
    it('returns nothing when no topic is selected but a topic filter is empty-matching', () => {
        const plan = generateTest({
            levelId: LEVEL, kind: 'custom', count: 10, topicIds: ['does-not-exist'],
            categoryIds: [], adaptive: false, mistakesOnly: false, seed: 1,
        }, fresh());
        expect(plan.items).toHaveLength(0);
        expect(plan.warnings.length).toBeGreaterThan(0);
    });
    it('is deterministic for a given seed', () => {
        const make = () => planTest({
            levelId: LEVEL, kind: 'quick', count: 30, topicIds: [], categoryIds: [],
            adaptive: false, mistakesOnly: false, mix: OFFICIAL_MIX, seed: 999,
        }, fresh()).items.map((i) => i.questionId);
        expect(make()).toEqual(make());
    });
    it('shuffles the option order', () => {
        const plan = planTest({
            levelId: LEVEL, kind: 'quick', count: 60, topicIds: [], categoryIds: [],
            adaptive: false, mistakesOnly: false, mix: OFFICIAL_MIX, seed: 11,
        }, fresh());
        const orders = new Set(plan.items.map((i) => i.optionOrder.join('')));
        expect(orders.size).toBeGreaterThan(1);
        for (const item of plan.items) {
            expect([...item.optionOrder].sort().join('')).toBe('012');
        }
    });
});
