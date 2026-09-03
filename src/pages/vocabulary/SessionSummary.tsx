import { Link } from 'react-router-dom';
import { Bar, Stat } from '@/shared/ui/primitives';
import { scopeToParams } from './scope-params';

interface Props {
  title: string;
  known: number;
  unknown: number;
  total: number;
  onRestart: () => void;
}

/** End of a learning session: what was learned and what comes back. */
export function SessionSummary({ title, known, unknown, total, onRestart }: Props): JSX.Element {
  const percent = total === 0 ? 0 : Math.round((known / total) * 100);
  return (
    <div className="page stack gap-16">
      <header className="stack gap-8">
        <h1>Session finished</h1>
        <p className="small dim">{title}</p>
      </header>

      <div className="card stack gap-12">
        <Bar percent={percent} tone={percent >= 70 ? 'good' : 'warn'} />
        <div className="grid grid-3">
          <Stat label="Known" value={known} />
          <Stat label="To repeat" value={unknown} hint="comes back next session" />
          <Stat label="Cards" value={total} />
        </div>
      </div>

      <div className="row">
        <button type="button" className="btn btn-primary" onClick={onRestart}>
          Another round
        </button>
        {unknown > 0 ? (
          <Link className="btn" to={`/vocabulary/learn?${scopeToParams({ kind: 'review' })}`}>
            Repeat the difficult words
          </Link>
        ) : null}
        <Link className="btn" to="/vocabulary">Back to Vocabulary</Link>
      </div>
    </div>
  );
}
