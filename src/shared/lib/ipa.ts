/**
 * Locating a Sound Bank sound inside a word's transcription.
 *
 * The Vocabulary screen highlights the sound a word is taught for, so the
 * learner sees *where* /æ/ lives in /ˈæpl/. Splitting a diphthong would teach
 * the wrong thing, so a single-symbol match that falls inside a longer sound
 * (/ɪ/ inside /aɪ/, /ʊ/ inside /ʊə/) is skipped.
 */
export interface IpaHighlight {
  before: string;
  match: string;
  after: string;
}

/** Sounds that must never be split when highlighting a shorter symbol. */
export const COMPOUND_SOUNDS: readonly string[] = [
  'eɪ', 'əʊ', 'aɪ', 'aʊ', 'ɔɪ', 'ɪə', 'eə', 'ʊə',
  'iː', 'ɑː', 'ɔː', 'uː', 'ɜː',
  'tʃ', 'dʒ',
];

function insideCompound(ipa: string, at: number, length: number): boolean {
  for (const compound of COMPOUND_SOUNDS) {
    if (compound.length <= length) continue;
    let from = ipa.indexOf(compound);
    while (from !== -1) {
      const overlaps = at < from + compound.length && from < at + length;
      if (overlaps) return true;
      from = ipa.indexOf(compound, from + 1);
    }
  }
  return false;
}

/**
 * Split `ipa` around the first honest occurrence of `soundIpa`.
 * Returns `null` when the sound is not visible in the transcription.
 */
export function highlightSound(ipa: string, soundIpa: string): IpaHighlight | null {
  if (!ipa || !soundIpa) return null;
  let at = ipa.indexOf(soundIpa);
  while (at !== -1) {
    if (!insideCompound(ipa, at, soundIpa.length)) {
      return {
        before: ipa.slice(0, at),
        match: ipa.slice(at, at + soundIpa.length),
        after: ipa.slice(at + soundIpa.length),
      };
    }
    at = ipa.indexOf(soundIpa, at + 1);
  }
  return null;
}

/** `['won','der','ful']` + 0 -> `won·der·ful` with the stressed syllable marked. */
export function syllableParts(
  syllables: readonly string[],
  stressed: number,
): Array<{ text: string; stressed: boolean }> {
  return syllables.map((text, index) => ({ text, stressed: index === stressed }));
}
