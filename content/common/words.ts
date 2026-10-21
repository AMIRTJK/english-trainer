import type { VocabWord } from '../types';

/**
 * Authoring row for a word file.
 *
 * Only the translation is always written by hand: the IPA and the Sound Bank
 * group come from the phonetic facts the level already holds (its `derived.ts`)
 * and are only spelled out here when those do not cover the word.
 */
export type WordRow = [word: string, ru: string, sound?: string, ipa?: string];

export interface WordGroup {
  topicId: string;
  unit: number;
  rows: WordRow[];
}

/** Everything a level already knows about a word's pronunciation. */
export interface KnownWord {
  ipa?: string;
  /** Vowel Sound Bank key, when the Sound Bank lists the word. */
  vowel?: string;
  /** Consonant Sound Bank keys the word illustrates. */
  consonants: string[];
  syllables?: string[];
  stressed?: number;
}

/** Normalise a headword: lowercase, curly apostrophe to straight. */
export function keyOf(word: string): string {
  return word.toLowerCase().replace(/’/g, "'").trim();
}

function slug(word: string): string {
  return keyOf(word).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export interface WordMakerConfig {
  levelId: string;
  /** Prefix of word ids, e.g. `beg-w` gives `beg-w-coffee`. */
  idPrefix: string;
  /** Prefix of unit ids, e.g. `beg-u`. */
  unitPrefix: string;
  known: ReadonlyMap<string, KnownWord>;
  soundTaskWords: ReadonlySet<string>;
  /** Group to use when neither the row nor `known` names one. */
  fallbackSound?: (ipa: string) => string | null;
}

/** Turn compact authoring groups into full word records for one level. */
export function createWordMaker(cfg: WordMakerConfig): (groups: WordGroup[]) => VocabWord[] {
  const toWord = (group: WordGroup, [word, ru, sound, ipa]: WordRow): VocabWord => {
    const known = cfg.known.get(keyOf(word));
    const transcription = ipa ?? known?.ipa ?? '';
    const primary = sound ?? known?.vowel ?? cfg.fallbackSound?.(transcription) ?? '';
    const also = (known?.consonants ?? []).filter((c) => c !== primary);
    return {
      id: `${cfg.idPrefix}-${slug(word)}`,
      levelId: cfg.levelId,
      word,
      ru,
      ipa: transcription,
      unitId: `${cfg.unitPrefix}${group.unit}`,
      topicId: group.topicId,
      sound: primary,
      also,
      ...(known?.syllables ? { syllables: known.syllables } : {}),
      ...(known?.stressed !== undefined ? { stressed: known.stressed } : {}),
      inSoundTask: cfg.soundTaskWords.has(keyOf(word)),
    };
  };
  return (groups) => groups.flatMap((group) => group.rows.map((row) => toWord(group, row)));
}
