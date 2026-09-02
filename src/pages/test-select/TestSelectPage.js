import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PRESETS, findPreset } from '@/features/build-test/model/presets';
import { planTest } from '@/features/build-test/model/plan-test';
import { createSession } from '@/features/run-test/model/session';
import { useLevelData } from '@/entities/topic/model/use-level-data';
import { useApp } from '@/app/store/app-store';
import { Empty } from '@/shared/ui/primitives';
import { saveSession } from '@/features/run-test/model/session-store';
import { CustomTestBuilder } from './CustomTestBuilder';
export default function TestSelectPage() {
    const navigate = useNavigate();
    const [params, setParams] = useSearchParams();
    const data = useLevelData();
    const { user } = useApp();
    const [error, setError] = useState(null);
    const start = useCallback((kind, custom) => {
        const preset = findPreset(kind);
        const count = custom?.count ?? preset?.count ?? 20;
        const plan = planTest({
            levelId: data.levelId,
            kind,
            count,
            topicIds: custom?.topicIds ?? [],
            categoryIds: custom?.categoryIds ?? [],
            adaptive: custom?.adaptive ?? preset?.adaptive ?? false,
            mistakesOnly: preset?.mistakesOnly ?? false,
            mix: custom ? null : preset?.mix ?? null,
        }, data.progress);
        if (plan.items.length === 0) {
            setError(kind === 'mistakes'
                ? 'You have no recorded mistakes yet, so there is nothing to practise here. Take a test first.'
                : 'No questions match this selection. Choose at least one topic that has questions.');
            return;
        }
        const fresh = plan.items
            .filter((item) => !data.progress.questionStats[item.questionId])
            .map((item) => item.questionId);
        const session = createSession(plan, {
            timed: (preset?.timed ?? false) && (user?.profile.settings.timerEnabled ?? true),
            allowBack: user?.profile.settings.allowBack ?? true,
            freshIds: fresh,
        });
        saveSession(session);
        navigate('/test/run');
    }, [data.levelId, data.progress, navigate, user]);
    // Allow deep links like /tests?start=quick from the dashboard.
    const requested = params.get('start');
    useEffect(() => {
        if (!requested)
            return;
        setParams({}, { replace: true });
        if (PRESETS.some((p) => p.kind === requested))
            start(requested);
    }, [requested, setParams, start]);
    if (!data.hasContent) {
        return (_jsx("div", { className: "page", children: _jsx(Empty, { title: "Content for this level is not available yet" }) }));
    }
    return (_jsxs("div", { className: "page stack gap-24", children: [_jsxs("header", { className: "stack gap-8", children: [_jsx("h1", { children: "Tests" }), _jsx("p", { className: "dim small", children: "Every question comes from your course books and has been checked before being used." })] }), error ? _jsx("div", { className: "notice notice-warn", role: "alert", children: error }) : null, _jsx("section", { className: "grid grid-2", children: PRESETS.map((preset) => (_jsxs("button", { type: "button", className: "card stack gap-8", style: { textAlign: 'left', cursor: 'pointer' }, onClick: () => { setError(null); start(preset.kind); }, children: [_jsxs("div", { className: "between", children: [_jsx("h3", { children: preset.title }), _jsxs("span", { className: "pill pill-accent", children: [preset.count, " q"] })] }), _jsx("p", { className: "small dim", children: preset.description })] }, preset.kind))) }), _jsx(CustomTestBuilder, { topics: data.index?.content.topics ?? [], summaries: data.byTopicId, countsByTopic: (id) => data.index?.byTopic.get(id)?.length ?? 0, onStart: (selection) => { setError(null); start('custom', selection); } })] }));
}
