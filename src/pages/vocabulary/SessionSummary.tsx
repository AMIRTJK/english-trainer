import { Link } from 'react-router-dom';
import { Bar, Stat } from '@/shared/ui/primitives';
import { scopeToParams } from './scope-params';

export interface Mistake {
  word: string;
  ru: string;
  /** What the learner typed — set only when it was actually wrong. */
  typed?: string;
  /** Why the word is listed when the answer itself was not wrong. */
  note?: string;
}

interface Props {
  title: string;
  known: number;
  unknown: number;
  total: number;
  onRestart: () => void;
  /** Words to look at again, listed under the score. */
  mistakes?: Mistake[];
  /** Where "repeat the difficult words" goes; the flashcards by default. */
  repeatPath?: '/vocabulary/learn' | '/vocabulary/spelling';
}

/** End of a learning session: what was learned and what comes back. */
export function SessionSummary({
  title, known, unknown, total, onRestart, mistakes = [], repeatPath = '/vocabulary/learn',
}: Props): JSX.Element {
  const percent = total === 0 ? 0 : Math.round((known / total) * 100);
  const repeatQuery = scopeToParams({ kind: 'review' });

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

      {mistakes.length > 0 ? (
        <section className="card stack gap-8">
          <h2 className="small">Look at these again</h2>
          <ul className="mistake-list">
            {mistakes.map((item, index) => (
              <li key={`${item.word}-${index}`} className="mistake-row">
                <span className="word-en">{item.word}</span>
                <span className="small dim">«{item.ru}»</span>
                {item.typed ? <span className="tiny tone-bad">you wrote: {item.typed}</span> : null}
                {item.note ? <span className="tiny dim">{item.note}</span> : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="row">
        <button type="button" className="btn btn-primary" onClick={onRestart}>
          Another round
        </button>
        {unknown > 0 ? (
          <Link className="btn" to={`${repeatPath}?${repeatQuery}`}>
            Repeat the difficult words
          </Link>
        ) : null}
        <Link className="btn" to="/vocabulary">Back to Vocabulary</Link>
      </div>
    </div>
  );
}
