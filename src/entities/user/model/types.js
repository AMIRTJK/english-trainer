export const SCHEMA_VERSION = 1;
export const DEFAULT_GOALS = { quick: 45, official: 90 };
export function createProfile(name, levelId) {
    return {
        name,
        activeLevelId: levelId,
        createdAt: new Date().toISOString(),
        goals: { [levelId]: { ...DEFAULT_GOALS } },
        settings: { timerEnabled: true, allowBack: true, shuffleOptions: true },
    };
}
export function createLevelProgress(levelId, contentVersion) {
    return { levelId, contentVersion, attempts: [], topicStats: {}, questionStats: {} };
}
