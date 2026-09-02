import { getLevelIndex } from '@content/registry';
import type { Attempt, SelectionReason } from '@/entities/attempt/model/types';
import { Pill } from '@/shared/ui/primitives';
import { OptionLabel } from '@/features/run-test/ui/QuestionView';

const REASON_LABEL: Record<SelectionReason, string> = {
  new: 'New question',
  'previous-mistake': 'Previous mistake',
  'weak-topic': 'Weak topic',
  'recent-error': 'Recent error',
  'needs-review': 'Needs review',
  coverage: 'Checking coverage',
};

export function MistakeList({
  attempt, titleOf,
}: {
  attempt: Attempt;
  titleOf: (id: string) => string;
}): JSX.Element {
  const index = getLevelIndex(attempt.levelId);
  const mistakes = attempt.answers.filter((a) => !a.correct);

  return (
    <section className="card stack gap-16">
      <div className="between">
        <h2>Your mistakes</h2>
        <span className="small dim">{mistakes.length}</span>
      </div>

      {mistakes.length === 0 ? (
        <p className="small dim">No mistakes in this test.</p>
      ) : (
        <div className="stack gap-16">
          {mistakes.map((answer) => {
            const question = index?.byId.get(answer.questionId);
            return (
              <article key={answer.questionId} className="stack gap-8">
                <div className="row" style={{ gap: 6 }}>
                  <Pill>{titleOf(answer.topicId)}</Pill>
                  <Pill tone="accent">{REASON_LABEL[answer.reason]}</Pill>
                </div>

                <p style={{ fontWeight: 550 }}>
                  {question?.prompt ?? 'Question text not available'}
                </p>

                <div className="stack gap-8" style={{ paddingLeft: 2 }}>
                  <div className="row" style={{ gap: 8 }}>
                    <span className="pill pill-bad">Your answer</span>
                    <span className="small">
                      {answer.chosenText === null ? (
                        <em className="faint">no answer</em>
                      ) : question ? (
                        <OptionLabel question={question} value={answer.chosenText} />
                      ) : answer.chosenText}
                    </span>
                  </div>
                  <div className="row" style={{ gap: 8 }}>
                    <span className="pill pill-good">Correct</span>
                    <span className="small">
                      {question
                        ? <OptionLabel question={question} value={answer.correctText} />
                        : answer.correctText}
                    </span>
                  </div>
                </div>

                {question ? (
                  <p className="small dim" style={{ borderLeft: '2px solid var(--border)', paddingLeft: 10 }}>
                    {question.explanation}
                    {question.sound
                      ? ` (${Object.entries(question.sound.ipa)
                          .map(([word, ipa]) => `${word} ${ipa}`)
                          .join(', ')})`
                      : ''}
                  </p>
                ) : null}

                {question ? (
                  <p className="tiny faint">
                    {question.source.book === 'SB' ? 'Student’s Book' : 'Workbook'}
                    {' '}p.{question.source.page} · {question.source.ref}
                  </p>
                ) : null}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
