import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLevelIndex } from '@content/registry';
import { useApp } from '@/app/store/app-store';
import {
  answeredCount, displayOptions, finishSession, type TestSession,
} from '@/features/run-test/model/session';
import { clearSession, flushSession, loadSession, saveSession } from '@/features/run-test/model/session-store';
import { Empty } from '@/shared/ui/primitives';
import { OptionLabel, PromptText, questionHint } from '@/features/run-test/ui/QuestionView';
import { RunnerBar } from './RunnerBar';
import './runner.css';

export default function TestRunnerPage(): JSX.Element {
  const navigate = useNavigate();
  const { saveAttempt } = useApp();
  const [session, setSession] = useState<TestSession | null>(() => loadSession());
  const [confirmExit, setConfirmExit] = useState(false);
  const questionStart = useRef<number>(Date.now());

  const index = getLevelIndex(session?.levelId ?? '');
  const item = session ? session.items[session.current] : undefined;
  const question = item ? index?.byId.get(item.questionId) : undefined;

  const options = useMemo(
    () => (question && item ? displayOptions(question, item.optionOrder) : []),
    [question, item],
  );

  useEffect(() => { questionStart.current = Date.now(); }, [session?.current]);

  const update = useCallback((mutate: (draft: TestSession) => void) => {
    setSession((current) => {
      if (!current) return current;
      const next: TestSession = { ...current, items: [...current.items] };
      mutate(next);
      saveSession(next);
      return next;
    });
  }, []);

  const choose = useCallback((choice: number) => {
    update((draft) => {
      const target = draft.items[draft.current];
      if (!target) return;
      draft.items[draft.current] = {
        ...target,
        chosen: choice,
        elapsedMs: target.elapsedMs + (Date.now() - questionStart.current),
      };
    });
  }, [update]);

  const go = useCallback((delta: number) => {
    update((draft) => {
      draft.current = Math.max(0, Math.min(draft.items.length - 1, draft.current + delta));
    });
  }, [update]);

  const submit = useCallback(() => {
    if (!session) return;
    const attempt = finishSession(session);
    if (!attempt) return;
    saveAttempt(attempt);
    clearSession();
    navigate(`/results/${attempt.id}`, { replace: true });
  }, [session, saveAttempt, navigate]);

  // Keyboard: 1/2/3 or A/B/C to answer, Enter to advance.
  useEffect(() => {
    const onKey = (event: KeyboardEvent): void => {
      if (!session) return;
      const key = event.key.toLowerCase();
      const map: Record<string, number> = { '1': 0, a: 0, '2': 1, b: 1, '3': 2, c: 2 };
      if (key in map) {
        event.preventDefault();
        choose(map[key] as number);
        return;
      }
      if (key === 'enter') {
        event.preventDefault();
        if (session.current === session.items.length - 1) submit();
        else go(1);
      }
      if (key === 'arrowleft' && session.allowBack) go(-1);
      if (key === 'arrowright') go(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [session, choose, go, submit]);

  // Persist the in-progress test if the tab goes away.
  useEffect(() => {
    const onHide = (): void => flushSession();
    window.addEventListener('pagehide', onHide);
    document.addEventListener('visibilitychange', onHide);
    return () => {
      window.removeEventListener('pagehide', onHide);
      document.removeEventListener('visibilitychange', onHide);
      flushSession();
    };
  }, []);

  if (!session || !question || !item) {
    return (
      <div className="page">
        <Empty title="No test in progress">
          <button className="btn" type="button" onClick={() => navigate('/tests')}>
            Choose a test
          </button>
        </Empty>
      </div>
    );
  }

  const total = session.items.length;
  const done = answeredCount(session);
  const isLast = session.current === total - 1;
  const hint = questionHint(question);

  return (
    <div className="runner">
      <RunnerBar
        current={session.current + 1}
        total={total}
        answered={done}
        startedAt={session.startedAt}
        timed={session.timed}
        onExit={() => setConfirmExit(true)}
      />

      <main className="runner-main">
        {session.warnings.length > 0 && session.current === 0 ? (
          <div className="notice notice-warn">{session.warnings[0]}</div>
        ) : null}

        <div className="runner-question">
          {hint && hint !== question.prompt ? <p className="small dim">{hint}</p> : null}
          <h1 className="prompt"><PromptText prompt={question.prompt} /></h1>
        </div>

        <div className="runner-options" role="radiogroup" aria-label="Answer options">
          {options.map((value, i) => {
            const letter = ['A', 'B', 'C'][i] ?? '';
            const active = item.chosen === i;
            return (
              <button
                key={`${value}-${i}`}
                type="button"
                role="radio"
                aria-checked={active}
                className={`option${active ? ' is-selected' : ''}`}
                onClick={() => choose(i)}
              >
                <span className="option-letter" aria-hidden="true">{letter}</span>
                <span className="option-text">
                  <OptionLabel question={question} value={value} />
                </span>
              </button>
            );
          })}
        </div>
      </main>

      <footer className="runner-foot">
        <button
          className="btn"
          type="button"
          onClick={() => go(-1)}
          disabled={!session.allowBack || session.current === 0}
        >
          Back
        </button>
        <span className="tiny faint mono-num">{done}/{total} answered</span>
        {isLast ? (
          <button className="btn btn-primary" type="button" onClick={submit}>Finish test</button>
        ) : (
          <button className="btn btn-primary" type="button" onClick={() => go(1)}>Next</button>
        )}
      </footer>

      {confirmExit ? (
        <div className="runner-modal" role="dialog" aria-modal="true" aria-label="Leave test">
          <div className="card stack gap-12" style={{ maxWidth: 380 }}>
            <h2>Leave this test?</h2>
            <p className="small dim">
              Your answers so far are saved, so you can come back and finish it later.
            </p>
            <div className="row">
              <button className="btn" type="button" onClick={() => setConfirmExit(false)}>
                Keep going
              </button>
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => { flushSession(); navigate('/tests'); }}
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
