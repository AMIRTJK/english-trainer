import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLevelIndex } from '@content/registry';
import { useApp } from '@/app/store/app-store';
import { answeredCount, displayOptions, finishSession, } from '@/features/run-test/model/session';
import { clearSession, flushSession, loadSession, saveSession } from '@/features/run-test/model/session-store';
import { Empty } from '@/shared/ui/primitives';
import { OptionLabel, PromptText, questionHint } from '@/features/run-test/ui/QuestionView';
import { RunnerBar } from './RunnerBar';
import './runner.css';
export default function TestRunnerPage() {
    const navigate = useNavigate();
    const { saveAttempt } = useApp();
    const [session, setSession] = useState(() => loadSession());
    const [confirmExit, setConfirmExit] = useState(false);
    const questionStart = useRef(Date.now());
    const index = getLevelIndex(session?.levelId ?? '');
    const item = session ? session.items[session.current] : undefined;
    const question = item ? index?.byId.get(item.questionId) : undefined;
    const options = useMemo(() => (question && item ? displayOptions(question, item.optionOrder) : []), [question, item]);
    useEffect(() => { questionStart.current = Date.now(); }, [session?.current]);
    const update = useCallback((mutate) => {
        setSession((current) => {
            if (!current)
                return current;
            const next = { ...current, items: [...current.items] };
            mutate(next);
            saveSession(next);
            return next;
        });
    }, []);
    const choose = useCallback((choice) => {
        update((draft) => {
            const target = draft.items[draft.current];
            if (!target)
                return;
            draft.items[draft.current] = {
                ...target,
                chosen: choice,
                elapsedMs: target.elapsedMs + (Date.now() - questionStart.current),
            };
        });
    }, [update]);
    const go = useCallback((delta) => {
        update((draft) => {
            draft.current = Math.max(0, Math.min(draft.items.length - 1, draft.current + delta));
        });
    }, [update]);
    const submit = useCallback(() => {
        if (!session)
            return;
        const attempt = finishSession(session);
        if (!attempt)
            return;
        saveAttempt(attempt);
        clearSession();
        navigate(`/results/${attempt.id}`, { replace: true });
    }, [session, saveAttempt, navigate]);
    // Keyboard: 1/2/3 or A/B/C to answer, Enter to advance.
    useEffect(() => {
        const onKey = (event) => {
            if (!session)
                return;
            const key = event.key.toLowerCase();
            const map = { '1': 0, a: 0, '2': 1, b: 1, '3': 2, c: 2 };
            if (key in map) {
                event.preventDefault();
                choose(map[key]);
                return;
            }
            if (key === 'enter') {
                event.preventDefault();
                if (session.current === session.items.length - 1)
                    submit();
                else
                    go(1);
            }
            if (key === 'arrowleft' && session.allowBack)
                go(-1);
            if (key === 'arrowright')
                go(1);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [session, choose, go, submit]);
    // Persist the in-progress test if the tab goes away.
    useEffect(() => {
        const onHide = () => flushSession();
        window.addEventListener('pagehide', onHide);
        document.addEventListener('visibilitychange', onHide);
        return () => {
            window.removeEventListener('pagehide', onHide);
            document.removeEventListener('visibilitychange', onHide);
            flushSession();
        };
    }, []);
    if (!session || !question || !item) {
        return (_jsx("div", { className: "page", children: _jsx(Empty, { title: "No test in progress", children: _jsx("button", { className: "btn", type: "button", onClick: () => navigate('/tests'), children: "Choose a test" }) }) }));
    }
    const total = session.items.length;
    const done = answeredCount(session);
    const isLast = session.current === total - 1;
    const hint = questionHint(question);
    return (_jsxs("div", { className: "runner", children: [_jsx(RunnerBar, { current: session.current + 1, total: total, answered: done, startedAt: session.startedAt, timed: session.timed, onExit: () => setConfirmExit(true) }), _jsxs("main", { className: "runner-main", children: [session.warnings.length > 0 && session.current === 0 ? (_jsx("div", { className: "notice notice-warn", children: session.warnings[0] })) : null, _jsxs("div", { className: "runner-question", children: [hint && hint !== question.prompt ? _jsx("p", { className: "small dim", children: hint }) : null, _jsx("h1", { className: "prompt", children: _jsx(PromptText, { prompt: question.prompt }) })] }), _jsx("div", { className: "runner-options", role: "radiogroup", "aria-label": "Answer options", children: options.map((value, i) => {
                            const letter = ['A', 'B', 'C'][i] ?? '';
                            const active = item.chosen === i;
                            return (_jsxs("button", { type: "button", role: "radio", "aria-checked": active, className: `option${active ? ' is-selected' : ''}`, onClick: () => choose(i), children: [_jsx("span", { className: "option-letter", "aria-hidden": "true", children: letter }), _jsx("span", { className: "option-text", children: _jsx(OptionLabel, { question: question, value: value }) })] }, `${value}-${i}`));
                        }) })] }), _jsxs("footer", { className: "runner-foot", children: [_jsx("button", { className: "btn", type: "button", onClick: () => go(-1), disabled: !session.allowBack || session.current === 0, children: "Back" }), _jsxs("span", { className: "tiny faint mono-num", children: [done, "/", total, " answered"] }), isLast ? (_jsx("button", { className: "btn btn-primary", type: "button", onClick: submit, children: "Finish test" })) : (_jsx("button", { className: "btn btn-primary", type: "button", onClick: () => go(1), children: "Next" }))] }), confirmExit ? (_jsx("div", { className: "runner-modal", role: "dialog", "aria-modal": "true", "aria-label": "Leave test", children: _jsxs("div", { className: "card stack gap-12", style: { maxWidth: 380 }, children: [_jsx("h2", { children: "Leave this test?" }), _jsx("p", { className: "small dim", children: "Your answers so far are saved, so you can come back and finish it later." }), _jsxs("div", { className: "row", children: [_jsx("button", { className: "btn", type: "button", onClick: () => setConfirmExit(false), children: "Keep going" }), _jsx("button", { className: "btn btn-danger", type: "button", onClick: () => { flushSession(); navigate('/tests'); }, children: "Leave" })] })] }) })) : null] }));
}
