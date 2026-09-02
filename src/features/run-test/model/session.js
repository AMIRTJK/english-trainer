import { getLevelIndex } from '@content/registry';
export function createSession(plan, options) {
    return {
        id: `att-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`,
        levelId: plan.request.levelId,
        kind: plan.request.kind,
        startedAt: new Date().toISOString(),
        timed: options.timed,
        allowBack: options.allowBack,
        selectedTopicIds: plan.request.topicIds,
        items: plan.items.map((item) => ({ ...item, chosen: null, elapsedMs: 0 })),
        current: 0,
        warnings: plan.warnings,
        freshIds: options.freshIds,
    };
}
/** Options in the order the learner sees them. */
export function displayOptions(question, order) {
    return order.map((i) => question.options[i] ?? '');
}
/** Position of the correct answer inside the displayed order. */
export function correctDisplayIndex(question, order) {
    return order.indexOf(question.answer);
}
export function answeredCount(session) {
    let n = 0;
    for (const item of session.items)
        if (item.chosen !== null)
            n += 1;
    return n;
}
/** Turn a finished session into a stored attempt. */
export function finishSession(session) {
    const index = getLevelIndex(session.levelId);
    if (!index)
        return null;
    const fresh = new Set(session.freshIds);
    const answers = [];
    for (const item of session.items) {
        const question = index.byId.get(item.questionId);
        if (!question)
            continue;
        const shown = displayOptions(question, item.optionOrder);
        const correctIndex = correctDisplayIndex(question, item.optionOrder);
        answers.push({
            questionId: question.id,
            topicId: question.topicId,
            categoryId: question.categoryId,
            constructId: question.constructId,
            chosenIndex: item.chosen,
            chosenText: item.chosen === null ? null : shown[item.chosen] ?? null,
            correctText: shown[correctIndex] ?? question.options[question.answer] ?? '',
            correct: item.chosen === correctIndex,
            reason: item.reason,
            firstSeen: fresh.has(question.id),
            elapsedMs: item.elapsedMs,
        });
    }
    const finishedAt = new Date().toISOString();
    const correct = answers.reduce((n, a) => n + (a.correct ? 1 : 0), 0);
    const total = answers.length;
    return {
        id: session.id,
        levelId: session.levelId,
        kind: session.kind,
        startedAt: session.startedAt,
        finishedAt,
        durationMs: Math.max(0, Date.parse(finishedAt) - Date.parse(session.startedAt)),
        total,
        correct,
        wrong: total - correct,
        percent: total === 0 ? 0 : Math.round((correct / total) * 100),
        selectedTopicIds: session.selectedTopicIds,
        answers,
        detailAvailable: true,
    };
}
