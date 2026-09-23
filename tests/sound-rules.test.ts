import { describe, expect, it } from 'vitest';
import { getLevelIndex } from '@content/registry';
import { confusableSounds, vowelSounds, vowelWords } from '@content/beginner/pronunciation';
import { pronRules } from '@content/beginner/questions/pron-rules';
import { pronVowelWords } from '@content/beginner/questions/pron-vowel-words';
import { vowelRows } from '@content/beginner/questions/pron-vowels';
import { earChairRows } from '@content/beginner/questions/pron-ear-chair';

const norm = (word: string): string => word.toLowerCase().replace(/’/g, "'");

describe('the Vowel sounds test covers the whole of SB p.134', () => {
  /** Every word the test can show, across both of its question families. */
  const asked = new Set<string>();
  for (const row of vowelRows) for (const word of row) asked.add(norm(word));
  for (const [row] of earChairRows) for (const word of row) asked.add(norm(word));
  for (const question of pronVowelWords) {
    for (const option of question.options) asked.add(norm(option));
  }

  it('asks about every word the page prints', () => {
    for (const word of vowelWords) {
      expect(asked.has(norm(word.word)), word.word).toBe(true);
    }
  });

  it('reaches the four rows the test used to skip entirely', () => {
    for (const word of ['sister', 'euro', 'happy', 'usually']) {
      expect(asked.has(word), word).toBe(true);
    }
  });

  it('never asks "which is different?" about a word with a second vowel', () => {
    // `sister` is /ə/ on the page but starts with /ɪ/, so an odd-one-out row
    // built from it would have two defensible answers.
    const twoVowelWords = ['sister', 'actor', 'famous', 'about', 'policeman',
      'euro', 'europe', 'plural', 'happy', 'angry', 'hungry',
      'usually', 'situation', 'education', 'umbrella', 'excuse', 'turkey'];
    const inRows = new Set(vowelRows.flat().map(norm));
    for (const word of twoVowelWords) expect(inRows.has(word), word).toBe(false);
  });
});

describe('the Sound Bank rules test', () => {
  const byLetters = new Map<string, Set<string>>();
  for (const sound of vowelSounds) {
    for (const pattern of sound.patterns) {
      const set = byLetters.get(pattern.letters) ?? new Set<string>();
      set.add(sound.key);
      byLetters.set(pattern.letters, set);
    }
  }

  it('is registered in the level bank under its own topic', () => {
    const index = getLevelIndex('beginner');
    expect(index?.byTopic.get('beg-p-sound-rules')?.length).toBe(pronRules.length);
    expect(index?.topicById.get('beg-p-sound-rules')?.title).toBe('Sound Bank rules');
  });

  it('asks about every spelling rule the accordion prints', () => {
    const asked = new Set(
      pronRules
        .filter((q) => q.constructId.includes('::spelling-'))
        .map((q) => `${q.constructId}|${q.options[q.answer]}`),
    );
    for (const sound of vowelSounds) {
      for (const pattern of sound.patterns) {
        if (pattern.letters === '—') continue;
        const key = `beg-p-sound-rules::spelling-${sound.key}|${pattern.letters}`;
        expect(asked.has(key), key).toBe(true);
      }
    }
  });

  it('asks about every "! but also" word the page flags', () => {
    const asked = new Set(
      pronRules
        .filter((q) => q.constructId.includes('::exception-'))
        .map((q) => `${q.constructId}|${q.options[q.answer]}`),
    );
    for (const sound of vowelSounds) {
      for (const word of sound.exceptions) {
        const key = `beg-p-sound-rules::exception-${sound.key}|${word}`;
        expect(asked.has(key), key).toBe(true);
      }
    }
  });

  it('puts every short vowel, long vowel and diphthong in a group question', () => {
    const asked = new Set(
      pronRules
        .filter((q) => q.constructId.includes('::group-'))
        .map((q) => q.options[q.answer]),
    );
    const groups = ['short-vowel', 'long-vowel', 'diphthong'];
    for (const sound of vowelSounds) {
      if (!groups.includes(sound.type)) continue;
      expect([...asked].some((o) => o?.endsWith(` ${sound.key}`)), sound.key).toBe(true);
    }
  });

  it('only asks "which sound do these letters spell?" about unambiguous letters', () => {
    for (const question of pronRules) {
      const match = /letters "(.+)" usually/.exec(question.prompt);
      if (!match) continue;
      const letters = match[1] as string;
      const owners = byLetters.get(letters) ?? new Set<string>();
      expect(owners.size, letters).toBe(1);
      const owner = [...owners][0] as string;
      expect(confusableSounds(owner, letters)).toEqual([]);
    }
  });

  it('never offers a wrong spelling that the answer sound also uses', () => {
    for (const question of pronRules) {
      const match = /Which letters usually spell \/(.+)\/ /.exec(question.prompt);
      if (!match) continue;
      const sound = vowelSounds.find((s) => s.ipa === match[1]);
      const own = new Set(sound?.patterns.map((p) => p.letters));
      question.options.forEach((option, i) => {
        if (i === question.answer) expect(own.has(option), option).toBe(true);
        else expect(own.has(option), `${question.id} ${option}`).toBe(false);
      });
    }
  });

  it('only offers regular words as the wrong answers of an exception question', () => {
    const exceptions = new Set(
      vowelSounds.flatMap((s) => s.exceptions.map((w) => w.toLowerCase())),
    );
    for (const question of pronRules) {
      if (!question.constructId.includes('::exception-')) continue;
      question.options.forEach((option, i) => {
        expect(exceptions.has(option.toLowerCase()), `${question.id} ${option}`)
          .toBe(i === question.answer);
      });
    }
  });

  it('explains every answer with the rule the Sound Bank states', () => {
    for (const question of pronRules) {
      expect(question.explanation.length, question.id).toBeGreaterThan(20);
      expect(question.status).toBe('verified');
      expect(question.source.page).toBe(134);
    }
  });
});
