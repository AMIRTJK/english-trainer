import { useMemo } from 'react';
import { getLevelIndex, getLevelMeta } from '@content/registry';
import { createLevelProgress } from '@/entities/user/model/types';
import { summarise } from '@/entities/attempt/model/statistics';
import { useApp } from '@/app/store/app-store';
export function useLevelData() {
    const { user } = useApp();
    const levelId = user?.profile.activeLevelId ?? 'beginner';
    const index = getLevelIndex(levelId);
    const stored = user?.progress[levelId];
    // Derived once per change of level or stored progress, not per render.
    return useMemo(() => {
        const progress = stored ?? createLevelProgress(levelId, getLevelMeta(levelId)?.contentVersion ?? '0.0.0');
        const summaries = [];
        const byTopicId = new Map();
        for (const topic of index?.content.topics ?? []) {
            const stat = progress.topicStats[topic.id] ?? {
                topicId: topic.id,
                categoryId: topic.categoryId,
                seen: 0,
                correct: 0,
                seenQuestionIds: [],
                seenConstructIds: [],
                firstTryCorrect: 0,
                firstTrySeen: 0,
                lastErrorAt: null,
                lastSeenAt: null,
            };
            const summary = summarise(stat);
            summaries.push(summary);
            byTopicId.set(topic.id, summary);
        }
        return {
            levelId,
            levelName: getLevelMeta(levelId)?.name ?? levelId,
            hasContent: index !== null,
            index,
            progress,
            summaries,
            byTopicId,
        };
    }, [levelId, index, stored]);
}
/** Topics ordered worst first, excluding those with too little data. */
export function weakAreas(summaries, limit = 5) {
    return summaries
        .filter((s) => s.seen > 0 && s.status !== 'strong')
        .sort((a, b) => {
        // Confirmed weak topics rank above ones that are merely unproven.
        const rank = (s) => (s.status === 'weak' ? 0 : s.status === 'review' ? 1 : 2);
        const byRank = rank(a) - rank(b);
        if (byRank !== 0)
            return byRank;
        return a.percent - b.percent;
    })
        .slice(0, limit);
}
