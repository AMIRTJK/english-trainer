import type { SoundContrast, SoundGroup } from '../../types';
import { contrastsIn, soundGroups } from '../../common/sound-groups';

/**
 * The Sound Bank of English File 4th edition Beginner (SB pp.134-135).
 *
 * The key words are exactly the ones already listed in
 * `content/beginner/lexicon/pronunciation-words.ts` and used as group keys by
 * `content/beginner/questions/sound-table.ts`, so the vocabulary screen and the
 * "different sound" questions speak about the same 44 sounds. The chart itself
 * is the same in every level of the course, so it lives in `content/common`.
 */
export const sounds: SoundGroup[] = soundGroups;

export const soundByKey: ReadonlyMap<string, SoundGroup> = new Map(
  sounds.map((s) => [s.key, s]),
);

/**
 * Every sound pair the level's "different sound" questions actually contrast.
 * `tests/vocabulary.test.ts` asserts this list stays in step with the question
 * bank, so the Vocabulary screen can never promise practice the tests do not give.
 */
export const contrasts: SoundContrast[] = [
  ['fish', 'tree'], ['cat', 'car'], ['clock', 'horse'], ['clock', 'phone'],
  ['bull', 'boot'], ['bull', 'up'], ['egg', 'bird'], ['bird', 'horse'],
  ['train', 'bike'], ['phone', 'owl'], ['phone', 'fish'], ['owl', 'up'],
  ['boy', 'clock'], ['ear', 'chair'],
  // Added with the rows that finished SB p.134 (docs/decisions.md §18).
  // The two weak vowels of the page are not Sound Bank sounds (§14a), so the
  // pairs that contrast them are deliberately absent from this list.
  ['train', 'fish'], ['bike', 'tree'], ['tourist', 'horse'],
  ['computer', 'bull'], ['computer', 'fish'], ['tourist', 'fish'],
  ['tourist', 'cat'], ['boot', 'cat'], ['bird', 'clock'],
  ['thumb', 'mother'], ['snake', 'zebra'], ['snake', 'shower'],
  ['shower', 'chess'], ['chess', 'jazz'], ['jazz', 'yacht'],
  ['key', 'girl'], ['nose', 'singer'], ['flower', 'vase'],
  ['witch', 'house'], ['parrot', 'bag'], ['tie', 'dog'],
];

/** Sound keys contrasted with `key` somewhere in the question bank. */
export function contrastsFor(key: string): string[] {
  return contrastsIn(contrasts, key);
}
