import type { VowelSound, VowelWord } from '@content/types';
import { createRng, shuffleInPlace, type Rng } from '@/shared/lib/random';

export interface VowelOption {
  key: string;
  ipa: string;
  /** The Sound Bank key word, e.g. `tree`. Empty for the two weak vowels. */
  example: string;
}

export interface VowelQuestion {
  word: VowelWord;
  sound: VowelSound;
  options: VowelOption[];
  /** Index of the correct option in `options`. */
  answer: number;
  /** Why this word has this sound — the point of the whole exercise. */
  why: string[];
  /** Other words on the page with the same sound and the same spelling. */
  sameSpelling: string[];
  /** Words with the same sound spelled some other way. */
  sameSound: string[];
}

const OPTION_COUNT = 3;
const SIMILAR_LIMIT = 5;

/** The book prints these two without a key word, so there is nothing to show. */
function exampleFor(sound: VowelSound): string {
  return sound.key.startsWith('weak-') ? '' : sound.key;
}

function toOption(sound: VowelSound): VowelOption {
  return { key: sound.key, ipa: sound.ipa, example: exampleFor(sound) };
}

/**
 * Pick the two wrong answers.
 *
 * A distractor is only useful if the learner could plausibly have chosen it, so
 * the first choice is a sound the *same letters* really do spell somewhere on
 * SB p.134 — `oo` in *book* and in *food*, `ere` in *here* and in *there*. That
 * is the confusion the exam tests. The rest are filled from the same family
 * (short, long, diphthong) so the three options stay comparable.
 */
export function distractorsFor(
  sound: VowelSound,
  confusable: readonly string[],
  all: readonly VowelSound[],
  rng: Rng,
): VowelSound[] {
  const byKey = new Map(all.map((s) => [s.key, s]));
  const picked: VowelSound[] = [];
  const taken = new Set<string>([sound.key]);

  for (const key of confusable) {
    const other = byKey.get(key);
    if (!other || taken.has(key)) continue;
    picked.push(other);
    taken.add(key);
    if (picked.length === OPTION_COUNT - 1) return picked;
  }

  const family = shuffleInPlace(
    all.filter((s) => s.type === sound.type && !taken.has(s.key)),
    rng,
  );
  const rest = shuffleInPlace(all.filter((s) => !taken.has(s.key)), rng);

  for (const candidate of [...family, ...rest]) {
    if (taken.has(candidate.key)) continue;
    picked.push(candidate);
    taken.add(candidate.key);
    if (picked.length === OPTION_COUNT - 1) break;
  }
  return picked;
}

/** The explanation shown after the answer, as separate lines. */
export function explain(
  word: VowelWord,
  sound: VowelSound,
  confusable: readonly string[],
  byKey: ReadonlyMap<string, VowelSound>,
): string[] {
  const lines: string[] = [];

  if (word.letters === null) {
    lines.push(
      `Книга приводит «${word.word}» в колонке «! but also»: написание не подсказывает звук, ` +
      'это слово-исключение — его нужно запомнить.',
    );
    lines.push(`Обычное написание для /${sound.ipa}/: ${sound.hint}`);
    return lines;
  }

  const pattern = sound.patterns.find((p) => p.letters === word.letters);
  if (pattern) {
    lines.push(pattern.ru);
    if (pattern.magicE) {
      lines.push(
        'Звёздочка в книге значит «especially before consonant + e»: немая e на конце ' +
        'не читается, но удлиняет гласную перед согласной.',
      );
    }
  }

  if (confusable.length > 0) {
    const others = confusable
      .map((key) => byKey.get(key))
      .filter((s): s is VowelSound => s !== undefined)
      .map((s) => {
        const example = s.patterns
          .find((p) => p.letters === word.letters)?.examples[0];
        return `/${s.ipa}/${example ? ` (${example})` : ''}`;
      });
    lines.push(
      `Внимание: те же буквы «${word.letters}» дают и другие звуки — ${others.join(', ')}. ` +
      'Поэтому здесь написание подсказывает, но не решает: слово надо узнавать.',
    );
  } else {
    lines.push(`Буквы «${word.letters}» на этой странице читаются только так — это надёжный признак.`);
  }

  return lines;
}

/** Build one question. Pure and deterministic given a seed. */
export function buildQuestion(
  word: VowelWord,
  sounds: readonly VowelSound[],
  bySound: ReadonlyMap<string, VowelWord[]>,
  confusable: readonly string[],
  seed: number,
): VowelQuestion | null {
  const byKey = new Map(sounds.map((s) => [s.key, s]));
  const sound = byKey.get(word.sound);
  if (!sound) return null;

  const rng = createRng(seed);
  const options = shuffleInPlace(
    [sound, ...distractorsFor(sound, confusable, sounds, rng)].map(toOption),
    rng,
  );

  const siblings = (bySound.get(sound.key) ?? []).filter((w) => w.id !== word.id);

  return {
    word,
    sound,
    options,
    answer: options.findIndex((option) => option.key === sound.key),
    why: explain(word, sound, confusable, byKey),
    sameSpelling: siblings
      .filter((w) => w.letters === word.letters)
      .map((w) => w.word)
      .slice(0, SIMILAR_LIMIT),
    sameSound: siblings
      .filter((w) => w.letters !== word.letters)
      .map((w) => w.word)
      .slice(0, SIMILAR_LIMIT),
  };
}
