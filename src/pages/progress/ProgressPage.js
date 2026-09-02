import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { CATEGORY_LABELS, CATEGORY_ORDER } from '@content/registry';
import { useLevelData } from '@/entities/topic/model/use-level-data';
import { categoryBreakdown } from '@/entities/attempt/model/statistics';
import { Bar, Empty, Pill, Stat, formatDate, toneForPercent } from '@/shared/ui/primitives';
import { KIND_LABEL } from '@/pages/dashboard/RecentTests';
import { ScoreChart } from './ScoreChart';
export default function ProgressPage() {
    const data = useLevelData();
    const view = useMemo(() => {
        const attempts = data.progress.attempts.filter((a) => a.total > 0);
        const categories = categoryBreakdown(data.progress.topicStats);
        const quick = attempts.filter((a) => a.kind === 'quick');
        const official = attempts.filter((a) => a.kind === 'official');
        let freshSeen = 0;
        let freshCorrect = 0;
        for (const stat of Object.values(data.progress.topicStats)) {
            freshSeen += stat.firstTrySeen;
            freshCorrect += stat.firstTryCorrect;
        }
        const uniqueQuestions = new Set();
        const uniqueConstructs = new Set();
        for (const stat of Object.values(data.progress.topicStats)) {
            for (const id of stat.seenQuestionIds)
                uniqueQuestions.add(id);
            for (const id of stat.seenConstructIds)
                uniqueConstructs.add(id);
        }
        return {
            attempts, categories, quick, official,
            freshPercent: freshSeen === 0 ? 0 : Math.round((freshCorrect / freshSeen) * 100),
            freshSeen,
            uniqueQuestions: uniqueQuestions.size,
            uniqueConstructs: uniqueConstructs.size,
            poolSize: data.index?.content.questions.length ?? 0,
        };
    }, [data.progress, data.index]);
    if (!data.hasContent) {
        return _jsx("div", { className: "page", children: _jsx(Empty, { title: "Content for this level is not available yet" }) });
    }
    if (view.attempts.length === 0) {
        return (_jsxs("div", { className: "page stack gap-24", children: [_jsxs("h1", { children: [data.levelName, " progress"] }), _jsx(Empty, { title: "No results yet", children: "Take a test and your progress will appear here." })] }));
    }
    const coverage = view.poolSize === 0 ? 0 : Math.round((view.uniqueQuestions / view.poolSize) * 100);
    return (_jsxs("div", { className: "page stack gap-24", children: [_jsxs("header", { className: "stack gap-8", children: [_jsxs("h1", { children: [data.levelName, " progress"] }), _jsxs("p", { className: "dim small", children: ["Results for ", data.levelName, " only. Other levels are counted separately."] })] }), _jsxs("div", { className: "grid grid-4", children: [_jsx(Stat, { label: "Tests", value: view.attempts.length }), _jsx(Stat, { label: "On new questions", value: view.freshSeen === 0 ? '—' : `${view.freshPercent}%`, hint: `${view.freshSeen} first attempts` }), _jsx(Stat, { label: "Bank covered", value: `${coverage}%`, hint: `${view.uniqueQuestions} of ${view.poolSize} questions` }), _jsx(Stat, { label: "Structures met", value: view.uniqueConstructs, hint: "distinct rules" })] }), _jsx(ScoreChart, { attempts: view.attempts }), _jsxs("section", { className: "card stack gap-16", children: [_jsx("h2", { children: "By section" }), CATEGORY_ORDER.map((categoryId) => {
                        const row = view.categories.find((c) => c.categoryId === categoryId);
                        if (!row || row.seen === 0)
                            return null;
                        return (_jsxs("div", { className: "stack gap-8", children: [_jsxs("div", { className: "between", children: [_jsx("span", { className: "small", style: { fontWeight: 600 }, children: CATEGORY_LABELS[categoryId] }), _jsxs("span", { className: "row", style: { gap: 8 }, children: [_jsxs("span", { className: "tiny faint mono-num", children: [row.correct, "/", row.seen] }), _jsxs("span", { className: "mono-num", style: { fontWeight: 650 }, children: [row.percent, "%"] })] })] }), _jsx(Bar, { percent: row.percent, tone: toneForPercent(row.percent) })] }, categoryId));
                    })] }), [['Quick Test', view.quick], ['Official Test', view.official]].map(([label, list]) => {
                const attempts = list;
                if (attempts.length === 0)
                    return null;
                return (_jsxs("section", { className: "card stack gap-12", children: [_jsxs("h2", { children: [label, " history"] }), _jsx("div", { className: "stack gap-8", children: attempts.slice(0, 10).map((attempt) => (_jsxs("div", { className: "between", children: [_jsxs("span", { className: "small grow", children: [formatDate(attempt.finishedAt), _jsxs("span", { className: "faint", children: [" \u00B7 ", KIND_LABEL[attempt.kind]] })] }), _jsxs(Pill, { tone: toneForPercent(attempt.percent), children: [attempt.correct, "/", attempt.total] })] }, attempt.id))) })] }, label));
            }), _jsxs("section", { className: "card stack gap-12", children: [_jsx("h2", { children: "Topics that need more data" }), _jsx("p", { className: "small dim", children: "These have too few answers to judge. They are not weak \u2014 they are unmeasured." }), _jsx("div", { className: "row", style: { gap: 6 }, children: data.summaries
                            .filter((s) => s.status === 'not-enough-data')
                            .slice(0, 24)
                            .map((s) => (_jsx(Pill, { children: data.index?.topicById.get(s.topicId)?.title ?? s.topicId }, s.topicId))) })] })] }));
}
