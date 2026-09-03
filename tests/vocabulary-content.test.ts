import { describe, expect, it } from 'vitest';
import { getLevelIndex, getVocabularyIndex } from '@content/registry';
import { highlightSound } from '@/shared/lib/ipa';

const vocab = getVocabularyIndex('beginner');
const level = getLevelIndex('beginner');

/** `'/θ/ (thumb)'` -> `'thumb'`; a plain key is returned unchanged. */
function soundKey(label: string): string {
  return /\(([^)]+)\)/.exec(label)?.[1] ?? label;
}

describe('the Beginner vocabulary bank', () => {
  it('exists and covers the whole Sound Bank', () => {
    expect(vocab).not.toBeNull();
    expect(vocab?.bank.sounds).toHaveLength(44);
  });

  it('gives every word a translation, a transcription and a group', () => {
    for (const word of vocab?.bank.words ?? []) {
      expect(word.ru, word.id).not.toBe('');
      expect(word.ipa, word.id).not.toBe('');
      expect(vocab?.soundByKey.has(word.sound), `${word.id}: ${word.sound}`).toBe(true);
    }
  });

  it('never lists the same word twice', () => {
    const words = (vocab?.bank.words ?? []).map((w) => w.word.toLowerCase());
    expect(new Set(words).size).toBe(words.length);
  });

  it('shows the key sound inside every transcription', () => {
    for (const word of vocab?.bank.words ?? []) {
      const group = vocab?.soundByKey.get(word.sound);
      expect(highlightSound(word.ipa, group?.ipa ?? ''), `${word.id} ${word.ipa}`).not.toBeNull();
    }
  });

  it('only uses words the level is allowed to use', () => {
    const lexicon = level?.content.lexicon;
    for (const word of vocab?.bank.words ?? []) {
      const key = word.word.toLowerCase().replace(/’/g, "'");
      expect(lexicon?.has(key), word.word).toBe(true);
    }
  });

  it('lists every sound contrast the questions actually test', () => {
    const listed = new Set(
      (vocab?.bank.contrasts ?? []).map(([a, b]) => [a, b].sort().join('|')),
    );
    for (const question of level?.content.questions ?? []) {
      if (question.type !== 'different-sound' || !question.sound) continue;
      const pair = [soundKey(question.sound.target), soundKey(question.sound.others)]
        .sort()
        .join('|');
      expect(listed.has(pair), pair).toBe(true);
    }
  });

  it('covers the words the "different sound" questions ask about', () => {
    const known = new Set(
      (vocab?.bank.words ?? []).map((w) => w.word.toLowerCase().replace(/’/g, "'")),
    );
    const missing = new Set<string>();
    for (const question of level?.content.questions ?? []) {
      if (question.type !== 'different-sound' || !question.sound) continue;
      for (const option of Object.keys(question.sound.ipa)) {
        const word = option.toLowerCase().replace(/’/g, "'");
        if (!known.has(word)) missing.add(word);
      }
    }
    // Only plural forms of words that are already listed may be missing.
    expect([...missing].sort()).toEqual(['bags', 'cars']);
  });
});

describe('highlightSound', () => {
  it('finds a simple vowel', () => {
    expect(highlightSound('/ˈæpl/', 'æ')).toEqual({ before: '/ˈ', match: 'æ', after: 'pl/' });
  });

  it('does not split a diphthong to match one of its halves', () => {
    expect(highlightSound('/taɪm/', 'ɪ')).toBeNull();
    expect(highlightSound('/naɪs/', 'aɪ')?.match).toBe('aɪ');
  });

  it('skips a false match and keeps looking', () => {
    expect(highlightSound('/aɪˈdɪə/', 'ɪə')?.before).toBe('/aɪˈd');
  });

  it('returns null when the sound is not in the transcription', () => {
    expect(highlightSound('/kæt/', 'uː')).toBeNull();
    expect(highlightSound('', 'æ')).toBeNull();
  });
});
