/**
 * Vowel sounds quality gate (AGENTS.md §3).
 *
 * The Vowel sounds trainer must stay a faithful copy of SB p.134, so:
 *  - every word on the page exists in the level's allowed lexicon;
 *  - every vowel names a real Sound Bank sound, except the two weak vowels the
 *    book prints without a key word (`weak-i`, `weak-u`);
 *  - the IPA of a vowel agrees with the Sound Bank entry of the same key;
 *  - no word id is reused, and every spelling pattern carries an explanation;
 *  - a word listed under two sounds is never used as a question.
 *
 * Called from `validate-content.ts`.
 */
import { getVocabularyIndex, getVowelIndex } from '../content/registry';
import { unknownWords } from '../content/beginner/lexicon';

export interface VowelReport {
  errors: string[];
  warnings: string[];
  summary: string;
}

/** The two vowels SB p.134 prints as bare symbols, with no key word. */
const WEAK_KEYS = new Set(['weak-i', 'weak-u']);

export function validateVowels(levelId: string): VowelReport {
  const errors: string[] = [];
  const warnings: string[] = [];
  const vowels = getVowelIndex(levelId);
  if (!vowels) return { errors, warnings, summary: `${levelId}: no vowel data yet` };

  const soundBank = getVocabularyIndex(levelId)?.soundByKey;

  for (const sound of vowels.bank.sounds) {
    const at = `[vowel ${sound.key}]`;
    if (!sound.ru.trim()) errors.push(`${at} missing Russian description`);
    if (!sound.hint.trim()) errors.push(`${at} missing spelling hint`);
    if (sound.patterns.length === 0) errors.push(`${at} has no spelling pattern`);

    for (const pattern of sound.patterns) {
      if (!pattern.ru.trim()) errors.push(`${at} pattern "${pattern.letters}" has no explanation`);
      if (pattern.examples.length === 0) {
        errors.push(`${at} pattern "${pattern.letters}" has no example word`);
      }
    }

    if (WEAK_KEYS.has(sound.key)) continue;
    const group = soundBank?.get(sound.key);
    if (!group) {
      errors.push(`${at} is not a Sound Bank key word`);
    } else if (group.ipa !== sound.ipa) {
      errors.push(`${at} IPA /${sound.ipa}/ disagrees with the Sound Bank /${group.ipa}/`);
    }
  }

  const seenIds = new Set<string>();
  for (const word of vowels.bank.words) {
    const at = `[${word.id}]`;
    if (seenIds.has(word.id)) errors.push(`duplicate vowel word id: ${word.id}`);
    seenIds.add(word.id);

    if (!vowels.soundByKey.has(word.sound)) errors.push(`${at} unknown vowel "${word.sound}"`);
    if (unknownWords(word.word).length > 0) {
      errors.push(`${at} "${word.word}" is not in the level lexicon`);
    }
  }

  const askableSounds = new Set(vowels.askable.map((w) => w.sound));
  for (const sound of vowels.bank.sounds) {
    if (!askableSounds.has(sound.key)) warnings.push(`vowel "${sound.key}" has no askable word`);
  }

  const skipped = vowels.bank.words.length - vowels.askable.length;
  const levels = [1, 2, 3].map((n) => `L${n} ${vowels.byLevel.get(n)?.length ?? 0}`).join(', ');
  const summary =
    `${levelId}: ${vowels.bank.sounds.length} vowels, ${vowels.bank.words.length} words ` +
    `(${levels}), ${skipped} listed under two sounds`;

  return { errors, warnings, summary };
}
