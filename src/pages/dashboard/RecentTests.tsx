import { Link } from 'react-router-dom';
import type { Attempt, TestKind } from '@/entities/attempt/model/types';
import { Pill, formatDate, toneForPercent } from '@/shared/ui/primitives';

export const KIND_LABEL: Record<TestKind, string> = {
  quick: 'Quick Test',
  official: 'Official Test',
  full: 'Full Test',
  custom: 'Custom Test',
  'weak-areas': 'Weak Areas',
  mistakes: 'My Mistakes',
  'quick-practice': 'Quick Practice',
  imported: 'Imported paper test',
};

export function RecentTests({ attempts }: { attempts: Attempt[] }): JSX.Element {
  return (
    <section className="card stack gap-12">
      <h2>Recent tests</h2>
      {attempts.length === 0 ? (
        <p className="small dim">No tests yet.</p>
      ) : (
        <div className="stack gap-8">
          {attempts.map((attempt) => {
            const row = (
              <>
                <div className="grow">
                  <div className="small" style={{ fontWeight: 600 }}>{KIND_LABEL[attempt.kind]}</div>
                  <div className="tiny faint">
                    {formatDate(attempt.finishedAt)}
                    {attempt.detailAvailable ? '' : ' · totals only'}
                  </div>
                </div>
                <Pill tone={toneForPercent(attempt.percent)}>
                  {attempt.correct}/{attempt.total} · {attempt.percent}%
                </Pill>
              </>
            );
            return attempt.detailAvailable ? (
              <Link
                key={attempt.id}
                to={`/results/${attempt.id}`}
                className="between card card-tight"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {row}
              </Link>
            ) : (
              <div key={attempt.id} className="between card card-tight">{row}</div>
            );
          })}
        </div>
      )}
    </section>
  );
}
