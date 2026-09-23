import { describe, expect, it } from 'vitest';
import { getLevelIndex } from '@content/registry';
import { confusableSounds, vowelSounds, vowelWords } from '@content/beginner/pronunciation';
import { pronRules } from '@content/beginner/questions/pron-rules';
import { pronVowels, vowelRows } from '@content/beginner/questions/pron-vowels';
import { SOUND_TABLE } from '@content/beginner/questions/sound-table';
import { earChairRows } from '@content/beginner/questions/pron-ear-chair';

const norm = (word: string): string => word.toLowerCase().replace(/’/g, "'");

/**
 * The words of SB p.134 whose taught sound is **not** their only vowel, with
 * every vowel they contain.
 *
 * These are the words the page teaches for a weak or unstressed sound, so a row
 * built from them cannot rely on "compare the stressed vowel" the way an
 * ordinary row does. They get the stricter rule checked below.
 */
const VOWELS_IN: Record<string, string[]> = {
  sister: ['ɪ', 'ə'], actor: ['æ', 'ə'], famous: ['eɪ', 'ə'], about: ['ə', 'aʊ'],
  policeman: ['ə', 'iː'], umbrella: ['ʌ', 'e', 'ə'], excuse: ['ɪ', 'uː'],
  turkey: ['ɜː', 'i'], euro: ['ʊə', 'əʊ'], europe: ['ʊə', 'ə'], plural: ['ʊə', 'ə'],
  happy: ['æ', 'i'], angry: ['æ', 'i'], hungry: ['ʌ', 'i'],
  usually: ['uː', 'u', 'ə', 'i'], situation: ['ɪ', 'u', 'eɪ'],
  education: ['e', 'u', 'eɪ'],
};

describe('the Vowel sounds test covers the whole of SB p.134', () => {
  const asked = new Set<string>();
  for (const row of vowelRows) for (const word of row) asked.add(norm(word));
  for (const [row] of earChairRows) for (const word of row) asked.add(norm(word));

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

  it('only ever asks "which word has a different sound?"', () => {
    // The exam has one pronunciation format, so the test has one too.
    for (const question of pronVowels) {
      expect(question.type).toBe('different-sound');
      expect(question.prompt).toBe('Which word has a different sound?');
    }
  });

  it('leaves one defensible odd word in every weak-vowel row', () => {
    const vowelsOf = (word: string): string[] => {
      const key = norm(word);
      const listed = VOWELS_IN[key];
      if (listed) return listed;
      // Any other word is compared on the vowel its Sound Bank row teaches.
      const sound = vowelSounds.find((s) => s.key === SOUND_TABLE[key]?.[0]);
      return sound ? [sound.ipa] : [];
    };

    const weakRows = vowelRows.filter((row) => row.some((w) => VOWELS_IN[norm(w)]));
    // Every word of the group is in one of them, and the rule below is what
    // makes those rows answerable.
    const inWeakRows = new Set(weakRows.flat().map(norm));
    for (const word of Object.keys(VOWELS_IN)) expect(inWeakRows.has(word), word).toBe(true);

    for (const row of weakRows) {
      const sets = row.map((word) => new Set(vowelsOf(word)));
      const shares = (a: number, b: number): boolean =>
        [...(sets[a] as Set<string>)].some((v) => (sets[b] as Set<string>).has(v));

      // Exactly one pair of the three words may share a vowel — any vowel, not
      // just the taught one — so the third word is the only answer the row
      // admits however the learner listens to it.
      const pairs: Array<[number, number]> = [[0, 1], [0, 2], [1, 2]];
      expect(pairs.filter(([a, b]) => shares(a, b)).length, row.join(', ')).toBe(1);
    }
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
