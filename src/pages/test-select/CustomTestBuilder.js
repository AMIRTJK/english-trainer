import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { CATEGORY_LABELS, CATEGORY_ORDER } from '@content/registry';
const COUNTS = [10, 20, 30, 50, 100];
export function CustomTestBuilder({ topics, summaries, countsByTopic, onStart, }) {
    const [selected, setSelected] = useState(new Set());
    const [count, setCount] = useState(20);
    const [adaptive, setAdaptive] = useState(false);
    const [touched, setTouched] = useState(false);
    const grouped = useMemo(() => {
        const map = new Map();
        for (const topic of topics) {
            const list = map.get(topic.categoryId);
            if (list)
                list.push(topic);
            else
                map.set(topic.categoryId, [topic]);
        }
        return map;
    }, [topics]);
    const available = useMemo(() => {
        let total = 0;
        for (const id of selected)
            total += countsByTopic(id);
        return total;
    }, [selected, countsByTopic]);
    const toggle = (id) => {
        setTouched(true);
        setSelected((prev) => {
            const next = new Set(prev);
            if (next.has(id))
                next.delete(id);
            else
                next.add(id);
            return next;
        });
    };
    const toggleCategory = (categoryId) => {
        setTouched(true);
        const ids = (grouped.get(categoryId) ?? []).map((t) => t.id);
        setSelected((prev) => {
            const next = new Set(prev);
            const allOn = ids.every((id) => next.has(id));
            for (const id of ids) {
                if (allOn)
                    next.delete(id);
                else
                    next.add(id);
            }
            return next;
        });
    };
    const empty = selected.size === 0;
    const tooFew = !empty && available < count;
    return (_jsxs("section", { className: "card stack gap-16", children: [_jsxs("div", { className: "stack gap-8", children: [_jsx("h2", { children: "Custom test" }), _jsx("p", { className: "small dim", children: "Pick the topics you want. The test will contain questions from those topics only." })] }), CATEGORY_ORDER.map((categoryId) => {
                const list = grouped.get(categoryId);
                if (!list || list.length === 0)
                    return null;
                return (_jsxs("fieldset", { className: "stack gap-8", style: { border: 0, padding: 0, margin: 0 }, children: [_jsxs("div", { className: "between", children: [_jsx("legend", { className: "small", style: { fontWeight: 650, padding: 0 }, children: CATEGORY_LABELS[categoryId] }), _jsx("button", { type: "button", className: "link-btn tiny", onClick: () => toggleCategory(categoryId), children: "Toggle all" })] }), _jsx("div", { className: "grid grid-2", style: { gap: 8 }, children: list.map((topic) => {
                                const n = countsByTopic(topic.id);
                                const summary = summaries.get(topic.id);
                                return (_jsxs("label", { className: "row card card-tight", style: { alignItems: 'flex-start', gap: 9, cursor: n === 0 ? 'not-allowed' : 'pointer' }, children: [_jsx("input", { type: "checkbox", checked: selected.has(topic.id), disabled: n === 0, onChange: () => toggle(topic.id), style: { marginTop: 3 } }), _jsxs("span", { className: "grow", children: [_jsx("span", { className: "small", style: { fontWeight: 600 }, children: topic.title }), _jsxs("span", { className: "tiny faint", style: { display: 'block' }, children: [n, " question", n === 1 ? '' : 's', summary && summary.seen > 0 ? ` · ${summary.percent}% so far` : ''] })] })] }, topic.id));
                            }) })] }, categoryId));
            }), _jsx("hr", { className: "divider" }), _jsxs("div", { className: "stack gap-12", children: [_jsxs("div", { className: "row", children: [_jsx("span", { className: "small", style: { fontWeight: 600 }, children: "Questions" }), COUNTS.map((n) => (_jsx("button", { type: "button", className: `btn btn-sm${count === n ? ' btn-primary' : ''}`, onClick: () => setCount(n), children: n }, n)))] }), _jsxs("label", { className: "row", style: { gap: 9 }, children: [_jsx("input", { type: "checkbox", checked: adaptive, onChange: (e) => setAdaptive(e.target.checked) }), _jsxs("span", { className: "small", children: ["Focus on my weak spots", _jsx("span", { className: "faint", children: " \u2014 give more room to topics and questions I get wrong" })] })] }), touched && empty ? (_jsx("p", { className: "notice notice-warn", role: "alert", children: "Choose at least one topic before starting the test." })) : null, tooFew ? (_jsxs("p", { className: "notice notice-warn", children: ["These topics have ", available, " verified question", available === 1 ? '' : 's', ". The test will have ", available, " instead of ", count, " \u2014 nothing is repeated to pad it out."] })) : null, _jsxs("button", { type: "button", className: "btn btn-primary", disabled: empty, onClick: () => onStart({
                            topicIds: [...selected], categoryIds: [], count, adaptive,
                        }), children: ["Start custom test", empty ? '' : ` · ${Math.min(count, available)} questions`] })] })] }));
}
