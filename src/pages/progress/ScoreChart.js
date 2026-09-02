import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { formatDate } from '@/shared/ui/primitives';
/**
 * Score over time as an inline SVG line chart. No charting dependency:
 * the app keeps a very small dependency set (Performance.md §6).
 */
export function ScoreChart({ attempts }) {
    const points = [...attempts].reverse().slice(-20);
    if (points.length < 2)
        return null;
    const W = 640;
    const H = 180;
    const PAD = { top: 14, right: 12, bottom: 26, left: 32 };
    const innerW = W - PAD.left - PAD.right;
    const innerH = H - PAD.top - PAD.bottom;
    const x = (i) => PAD.left + (points.length === 1 ? innerW / 2 : (i / (points.length - 1)) * innerW);
    const y = (percent) => PAD.top + innerH - (percent / 100) * innerH;
    const path = points.map((a, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(a.percent).toFixed(1)}`).join(' ');
    const gridLines = [0, 25, 50, 75, 100];
    return (_jsxs("section", { className: "card stack gap-12", children: [_jsxs("div", { className: "between", children: [_jsx("h2", { children: "Score over time" }), _jsxs("span", { className: "tiny faint", children: ["last ", points.length, " tests"] })] }), _jsxs("svg", { viewBox: `0 0 ${W} ${H}`, style: { width: '100%', height: 'auto', overflow: 'visible' }, role: "img", "aria-label": `Score over time. Latest ${points[points.length - 1]?.percent ?? 0} percent.`, children: [gridLines.map((value) => (_jsxs("g", { children: [_jsx("line", { x1: PAD.left, x2: W - PAD.right, y1: y(value), y2: y(value), stroke: "var(--border)", strokeWidth: "1" }), _jsx("text", { x: PAD.left - 7, y: y(value) + 4, textAnchor: "end", fill: "var(--text-faint)", fontSize: "10", children: value })] }, value))), _jsx("path", { d: path, fill: "none", stroke: "var(--accent)", strokeWidth: "2", strokeLinejoin: "round" }), points.map((attempt, i) => (_jsx("circle", { cx: x(i), cy: y(attempt.percent), r: "3.5", fill: "var(--surface)", stroke: "var(--accent)", strokeWidth: "2", children: _jsx("title", { children: `${formatDate(attempt.finishedAt)}: ${attempt.correct}/${attempt.total} (${attempt.percent}%)` }) }, attempt.id)))] }), _jsxs("div", { className: "between tiny faint", children: [_jsx("span", { children: formatDate(points[0]?.finishedAt ?? '') }), _jsx("span", { children: formatDate(points[points.length - 1]?.finishedAt ?? '') })] })] }));
}
