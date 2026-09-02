import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORY_LABELS, CATEGORY_ORDER } from '@content/registry';
import { useApp } from '@/app/store/app-store';
import { useLevelData, weakAreas } from '@/entities/topic/model/use-level-data';
import { categoryBreakdown } from '@/entities/attempt/model/statistics';
import { Bar, Empty, Pill, Stat, formatDate, toneForPercent } from '@/shared/ui/primitives';
import { WeakAreasCard } from '@/widgets/weak-areas/WeakAreasCard';
import { GoalCard } from './GoalCard';
import { RecentTests } from './RecentTests';
export function DashboardPage() {
    const { user } = useApp();
    const data = useLevelData();
    const stats = useMemo(() => {
        const attempts = data.progress.attempts;
        const scored = attempts.filter((a) => a.total > 0);
        const best = scored.reduce((max, a) => Math.max(max, a.percent), 0);
        const last = scored[0] ?? null;
        const average = scored.length
            ? Math.round(scored.reduce((sum, a) => sum + a.percent, 0) / scored.length)
            : 0;
        return {
            count: scored.length,
            best,
            last,
            average,
            categories: categoryBreakdown(data.progress.topicStats),
            lastQuick: scored.find((a) => a.kind === 'quick' || a.kind === 'imported') ?? null,
            lastOfficial: scored.find((a) => a.kind === 'official') ?? null,
        };
    }, [data.progress]);
    const weak = useMemo(() => weakAreas(data.summaries), [data.summaries]);
    const titleOf = (id) => data.index?.topicById.get(id)?.title ?? id;
    if (!data.hasContent) {
        return (_jsx("div", { className: "page", children: _jsxs(Empty, { title: "Content for this level is not available yet", children: ["Switch back to Beginner in Settings, or add a content pack for ", data.levelName, "."] }) }));
    }
    return (_jsxs("div", { className: "page stack gap-24", children: [_jsxs("header", { className: "stack gap-8", children: [_jsxs("h1", { children: ["Welcome back, ", user?.profile.name] }), _jsxs("p", { className: "dim small", children: [data.levelName, " \u00B7 ", data.index?.content.questions.length, " verified questions across ", data.index?.content.topics.length, " topics"] })] }), stats.count === 0 ? (_jsxs("section", { className: "card stack gap-12", children: [_jsx("h2", { children: "Start here" }), _jsx("p", { className: "small dim", children: "Take a Quick Test to see where you stand, or go straight to the topics you know are hard." }), _jsxs("div", { className: "row", children: [_jsx(Link, { className: "btn btn-primary", to: "/tests?start=quick", children: "Quick Test \u2014 50 questions" }), _jsx(Link, { className: "btn", to: "/tests", children: "All test types" })] })] })) : (_jsxs("div", { className: "grid grid-4", children: [_jsx(Stat, { label: "Last score", value: stats.last ? `${stats.last.correct}/${stats.last.total}` : '—', hint: stats.last ? `${stats.last.percent}% · ${formatDate(stats.last.finishedAt)}` : undefined }), _jsx(Stat, { label: "Best", value: `${stats.best}%` }), _jsx(Stat, { label: "Average", value: `${stats.average}%` }), _jsx(Stat, { label: "Tests taken", value: stats.count })] })), _jsx(GoalCard, { goals: user?.profile.goals[data.levelId] ?? { quick: 45, official: 90 }, lastQuick: stats.lastQuick, lastOfficial: stats.lastOfficial }), stats.categories.length > 0 ? (_jsxs("section", { className: "card stack gap-16", children: [_jsx("h2", { children: "By section" }), _jsx("div", { className: "stack gap-16", children: CATEGORY_ORDER.map((categoryId) => {
                            const row = stats.categories.find((c) => c.categoryId === categoryId);
                            if (!row || row.seen === 0)
                                return null;
                            return (_jsxs("div", { className: "stack gap-8", children: [_jsxs("div", { className: "between", children: [_jsx("span", { className: "small", style: { fontWeight: 600 }, children: CATEGORY_LABELS[categoryId] }), _jsxs("span", { className: "row", style: { gap: 8 }, children: [_jsxs("span", { className: "tiny faint", children: [row.correct, "/", row.seen] }), _jsxs("span", { className: "mono-num", style: { fontWeight: 650 }, children: [row.percent, "%"] })] })] }), _jsx(Bar, { percent: row.percent, tone: toneForPercent(row.percent) })] }, categoryId));
                        }) })] })) : null, _jsx(WeakAreasCard, { topics: weak, titleOf: titleOf }), _jsx(RecentTests, { attempts: data.progress.attempts.slice(0, 6) }), _jsxs("section", { className: "card stack gap-12", children: [_jsxs("div", { className: "between", children: [_jsx("h2", { children: "Quick actions" }), _jsx(Pill, { tone: "accent", children: data.levelName })] }), _jsxs("div", { className: "row", children: [_jsx(Link, { className: "btn", to: "/tests?start=quick-practice", children: "10-question practice" }), _jsx(Link, { className: "btn", to: "/tests?start=mistakes", children: "My mistakes" }), _jsx(Link, { className: "btn", to: "/topics", children: "Browse topics" })] })] })] }));
}
