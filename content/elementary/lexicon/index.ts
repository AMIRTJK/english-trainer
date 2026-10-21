import { toWordSet } from '../../common/lexicon';
import { soundBankTermsOf } from '../../common/vowel-bank';
import { vowelSounds } from '../pronunciation';
import { functionWords } from './function-words';
import { names } from './names';
import { irregularVerbs, vocabularyBank } from './vocabulary-bank';
import { lessonWords } from './lesson-words';
import { grammarForms } from './forms';
import { soundBankWords } from './sound-bank-words';
import { deliberateErrors } from './deliberate-errors';

/**
 * Every word form the Elementary level may use, built once at module init
 * (Performance.md §1). It is built from the Elementary book only — no Beginner
 * list is imported, so the two levels cannot leak into each other (AGENTS.md §3).
 */
export const lexicon: ReadonlySet<string> = toWordSet(
  functionWords,
  names,
  vocabularyBank,
  irregularVerbs,
  lessonWords,
  grammarForms,
  soundBankWords,
  soundBankTermsOf(vowelSounds),
);

/** Forms that are wrong on purpose. They may only ever appear as a distractor. */
export const wrongForms: ReadonlySet<string> = toWordSet(deliberateErrors);
