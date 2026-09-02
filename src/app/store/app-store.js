import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { DEFAULT_LEVEL_ID, getLevelMeta } from '@content/registry';
import { emptyUser, ensureLevelProgress, flushUser, loadUser, resetUser, setUser, } from '@/entities/user/model/repository';
import { applyAttempt } from '@/entities/attempt/model/statistics';
import { seedImportedHistory } from '@/features/manage-data/model/seed-history';
const AppContext = createContext(null);
function contentVersionOf(levelId) {
    return getLevelMeta(levelId)?.contentVersion ?? '0.0.0';
}
export function AppProvider({ children }) {
    // Storage is read exactly once (Performance.md §5).
    const initial = useRef(null);
    if (initial.current === null)
        initial.current = loadUser();
    const [user, setUserState] = useState(initial.current);
    const [, bump] = useState(0);
    const commit = useCallback((next) => {
        setUser(next);
        setUserState(next);
        bump((n) => n + 1);
    }, []);
    const createUser = useCallback((name, levelId, seedHistory) => {
        const data = emptyUser(name.trim() || 'Student', levelId, contentVersionOf(levelId));
        if (seedHistory) {
            const progress = ensureLevelProgress(data, levelId, contentVersionOf(levelId));
            seedImportedHistory(progress);
        }
        commit(data);
        flushUser();
    }, [commit]);
    const updateUser = useCallback((mutate) => {
        setUserState((current) => {
            if (!current)
                return current;
            // The stored object is the single source of truth; mutate then re-publish
            // a shallow copy so React re-renders without cloning the whole history.
            mutate(current);
            const next = { ...current };
            setUser(next);
            return next;
        });
    }, []);
    const setActiveLevel = useCallback((levelId) => {
        updateUser((draft) => {
            draft.profile.activeLevelId = levelId;
            if (getLevelMeta(levelId)) {
                ensureLevelProgress(draft, levelId, contentVersionOf(levelId));
            }
            draft.profile.goals[levelId] ??= { quick: 45, official: 90 };
        });
    }, [updateUser]);
    const saveAttempt = useCallback((attempt) => {
        updateUser((draft) => {
            const progress = ensureLevelProgress(draft, attempt.levelId, contentVersionOf(attempt.levelId));
            applyAttempt(progress, attempt);
        });
        flushUser();
    }, [updateUser]);
    const replaceUser = useCallback((data) => {
        commit(data);
        flushUser();
    }, [commit]);
    const clearEverything = useCallback(() => {
        resetUser();
        setUserState(null);
    }, []);
    const value = useMemo(() => ({
        user, createUser, setActiveLevel, saveAttempt, updateUser, replaceUser, clearEverything,
    }), [user, createUser, setActiveLevel, saveAttempt, updateUser, replaceUser, clearEverything]);
    return _jsx(AppContext.Provider, { value: value, children: children });
}
export function useApp() {
    const ctx = useContext(AppContext);
    if (!ctx)
        throw new Error('useApp must be used inside AppProvider');
    return ctx;
}
/** Active level id, falling back to Beginner. */
export function useActiveLevelId() {
    const { user } = useApp();
    return user?.profile.activeLevelId ?? DEFAULT_LEVEL_ID;
}
