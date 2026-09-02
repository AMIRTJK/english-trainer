import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { formatDuration } from '@/shared/ui/primitives';
export function RunnerBar({ current, total, answered, startedAt, timed, onExit, }) {
    const [elapsed, setElapsed] = useState(() => Date.now() - Date.parse(startedAt));
    useEffect(() => {
        if (!timed)
            return undefined;
        const id = setInterval(() => setElapsed(Date.now() - Date.parse(startedAt)), 1000);
        // Always clear the interval on unmount (Performance.md §2).
        return () => clearInterval(id);
    }, [timed, startedAt]);
    const progress = total === 0 ? 0 : (answered / total) * 100;
    return (_jsxs("header", { className: "runner-head", children: [_jsxs("div", { className: "runner-head-row", children: [_jsx("button", { className: "btn btn-sm", type: "button", onClick: onExit, children: "Exit" }), _jsxs("span", { className: "small mono-num", "aria-live": "polite", children: ["Question ", current, " of ", total] }), _jsx("span", { className: "small mono-num faint", "aria-hidden": !timed, children: timed ? formatDuration(elapsed) : '' })] }), _jsx("div", { className: "runner-progress", children: _jsx("span", { style: { width: `${progress}%` } }) })] }));
}
