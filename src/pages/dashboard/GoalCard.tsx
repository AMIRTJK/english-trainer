import type { Attempt } from '@/entities/attempt/model/types';
import type { Goals } from '@/entities/user/model/types';
import { Bar, toneForPercent } from '@/shared/ui/primitives';

function GoalRow({
  label, target, max, attempt,
}: {
  label: string; target: number; max: number; attempt: Attempt | null;
}): JSX.Element {
  const score = attempt ? Math.round((attempt.percent / 100) * max) : null;
  const gap = score === null ? null : target - score;
  const progress = score === null ? 0 : Math.min(100, (score / target) * 100);

  return (
    <div className="stack gap-8">
      <div className="between">
        <span className="small" style={{ fontWeight: 600 }}>{label}</span>
        <span className="tiny faint">
          {score === null ? 'no result yet' : `${score}/${max} · target ${target}/${max}`}
        </span>
      </div>
      <Bar percent={progress} tone={score === null ? 'neutral' : toneForPercent(progress)} />
      {gap !== null ? (
        <span className="tiny dim">
          {gap <= 0
            ? 'Target reached.'
            : `${gap} more ${gap === 1 ? 'mark' : 'marks'} to reach your target.`}
        </span>
      ) : null}
    </div>
  );
}

export function GoalCard({
  goals, lastQuick, lastOfficial,
}: {
  goals: Goals; lastQuick: Attempt | null; lastOfficial: Attempt | null;
}): JSX.Element {
  return (
    <section className="card stack gap-16">
      <h2>Progress to your target</h2>
      <GoalRow label="Quick Test" target={goals.quick} max={50} attempt={lastQuick} />
      <GoalRow label="Official Test" target={goals.official} max={100} attempt={lastOfficial} />
    </section>
  );
}
