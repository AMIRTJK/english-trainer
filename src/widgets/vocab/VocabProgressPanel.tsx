import type { SoundSummary, SoundTaskReadiness, VocabTotals } from '@/features/vocab-learning';
import { Bar, Stat } from '@/shared/ui/primitives';

interface Props {
  totals: VocabTotals;
  sounds: SoundSummary[];
  readiness: SoundTaskReadiness;
}

/** Progress for words and for phonetic groups, shown side by side. */
export function VocabProgressPanel({ totals, sounds, readiness }: Props): JSX.Element {
  const masteredSounds = sounds.filter((s) => s.total > 0 && s.percent >= 80).length;
  const weakSounds = sounds.filter((s) => s.weak);
  const groupsWithWords = sounds.filter((s) => s.total > 0).length;

  return (
    <section className="stack gap-16">
      <div className="grid grid-4">
        <Stat label="Learned" value={`${totals.known} / ${totals.total}`} hint={`${totals.percent}% of the word list`} />
        <Stat label="To repeat" value={totals.repeat} hint="marked “Don’t know”" />
        <Stat label="Not studied" value={totals.fresh} hint="never seen in a card" />
        <Stat label="Due today" value={totals.due} hint="interval has elapsed" />
      </div>

      <div className="card stack gap-12">
        <div className="between">
          <h2>Sounds</h2>
          <span className="small dim">{masteredSounds} / {groupsWithWords} groups at 80%+</span>
        </div>
        <Bar percent={groupsWithWords === 0 ? 0 : (masteredSounds / groupsWithWords) * 100} />
        {weakSounds.length > 0 ? (
          <p className="small">
            Needs work:{' '}
            {weakSounds.map((s) => `/${s.sound.ipa}/ (${s.sound.key})`).join(', ')}
          </p>
        ) : (
          <p className="small dim">No sound is failing yet. Answer some cards to see this fill in.</p>
        )}

        <hr className="divider" />

        <div className="between">
          <h3>“Which word has a different sound?”</h3>
          <span className="small dim mono-num">{readiness.known} / {readiness.total}</span>
        </div>
        <Bar percent={readiness.percent} tone={readiness.percent >= 70 ? 'good' : 'warn'} />
        <p className="tiny faint">
          Every word the pronunciation questions can ask about. Learning these prepares
          you for that part of the test.
        </p>
      </div>
    </section>
  );
}
