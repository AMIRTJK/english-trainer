import { Link } from 'react-router-dom';
import type { VowelLevel } from '@content/types';
import { Bar, Stat } from '@/shared/ui/primitives';

interface Props {
  level: VowelLevel | null;
  right: number;
  total: number;
  mistakes: Array<{ word: string; ipa: string }>;
  onRestart: () => void;
}

/** End of a vowel round: the score, and the words whose sound still slips. */
export function VowelRoundSummary({
  level, right, total, mistakes, onRestart,
}: Props): JSX.Element {
  const percent = total === 0 ? 0 : Math.round((right / total) * 100);

  return (
    <div className="page stack gap-16">
      <header className="stack gap-8">
        <h1>Round finished</h1>
        <p className="small dim">
          {level ? `Vowel sounds — level ${level}` : 'Vowel sounds — mixed practice'}
        </p>
      </header>

      <div className="card stack gap-12">
        <Bar percent={percent} tone={percent >= 70 ? 'good' : 'warn'} />
        <div className="grid grid-3">
          <Stat label="Right" value={right} />
          <Stat label="Wrong" value={total - right} hint="asked again later" />
          <Stat label="Questions" value={total} />
        </div>
      </div>

      {mistakes.length > 0 ? (
        <section className="card stack gap-8">
          <h2 className="small">Sounds to look at again</h2>
          <ul className="mistake-list">
            {mistakes.map((item, index) => (
              <li key={`${item.word}-${index}`} className="mistake-row">
                <span className="word-en">{item.word}</span>
                <span className="small dim">/{item.ipa}/</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="row">
        <button type="button" className="btn btn-primary" onClick={onRestart}>
          Another round
        </button>
        <Link className="btn" to="/pronunciation">Back to Vowel sounds</Link>
      </div>
    </div>
  );
}
