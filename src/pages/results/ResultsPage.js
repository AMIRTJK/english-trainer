import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CATEGORY_LABELS, getLevelIndex } from '@content/registry';
import { useApp } from '@/app/store/app-store';
import { useLevelData } from '@/entities/topic/model/use-level-data';
import { attemptCategoryBreakdown } from '@/entities/attempt/model/statistics';
import { Bar, Empty, Pill, Stat, formatDuration, toneForPercent } from '@/shared/ui/primitives';
import { KIND_LABEL } from '@/pages/dashboard/RecentTests';
import { MistakeList } from './MistakeList';
export default function ResultsPage() {
    const { attemptId } = useParams();
    const navigate = useNavigate();
    const { user } = useApp();
    const data = useLevelData();
    const attempt = useMemo(() => data.progress.attempts.find((a) => a.id === attemptId) ?? null, [data.progress.attempts, attemptId]);
    const previous = useMemo(() => {
        if (!attempt)
            return null;
        return data.progress.attempts.find((a) => a.kind === attempt.kind && a.id !== attempt.id && a.total > 0) ?? null;
    }, [data.progress.attempts, attempt]);
    const analysis = useMemo(() => {
        if (!attempt)
            return null;
        const categories = attemptCategoryBreakdown(attempt);
        const byTopic = new Map();
        let freshSeen = 0;
        let freshCorrect = 0;
        let repeatSeen = 0;
        let repeatCorrect = 0;
        const constructs = new Set();
        const previouslyWrong = { seen: 0, correct: 0 };
        for (const answer of attempt.answers) {
            const row = byTopic.get(answer.topicId) ?? { seen: 0, correct: 0 };
            row.seen += 1;
            if (answer.correct)
                row.correct += 1;
            byTopic.set(answer.topicId, row);
            constructs.add(answer.constructId);
            if (answer.firstSeen) {
                freshSeen += 1;
                if (answer.correct)
                    freshCorrect += 1;
            }
            else {
                repeatSeen += 1;
                if (answer.correct)
                    repeatCorrect += 1;
            }
            if (answer.reason === 'previous-mistake' || answer.reason === 'recent-error') {
                previouslyWrong.seen += 1;
                if (answer.correct)
                    previouslyWrong.correct += 1;
            }
        }
        const weakest = [...categories].sort((a, b) => a.percent - b.percent)[0] ?? null;
        return {
            categories, byTopic, freshSeen, freshCorrect, repeatSeen, repeatCorrect,
            constructs: constructs.size, previouslyWrong, weakest,
        };
    }, [attempt]);
    if (!attempt || !analysis) {
        return (_jsx("div", { className: "page", children: _jsx(Empty, { title: "That result is not available", children: _jsx("button", { className: "btn", type: "button", onClick: () => navigate('/'), children: "Back to dashboard" }) }) }));
    }
    const index = getLevelIndex(attempt.levelId);
    const titleOf = (id) => index?.topicById.get(id)?.title ?? 'Unclassified';
    const goals = user?.profile.goals[data.levelId];
    const maxForKind = attempt.kind === 'official' ? 100 : 50;
    const target = attempt.kind === 'official' ? goals?.official : goals?.quick;
    const pct = (n, d) => (d === 0 ? 0 : Math.round((n / d) * 100));
    return (_jsxs("div", { className: "page stack gap-24", children: [_jsxs("header", { className: "stack gap-8", children: [_jsx("span", { className: "small dim", children: KIND_LABEL[attempt.kind] }), _jsxs("h1", { children: ["Score: ", attempt.correct, "/", attempt.total] }), _jsxs("div", { className: "row", children: [_jsxs(Pill, { tone: toneForPercent(attempt.percent), children: [attempt.percent, "%"] }), _jsxs("span", { className: "small dim", children: [attempt.wrong, " mistakes"] }), attempt.durationMs > 0 ? (_jsxs("span", { className: "small dim", children: ["\u00B7 ", formatDuration(attempt.durationMs)] })) : null, previous ? (_jsxs("span", { className: "small dim", children: ["\u00B7 previous ", KIND_LABEL[attempt.kind], ": ", previous.percent, "%", ' ', "(", attempt.percent >= previous.percent ? '+' : '', attempt.percent - previous.percent, ")"] })) : null] })] }), target && (attempt.kind === 'quick' || attempt.kind === 'official') ? (_jsxs("div", { className: "notice", children: ["Target for this test: ", target, "/", maxForKind, ". You scored ", attempt.correct, "/", attempt.total, attempt.total === maxForKind && attempt.correct >= target
                        ? ' — target reached.'
                        : `. ${Math.max(0, target - Math.round((attempt.percent / 100) * maxForKind))} marks to go.`] })) : null, _jsxs("section", { className: "card stack gap-16", children: [_jsx("h2", { children: "By section" }), analysis.categories.map((row) => (_jsxs("div", { className: "stack gap-8", children: [_jsxs("div", { className: "between", children: [_jsx("span", { className: "small", style: { fontWeight: 600 }, children: CATEGORY_LABELS[row.categoryId] }), _jsxs("span", { className: "row", style: { gap: 8 }, children: [_jsxs("span", { className: "tiny faint", children: [row.correct, "/", row.seen] }), _jsxs("span", { className: "mono-num", style: { fontWeight: 650 }, children: [row.percent, "%"] })] })] }), _jsx(Bar, { percent: row.percent, tone: toneForPercent(row.percent) })] }, row.categoryId))), analysis.weakest && analysis.weakest.percent < 100 ? (_jsxs("div", { className: "notice", children: [_jsxs("strong", { children: ["Your weakest section: ", CATEGORY_LABELS[analysis.weakest.categoryId]] }), ' ', "(", analysis.weakest.percent, "%).", ' ', _jsx(Link, { to: "/tests?start=weak-areas", children: "Practise weak areas" })] })) : null] }), _jsxs("section", { className: "stack gap-12", children: [_jsx("h2", { children: "What this score really shows" }), _jsxs("div", { className: "grid grid-4", children: [_jsx(Stat, { label: "New questions", value: analysis.freshSeen === 0 ? '—' : `${pct(analysis.freshCorrect, analysis.freshSeen)}%`, hint: `${analysis.freshCorrect}/${analysis.freshSeen} you had never seen` }), _jsx(Stat, { label: "Seen before", value: analysis.repeatSeen === 0 ? '—' : `${pct(analysis.repeatCorrect, analysis.repeatSeen)}%`, hint: `${analysis.repeatCorrect}/${analysis.repeatSeen} repeats` }), _jsx(Stat, { label: "Old mistakes", value: analysis.previouslyWrong.seen === 0
                                    ? '—'
                                    : `${pct(analysis.previouslyWrong.correct, analysis.previouslyWrong.seen)}%`, hint: `${analysis.previouslyWrong.correct}/${analysis.previouslyWrong.seen} fixed` }), _jsx(Stat, { label: "Distinct structures", value: analysis.constructs, hint: "different rules tested" })] }), _jsx("p", { className: "tiny faint", children: "A high score on questions you have seen before is not the same as understanding. The \u201Cnew questions\u201D number is the honest one." })] }), _jsxs("section", { className: "card stack gap-12", children: [_jsx("h2", { children: "By topic" }), _jsx("div", { className: "stack gap-8", children: [...analysis.byTopic.entries()]
                            .sort((a, b) => (a[1].correct / a[1].seen) - (b[1].correct / b[1].seen))
                            .map(([topicId, row]) => (_jsxs("div", { className: "between", children: [_jsx("span", { className: "small grow", children: titleOf(topicId) }), _jsxs("span", { className: "row", style: { gap: 8 }, children: [_jsxs("span", { className: "tiny faint mono-num", children: [row.correct, "/", row.seen] }), _jsxs(Pill, { tone: toneForPercent(pct(row.correct, row.seen)), children: [pct(row.correct, row.seen), "%"] })] })] }, topicId))) })] }), _jsx(MistakeList, { attempt: attempt, titleOf: titleOf }), _jsxs("div", { className: "row", children: [_jsx(Link, { className: "btn btn-primary", to: "/tests?start=weak-areas", children: "Practise weak areas" }), _jsx(Link, { className: "btn", to: "/tests?start=mistakes", children: "Practise my mistakes" }), _jsx(Link, { className: "btn", to: "/", children: "Dashboard" })] })] }));
}
