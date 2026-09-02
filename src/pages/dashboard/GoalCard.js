import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bar, toneForPercent } from '@/shared/ui/primitives';
function GoalRow({ label, target, max, attempt, }) {
    const score = attempt ? Math.round((attempt.percent / 100) * max) : null;
    const gap = score === null ? null : target - score;
    const progress = score === null ? 0 : Math.min(100, (score / target) * 100);
    return (_jsxs("div", { className: "stack gap-8", children: [_jsxs("div", { className: "between", children: [_jsx("span", { className: "small", style: { fontWeight: 600 }, children: label }), _jsx("span", { className: "tiny faint", children: score === null ? 'no result yet' : `${score}/${max} · target ${target}/${max}` })] }), _jsx(Bar, { percent: progress, tone: score === null ? 'neutral' : toneForPercent(progress) }), gap !== null ? (_jsx("span", { className: "tiny dim", children: gap <= 0
                    ? 'Target reached.'
                    : `${gap} more ${gap === 1 ? 'mark' : 'marks'} to reach your target.` })) : null] }));
}
export function GoalCard({ goals, lastQuick, lastOfficial, }) {
    return (_jsxs("section", { className: "card stack gap-16", children: [_jsx("h2", { children: "Progress to your target" }), _jsx(GoalRow, { label: "Quick Test", target: goals.quick, max: 50, attempt: lastQuick }), _jsx(GoalRow, { label: "Official Test", target: goals.official, max: 100, attempt: lastOfficial })] }));
}
