import { createLexiconChecker, toWordSet } from '../../common/lexicon';
import { functionWords } from './function-words';
import { names, moreNames } from './names';
import { vocabularyBank, exerciseWords, extraWords, extraWords2 } from './vocabulary-bank';
import { pronunciationWords } from './pronunciation-words';
import { wordsToLearn } from './words-to-learn';
import { deliberateErrors } from './deliberate-errors';
import { soundBankTerms } from './sound-bank-terms';

/** Build the allowed-word set once at module init (see Performance.md §1). */
export const lexicon: ReadonlySet<string> = toWordSet(
  functionWords,
  names,
  moreNames,
  vocabularyBank,
  pronunciationWords,
  exerciseWords,
  extraWords,
  extraWords2,
  wordsToLearn,
  soundBankTerms,
);

/** Forms that are wrong on purpose. They may only ever appear as a distractor. */
export const wrongForms: ReadonlySet<string> = toWordSet(deliberateErrors);

export { normaliseWord } from '../../common/lexicon';

export const { unknownWords, wrongFormsIn } = createLexiconChecker(lexicon, wrongForms);
