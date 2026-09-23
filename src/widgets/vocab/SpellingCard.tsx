import { useEffect, useRef } from 'react';
import type { SoundGroup, VocabWord } from '@content/types';
import { SpeakButton } from '@/features/pronounce';
import { alignDiff, type SpellingResult } from '@/features/vocab-learning';
import { IpaText } from './IpaText';

interface Props {
  word: VocabWord;
  sound: SoundGroup | undefined;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  /** `null` until the answer is submitted. */
  result: SpellingResult | null;
  /** The word with some letters revealed, or `null` when no hint was asked for. */
  hint: string | null;
  hintsLeft: number;
  /** A hint was opened for this card. */
  hinted: boolean;
  onHint: () => void;
  onNext: () => void;
}

/**
 * Two clear rows: what was typed vs what was expected.
 * In a typo, individual missing or extra letters are marked.
 * For an entirely different word, words are shown cleanly without character-level mashup.
 */
function SpellingFeedback({ result }: { result: SpellingResult }): JSX.Element {
  if (result.correct) return <></>;

  if (result.isTypo || result.caseOnly) {
    const { typedMarks, targetMarks } = alignDiff(result.typed, result.target);
    return (
      <div className="spell-feedback stack gap-8" aria-label="Comparison">
        <div className="spell-feedback-row">
          <span className="spell-feedback-label">Your answer:</span>
          <span className="spell-feedback-value spell-feedback-typed">
            {typedMarks.map((m, index) => (
              <span key={`typed-${m.char}-${index}`} className={`spell-mark is-${m.state}`}>
                {m.char === ' ' ? ' ' : m.char}
              </span>
            ))}
          </span>
        </div>
        <div className="spell-feedback-row">
          <span className="spell-feedback-label">Correct:</span>
          <span className="spell-feedback-value spell-feedback-target">
            {targetMarks.map((m, index) => (
              <span key={`target-${m.char}-${index}`} className={`spell-mark is-${m.state}`}>
                {m.char === ' ' ? ' ' : m.char}
              </span>
            ))}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="spell-feedback stack gap-8" aria-label="Comparison">
      <div className="spell-feedback-row">
        <span className="spell-feedback-label">Your answer:</span>
        <span className="spell-feedback-value spell-wrong-full">{result.typed}</span>
      </div>
      <div className="spell-feedback-row">
        <span className="spell-feedback-label">Correct:</span>
        <span className="spell-feedback-value spell-correct-full">{result.target}</span>
      </div>
    </div>
  );
}

function verdict(result: SpellingResult, hinted: boolean): string {
  // Being told the letters is not the same as knowing them, so the card says
  // plainly why a right answer is still coming back.
  if (result.correct) return hinted ? 'Correct — but with a hint, so it comes back' : 'Correct';
  if (result.caseOnly) return 'Almost — this word needs a capital letter';
  if (result.isTypo) return result.distance <= 1 ? 'Almost — just one letter out' : 'Almost — typo';
  return 'Not quite';
}

/**
 * One spelling card: the learner sees the translation and writes the word.
 *
 * The English word is never shown before the answer — that is the whole point
 * of the drill, and it is what the exam asks for.
 */
export function SpellingCard({
  word, sound, value, onChange, onSubmit, result, hint, hintsLeft, hinted, onHint, onNext,
}: Props): JSX.Element {
  const input = useRef<HTMLInputElement>(null);

  // Focus follows the card, so a session can be typed through without the mouse.
  useEffect(() => {
    input.current?.focus();
  }, [word.id, result]);

  const letters = [...word.word.replace(/\s/g, '')].length;

  return (
    <article className="card flashcard stack gap-16">
      <div className="stack gap-8">
        <p className="tiny dim">Write the word in English</p>
        <h2 className="flashcard-ru">«{word.ru}»</h2>
        {result ? null : (
          <p className="tiny faint">
            {letters} letters{sound ? ` · key sound /${sound.ipa}/` : ''}
          </p>
        )}
        <SpeakButton text={word.word} />
      </div>

      {hint && !result ? <p className="spell-hint mono-num">{hint}</p> : null}

      <form
        className="stack gap-8"
        onSubmit={(event) => {
          event.preventDefault();
          if (result) onNext();
          else onSubmit();
        }}
      >
        <label className="tiny dim" htmlFor="spell-input">Your answer</label>
        <input
          id="spell-input"
          ref={input}
          className={`input spell-input${result ? (result.correct ? ' is-right' : ' is-wrong') : ''}`}
          type="text"
          value={value}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          readOnly={result !== null}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            // Explicit rather than relying on the form's implicit submission:
            // the field is read-only once answered, and Enter must then move on.
            if (event.key !== 'Enter') return;
            event.preventDefault();
            if (result) onNext();
            else if (value.trim()) onSubmit();
          }}
        />

        {result ? (
          <div className="stack gap-8" aria-live="polite">
            <p className={`small ${result.correct && !hinted ? 'tone-good' : 'tone-bad'}`}>
              {result.correct ? '✓ ' : '✗ '}{verdict(result, hinted)}
            </p>
            <SpellingFeedback result={result} />
            <p className="small dim">
              <strong>{word.word}</strong>{' '}
              <IpaText ipa={word.ipa} soundIpa={sound?.ipa} /> — «{word.ru}»
            </p>
            <button type="submit" className="btn btn-primary btn-block">Next →</button>
          </div>
        ) : (
          <div className="flashcard-actions">
            <button
              type="button"
              className="btn btn-block"
              onClick={onHint}
              disabled={hintsLeft === 0}
            >
              Hint{hintsLeft > 0 ? ` (${hintsLeft})` : ''}
            </button>
            <button type="submit" className="btn btn-primary btn-block" disabled={!value.trim()}>
              Check
            </button>
          </div>
        )}
      </form>
    </article>
  );
}
