import { Link } from 'react-router-dom';
import { useVocabulary } from '@/features/vocab-learning';
import { Bar, Pill } from '@/shared/ui/primitives';

/** Compact vocabulary progress for the dashboard. */
export function VocabSummaryCard(): JSX.Element | null {
  const data = useVocabulary();
  if (!data.hasVocabulary) return null;

  const { totals, readiness } = data;

  return (
    <section className="card stack gap-12">
      <div className="between">
        <h2>Vocabulary</h2>
        <Pill tone={totals.repeat > 0 ? 'warn' : 'accent'}>
          {totals.known} / {totals.total} words
        </Pill>
      </div>
      <Bar percent={totals.percent} tone={totals.percent >= 60 ? 'good' : 'accent'} />
      <p className="small dim">
        {totals.repeat > 0
          ? `${totals.repeat} word${totals.repeat === 1 ? '' : 's'} to repeat`
          : 'Nothing waiting to be repeated'}
        {' · '}
        {readiness.percent}% ready for the “different sound” questions
      </p>
      <div className="row">
        <Link className="btn btn-sm" to="/vocabulary">Word list</Link>
        <Link className="btn btn-sm" to="/vocabulary/learn?scope=review">Repeat</Link>
        <Link className="btn btn-sm" to="/vocabulary/learn?scope=sound-task">Sound practice</Link>
      </div>
    </section>
  );
}
