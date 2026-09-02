import { getLevelIndex } from '@content/registry';
import { createRng, shuffleInPlace } from '@/shared/lib/random';
import { scoreQuestion } from './weights';
/** Questions the request is allowed to draw from. */
function candidatePool(request, progress) {
    const index = getLevelIndex(request.levelId);
    if (!index)
        return [];
    const topicFilter = new Set(request.topicIds);
    const categoryFilter = new Set(request.categoryIds);
    const pool = [];
    // Draw from the smallest available index rather than scanning everything.
    const source = topicFilter.size > 0
        ? request.topicIds.flatMap((id) => index.byTopic.get(id) ?? [])
        : categoryFilter.size > 0
            ? request.categoryIds.flatMap((id) => index.byCategory.get(id) ?? [])
            : index.content.questions;
    for (const q of source) {
        if (topicFilter.size > 0 && !topicFilter.has(q.topicId))
            continue;
        if (categoryFilter.size > 0 && !categoryFilter.has(q.categoryId))
            continue;
        if (request.mistakesOnly) {
            const stat = progress.questionStats[q.id];
            const construct = stat?.lastWrongAt != null;
            if (!construct)
                continue;
        }
        pool.push(q);
    }
    return pool;
}
/**
 * Weighted sampling without replacement.
 * O(n) per pick over a shrinking array; no repeated scans of the full bank
 * (Performance.md §3).
 */
function pickWeighted(scored, count, rng) {
    const items = [...scored];
    const chosen = [];
    let total = items.reduce((sum, item) => sum + item.weight, 0);
    while (chosen.length < count && items.length > 0) {
        let target = rng.next() * total;
        let index = items.length - 1;
        for (let i = 0; i < items.length; i += 1) {
            target -= items[i].weight;
            if (target <= 0) {
                index = i;
                break;
            }
        }
        const picked = items[index];
        chosen.push(picked);
        total -= picked.weight;
        items[index] = items[items.length - 1];
        items.pop();
    }
    return chosen;
}
/** Spread picks over constructs so a test does not hammer one rule. */
function diversify(chosen, rng) {
    const byConstruct = new Map();
    for (const item of chosen) {
        const list = byConstruct.get(item.question.constructId);
        if (list)
            list.push(item);
        else
            byConstruct.set(item.question.constructId, [item]);
    }
    const buckets = shuffleInPlace([...byConstruct.values()], rng);
    const out = [];
    let added = true;
    while (added) {
        added = false;
        for (const bucket of buckets) {
            const next = bucket.shift();
            if (next) {
                out.push(next);
                added = true;
            }
        }
    }
    return out;
}
export function generateTest(request, progress) {
    const rng = createRng(request.seed);
    const warnings = [];
    const pool = candidatePool(request, progress);
    if (pool.length === 0) {
        return { request, items: [], shortfall: request.count, poolSize: 0, warnings: ['No questions match this selection.'] };
    }
    const now = Date.now();
    const scored = pool.map((q) => scoreQuestion(q, progress, now, request.adaptive));
    const take = Math.min(request.count, pool.length);
    const picked = diversify(pickWeighted(scored, take, rng), rng);
    const shortfall = request.count - picked.length;
    if (shortfall > 0) {
        warnings.push(`Only ${picked.length} unique questions are available for this selection, ` +
            `so this test has ${picked.length} instead of ${request.count}. ` +
            'Questions are never repeated inside one test.');
    }
    const constructs = new Set(picked.map((p) => p.question.constructId));
    if (picked.length >= 10 && constructs.size < picked.length / 3) {
        warnings.push('This selection has few distinct structures, so several questions test the same rule.');
    }
    const items = picked.map((item) => ({
        questionId: item.question.id,
        reason: item.reason,
        optionOrder: shuffleInPlace([0, 1, 2], rng),
    }));
    return { request, items, shortfall, poolSize: pool.length, warnings };
}
