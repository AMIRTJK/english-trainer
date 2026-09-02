import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const toneClass = {
    neutral: '',
    good: 'pill-good',
    warn: 'pill-warn',
    bad: 'pill-bad',
    accent: 'pill-accent',
};
export function Pill({ tone = 'neutral', children }) {
    return _jsx("span", { className: `pill ${toneClass[tone]}`, children: children });
}
export function toneForPercent(percent) {
    if (percent >= 85)
        return 'good';
    if (percent >= 70)
        return 'warn';
    return 'bad';
}
const barTone = {
    neutral: '', good: 'bar-good', warn: 'bar-warn', bad: 'bar-bad', accent: '',
};
export function Bar({ percent, tone = 'accent' }) {
    const clamped = Math.max(0, Math.min(100, percent));
    return (_jsx("div", { className: `bar ${barTone[tone]}`, role: "img", "aria-label": `${Math.round(clamped)} percent`, children: _jsx("span", { style: { width: `${clamped}%` } }) }));
}
export function Stat({ label, value, hint }) {
    return (_jsxs("div", { className: "card card-tight stack gap-8", children: [_jsx("div", { className: "stat-label", children: label }), _jsx("div", { className: "stat-value", children: value }), hint ? _jsx("div", { className: "tiny dim", children: hint }) : null] }));
}
export function Empty({ title, children }) {
    return (_jsxs("div", { className: "card stack gap-8", style: { textAlign: 'center', padding: '30px 18px' }, children: [_jsx("h3", { children: title }), children ? _jsx("div", { className: "small dim", children: children }) : null] }));
}
export function formatDuration(ms) {
    const totalSeconds = Math.max(0, Math.round(ms / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    if (minutes === 0)
        return `${seconds}s`;
    return `${minutes}m ${String(seconds).padStart(2, '0')}s`;
}
export function formatDate(iso) {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime()))
        return '—';
    return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
}
