import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CATEGORY_LABELS, getLevelIndex } from '@content/registry';
import { useApp } from '@/app/store/app-store';
import { useLevelData } from '@/entities/topic/model/use-level-data';
import { attemptCategoryBreakdown } from '@/entities/attempt/model/statistics';
import { Bar, Empty, Pill, Stat, formatDuration, toneForPercent } from '@/shared/ui/primitives';
import { KIND_LABEL } from '@/pages/dashboard/RecentTests';
import { MistakeList } from './MistakeList';

export default function ResultsPage(): JSX.Element {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const { user } = useApp();
  const data = useLevelData();

  const attempt = useMemo(
    () => data.progress.attempts.find((a) => a.id === attemptId) ?? null,
    [data.progress.attempts, attemptId],
  );

  const previous = useMemo(() => {
    if (!attempt) return null;
    return data.progress.attempts.find(
      (a) => a.kind === attempt.kind && a.id !== attempt.id && a.total > 0,
    ) ?? null;
  }, [data.progress.attempts, attempt]);

  const analysis = useMemo(() => {
    if (!attempt) return null;
    const categories = attemptCategoryBreakdown(attempt);
    const byTopic = new Map<string, { seen: number; correct: number }>();
    let freshSeen = 0; let freshCorrect = 0;
    let repeatSeen = 0; let repeatCorrect = 0;
    const constructs = new Set<string>();
    const previouslyWrong = { seen: 0, correct: 0 };

    for (const answer of attempt.answers) {
      const row = byTopic.get(answer.topicId) ?? { seen: 0, correct: 0 };
      row.seen += 1;
      if (answer.correct) row.correct += 1;
      byTopic.set(answer.topicId, row);
      constructs.add(answer.constructId);

      if (answer.firstSeen) {
        freshSeen += 1;
        if (answer.correct) freshCorrect += 1;
      } else {
        repeatSeen += 1;
        if (answer.correct) repeatCorrect += 1;
      }
      if (answer.reason === 'previous-mistake' || answer.reason === 'recent-error') {
        previouslyWrong.seen += 1;
        if (answer.correct) previouslyWrong.correct += 1;
      }
    }

    const weakest = [...categories].sort((a, b) => a.percent - b.percent)[0] ?? null;
    return {
      categories, byTopic, freshSeen, freshCorrect, repeatSeen, repeatCorrect,
      constructs: constructs.size, previouslyWrong, weakest,
    };
  }, [attempt]);

  if (!attempt || !analysis) {
    return (
      <div className="page">
        <Empty title="That result is not available">
          <button className="btn" type="button" onClick={() => navigate('/')}>Back to dashboard</button>
        </Empty>
      </div>
    );
  }

  const index = getLevelIndex(attempt.levelId);
  const titleOf = (id: string): string => index?.topicById.get(id)?.title ?? 'Unclassified';
  const goals = user?.profile.goals[data.levelId];
  const maxForKind = attempt.kind === 'official' ? 100 : 50;
  const target = attempt.kind === 'official' ? goals?.official : goals?.quick;

  const pct = (n: number, d: number): number => (d === 0 ? 0 : Math.round((n / d) * 100));

  return (
    <div className="page stack gap-24">
      <header className="stack gap-8">
        <span className="small dim">{KIND_LABEL[attempt.kind]}</span>
        <h1>Score: {attempt.correct}/{attempt.total}</h1>
        <div className="row">
          <Pill tone={toneForPercent(attempt.percent)}>{attempt.percent}%</Pill>
          <span className="small dim">{attempt.wrong} mistakes</span>
          {attempt.durationMs > 0 ? (
            <span className="small dim">· {formatDuration(attempt.durationMs)}</span>
          ) : null}
          {previous ? (
            <span className="small dim">
              · previous {KIND_LABEL[attempt.kind]}: {previous.percent}%
              {' '}({attempt.percent >= previous.percent ? '+' : ''}{attempt.percent - previous.percent})
            </span>
          ) : null}
        </div>
      </header>

      {target && (attempt.kind === 'quick' || attempt.kind === 'official') ? (
        <div className="notice">
          Target for this test: {target}/{maxForKind}. You scored {attempt.correct}/{attempt.total}
          {attempt.total === maxForKind && attempt.correct >= target
            ? ' — target reached.'
            : `. ${Math.max(0, target - Math.round((attempt.percent / 100) * maxForKind))} marks to go.`}
        </div>
      ) : null}

      <section className="card stack gap-16">
        <h2>By section</h2>
        {analysis.categories.map((row) => (
          <div key={row.categoryId} className="stack gap-8">
            <div className="between">
              <span className="small" style={{ fontWeight: 600 }}>{CATEGORY_LABELS[row.categoryId]}</span>
              <span className="row" style={{ gap: 8 }}>
                <span className="tiny faint">{row.correct}/{row.seen}</span>
                <span className="mono-num" style={{ fontWeight: 650 }}>{row.percent}%</span>
              </span>
            </div>
            <Bar percent={row.percent} tone={toneForPercent(row.percent)} />
          </div>
        ))}

        {analysis.weakest && analysis.weakest.percent < 100 ? (
          <div className="notice">
            <strong>Your weakest section: {CATEGORY_LABELS[analysis.weakest.categoryId]}</strong>
            {' '}({analysis.weakest.percent}%).{' '}
            <Link to="/tests?start=weak-areas">Practise weak areas</Link>
          </div>
        ) : null}
      </section>

      <section className="stack gap-12">
        <h2>What this score really shows</h2>
        <div className="grid grid-4">
          <Stat
            label="New questions"
            value={analysis.freshSeen === 0 ? '—' : `${pct(analysis.freshCorrect, analysis.freshSeen)}%`}
            hint={`${analysis.freshCorrect}/${analysis.freshSeen} you had never seen`}
          />
          <Stat
            label="Seen before"
            value={analysis.repeatSeen === 0 ? '—' : `${pct(analysis.repeatCorrect, analysis.repeatSeen)}%`}
            hint={`${analysis.repeatCorrect}/${analysis.repeatSeen} repeats`}
          />
          <Stat
            label="Old mistakes"
            value={analysis.previouslyWrong.seen === 0
              ? '—'
              : `${pct(analysis.previouslyWrong.correct, analysis.previouslyWrong.seen)}%`}
            hint={`${analysis.previouslyWrong.correct}/${analysis.previouslyWrong.seen} fixed`}
          />
          <Stat label="Distinct structures" value={analysis.constructs} hint="different rules tested" />
        </div>
        <p className="tiny faint">
          A high score on questions you have seen before is not the same as understanding.
          The “new questions” number is the honest one.
        </p>
      </section>

      <section className="card stack gap-12">
        <h2>By topic</h2>
        <div className="stack gap-8">
          {[...analysis.byTopic.entries()]
            .sort((a, b) => (a[1].correct / a[1].seen) - (b[1].correct / b[1].seen))
            .map(([topicId, row]) => (
              <div key={topicId} className="between">
                <span className="small grow">{titleOf(topicId)}</span>
                <span className="row" style={{ gap: 8 }}>
                  <span className="tiny faint mono-num">{row.correct}/{row.seen}</span>
                  <Pill tone={toneForPercent(pct(row.correct, row.seen))}>
                    {pct(row.correct, row.seen)}%
                  </Pill>
                </span>
              </div>
            ))}
        </div>
      </section>

      <MistakeList attempt={attempt} titleOf={titleOf} />

      <div className="row">
        <Link className="btn btn-primary" to="/tests?start=weak-areas">Practise weak areas</Link>
        <Link className="btn" to="/tests?start=mistakes">Practise my mistakes</Link>
        <Link className="btn" to="/">Dashboard</Link>
      </div>
    </div>
  );
}
