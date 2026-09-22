import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UNLOCK_AT, useVowels } from '@/features/vowel-sounds';
import { VowelLevelCard, VowelSoundTable } from '@/widgets/vowels';
import { Bar, Empty, Stat } from '@/shared/ui/primitives';

/**
 * The Vowel sounds hub: how far the learner has got, the three difficulty
 * bands, and SB p.134 itself as a reference.
 */
export default function PronunciationPage(): JSX.Element {
  const data = useVowels();
  const [showTable, setShowTable] = useState(false);

  if (!data.hasVowels || !data.index) {
    return (
      <div className="page">
        <Empty title="Pronunciation for this level is not available yet" />
      </div>
    );
  }

  const { totals, bands, weak } = data;
  const unlockPercent = Math.round(UNLOCK_AT * 100);

  return (
    <div className="page stack gap-16">
      <header className="between">
        <div>
          <h1>Vowel sounds</h1>
          <p className="small dim">Sound Bank, SB p.134 — {totals.total} words</p>
        </div>
        <Link className="btn btn-primary btn-sm" to="/pronunciation/train">
          Train{totals.repeat > 0 ? ` (${totals.repeat})` : ''}
        </Link>
      </header>

      <section className="card stack gap-12">
        <div className="between">
          <span className="small">
            <strong className="mono-num">{totals.known} / {totals.total}</strong> words
            <span className="dim"> · {totals.repeat} to repeat · {totals.due} due</span>
          </span>
          <span className="small dim mono-num">{totals.percent}%</span>
        </div>
        <Bar percent={totals.percent} tone={totals.percent >= 60 ? 'good' : 'accent'} />
        <p className="small dim">
          Цель — не запомнить ответы, а научиться определять звук по буквам. Поэтому
          задания идут от слов, где написание подсказывает однозначно, к исключениям.
        </p>
      </section>

      <div className="grid grid-3">
        {bands.map((band) => (
          <VowelLevelCard key={band.level} band={band} unlockAtPercent={unlockPercent} />
        ))}
      </div>

      {weak.length > 0 ? (
        <section className="card stack gap-8">
          <h2 className="small">Needs work</h2>
          <div className="grid grid-3">
            {weak.slice(0, 6).map((row) => {
              const sound = data.index?.soundByKey.get(row.sound);
              return (
                <Stat
                  key={row.sound}
                  label={`/${sound?.ipa ?? row.sound}/`}
                  value={`${row.known}/${row.known + row.unknown}`}
                  hint={sound?.hint}
                />
              );
            })}
          </div>
        </section>
      ) : null}

      <div className="row">
        <button type="button" className="btn" onClick={() => setShowTable(!showTable)}>
          {showTable ? 'Hide the Sound Bank page' : 'Show the Sound Bank page'}
        </button>
        <Link className="btn" to="/vocabulary">Vocabulary</Link>
        <Link className="btn" to="/vocabulary/spelling">Spelling</Link>
      </div>

      {showTable ? <VowelSoundTable rows={data.rows} /> : null}
    </div>
  );
}
