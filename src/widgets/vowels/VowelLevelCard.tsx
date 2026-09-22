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
 * A locked band still shows what it contains: the point is to make the ladder
 * visible, not to hide it.
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
      {band.unlocked ? (
        <Link className="btn btn-sm" to={`/pronunciation/train?level=${band.level}`}>
          Train this level
        </Link>
      ) : (
        <p className="tiny faint">
          Opens at {unlockAtPercent}% of the level above it.
        </p>
      )}
    </section>
  );
}
