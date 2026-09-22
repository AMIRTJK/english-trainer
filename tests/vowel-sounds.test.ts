import { describe, expect, it } from 'vitest';
import { getVowelIndex, getVocabularyIndex } from '@content/registry';
import { confusableSounds, levelOf, vowelSounds, vowelWords } from '@content/beginner/pronunciation';
import type { VowelWord } from '@content/types';
import { createLevelProgress, recordTrackAnswer } from '@/entities/vocab';
import { buildQuestion, explain, requeue, selectRound, unlockedLevel } from '@/features/vowel-sounds';

const index = getVowelIndex('beginner');

/** Everything SB p.134 prints, as a flat list of "sound: word" pairs. */
const pageWords = vowelWords.map((w) => `${w.sound}:${w.word}`);

describe('the Vowel sounds page (SB p.134)', () => {
  it('has all 22 vowels of the page, in book order', () => {
    expect(vowelSounds).toHaveLength(22);
    expect(vowelSounds.slice(0, 7).map((s) => s.key)).toEqual([
      'fish', 'cat', 'clock', 'bull', 'egg', 'up', 'computer',
    ]);
    expect(vowelSounds.at(-2)?.ipa).toBe('i');
    expect(vowelSounds.at(-1)?.ipa).toBe('u');
  });

  it('carries every word of the page, including the "! but also" columns', () => {
    // Spot checks straight off the page, one per column type.
    expect(pageWords).toContain('fish:window');
    expect(pageWords).toContain('fish:gym');
    expect(pageWords).toContain('boot:beautiful');
    expect(pageWords).toContain('tourist:plural');
    expect(pageWords).toContain('weak-i:hungry');
    expect(pageWords).toContain('weak-u:education');
    expect(vowelWords).toHaveLength(147);
  });

  it('agrees with the Sound Bank on the IPA of every key word', () => {
    const bank = getVocabularyIndex('beginner')?.soundByKey;
    for (const sound of vowelSounds) {
      if (sound.key.startsWith('weak-')) continue;
      expect(bank?.get(sound.key)?.ipa, sound.key).toBe(sound.ipa);
    }
  });

  it('only uses words the level is allowed to use', () => {
    const lexicon = getVocabularyIndex('beginner')?.bank.words ?? [];
    const known = new Set(lexicon.map((w) => w.word.toLowerCase()));
    for (const word of vowelWords) {
      expect(known.has(word.word.toLowerCase()), word.word).toBe(true);
    }
  });
});

describe('difficulty levels', () => {
  it('calls letters that spell one sound easy', () => {
    expect(levelOf('ee')).toBe(1);
    expect(levelOf('igh')).toBe(1);
    expect(levelOf('air')).toBe(1);
  });

  it('calls letters that spell several sounds ambiguous', () => {
    expect(levelOf('a')).toBe(2);
    expect(levelOf('oo')).toBe(2);
    expect(levelOf('ere')).toBe(2);
    expect(levelOf('u')).toBe(2);
  });

  it('puts the book’s exceptions and the rule-free sounds last', () => {
    expect(levelOf(null)).toBe(3);
    expect(levelOf('—')).toBe(3);
  });

  it('names the sounds the same letters could have spelled', () => {
    expect(confusableSounds('bull', 'oo')).toContain('boot');
    expect(confusableSounds('ear', 'ere')).toEqual(['chair']);
    expect(confusableSounds('tree', 'ee')).toEqual([]);
  });
});

describe('buildQuestion', () => {
  const word = vowelWords.find((w) => w.word === 'book') as VowelWord;

  it('offers three options with the right answer among them', () => {
    const q = buildQuestion(word, vowelSounds, index!.bySound, confusableSounds('bull', 'oo'), 7);
    expect(q?.options).toHaveLength(3);
    expect(q?.options[q.answer]?.key).toBe('bull');
  });

  it('offers the sound the same letters really do spell elsewhere', () => {
    const q = buildQuestion(word, vowelSounds, index!.bySound, confusableSounds('bull', 'oo'), 7);
    expect(q?.options.map((o) => o.key)).toContain('boot');
  });

  it('is deterministic for a given seed', () => {
    const a = buildQuestion(word, vowelSounds, index!.bySound, ['boot'], 3);
    const b = buildQuestion(word, vowelSounds, index!.bySound, ['boot'], 3);
    expect(a?.options.map((o) => o.key)).toEqual(b?.options.map((o) => o.key));
  });

  it('explains the rule and warns about the ambiguity', () => {
    const q = buildQuestion(word, vowelSounds, index!.bySound, confusableSounds('bull', 'oo'), 1);
    expect(q?.why.join(' ')).toContain('oo');
    expect(q?.why.join(' ')).toContain('/uː/');
  });

  it('says an exception is an exception', () => {
    const two = vowelWords.find((w) => w.word === 'two') as VowelWord;
    const boot = vowelSounds.find((s) => s.key === 'boot')!;
    const lines = explain(two, boot, [], new Map(vowelSounds.map((s) => [s.key, s])));
    expect(lines.join(' ')).toContain('but also');
  });
});

describe('rounds', () => {
  const byLevel = index!.byLevel;

  it('starts at level 1 and opens the next only when most of it is learned', () => {
    const progress = createLevelProgress('beginner');
    expect(unlockedLevel(byLevel, progress.vowels)).toBe(1);

    for (const word of byLevel.get(1) ?? []) {
      recordTrackAnswer(progress.vowels, word.id, true);
      recordTrackAnswer(progress.vowels, word.id, true);
    }
    expect(unlockedLevel(byLevel, progress.vowels)).toBe(2);
  });

  it('only asks about the level requested', () => {
    const progress = createLevelProgress('beginner');
    const round = selectRound(byLevel, progress.vowels, { level: 3, seed: 5 });
    expect(round.length).toBeGreaterThan(0);
    expect(round.every((w) => w.level === 3)).toBe(true);
  });

  it('never grows past the round size', () => {
    const progress = createLevelProgress('beginner');
    expect(selectRound(byLevel, progress.vowels, { size: 6, seed: 2 })).toHaveLength(6);
  });

  it('puts a missed word back a few cards later', () => {
    const queue = (byLevel.get(1) ?? []).slice(0, 8);
    const next = requeue(queue, 0, 3);
    expect(next).toHaveLength(queue.length + 1);
    expect(next[4]?.id).toBe(queue[0]?.id);
  });

  it('appends a missed word at the end when the queue is nearly over', () => {
    const queue = (byLevel.get(1) ?? []).slice(0, 2);
    const next = requeue(queue, 1, 4);
    expect(next.at(-1)?.id).toBe(queue[1]?.id);
  });
});
