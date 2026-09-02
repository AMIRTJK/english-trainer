import { SCHEMA_VERSION, type UserData } from './types';

/**
 * Storage migrations. Add a step per schema bump; never mutate old steps
 * (AGENTS.md §4).
 */
type Step = (data: UserData) => UserData;

const steps: Record<number, Step> = {
  // 0 -> 1: the first released schema; nothing to change.
};

export function migrate(raw: UserData): UserData {
  let data = raw;
  let version = typeof data.schemaVersion === 'number' ? data.schemaVersion : 0;
  while (version < SCHEMA_VERSION) {
    const step = steps[version];
    if (step) data = step(data);
    version += 1;
  }
  data.schemaVersion = SCHEMA_VERSION;
  data.progress ??= {};
  data.profile.settings ??= { timerEnabled: true, allowBack: true, shuffleOptions: true };
  data.profile.goals ??= {};
  return data;
}
