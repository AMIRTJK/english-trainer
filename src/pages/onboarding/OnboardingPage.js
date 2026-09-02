import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { LEVELS, hasContent } from '@content/registry';
import { IMPORTED_TEST_META } from '@content/beginner/imported-quick-test';
import { useApp } from '@/app/store/app-store';
export function OnboardingPage() {
    const { createUser } = useApp();
    const [name, setName] = useState('');
    const [levelId, setLevelId] = useState('beginner');
    const [seed, setSeed] = useState(true);
    const available = hasContent(levelId);
    return (_jsx("div", { className: "page", style: { maxWidth: 520, paddingTop: 48 }, children: _jsxs("div", { className: "stack gap-24", children: [_jsxs("div", { className: "stack gap-8", children: [_jsx("h1", { children: "English File Trainer" }), _jsx("p", { className: "dim", children: "Practice built only from your own course books \u2014 English File 4th edition Beginner, Student\u2019s Book and Workbook. Everything is stored in this browser." })] }), _jsxs("form", { className: "card stack gap-16", onSubmit: (event) => {
                        event.preventDefault();
                        if (available)
                            createUser(name, levelId, seed);
                    }, children: [_jsxs("div", { className: "stack gap-8", children: [_jsx("label", { className: "small", htmlFor: "name", children: "Your name" }), _jsx("input", { id: "name", className: "input", value: name, onChange: (event) => setName(event.target.value), placeholder: "Amir", autoComplete: "given-name" })] }), _jsxs("div", { className: "stack gap-8", children: [_jsx("label", { className: "small", htmlFor: "level", children: "Current level" }), _jsx("select", { id: "level", className: "select", value: levelId, onChange: (event) => setLevelId(event.target.value), children: LEVELS.map((level) => (_jsxs("option", { value: level.id, children: [level.name, hasContent(level.id) ? '' : ' — no content yet'] }, level.id))) }), !available ? (_jsx("p", { className: "notice notice-warn", children: "Content for this level is not available yet." })) : null] }), _jsxs("label", { className: "row", style: { alignItems: 'flex-start', gap: 10 }, children: [_jsx("input", { type: "checkbox", checked: seed, onChange: (event) => setSeed(event.target.checked), style: { marginTop: 4 } }), _jsxs("span", { className: "small", children: [_jsx("strong", { children: "Import my paper Quick Test" }), _jsx("br", {}), _jsxs("span", { className: "dim", children: ["Adds the ", IMPORTED_TEST_META.paper, " result (", IMPORTED_TEST_META.correct, "/", IMPORTED_TEST_META.total, ",", ' ', IMPORTED_TEST_META.percent, "%) and all ", IMPORTED_TEST_META.wrong, " mistakes as your starting history."] })] })] }), _jsx("button", { className: "btn btn-primary btn-block", type: "submit", disabled: !available, children: "Start" })] })] }) }));
}
