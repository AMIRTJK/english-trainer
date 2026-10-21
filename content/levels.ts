import type { LevelContent, LevelMeta } from './types';
import { meta as beginnerMeta } from './beginner/meta';
import { meta as elementaryMeta } from './elementary/meta';

/**
 * Every level the app knows about. Adding a level means adding a folder, its
 * meta here and one loader — no business logic changes (AGENTS.md §8).
 */
export const LEVELS: LevelMeta[] = [
  beginnerMeta,
  elementaryMeta,
  { id: 'pre-intermediate', name: 'Pre-Intermediate', order: 3, contentVersion: '0.0.0', book: 'English File 4th edition Pre-Intermediate' },
  { id: 'intermediate', name: 'Intermediate', order: 4, contentVersion: '0.0.0', book: 'English File 4th edition Intermediate' },
];

/**
 * A level's content is a chunk of its own, fetched when the level becomes
 * active, so a learner downloads only the book they are studying
 * (Performance.md §6, `docs/decisions.md` §23).
 */
const LOADERS: Record<string, () => Promise<LevelContent>> = {
  [beginnerMeta.id]: () => import('./beginner').then((m) => m.beginner),
  [elementaryMeta.id]: () => import('./elementary').then((m) => m.elementary),
};

const loaded: Record<string, LevelContent> = {};
const pending = new Map<string, Promise<LevelContent | null>>();

/** True when the level has a content pack, whether or not it is loaded yet. */
export function hasContent(levelId: string): boolean {
  return LOADERS[levelId] !== undefined;
}

export function isLevelLoaded(levelId: string): boolean {
  return loaded[levelId] !== undefined;
}

/** The loaded content of a level, or undefined until `loadLevel` has finished. */
export function loadedContent(levelId: string): LevelContent | undefined {
  return loaded[levelId];
}

/** Fetch a level's content once; later calls reuse the same promise. */
export function loadLevel(levelId: string): Promise<LevelContent | null> {
  const ready = loaded[levelId];
  if (ready) return Promise.resolve(ready);
  const inFlight = pending.get(levelId);
  if (inFlight) return inFlight;
  const loader = LOADERS[levelId];
  if (!loader) return Promise.resolve(null);
  const promise = loader().then((content) => {
    loaded[levelId] = content;
    pending.delete(levelId);
    return content;
  });
  pending.set(levelId, promise);
  return promise;
}

/** Scripts and tests check every level, so they load them all up front. */
export async function loadAllLevels(): Promise<void> {
  await Promise.all(Object.keys(LOADERS).map((id) => loadLevel(id)));
}

export const DEFAULT_LEVEL_ID = beginnerMeta.id;
