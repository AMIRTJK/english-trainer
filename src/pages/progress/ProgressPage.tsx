import { useMemo } from 'react';
import { CATEGORY_LABELS, CATEGORY_ORDER } from '@content/registry';
import { useLevelData } from '@/entities/topic/model/use-level-data';
import { categoryBreakdown } from '@/entities/attempt/model/statistics';
import { Bar, Empty, Pill, Stat, formatDate, toneForPercent } from '@/shared/ui/primitives';
import { KIND_LABEL } from '@/pages/dashboard/RecentTests';
import { ScoreChart } from './ScoreChart';

export default function ProgressPage(): JSX.Element {
  const data = useLevelData();

  const view = useMemo(() => {
    const attempts = data.progress.attempts.filter((a) => a.total > 0);
    const categories = categoryBreakdown(data.progress.topicStats);
    const quick = attempts.filter((a) => a.kind === 'quick');
    const official = attempts.filter((a) => a.kind === 'official');

    let freshSeen = 0; let freshCorrect = 0;
    for (const stat of Object.values(data.progress.topicStats)) {
      freshSeen += stat.firstTrySeen;
      freshCorrect += stat.firstTryCorrect;
    }

    const uniqueQuestions = new Set<string>();
    const uniqueConstructs = new Set<string>();
    for (const stat of Object.values(data.progress.topicStats)) {
      for (const id of stat.seenQuestionIds) uniqueQuestions.add(id);
      for (const id of stat.seenConstructIds) uniqueConstructs.add(id);
    }

    return {
      attempts, categories, quick, official,
      freshPercent: freshSeen === 0 ? 0 : Math.round((freshCorrect / freshSeen) * 100),
      freshSeen,
      uniqueQuestions: uniqueQuestions.size,
      uniqueConstructs: uniqueConstructs.size,
      poolSize: data.index?.content.questions.length ?? 0,
    };
  }, [data.progress, data.index]);

  if (!data.hasContent) {
    return <div className="page"><Empty title="Content for this level is not available yet" /></div>;
  }

  if (view.attempts.length === 0) {
    return (
      <div className="page stack gap-24">
        <h1>{data.levelName} progress</h1>
        <Empty title="No results yet">Take a test and your progress will appear here.</Empty>
      </div>
    );
  }

  const coverage = view.poolSize === 0 ? 0 : Math.round((view.uniqueQuestions / view.poolSize) * 100);

  return (
    <div className="page stack gap-24">
      <header className="stack gap-8">
        <h1>{data.levelName} progress</h1>
        <p className="dim small">
          Results for {data.levelName} only. Other levels are counted separately.
        </p>
      </header>

      <div className="grid grid-4">
        <Stat label="Tests" value={view.attempts.length} />
        <Stat
          label="On new questions"
          value={view.freshSeen === 0 ? '—' : `${view.freshPercent}%`}
          hint={`${view.freshSeen} first attempts`}
        />
        <Stat
          label="Bank covered"
          value={`${coverage}%`}
          hint={`${view.uniqueQuestions} of ${view.poolSize} questions`}
        />
        <Stat label="Structures met" value={view.uniqueConstructs} hint="distinct rules" />
      </div>

      <ScoreChart attempts={view.attempts} />

      <section className="card stack gap-16">
        <h2>By section</h2>
        {CATEGORY_ORDER.map((categoryId) => {
          const row = view.categories.find((c) => c.categoryId === categoryId);
          if (!row || row.seen === 0) return null;
          return (
            <div key={categoryId} className="stack gap-8">
              <div className="between">
                <span className="small" style={{ fontWeight: 600 }}>{CATEGORY_LABELS[categoryId]}</span>
                <span className="row" style={{ gap: 8 }}>
                  <span className="tiny faint mono-num">{row.correct}/{row.seen}</span>
                  <span className="mono-num" style={{ fontWeight: 650 }}>{row.percent}%</span>
                </span>
              </div>
              <Bar percent={row.percent} tone={toneForPercent(row.percent)} />
            </div>
          );
        })}
      </section>

      {[['Quick Test', view.quick], ['Official Test', view.official]].map(([label, list]) => {
        const attempts = list as typeof view.quick;
        if (attempts.length === 0) return null;
        return (
          <section key={label as string} className="card stack gap-12">
            <h2>{label as string} history</h2>
            <div className="stack gap-8">
              {attempts.slice(0, 10).map((attempt) => (
                <div key={attempt.id} className="between">
                  <span className="small grow">
                    {formatDate(attempt.finishedAt)}
                    <span className="faint"> · {KIND_LABEL[attempt.kind]}</span>
                  </span>
                  <Pill tone={toneForPercent(attempt.percent)}>
                    {attempt.correct}/{attempt.total}
                  </Pill>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      <section className="card stack gap-12">
        <h2>Topics that need more data</h2>
        <p className="small dim">
          These have too few answers to judge. They are not weak — they are unmeasured.
        </p>
        <div className="row" style={{ gap: 6 }}>
          {data.summaries
            .filter((s) => s.status === 'not-enough-data')
            .slice(0, 24)
            .map((s) => (
              <Pill key={s.topicId}>{data.index?.topicById.get(s.topicId)?.title ?? s.topicId}</Pill>
            ))}
        </div>
      </section>
    </div>
  );
}
