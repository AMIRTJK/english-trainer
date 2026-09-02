import type { Attempt, QuestionStat, TopicStat } from '@/entities/attempt/model/types';

export interface Goals {
  /** Target score for a 50-question Quick Test. */
  quick: number;
  /** Target score for a 100-question Official Test. */
  official: number;
}

export interface Profile {
  name: string;
  activeLevelId: string;
  createdAt: string;
  /** Goals per level id. */
  goals: Record<string, Goals>;
  settings: {
    timerEnabled: boolean;
    allowBack: boolean;
    shuffleOptions: boolean;
  };
}

/** Everything persisted for one level. Levels never share a bucket. */
export interface LevelProgress {
  levelId: string;
  contentVersion: string;
  attempts: Attempt[];
  topicStats: Record<string, TopicStat>;
  questionStats: Record<string, QuestionStat>;
}

export interface UserData {
  schemaVersion: number;
  profile: Profile;
  progress: Record<string, LevelProgress>;
}

export const SCHEMA_VERSION = 1;

export const DEFAULT_GOALS: Goals = { quick: 45, official: 90 };

export function createProfile(name: string, levelId: string): Profile {
  return {
    name,
    activeLevelId: levelId,
    createdAt: new Date().toISOString(),
    goals: { [levelId]: { ...DEFAULT_GOALS } },
    settings: { timerEnabled: true, allowBack: true, shuffleOptions: true },
  };
}

export function createLevelProgress(levelId: string, contentVersion: string): LevelProgress {
  return { levelId, contentVersion, attempts: [], topicStats: {}, questionStats: {} };
}
