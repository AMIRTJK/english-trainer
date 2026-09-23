import { Link } from 'react-router-dom';
import type { LevelBand } from '@/features/vowel-sounds';
import { Bar } from '@/shared/ui/primitives';

interface Props {
  band: LevelBand;
  /** Percentage still needed on the level below before this one opens. */
  unlockAtPercent: number;
}

/**
 * One difficulty band.
 *
 * The ladder is advice, not a lock: a band the learner has not "earned" is
 * still one click away, it just says what it assumes (`docs/decisions.md` §17).
 */
export function VowelLevelCard({ band, unlockAtPercent }: Props): JSX.Element {
  return (
    <section className={`card stack gap-8 vowel-band${band.unlocked ? '' : ' is-locked'}`}>
      <div className="between">
        <h3 className="small">
          <span className="vowel-band-num">{band.level}</span> {band.title}
        </h3>
        <span className="tiny dim mono-num">{band.known}/{band.total}</span>
      </div>
      <p className="tiny dim">{band.hint}</p>
      <Bar percent={band.percent} tone={band.percent >= unlockAtPercent ? 'good' : 'accent'} />
      <Link className="btn btn-sm" to={`/pronunciation/train?level=${band.level}`}>
        Train this level
      </Link>
      {band.unlocked ? null : (
        <p className="tiny faint">
          Проще после {unlockAtPercent}% предыдущего уровня — но можно начать сейчас.
        </p>
      )}
    </section>
  );
}
