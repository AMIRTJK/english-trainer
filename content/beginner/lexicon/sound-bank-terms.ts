import { vowelSounds } from '../pronunciation';

/**
 * The words SB p.134 uses to talk about sounds, rather than the words it
 * teaches: the three group headings it prints ("short vowels", "long vowels",
 * "diphthongs") and every letter string in its "usual spelling" column
 * (`ee`, `igh`, `ere`…).
 *
 * The Sound Bank rules test shows these to the learner, so the lexicon gate has
 * to allow them. The letters are derived from the transcription of the page,
 * not re-typed, so a change to the table cannot leave this list behind
 * (`docs/decisions.md` §19).
 */
const groupHeadings = 'vowel vowels diphthong diphthongs';

const spellingLetters = vowelSounds
  .flatMap((sound) => sound.patterns.map((pattern) => pattern.letters))
  .filter((letters) => letters !== '—')
  .join(' ');

export const soundBankTerms = `${groupHeadings} ${spellingLetters}`;
