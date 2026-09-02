import type { Question } from '@content/types';

/** Render one syllable-marked option, e.g. `"'won|der|ful"`. */
function StressOption({ value }: { value: string }): JSX.Element {
  const parts = value.split('|');
  return (
    <span>
      {parts.map((part, i) => {
        const stressed = part.startsWith("'");
        const text = stressed ? part.slice(1) : part;
        return (
          <span key={`${part}-${i}`}>
            {i > 0 ? <span aria-hidden="true" className="syllable-dot">·</span> : null}
            <span
              style={stressed
                ? { fontWeight: 750, textDecoration: 'underline', textUnderlineOffset: 3 }
                : undefined}
            >
              {text}
            </span>
          </span>
        );
      })}
    </span>
  );
}

export function OptionLabel({ question, value }: { question: Question; value: string }): JSX.Element {
  if (question.type === 'word-stress') return <StressOption value={value} />;
  return <span>{value}</span>;
}

/** Split a prompt on the `___` gap so the blank can be styled. */
export function PromptText({ prompt }: { prompt: string }): JSX.Element {
  if (!prompt.includes('___')) return <>{prompt}</>;
  const [before, after] = prompt.split('___');
  return (
    <>
      {before}
      <span className="gap-blank" aria-label="gap" />
      {after}
    </>
  );
}

export function questionHint(question: Question): string | null {
  if (question.type === 'different-sound') return 'Which word has a different sound?';
  if (question.type === 'word-stress') return 'Which is the stressed syllable?';
  return null;
}
