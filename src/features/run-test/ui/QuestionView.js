import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/** Render one syllable-marked option, e.g. `"'won|der|ful"`. */
function StressOption({ value }) {
    const parts = value.split('|');
    return (_jsx("span", { children: parts.map((part, i) => {
            const stressed = part.startsWith("'");
            const text = stressed ? part.slice(1) : part;
            return (_jsxs("span", { children: [i > 0 ? _jsx("span", { "aria-hidden": "true", className: "syllable-dot", children: "\u00B7" }) : null, _jsx("span", { style: stressed
                            ? { fontWeight: 750, textDecoration: 'underline', textUnderlineOffset: 3 }
                            : undefined, children: text })] }, `${part}-${i}`));
        }) }));
}
export function OptionLabel({ question, value }) {
    if (question.type === 'word-stress')
        return _jsx(StressOption, { value: value });
    return _jsx("span", { children: value });
}
/** Split a prompt on the `___` gap so the blank can be styled. */
export function PromptText({ prompt }) {
    if (!prompt.includes('___'))
        return _jsx(_Fragment, { children: prompt });
    const [before, after] = prompt.split('___');
    return (_jsxs(_Fragment, { children: [before, _jsx("span", { className: "gap-blank", "aria-label": "gap" }), after] }));
}
export function questionHint(question) {
    if (question.type === 'different-sound')
        return 'Which word has a different sound?';
    if (question.type === 'word-stress')
        return 'Which is the stressed syllable?';
    return null;
}
