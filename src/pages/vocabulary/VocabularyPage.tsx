import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  EMPTY_FILTER, filterWords, groupWords, useVocabulary,
  type GroupBy, type WordFilter, type WordStatus,
} from '@/features/vocab-learning';
import { SoundGrid, VocabProgressPanel } from '@/widgets/vocab';
import { Empty } from '@/shared/ui/primitives';
import { WordGroup } from './WordGroup';
import { scopeToParams } from './scope-params';

const GROUPS: Array<[GroupBy, string]> = [
  ['unit', 'By unit'],
  ['topic', 'By topic'],
  ['sound', 'By sound'],
];

const STATUSES: Array<[WordStatus, string]> = [
  ['new', 'Not studied'],
  ['learning', 'Learning'],
  ['known', 'Known'],
];

export default function VocabularyPage(): JSX.Element {
  const data = useVocabulary();
  const [groupBy, setGroupBy] = useState<GroupBy>('sound');
  const [filter, setFilter] = useState<WordFilter>(EMPTY_FILTER);

  const index = data.index;

  // Filtering and grouping run over ~550 words, so they are derived once per
  // change of filter rather than on every render (Performance.md §2).
  const groups = useMemo(() => {
    if (!index) return [];
    const words = filterWords(index.bank.words, filter, data.progress);
    return groupWords(words, groupBy, {
      units: data.units,
      topics: data.topics,
      sounds: index.bank.sounds,
      contrastsFor: index.contrastsFor,
    });
  }, [index, filter, groupBy, data.units, data.topics, data.progress, data.totals]);

  if (!data.hasVocabulary || !index) {
    return (
      <div className="page">
        <Empty title="Vocabulary for this level is not available yet" />
      </div>
    );
  }

  const shown = groups.reduce((sum, group) => sum + group.words.length, 0);

  return (
    <div className="page stack gap-24">
      <header className="stack gap-8">
        <h1>Vocabulary</h1>
        <p className="dim small">
          Every word of {index.bank.words.length} from the Student’s Book, with its
          transcription, its Sound Bank group and a Russian translation. Listen, compare
          and learn the sounds the pronunciation test asks about.
        </p>
        <div className="row">
          <Link className="btn btn-primary" to={`/vocabulary/learn?${scopeToParams({ kind: 'review' })}`}>
            Repeat {data.totals.repeat > 0 ? `(${data.totals.repeat})` : ''}
          </Link>
          <Link className="btn" to={`/vocabulary/learn?${scopeToParams({ kind: 'sound-task' })}`}>
            Practise sound questions
          </Link>
          <Link className="btn" to={`/vocabulary/learn?${scopeToParams({ kind: 'all' })}`}>
            Learn everything
          </Link>
        </div>
      </header>

      <VocabProgressPanel totals={data.totals} sounds={data.sounds} readiness={data.readiness} />

      <section className="card stack gap-12">
        <h2>Sound Bank</h2>
        <p className="tiny faint">
          Pick a sound to see only its words. A red border marks a sound you have
          missed more often than you have got right.
        </p>
        <SoundGrid
          sounds={data.sounds}
          selected={filter.soundKey}
          onSelect={(soundKey) => setFilter({ ...filter, soundKey })}
        />
      </section>

      <section className="card stack gap-12">
        <div className="vocab-toolbar">
          <label className="stack gap-8">
            <span className="small">Search</span>
            <input
              className="input"
              type="search"
              placeholder="word or translation"
              value={filter.query}
              onChange={(e) => setFilter({ ...filter, query: e.target.value })}
            />
          </label>
          <div className="stack gap-8">
            <span className="small">Group</span>
            <div className="chip-row">
              {GROUPS.map(([key, label]) => (
                <button
                  key={key} type="button"
                  className={`chip${groupBy === key ? ' is-on' : ''}`}
                  aria-pressed={groupBy === key}
                  onClick={() => setGroupBy(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="stack gap-8">
            <span className="small">Show</span>
            <div className="chip-row">
              {STATUSES.map(([key, label]) => (
                <button
                  key={key} type="button"
                  className={`chip${filter.status === key ? ' is-on' : ''}`}
                  aria-pressed={filter.status === key}
                  onClick={() => setFilter({ ...filter, status: filter.status === key ? null : key })}
                >
                  {label}
                </button>
              ))}
              <button
                type="button"
                className={`chip${filter.soundTaskOnly ? ' is-on' : ''}`}
                aria-pressed={filter.soundTaskOnly}
                onClick={() => setFilter({ ...filter, soundTaskOnly: !filter.soundTaskOnly })}
              >
                Sound test words
              </button>
            </div>
          </div>
        </div>
        <div className="between">
          <span className="small dim">{shown} words shown</span>
          <button type="button" className="link-btn" onClick={() => setFilter(EMPTY_FILTER)}>
            Reset filters
          </button>
        </div>
      </section>

      {groups.length === 0 ? (
        <Empty title="No words match these filters">Try clearing the search or the sound.</Empty>
      ) : (
        groups.map((group) => (
          <WordGroup
            key={group.key}
            group={group}
            soundByKey={index.soundByKey}
            progress={data.progress}
          />
        ))
      )}
    </div>
  );
}
