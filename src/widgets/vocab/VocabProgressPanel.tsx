import { useState } from 'react';
import type { SoundSummary, SoundTaskReadiness, VocabTotals } from '@/features/vocab-learning';
import { Bar } from '@/shared/ui/primitives';

interface Props {
  totals: VocabTotals;
  sounds: SoundSummary[];
  readiness: SoundTaskReadiness;
}

/**
 * Progress in one line, with the breakdown behind a toggle.
 *
 * The numbers that matter every day are the three in the summary; the rest is
 * detail the learner asks for rather than reads on every visit.
 */
export function VocabProgressPanel({ totals, sounds, readiness }: Props): JSX.Element {
  const [open, setOpen] = useState(false);
  const withWords = sounds.filter((s) => s.total > 0);
  const mastered = withWords.filter((s) => s.percent >= 80).length;
  const weak = sounds.filter((s) => s.weak);

  return (
    <section className="card stack gap-12">
      <div className="between">
        <span className="small">
          <strong className="mono-num">{totals.known} / {totals.total}</strong> words
          <span className="dim"> · {totals.repeat} to repeat · sounds </span>
          <strong className="mono-num">{mastered} / {withWords.length}</strong>
        </span>
        <button type="button" className="link-btn small" onClick={() => setOpen(!open)}>
          {open ? 'Hide details' : 'Details'}
        </button>
      </div>
      <Bar percent={totals.percent} tone={totals.percent >= 60 ? 'good' : 'accent'} />

      {open ? (
        <div className="stack gap-12">
          <hr className="divider" />
          <div className="mini-stats">
            {([
              ['known', totals.known, 'Known', 'good'],
              ['repeat', totals.repeat, 'To repeat', 'warn'],
              ['fresh', totals.fresh, 'Not studied', 'neutral'],
              ['due', totals.due, 'Due today', 'accent'],
            ] as const).map(([key, value, label, tone]) => (
              <div key={key} className={`mini-stat tone-${tone}${value === 0 ? ' is-zero' : ''}`}>
                <span className="mini-stat-value mono-num">{value}</span>
                <span className="mini-stat-label">{label}</span>
              </div>
            ))}
          </div>

          <div className="stack gap-8">
            <div className="between">
              <span className="small">Ready for “which word has a different sound?”</span>
              <span className="small dim mono-num">{readiness.known} / {readiness.total}</span>
            </div>
            <Bar percent={readiness.percent} tone={readiness.percent >= 70 ? 'good' : 'warn'} />
          </div>

          {weak.length > 0 ? (
            <p className="small">
              Needs work: {weak.map((s) => `/${s.sound.ipa}/`).join(', ')}
            </p>
          ) : (
            <p className="small dim">No sound is failing yet.</p>
          )}
        </div>
      ) : null}
    </section>
  );
}
