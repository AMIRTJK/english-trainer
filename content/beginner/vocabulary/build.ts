import type { VocabWord } from '../../types';
import { BEGINNER_LEVEL_ID } from '../meta';
import { KNOWN, SOUND_TASK_WORDS, keyOf } from './derived';

/**
 * Authoring row for a word file.
 *
 * Only the translation is always written by hand: the IPA and the Sound Bank
 * group are taken from the phonetic tables the repository already has
 * (`derived.ts`) and are only spelled out here when those tables do not cover
 * the word, or when the Sound Bank lists the word under a consonant so the
 * stressed vowel has to be named.
 */
export type WordRow = [word: string, ru: string, sound?: string, ipa?: string];

export interface WordGroup {
  topicId: string;
  unit: number;
  rows: WordRow[];
}

function slug(word: string): string {
  return keyOf(word).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function toWord(group: WordGroup, [word, ru, sound, ipa]: WordRow): VocabWord {
  const known = KNOWN.get(keyOf(word));
  const primary = sound ?? known?.vowel ?? '';
  const also = (known?.consonants ?? []).filter((c) => c !== primary);
  return {
    id: `beg-w-${slug(word)}`,
    levelId: BEGINNER_LEVEL_ID,
    word,
    ru,
    ipa: ipa ?? known?.ipa ?? '',
    unitId: `beg-u${group.unit}`,
    topicId: group.topicId,
    sound: primary,
    also,
    ...(known?.syllables ? { syllables: known.syllables } : {}),
    ...(known?.stressed !== undefined ? { stressed: known.stressed } : {}),
    inSoundTask: SOUND_TASK_WORDS.has(keyOf(word)),
  };
}

/** Turn compact authoring groups into full word records. */
export function makeWords(groups: WordGroup[]): VocabWord[] {
  return groups.flatMap((group) => group.rows.map((row) => toWord(group, row)));
}
