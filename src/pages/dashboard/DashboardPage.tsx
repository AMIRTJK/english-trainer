import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORY_LABELS, CATEGORY_ORDER } from '@content/registry';
import { useApp } from '@/app/store/app-store';
import { useLevelData, weakAreas } from '@/entities/topic/model/use-level-data';
import { categoryBreakdown } from '@/entities/attempt/model/statistics';
import { Bar, Empty, Pill, Stat, formatDate, toneForPercent } from '@/shared/ui/primitives';
import { WeakAreasCard } from '@/widgets/weak-areas/WeakAreasCard';
import { VocabSummaryCard } from '@/widgets/vocab';
import { GoalCard } from './GoalCard';
import { RecentTests } from './RecentTests';

export function DashboardPage(): JSX.Element {
  const { user } = useApp();
  const data = useLevelData();

  const stats = useMemo(() => {
    const attempts = data.progress.attempts;
    const scored = attempts.filter((a) => a.total > 0);
    const best = scored.reduce((max, a) => Math.max(max, a.percent), 0);
    const last = scored[0] ?? null;
    const average = scored.length
      ? Math.round(scored.reduce((sum, a) => sum + a.percent, 0) / scored.length)
      : 0;
    return {
      count: scored.length,
      best,
      last,
      average,
      categories: categoryBreakdown(data.progress.topicStats),
      lastQuick: scored.find((a) => a.kind === 'quick' || a.kind === 'imported') ?? null,
      lastOfficial: scored.find((a) => a.kind === 'official') ?? null,
    };
  }, [data.progress]);

  const weak = useMemo(() => weakAreas(data.summaries), [data.summaries]);
  const titleOf = (id: string): string => data.index?.topicById.get(id)?.title ?? id;

  if (!data.hasContent) {
    return (
      <div className="page">
        <Empty title="Content for this level is not available yet">
          Switch back to Beginner in Settings, or add a content pack for {data.levelName}.
        </Empty>
      </div>
    );
  }

  return (
    <div className="page stack gap-24">
      <header className="stack gap-8">
        <h1>Welcome back, {user?.profile.name}</h1>
        <p className="dim small">
          {data.levelName} · {data.index?.content.questions.length} verified questions
          across {data.index?.content.topics.length} topics
        </p>
      </header>

      {stats.count === 0 ? (
        <section className="card stack gap-12">
          <h2>Start here</h2>
          <p className="small dim">
            Take a Quick Test to see where you stand, or go straight to the topics you know are hard.
          </p>
          <div className="row">
            <Link className="btn btn-primary" to="/tests?start=quick">Quick Test — 50 questions</Link>
            <Link className="btn" to="/tests">All test types</Link>
          </div>
        </section>
      ) : (
        <div className="grid grid-4">
          <Stat
            label="Last score"
            value={stats.last ? `${stats.last.correct}/${stats.last.total}` : '—'}
            hint={stats.last ? `${stats.last.percent}% · ${formatDate(stats.last.finishedAt)}` : undefined}
          />
          <Stat label="Best" value={`${stats.best}%`} />
          <Stat label="Average" value={`${stats.average}%`} />
          <Stat label="Tests taken" value={stats.count} />
        </div>
      )}

      <GoalCard
        goals={user?.profile.goals[data.levelId] ?? { quick: 45, official: 90 }}
        lastQuick={stats.lastQuick}
        lastOfficial={stats.lastOfficial}
      />

      {stats.categories.length > 0 ? (
        <section className="card stack gap-16">
          <h2>By section</h2>
          <div className="stack gap-16">
            {CATEGORY_ORDER.map((categoryId) => {
              const row = stats.categories.find((c) => c.categoryId === categoryId);
              if (!row || row.seen === 0) return null;
              return (
                <div key={categoryId} className="stack gap-8">
                  <div className="between">
                    <span className="small" style={{ fontWeight: 600 }}>
                      {CATEGORY_LABELS[categoryId]}
                    </span>
                    <span className="row" style={{ gap: 8 }}>
                      <span className="tiny faint">{row.correct}/{row.seen}</span>
                      <span className="mono-num" style={{ fontWeight: 650 }}>{row.percent}%</span>
                    </span>
                  </div>
                  <Bar percent={row.percent} tone={toneForPercent(row.percent)} />
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      <WeakAreasCard topics={weak} titleOf={titleOf} />

      <VocabSummaryCard />

      <RecentTests attempts={data.progress.attempts.slice(0, 6)} />

      <section className="card stack gap-12">
        <div className="between">
          <h2>Quick actions</h2>
          <Pill tone="accent">{data.levelName}</Pill>
        </div>
        <div className="row">
          <Link className="btn" to="/tests?start=quick-practice">10-question practice</Link>
          <Link className="btn" to="/tests?start=mistakes">My mistakes</Link>
          <Link className="btn" to="/topics">Browse topics</Link>
        </div>
      </section>
    </div>
  );
}
