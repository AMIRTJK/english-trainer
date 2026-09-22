import type { VowelQuestion } from '@/features/vowel-sounds';
import { CompareButton, SoundButton, SpeakButton } from '@/features/pronounce';

interface Props {
  question: VowelQuestion;
  /** Index of the option the learner picked; `null` before they answer. */
  picked: number | null;
  onPick: (index: number) => void;
  onNext: () => void;
}

/** Highlight the letters the rule is about, so the eye learns where to look. */
function Spelled({ word, letters }: { word: string; letters: string | null }): JSX.Element {
  if (!letters || letters === '—') return <>{word}</>;
  const at = word.toLowerCase().indexOf(letters.toLowerCase());
  if (at < 0) return <>{word}</>;
  return (
    <>
      {word.slice(0, at)}
      <mark className="vowel-letters">{word.slice(at, at + letters.length)}</mark>
      {word.slice(at + letters.length)}
    </>
  );
}

const LEVEL_LABEL: Record<number, string> = {
  1: 'обычное написание',
  2: 'спорные буквы',
  3: 'исключение',
};

/**
 * One vowel question.
 *
 * The answer alone teaches nothing, so the card only counts as finished once it
 * has shown *why*: the rule for these letters, what else the same letters can
 * spell, and the other words that behave the same way.
 */
export function VowelQuestionCard({ question, picked, onPick, onNext }: Props): JSX.Element {
  const { word, sound, options, answer } = question;
  const answered = picked !== null;
  const right = picked === answer;

  return (
    <article className="card flashcard stack gap-16">
      <div className="stack gap-8">
        <p className="tiny dim">
          Какой гласный звук в этом слове? <span className="faint">· {LEVEL_LABEL[word.level]}</span>
        </p>
        <h2 className="flashcard-word">
          {answered ? <Spelled word={word.word} letters={word.letters} /> : word.word}
        </h2>
        <SpeakButton text={word.word} slow />
      </div>

      <ul className="vowel-options" role="radiogroup" aria-label="Vowel sound">
        {options.map((option, index) => {
          const isAnswer = index === answer;
          const state = !answered ? '' : isAnswer ? ' is-right' : index === picked ? ' is-wrong' : ' is-dim';
          return (
            <li key={option.key}>
              <button
                type="button"
                role="radio"
                aria-checked={picked === index}
                className={`vowel-option${state}`}
                disabled={answered}
                onClick={() => onPick(index)}
              >
                <span className="vowel-option-ipa">/{option.ipa}/</span>
                {option.example ? <span className="small dim">{option.example}</span> : null}
                {answered && isAnswer ? <span className="tiny tone-good">верно</span> : null}
              </button>
            </li>
          );
        })}
      </ul>

      {answered ? (
        <div className="stack gap-12" aria-live="polite">
          <div className="between">
            <p className={`small ${right ? 'tone-good' : 'tone-bad'}`}>
              {right ? '✓ Верно' : '✗ Правильный ответ'}: /{sound.ipa}/ — {sound.ru}
            </p>
            <SoundButton ipa={sound.ipa} label="Just the sound" long compact />
          </div>

          <section className="stack gap-8 why-box">
            <h3 className="small">Почему именно этот звук</h3>
            {question.why.map((line, index) => (
              <p key={index} className="small">{line}</p>
            ))}
          </section>

          {question.sameSpelling.length > 0 ? (
            <section className="stack gap-8">
              <div className="between">
                <h3 className="small">
                  {word.letters === null
                    ? 'Другие исключения с этим звуком'
                    : `Так же пишется и звучит${word.letters === '—' ? '' : ` («${word.letters}»)`}`}
                </h3>
                <CompareButton words={[word.word, ...question.sameSpelling]} label="Compare" />
              </div>
              <p className="word-chips-plain">{question.sameSpelling.join(' · ')}</p>
            </section>
          ) : null}

          {question.sameSound.length > 0 ? (
            <section className="stack gap-8">
              <h3 className="small">
                Тот же звук /{sound.ipa}/{word.letters === null ? ', обычное написание' : ', но другое написание'}
              </h3>
              <p className="word-chips-plain">{question.sameSound.join(' · ')}</p>
            </section>
          ) : null}

          <button type="button" className="btn btn-primary btn-block" onClick={onNext}>
            Next →
          </button>
        </div>
      ) : (
        <p className="tiny faint">
          Keys <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> pick an answer, <kbd>Enter</kbd> moves on.
        </p>
      )}
    </article>
  );
}
