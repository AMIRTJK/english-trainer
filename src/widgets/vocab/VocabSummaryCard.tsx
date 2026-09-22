import { Link } from 'react-router-dom';
import { useVocabulary } from '@/features/vocab-learning';
import { useVowels } from '@/features/vowel-sounds';
import { Bar, Pill } from '@/shared/ui/primitives';

/** Compact vocabulary progress for the dashboard. */
export function VocabSummaryCard(): JSX.Element | null {
  const data = useVocabulary();
  const vowels = useVowels();
  if (!data.hasVocabulary) return null;

  const { totals, spelling } = data;

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
        {' · spelling '}
        <strong className="mono-num">{spelling.known}/{spelling.total}</strong>
        {vowels.hasVowels ? (
          <>{' · vowel sounds '}<strong className="mono-num">{vowels.totals.percent}%</strong></>
        ) : null}
      </p>
      <div className="row">
        <Link className="btn btn-sm" to="/vocabulary">Word list</Link>
        <Link className="btn btn-sm" to="/vocabulary/learn?scope=review">Repeat</Link>
        <Link className="btn btn-sm" to="/vocabulary/spelling?scope=all">Spelling</Link>
        <Link className="btn btn-sm" to="/pronunciation">Vowel sounds</Link>
      </div>
    </section>
  );
}
