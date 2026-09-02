import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Pill, formatDate, toneForPercent } from '@/shared/ui/primitives';
export const KIND_LABEL = {
    quick: 'Quick Test',
    official: 'Official Test',
    full: 'Full Test',
    custom: 'Custom Test',
    'weak-areas': 'Weak Areas',
    mistakes: 'My Mistakes',
    'quick-practice': 'Quick Practice',
    imported: 'Imported paper test',
};
export function RecentTests({ attempts }) {
    return (_jsxs("section", { className: "card stack gap-12", children: [_jsx("h2", { children: "Recent tests" }), attempts.length === 0 ? (_jsx("p", { className: "small dim", children: "No tests yet." })) : (_jsx("div", { className: "stack gap-8", children: attempts.map((attempt) => {
                    const row = (_jsxs(_Fragment, { children: [_jsxs("div", { className: "grow", children: [_jsx("div", { className: "small", style: { fontWeight: 600 }, children: KIND_LABEL[attempt.kind] }), _jsxs("div", { className: "tiny faint", children: [formatDate(attempt.finishedAt), attempt.detailAvailable ? '' : ' · totals only'] })] }), _jsxs(Pill, { tone: toneForPercent(attempt.percent), children: [attempt.correct, "/", attempt.total, " \u00B7 ", attempt.percent, "%"] })] }));
                    return attempt.detailAvailable ? (_jsx(Link, { to: `/results/${attempt.id}`, className: "between card card-tight", style: { textDecoration: 'none', color: 'inherit' }, children: row }, attempt.id)) : (_jsx("div", { className: "between card card-tight", children: row }, attempt.id));
                }) }))] }));
}
