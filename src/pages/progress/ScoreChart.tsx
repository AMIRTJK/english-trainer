import type { Attempt } from '@/entities/attempt/model/types';
import { formatDate } from '@/shared/ui/primitives';

/**
 * Score over time as an inline SVG line chart. No charting dependency:
 * the app keeps a very small dependency set (Performance.md §6).
 */
export function ScoreChart({ attempts }: { attempts: Attempt[] }): JSX.Element | null {
  const points = [...attempts].reverse().slice(-20);
  if (points.length < 2) return null;

  const W = 640;
  const H = 180;
  const PAD = { top: 14, right: 12, bottom: 26, left: 32 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const x = (i: number): number => PAD.left + (points.length === 1 ? innerW / 2 : (i / (points.length - 1)) * innerW);
  const y = (percent: number): number => PAD.top + innerH - (percent / 100) * innerH;

  const path = points.map((a, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(a.percent).toFixed(1)}`).join(' ');
  const gridLines = [0, 25, 50, 75, 100];

  return (
    <section className="card stack gap-12">
      <div className="between">
        <h2>Score over time</h2>
        <span className="tiny faint">last {points.length} tests</span>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: '100%', height: 'auto', overflow: 'visible' }}
        role="img"
        aria-label={`Score over time. Latest ${points[points.length - 1]?.percent ?? 0} percent.`}
      >
        {gridLines.map((value) => (
          <g key={value}>
            <line
              x1={PAD.left} x2={W - PAD.right} y1={y(value)} y2={y(value)}
              stroke="var(--border)" strokeWidth="1"
            />
            <text
              x={PAD.left - 7} y={y(value) + 4} textAnchor="end"
              fill="var(--text-faint)" fontSize="10"
            >
              {value}
            </text>
          </g>
        ))}
        <path d={path} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinejoin="round" />
        {points.map((attempt, i) => (
          <circle
            key={attempt.id}
            cx={x(i)} cy={y(attempt.percent)} r="3.5"
            fill="var(--surface)" stroke="var(--accent)" strokeWidth="2"
          >
            <title>{`${formatDate(attempt.finishedAt)}: ${attempt.correct}/${attempt.total} (${attempt.percent}%)`}</title>
          </circle>
        ))}
      </svg>
      <div className="between tiny faint">
        <span>{formatDate(points[0]?.finishedAt ?? '')}</span>
        <span>{formatDate(points[points.length - 1]?.finishedAt ?? '')}</span>
      </div>
    </section>
  );
}
