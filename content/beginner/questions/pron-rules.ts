import type { Question, VowelSound } from '../../types';
import { confusableSounds, vowelSounds } from '../pronunciation';
import { makeQuestions, type Draft } from './build';

/**
 * The Sound Bank rules test (SB p.134).
 *
 * The Vowel sounds test asks "which word has this sound?". This one asks about
 * the rules the Sound Bank screen prints when a sound is expanded: which
 * letters spell a sound, which sound a spelling makes, which words the book
 * flags "! but also", and which of the three groups a sound belongs to.
 *
 * Everything is derived from `vowelTable` — the transcription of the page —
 * so the test cannot drift from the screen it is testing, and the explanation
 * of every answer is the rule as the Sound Bank states it
 * (`docs/decisions.md` §19).
 */

const GROUP_LABEL: Record<string, string> = {
  'short-vowel': 'a short vowel',
  'long-vowel': 'a long vowel',
  diphthong: 'a diphthong',
};

/**
 * The page prints the two weak vowels as bare symbols, so a question has to
 * name them by one of their words instead. `situation` rather than the book's
 * first example `usually`, which would read "which letters usually spell
 * /u/ usually?".
 */
const WEAK_KEY_WORD: Record<string, string> = { 'weak-i': 'happy', 'weak-u': 'situation' };

function keyWord(sound: VowelSound): string {
  return WEAK_KEY_WORD[sound.key] ?? sound.key;
}

const label = (sound: VowelSound): string => `/${sound.ipa}/ ${keyWord(sound)}`;

/** Every word the page flags "! but also", anywhere on it. */
const allExceptions = new Set(
  vowelSounds.flatMap((s) => s.exceptions.map((w) => w.toLowerCase())),
);

/**
 * A distractor is unusable when the sound's own "! but also" list contains
 * those letters: `bread` is on the /e/ row, so "which sound does `ea` spell?"
 * must not offer /e/ as a wrong answer.
 */
function spoiled(letters: string, sound: VowelSound): boolean {
  return sound.exceptions.some((w) => w.toLowerCase().includes(letters));
}

/** Two different entries of `list`, chosen deterministically from `offset`. */
function two<T>(list: T[], offset: number): [T, T] | null {
  const n = list.length;
  if (n < 2) return null;
  const first = offset % n;
  const second = (first + 1 + (offset % (n - 1))) % n;
  return [list[first] as T, list[second] as T];
}

const spellable = vowelSounds.filter((s) => s.patterns.some((p) => p.letters !== '—'));
const drafts: Draft[] = [];

// ---- 1. letters -> sound, for letters that spell one sound on the page ----
spellable.forEach((sound, si) => {
  sound.patterns.forEach((pattern, i) => {
    if (pattern.letters === '—') return;
    if (confusableSounds(sound.key, pattern.letters).length > 0) return;
    const others = vowelSounds.filter(
      (s) => s.key !== sound.key && !spoiled(pattern.letters, s),
    );
    const pair = two(others, si * 5 + i);
    if (!pair) return;
    drafts.push({
      q: `Which sound do the letters "${pattern.letters}" usually spell?`,
      o: [label(sound), label(pair[0]), label(pair[1])],
      a: 0,
      e: `${pattern.ru} Пример: ${pattern.examples.join(', ')}.`,
      c: `letters-${pattern.letters}`,
      d: 1,
    });
  });
});

// ---- 2. sound -> letters, one question per spelling rule of the page ----
spellable.forEach((sound, si) => {
  const own = new Set(sound.patterns.map((p) => p.letters));
  const foreign = spellable
    .flatMap((s) => s.patterns.map((p) => p.letters))
    .filter((letters) => letters !== '—' && !own.has(letters) && !spoiled(letters, sound));

  sound.patterns.forEach((pattern, i) => {
    if (pattern.letters === '—') return;
    const pair = two([...new Set(foreign)], si * 5 + i);
    if (!pair) return;
    drafts.push({
      q: `Which letters usually spell ${label(sound)}?`,
      o: [pattern.letters, pair[0], pair[1]],
      a: 0,
      e: `${pattern.ru} Пример: ${pattern.examples.join(', ')}.`,
      c: `spelling-${sound.key}`,
      d: 2,
    });
  });
});

// ---- 3. the "! but also" column ----
vowelSounds.forEach((sound, si) => {
  const regular = sound.patterns
    .flatMap((p) => p.examples)
    .filter((w) => !allExceptions.has(w.toLowerCase()));

  sound.exceptions.forEach((word, i) => {
    const pair = two(regular, si * 3 + i);
    if (!pair) return;
    drafts.push({
      q: `Which word is a "! but also" word for ${label(sound)}?`,
      o: [word, pair[0], pair[1]],
      a: 0,
      e:
        `Книга помечает «! but also»: ${sound.exceptions.join(', ')} — ` +
        `написание не подсказывает ${`/${sound.ipa}/`}. ` +
        `${pair[0]} и ${pair[1]} читаются по правилу: ${sound.hint}`,
      c: `exception-${sound.key}`,
      d: 3,
    });
  });
});

// ---- 4. which group a sound belongs to ----
const grouped = vowelSounds.filter((s) => GROUP_LABEL[s.type] !== undefined);
grouped.forEach((sound, i) => {
  const others = grouped.filter((s) => s.type !== sound.type);
  const pair = two(others, i * 3 + 1);
  if (!pair) return;
  drafts.push({
    q: `Which sound is ${GROUP_LABEL[sound.type]}?`,
    o: [label(sound), label(pair[0]), label(pair[1])],
    a: 0,
    e:
      `${label(sound)} — ${GROUP_LABEL[sound.type]} на странице Sound Bank. ` +
      `${sound.ru}. ${label(pair[0])} и ${label(pair[1])} стоят в других группах.`,
    c: `group-${sound.type}`,
    d: 2,
  });
});

export const pronRules: Question[] = makeQuestions(
  {
    topicId: 'beg-p-sound-rules',
    categoryId: 'pronunciation',
    unit: 3,
    type: 'choose-word',
    source: { book: 'SB', page: 134, ref: 'Sound Bank — vowel sounds, spelling rules' },
    slug: 'rl',
  },
  drafts,
);
