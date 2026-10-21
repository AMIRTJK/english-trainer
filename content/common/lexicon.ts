/**
 * The lexicon gate, shared by every level.
 *
 * Each level keeps its own allowed-word list (built from its own book) and its
 * own list of forms that are wrong on purpose; this module only knows how to
 * check text against them. Levels never share a word list (AGENTS.md §3).
 */

/** Build a word set once at module init (see Performance.md §1). */
export function toWordSet(...blocks: string[]): ReadonlySet<string> {
  const set = new Set<string>();
  for (const block of blocks) {
    for (const raw of block.split(/\s+/)) {
      const word = raw.trim().toLowerCase();
      if (word) set.add(word);
    }
  }
  return set;
}

/** Normalise a token: lowercase, curly quotes to straight, strip outer punctuation. */
export function normaliseWord(raw: string): string {
  return raw
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’]/g, "'")
    .replace(/^[^a-z0-9']+/, '')
    .replace(/[^a-z0-9'-]+$/, '')
    .replace(/^'+|'+$/g, '');
}

/** Candidate base forms for an inflected word. */
function baseForms(word: string): string[] {
  const out = [word];
  if (word.endsWith("'s")) out.push(word.slice(0, -2));
  if (word.endsWith("s'")) out.push(word.slice(0, -2));
  if (word.endsWith('ies') && word.length > 4) out.push(word.slice(0, -3) + 'y');
  if (word.endsWith('es') && word.length > 3) out.push(word.slice(0, -2));
  if (word.endsWith('s') && word.length > 2) out.push(word.slice(0, -1));
  if (word.endsWith('ing') && word.length > 4) {
    const stem = word.slice(0, -3);
    out.push(stem, stem + 'e');
    const last = stem.at(-1);
    if (last && stem.at(-2) === last) out.push(stem.slice(0, -1));
  }
  if (word.endsWith('ed') && word.length > 3) {
    const stem = word.slice(0, -2);
    out.push(stem, stem.slice(0, -1) === '' ? stem : stem);
    const last = stem.at(-1);
    if (last && stem.at(-2) === last) out.push(stem.slice(0, -1));
  }
  if (word.includes('-')) out.push(...word.split('-'));
  return out;
}

/** Tokens that carry no vocabulary: labels, numbers, emails, punctuation. */
function isSkippable(word: string): boolean {
  if (!word) return true;
  if (word.length === 1) return true;
  if (/\d/.test(word)) return true;
  if (word.includes('@')) return true;
  return false;
}

export interface LexiconChecker {
  /** Words in `text` that are not in the allowed lexicon. */
  unknownWords: (text: string, extra?: ReadonlySet<string>) => string[];
  /** Deliberately wrong forms found in `text`. */
  wrongFormsIn: (text: string) => string[];
}

/** A checker bound to one level's lexicon and wrong-form list. */
export function createLexiconChecker(
  lexicon: ReadonlySet<string>,
  wrongForms: ReadonlySet<string>,
): LexiconChecker {
  const isKnown = (word: string, extra?: ReadonlySet<string>): boolean => {
    for (const form of baseForms(word)) {
      if (lexicon.has(form) || extra?.has(form)) return true;
    }
    return false;
  };

  return {
    unknownWords(text, extra) {
      const out: string[] = [];
      for (const raw of text.split(/[\s/|]+/)) {
        const word = normaliseWord(raw);
        if (isSkippable(word)) continue;
        if (isKnown(word, extra)) continue;
        out.push(word);
      }
      return out;
    },
    wrongFormsIn(text) {
      const out: string[] = [];
      for (const raw of text.split(/[\s/|]+/)) {
        const word = normaliseWord(raw);
        if (word && wrongForms.has(word)) out.push(word);
      }
      return out;
    },
  };
}
