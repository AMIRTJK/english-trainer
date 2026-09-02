import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { CATEGORY_LABELS } from '@content/registry';
import { Bar, Pill, toneForPercent } from '@/shared/ui/primitives';
const STATUS_LABEL = {
    weak: 'Weak area',
    review: 'Needs review',
    strong: 'Strong',
    'not-enough-data': 'Not enough data',
};
export function TopicRow({ topic, title }) {
    const unproven = topic.status === 'not-enough-data';
    return (_jsxs("div", { className: "stack gap-8", children: [_jsxs("div", { className: "between", children: [_jsxs("div", { className: "grow", children: [_jsx("div", { className: "small", style: { fontWeight: 600 }, children: title }), _jsxs("div", { className: "tiny faint", children: [CATEGORY_LABELS[topic.categoryId], " \u00B7 ", topic.seen, " answered \u00B7 ", topic.uniqueQuestions, " unique"] })] }), _jsxs("div", { className: "row", style: { gap: 8 }, children: [unproven ? _jsx(Pill, { children: STATUS_LABEL[topic.status] }) : null, _jsx("span", { className: "mono-num", style: { fontWeight: 650 }, children: topic.seen === 0 ? '—' : `${topic.percent}%` })] })] }), _jsx(Bar, { percent: topic.percent, tone: unproven ? 'neutral' : toneForPercent(topic.percent) })] }));
}
export function WeakAreasCard({ topics, titleOf, }) {
    return (_jsxs("section", { className: "card stack gap-16", children: [_jsxs("div", { className: "between", children: [_jsx("h2", { children: "Your weak areas" }), _jsx(Link, { className: "btn btn-sm", to: "/tests?start=weak-areas", children: "Practise" })] }), topics.length === 0 ? (_jsx("p", { className: "small dim", children: "Nothing to report yet. Take a test and the topics you lose marks in will appear here." })) : (_jsx("div", { className: "stack gap-16", children: topics.map((topic) => (_jsx(TopicRow, { topic: topic, title: titleOf(topic.topicId) }, topic.topicId))) }))] }));
}
