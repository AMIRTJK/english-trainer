import { useEffect, useState } from 'react';
import { formatDuration } from '@/shared/ui/primitives';

export function RunnerBar({
  current, total, answered, startedAt, timed, onExit,
}: {
  current: number;
  total: number;
  answered: number;
  startedAt: string;
  timed: boolean;
  onExit: () => void;
}): JSX.Element {
  const [elapsed, setElapsed] = useState(() => Date.now() - Date.parse(startedAt));

  useEffect(() => {
    if (!timed) return undefined;
    const id = setInterval(() => setElapsed(Date.now() - Date.parse(startedAt)), 1000);
    // Always clear the interval on unmount (Performance.md §2).
    return () => clearInterval(id);
  }, [timed, startedAt]);

  const progress = total === 0 ? 0 : (answered / total) * 100;

  return (
    <header className="runner-head">
      <div className="runner-head-row">
        <button className="btn btn-sm" type="button" onClick={onExit}>Exit</button>
        <span className="small mono-num" aria-live="polite">
          Question {current} of {total}
        </span>
        <span className="small mono-num faint" aria-hidden={!timed}>
          {timed ? formatDuration(elapsed) : ''}
        </span>
      </div>
      <div className="runner-progress">
        <span style={{ width: `${progress}%` }} />
      </div>
    </header>
  );
}
