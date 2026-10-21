import { describe, expect, it } from 'vitest';
import { getLevelIndex, getVocabularyIndex, getVowelIndex, hasContent } from '@content/registry';
import { stressedVowelKey } from '@content/common/sound-groups';
import { vowelSounds } from '@content/elementary/pronunciation';
import { vowelRows } from '@content/elementary/questions/pron-vowels';
import { consonantRows } from '@content/elementary/questions/pron-consonants';
import { SOUND_TABLE } from '@content/elementary/questions/sound-table';
import { buildImportedAttempt } from '@/features/manage-data/model/seed-history';

const level = getLevelIndex('elementary');
const vocab = getVocabularyIndex('elementary');

/** Vowel symbols of an IPA string, longest match first (diphthongs before their halves). */
const SYMBOLS = ['ɪə', 'eə', 'ʊə', 'eɪ', 'aɪ', 'ɔɪ', 'əʊ', 'aʊ', 'iː', 'ɑː', 'ɔː', 'uː', 'ɜː', 'ɪ', 'e', 'æ', 'ʌ', 'ɒ', 'ʊ', 'ə', 'i', 'u'];
function vowelsOf(ipa: string): Set<string> {
  const out = new Set<string>();
  const s = ipa.replace(/[/ˈˌ]/g, '');
  for (let i = 0; i < s.length;) {
    const hit = SYMBOLS.find((v) => s.startsWith(v, i));
    if (hit) { out.add(hit); i += hit.length; } else i += 1;
  }
  return out;
}
const ipaOf = (word: string): string => SOUND_TABLE[word.toLowerCase().replace(/’/g, "'")]?.[1] ?? '';

describe('the Elementary level', () => {
  it('is registered with content, vocabulary and a Vowel sounds page', () => {
    expect(hasContent('elementary')).toBe(true);
    expect(level?.content.questions.length).toBeGreaterThan(1000);
    expect(vocab?.bank.words.length).toBeGreaterThan(600);
    expect(getVowelIndex('elementary')?.bank.sounds).toHaveLength(22);
  });

  it('never mixes its content with another level', () => {
    const beginner = getLevelIndex('beginner');
    const beginnerIds = new Set(beginner?.content.questions.map((q) => q.id));
    for (const q of level?.content.questions ?? []) {
      expect(q.levelId).toBe('elementary');
      expect(q.id.startsWith('ele-')).toBe(true);
      expect(q.unitId.startsWith('ele-u')).toBe(true);
      expect(beginnerIds.has(q.id)).toBe(false);
    }
    for (const word of vocab?.bank.words ?? []) expect(word.levelId).toBe('elementary');
  });

  it('every vowel row has exactly one defensible answer', () => {
    for (const [a, b, odd] of vowelRows) {
      const [va, vb, vo] = [a, b, odd].map((w) => vowelsOf(ipaOf(w)));
      expect(ipaOf(a) && ipaOf(b) && ipaOf(odd), `${a} ${b} ${odd}`).toBeTruthy();
      const target = SOUND_TABLE[a.toLowerCase().replace(/’/g, "'")]?.[0] ?? '';
      const symbol = vowelSounds.find((s) => s.key === target)?.ipa ?? '';
      expect(va?.has(symbol) && vb?.has(symbol), `${a}/${b} share /${symbol}/`).toBe(true);
      for (const v of vo ?? []) {
        expect(va?.has(v) || vb?.has(v), `${odd} shares /${v}/ with ${a} or ${b}`).toBe(false);
      }
    }
  });

  it('every consonant row has exactly one defensible answer', () => {
    const symbolOf = (key: string): string => vocab?.soundByKey.get(key)?.ipa ?? '?';
    for (const [words, shared, odd, ipa] of consonantRows) {
      const s = symbolOf(shared);
      const o = symbolOf(odd);
      expect(ipa[0]?.includes(s) && ipa[1]?.includes(s), `${words.join(' ')} share ${s}`).toBe(true);
      expect(ipa[2]?.includes(o), `${words[2]} has ${o}`).toBe(true);
      expect(ipa[2]?.includes(s), `${words[2]} must not contain ${s}`).toBe(false);
      expect(ipa[0]?.includes(o) || ipa[1]?.includes(o), `${words[0]}/${words[1]} must not contain ${o}`).toBe(false);
    }
  });

  it('asks about every word of the Vowel sounds page', () => {
    const asked = new Set(vowelRows.flat().map((w) => w.toLowerCase().replace(/’/g, "'")));
    const page = vowelSounds.flatMap((s) => [...s.patterns.flatMap((p) => p.examples), ...s.exceptions]);
    const missing = page.map((w) => w.toLowerCase().replace(/’/g, "'")).filter((w) => !asked.has(w));
    expect(missing).toEqual([]);
  });

  it('lists every sound pair the different-sound questions contrast', () => {
    const pairs = new Set(vocab?.bank.contrasts.map((p) => [...p].sort().join('|')));
    for (const q of level?.content.questions ?? []) {
      if (q.type !== 'different-sound' || !q.sound) continue;
      if (q.sound.target.startsWith('weak-') || q.sound.others.startsWith('weak-')) continue;
      expect(pairs.has([q.sound.target, q.sound.others].sort().join('|')), q.id).toBe(true);
    }
  });

  it('places a word without a Sound Bank row by its stressed vowel', () => {
    expect(stressedVowelKey('/ˈvedʒtəblz/')).toBe('egg');
    expect(stressedVowelKey('/ʌmˈbrelə/')).toBe('egg');
    expect(stressedVowelKey('/ˈeəpɔːt/')).toBe('chair');
    expect(stressedVowelKey('/sɪks/')).toBe('fish');
  });

  it('never seeds the Beginner paper test into Elementary', () => {
    expect(buildImportedAttempt('elementary')).toBeNull();
    expect(buildImportedAttempt('beginner')).not.toBeNull();
  });
});
