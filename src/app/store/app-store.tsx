import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { DEFAULT_LEVEL_ID, getLevelMeta, hasContent, isLevelLoaded, loadLevel } from '@content/registry';
import type { UserData } from '@/entities/user/model/types';
import {
  emptyUser, ensureLevelProgress, flushUser, loadUser, resetUser, setUser,
} from '@/entities/user/model/repository';
import { applyAttempt } from '@/entities/attempt/model/statistics';
import type { Attempt } from '@/entities/attempt/model/types';
import { seedImportedHistory } from '@/features/manage-data/model/seed-history';

interface AppState {
  user: UserData | null;
  createUser: (name: string, levelId: string, seedHistory: boolean) => void;
  setActiveLevel: (levelId: string) => void;
  saveAttempt: (attempt: Attempt) => void;
  updateUser: (mutate: (draft: UserData) => void) => void;
  replaceUser: (data: UserData) => void;
  clearEverything: () => void;
}

const AppContext = createContext<AppState | null>(null);

function contentVersionOf(levelId: string): string {
  return getLevelMeta(levelId)?.contentVersion ?? '0.0.0';
}

export function AppProvider({ children }: { children: ReactNode }): JSX.Element {
  // Storage is read exactly once (Performance.md §5).
  const initial = useRef<UserData | null>(null);
  if (initial.current === null) initial.current = loadUser();
  const [user, setUserState] = useState<UserData | null>(initial.current);
  const [, bump] = useState(0);

  // Only the active level's content is downloaded (Performance.md §6); nothing
  // below renders until it is in, so every page can read it synchronously.
  const activeLevelId = user?.profile.activeLevelId ?? DEFAULT_LEVEL_ID;
  const [loadedLevel, setLoadedLevel] = useState<string | null>(
    () => (isLevelLoaded(activeLevelId) ? activeLevelId : null),
  );
  useEffect(() => {
    if (isLevelLoaded(activeLevelId)) {
      setLoadedLevel(activeLevelId);
      return undefined;
    }
    let alive = true;
    const done = (): void => { if (alive) setLoadedLevel(activeLevelId); };
    // A failed download falls through to the "not available" screens.
    loadLevel(activeLevelId).then(done, done);
    return () => { alive = false; };
  }, [activeLevelId]);
  const ready = loadedLevel === activeLevelId || !hasContent(activeLevelId);

  const commit = useCallback((next: UserData) => {
    setUser(next);
    setUserState(next);
    bump((n) => n + 1);
  }, []);

  const createUser = useCallback((name: string, levelId: string, seedHistory: boolean) => {
    const data = emptyUser(name.trim() || 'Student', levelId, contentVersionOf(levelId));
    if (seedHistory) {
      const progress = ensureLevelProgress(data, levelId, contentVersionOf(levelId));
      seedImportedHistory(progress);
    }
    commit(data);
    flushUser();
  }, [commit]);

  const updateUser = useCallback((mutate: (draft: UserData) => void) => {
    setUserState((current) => {
      if (!current) return current;
      // The stored object is the single source of truth; mutate then re-publish
      // a shallow copy so React re-renders without cloning the whole history.
      mutate(current);
      const next: UserData = { ...current };
      setUser(next);
      return next;
    });
  }, []);

  const setActiveLevel = useCallback((levelId: string) => {
    updateUser((draft) => {
      draft.profile.activeLevelId = levelId;
      if (getLevelMeta(levelId)) {
        ensureLevelProgress(draft, levelId, contentVersionOf(levelId));
      }
      draft.profile.goals[levelId] ??= { quick: 45, official: 90 };
    });
  }, [updateUser]);

  const saveAttempt = useCallback((attempt: Attempt) => {
    updateUser((draft) => {
      const progress = ensureLevelProgress(draft, attempt.levelId, contentVersionOf(attempt.levelId));
      applyAttempt(progress, attempt);
    });
    flushUser();
  }, [updateUser]);

  const replaceUser = useCallback((data: UserData) => {
    commit(data);
    flushUser();
  }, [commit]);

  const clearEverything = useCallback(() => {
    resetUser();
    setUserState(null);
  }, []);

  const value = useMemo<AppState>(() => ({
    user, createUser, setActiveLevel, saveAttempt, updateUser, replaceUser, clearEverything,
  }), [user, createUser, setActiveLevel, saveAttempt, updateUser, replaceUser, clearEverything]);

  return (
    <AppContext.Provider value={value}>
      {ready ? children : <div className="page dim" style={{ minHeight: '50vh', opacity: 0.5 }}>Loading…</div>}
    </AppContext.Provider>
  );
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}

/** Active level id, falling back to Beginner. */
export function useActiveLevelId(): string {
  const { user } = useApp();
  return user?.profile.activeLevelId ?? DEFAULT_LEVEL_ID;
}
