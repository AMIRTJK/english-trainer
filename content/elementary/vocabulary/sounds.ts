import type { SoundContrast, SoundGroup } from '../../types';
import { contrastsIn, soundGroups } from '../../common/sound-groups';
import { consonantRows } from '../questions/pron-consonants';
import { vowelRows } from '../questions/pron-vowels';
import { SOUND_TABLE } from '../questions/sound-table';

/** The Sound Bank of English File 4th edition Elementary (SB pp.166-167) — the same 44 sounds. */
export const sounds: SoundGroup[] = soundGroups;

/** The two weak vowels of p.166 are not Sound Bank sounds (docs/decisions.md §14a). */
const WEAK = new Set(['weak-i', 'weak-u']);

/**
 * Every sound pair the level's "different sound" questions contrast, read off
 * the question rows themselves, so the Vocabulary screen can never promise a
 * contrast the tests do not ask about.
 */
function collect(): SoundContrast[] {
  const seen = new Set<string>();
  const out: SoundContrast[] = [];
  const add = (a: string, b: string): void => {
    if (WEAK.has(a) || WEAK.has(b) || a === b) return;
    const key = [a, b].sort().join('|');
    if (seen.has(key)) return;
    seen.add(key);
    out.push([a, b]);
  };
  for (const row of vowelRows) {
    const shared = SOUND_TABLE[row[0].toLowerCase().replace(/’/g, "'")]?.[0];
    const odd = SOUND_TABLE[row[2].toLowerCase().replace(/’/g, "'")]?.[0];
    if (shared && odd) add(shared, odd);
  }
  for (const [, shared, odd] of consonantRows) add(shared, odd);
  return out;
}

export const contrasts: SoundContrast[] = collect();

/** Sound keys contrasted with `key` somewhere in the question bank. */
export function contrastsFor(key: string): string[] {
  return contrastsIn(contrasts, key);
}
