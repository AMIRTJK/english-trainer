import { functionWords } from './function-words';
import { names, moreNames } from './names';
import { vocabularyBank, exerciseWords, extraWords, extraWords2 } from './vocabulary-bank';
import { pronunciationWords } from './pronunciation-words';
import { deliberateErrors } from './deliberate-errors';
/** Build the allowed-word set once at module init (see Performance.md §1). */
function toSet(...blocks) {
    const set = new Set();
    for (const block of blocks) {
        for (const raw of block.split(/\s+/)) {
            const word = raw.trim().toLowerCase();
            if (word)
                set.add(word);
        }
    }
    return set;
}
export const lexicon = toSet(functionWords, names, moreNames, vocabularyBank, pronunciationWords, exerciseWords, extraWords, extraWords2);
/** Forms that are wrong on purpose. They may only ever appear as a distractor. */
export const wrongForms = toSet(deliberateErrors);
/** Normalise a token: lowercase, curly quotes to straight, strip outer punctuation. */
export function normaliseWord(raw) {
    return raw
        .toLowerCase()
        .normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’]/g, "'")
        .replace(/^[^a-z0-9']+/, '')
        .replace(/[^a-z0-9'-]+$/, '')
        .replace(/^'+|'+$/g, '');
}
/** Candidate base forms for an inflected word. */
function baseForms(word) {
    const out = [word];
    if (word.endsWith("'s"))
        out.push(word.slice(0, -2));
    if (word.endsWith("s'"))
        out.push(word.slice(0, -2));
    if (word.endsWith('ies') && word.length > 4)
        out.push(word.slice(0, -3) + 'y');
    if (word.endsWith('es') && word.length > 3)
        out.push(word.slice(0, -2));
    if (word.endsWith('s') && word.length > 2)
        out.push(word.slice(0, -1));
    if (word.endsWith('ing') && word.length > 4) {
        const stem = word.slice(0, -3);
        out.push(stem, stem + 'e');
        const last = stem.at(-1);
        if (last && stem.at(-2) === last)
            out.push(stem.slice(0, -1));
    }
    if (word.endsWith('ed') && word.length > 3) {
        const stem = word.slice(0, -2);
        out.push(stem, stem.slice(0, -1) === '' ? stem : stem);
        const last = stem.at(-1);
        if (last && stem.at(-2) === last)
            out.push(stem.slice(0, -1));
    }
    if (word.includes('-'))
        out.push(...word.split('-'));
    return out;
}
function isKnown(word, extra) {
    for (const form of baseForms(word)) {
        if (lexicon.has(form) || extra?.has(form))
            return true;
    }
    return false;
}
/** Tokens that carry no vocabulary: labels, numbers, emails, punctuation. */
function isSkippable(word) {
    if (!word)
        return true;
    if (word.length === 1)
        return true;
    if (/\d/.test(word))
        return true;
    if (word.includes('@'))
        return true;
    return false;
}
/** Words in `text` that are not in the allowed lexicon. */
export function unknownWords(text, extra) {
    const out = [];
    for (const raw of text.split(/[\s/|]+/)) {
        const word = normaliseWord(raw);
        if (isSkippable(word))
            continue;
        if (isKnown(word, extra))
            continue;
        out.push(word);
    }
    return out;
}
/** Deliberately wrong forms found in `text`. */
export function wrongFormsIn(text) {
    const out = [];
    for (const raw of text.split(/[\s/|]+/)) {
        const word = normaliseWord(raw);
        if (word && wrongForms.has(word))
            out.push(word);
    }
    return out;
}
