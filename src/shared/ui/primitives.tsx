import type { ReactNode } from 'react';

export type Tone = 'neutral' | 'good' | 'warn' | 'bad' | 'accent';

const toneClass: Record<Tone, string> = {
  neutral: '',
  good: 'pill-good',
  warn: 'pill-warn',
  bad: 'pill-bad',
  accent: 'pill-accent',
};

export function Pill({ tone = 'neutral', children }: { tone?: Tone; children: ReactNode }): JSX.Element {
  return <span className={`pill ${toneClass[tone]}`}>{children}</span>;
}

export function toneForPercent(percent: number): Tone {
  if (percent >= 85) return 'good';
  if (percent >= 70) return 'warn';
  return 'bad';
}

const barTone: Record<Tone, string> = {
  neutral: '', good: 'bar-good', warn: 'bar-warn', bad: 'bar-bad', accent: '',
};

export function Bar({ percent, tone = 'accent' }: { percent: number; tone?: Tone }): JSX.Element {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div
      className={`bar ${barTone[tone]}`}
      role="img"
      aria-label={`${Math.round(clamped)} percent`}
    >
      <span style={{ width: `${clamped}%` }} />
    </div>
  );
}

export function Stat({ label, value, hint }: { label: string; value: ReactNode; hint?: ReactNode }): JSX.Element {
  return (
    <div className="card card-tight stack gap-8">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {hint ? <div className="tiny dim">{hint}</div> : null}
    </div>
  );
}

export function Empty({ title, children }: { title: string; children?: ReactNode }): JSX.Element {
  return (
    <div className="card stack gap-8" style={{ textAlign: 'center', padding: '30px 18px' }}>
      <h3>{title}</h3>
      {children ? <div className="small dim">{children}</div> : null}
    </div>
  );
}

export function formatDuration(ms: number): string {
  const totalSeconds = Math.max(0, Math.round(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes === 0) return `${seconds}s`;
  return `${minutes}m ${String(seconds).padStart(2, '0')}s`;
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
}
