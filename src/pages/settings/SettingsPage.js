import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { LEVELS, hasContent } from '@content/registry';
import { useApp } from '@/app/store/app-store';
import { useLevelData } from '@/entities/topic/model/use-level-data';
import { flushUser } from '@/entities/user/model/repository';
import { buildExport, downloadJson, parseImport } from '@/features/manage-data/model/export-import';
import { clearSession } from '@/features/run-test/model/session-store';
import { storageAvailable } from '@/shared/storage/local-store';
export default function SettingsPage() {
    const { user, setActiveLevel, updateUser, replaceUser, clearEverything } = useApp();
    const data = useLevelData();
    const fileRef = useRef(null);
    const [message, setMessage] = useState(null);
    const [confirmClear, setConfirmClear] = useState(false);
    if (!user)
        return _jsx("div", { className: "page" });
    const goals = user.profile.goals[data.levelId] ?? { quick: 45, official: 90 };
    const onExport = () => {
        flushUser();
        downloadJson(buildExport(user), `english-file-trainer-${new Date().toISOString().slice(0, 10)}.json`);
        setMessage({ tone: 'ok', text: 'Backup downloaded.' });
    };
    const onImportFile = async (file) => {
        const text = await file.text();
        const result = parseImport(text);
        if (!result.ok || !result.data) {
            setMessage({ tone: 'warn', text: result.error ?? 'Could not read that backup.' });
            return;
        }
        replaceUser(result.data);
        clearSession();
        setMessage({
            tone: result.warnings.length ? 'warn' : 'ok',
            text: result.warnings.length ? result.warnings.join(' ') : 'Backup restored.',
        });
    };
    return (_jsxs("div", { className: "page stack gap-24", children: [_jsx("h1", { children: "Settings" }), message ? (_jsx("div", { className: `notice ${message.tone === 'warn' ? 'notice-warn' : ''}`, role: "status", children: message.text })) : null, !storageAvailable() ? (_jsx("div", { className: "notice notice-warn", children: "This browser is blocking local storage, so results will be lost when you close the tab. Export a backup before you leave." })) : null, _jsxs("section", { className: "card stack gap-16", children: [_jsx("h2", { children: "Profile" }), _jsxs("div", { className: "stack gap-8", children: [_jsx("label", { className: "small", htmlFor: "name", children: "Name" }), _jsx("input", { id: "name", className: "input", value: user.profile.name, onChange: (e) => updateUser((draft) => { draft.profile.name = e.target.value; }) })] }), _jsxs("div", { className: "stack gap-8", children: [_jsx("label", { className: "small", htmlFor: "level", children: "Active level" }), _jsx("select", { id: "level", className: "select", value: user.profile.activeLevelId, onChange: (e) => setActiveLevel(e.target.value), children: LEVELS.map((level) => (_jsxs("option", { value: level.id, children: [level.name, hasContent(level.id) ? '' : ' — no content yet'] }, level.id))) }), !hasContent(user.profile.activeLevelId) ? (_jsx("p", { className: "notice notice-warn", children: "Content for this level is not available yet." })) : (_jsx("p", { className: "tiny faint", children: "Results are stored per level and never mixed together." }))] })] }), _jsxs("section", { className: "card stack gap-16", children: [_jsxs("h2", { children: ["Targets for ", data.levelName] }), [['quick', 'Quick Test', 50], ['official', 'Official Test', 100]].map(([key, label, max]) => (_jsxs("div", { className: "stack gap-8", children: [_jsxs("label", { className: "small", htmlFor: `goal-${key}`, children: [label, " target (out of ", max, ")"] }), _jsx("input", { id: `goal-${key}`, className: "input", type: "number", min: 0, max: max, value: goals[key], onChange: (e) => {
                                    const value = Math.max(0, Math.min(max, Number(e.target.value) || 0));
                                    updateUser((draft) => {
                                        draft.profile.goals[data.levelId] = { ...goals, [key]: value };
                                    });
                                } })] }, key)))] }), _jsxs("section", { className: "card stack gap-12", children: [_jsx("h2", { children: "Test behaviour" }), [
                        ['timerEnabled', 'Show a timer during timed tests'],
                        ['allowBack', 'Allow going back to a previous question'],
                        ['shuffleOptions', 'Shuffle the answer options'],
                    ].map(([key, label]) => (_jsxs("label", { className: "row", style: { gap: 9 }, children: [_jsx("input", { type: "checkbox", checked: user.profile.settings[key], onChange: (e) => updateUser((draft) => { draft.profile.settings[key] = e.target.checked; }) }), _jsx("span", { className: "small", children: label })] }, key)))] }), _jsxs("section", { className: "card stack gap-12", children: [_jsx("h2", { children: "Your data" }), _jsx("p", { className: "small dim", children: "Everything is stored in this browser only. Export a backup so a cleared browser does not lose your history." }), _jsxs("div", { className: "row", children: [_jsx("button", { className: "btn", type: "button", onClick: onExport, children: "Export JSON" }), _jsx("button", { className: "btn", type: "button", onClick: () => fileRef.current?.click(), children: "Import JSON" }), _jsx("input", { ref: fileRef, type: "file", accept: "application/json,.json", className: "visually-hidden", onChange: (e) => {
                                    const file = e.target.files?.[0];
                                    if (file)
                                        void onImportFile(file);
                                    e.target.value = '';
                                } })] })] }), _jsxs("section", { className: "card stack gap-12", children: [_jsx("h2", { children: "Clear all data" }), _jsx("p", { className: "small dim", children: "Removes your name, level, goals, settings, test history, mistakes and statistics from this browser. This cannot be undone." }), confirmClear ? (_jsxs("div", { className: "stack gap-12", children: [_jsx("p", { className: "notice notice-bad", children: "This will permanently delete everything. Export a backup first if you want to keep it." }), _jsxs("div", { className: "row", children: [_jsx("button", { className: "btn", type: "button", onClick: () => setConfirmClear(false), children: "Cancel" }), _jsx("button", { className: "btn btn-danger", type: "button", onClick: () => { clearSession(); clearEverything(); }, children: "Yes, delete everything" })] })] })) : (_jsx("button", { className: "btn btn-danger", type: "button", onClick: () => setConfirmClear(true), children: "Clear all data" }))] })] }));
}
