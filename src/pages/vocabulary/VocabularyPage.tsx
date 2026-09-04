import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  EMPTY_FILTER, clampPage, filterWords, groupWords, paginateGroups, useVocabulary,
  type GroupBy, type WordFilter, type WordStatus,
} from '@/features/vocab-learning';
import { Pager, SoundGrid, VocabProgressPanel } from '@/widgets/vocab';
import { Empty } from '@/shared/ui/primitives';
import { WordGroup } from './WordGroup';
import { scopeToParams } from './scope-params';

const GROUPS: Array<[GroupBy, string]> = [
  ['sound', 'By sound'],
  ['unit', 'By unit'],
  ['topic', 'By topic'],
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
  const [showSounds, setShowSounds] = useState(false);
  const [page, setPage] = useState(1);

  const index = data.index;

  // Filtering, grouping and paging run over ~550 words, so they are derived
  // once per change of filter rather than on every render (Performance.md §2).
  const pages = useMemo(() => {
    if (!index) return [];
    const words = filterWords(index.bank.words, filter, data.progress);
    const groups = groupWords(words, groupBy, {
      units: data.units,
      topics: data.topics,
      sounds: index.bank.sounds,
      contrastsFor: index.contrastsFor,
    });
    return paginateGroups(groups);
  }, [index, filter, groupBy, data.units, data.topics, data.progress, data.totals]);

  // A narrower filter can leave the current page behind the end of the list.
  useEffect(() => setPage(1), [filter, groupBy]);

  if (!data.hasVocabulary || !index) {
    return (
      <div className="page">
        <Empty title="Vocabulary for this level is not available yet" />
      </div>
    );
  }

  const current = clampPage(page, pages.length);
  const shownGroups = pages[current - 1] ?? [];
  const total = pages.reduce(
    (sum, groups) => sum + groups.reduce((n, group) => n + group.words.length, 0),
    0,
  );
  const before = pages
    .slice(0, current - 1)
    .reduce((sum, groups) => sum + groups.reduce((n, group) => n + group.words.length, 0), 0);
  const onThisPage = shownGroups.reduce((n, group) => n + group.words.length, 0);
  const summary = `${before + 1}–${before + onThisPage} of ${total}`;
  const selectedSound = filter.soundKey ? index.soundByKey.get(filter.soundKey) : undefined;

  return (
    <div className="page stack gap-16">
      <header className="between">
        <h1>Vocabulary</h1>
        <div className="row">
          <Link className="btn btn-primary btn-sm" to={`/vocabulary/learn?${scopeToParams({ kind: 'review' })}`}>
            Repeat{data.totals.repeat > 0 ? ` (${data.totals.repeat})` : ''}
          </Link>
          <Link className="btn btn-sm" to={`/vocabulary/learn?${scopeToParams({ kind: 'all' })}`}>
            Learn
          </Link>
        </div>
      </header>

      <VocabProgressPanel totals={data.totals} sounds={data.sounds} readiness={data.readiness} />

      <section className="card stack gap-12">
        <div className="filter-bar">
          <input
            className="input filter-search"
            type="search"
            placeholder="Search a word or a translation"
            value={filter.query}
            onChange={(e) => setFilter({ ...filter, query: e.target.value })}
            aria-label="Search words"
          />
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
          <button
            type="button"
            className={`chip${showSounds || selectedSound ? ' is-on' : ''}`}
            aria-expanded={showSounds}
            onClick={() => setShowSounds(!showSounds)}
          >
            Sound {selectedSound ? `/${selectedSound.ipa}/` : 'Bank'} {showSounds ? '▴' : '▾'}
          </button>
          {filter.query || filter.status || filter.soundKey || filter.soundTaskOnly ? (
            <button type="button" className="link-btn small" onClick={() => setFilter(EMPTY_FILTER)}>
              Reset
            </button>
          ) : null}
        </div>

        {showSounds ? (
          <SoundGrid
            sounds={data.sounds}
            selected={filter.soundKey}
            onSelect={(soundKey) => setFilter({ ...filter, soundKey })}
          />
        ) : null}
      </section>

      {shownGroups.length === 0 ? (
        <Empty title="No words match these filters">Try clearing the search or the sound.</Empty>
      ) : (
        shownGroups.map((group) => (
          <WordGroup
            key={group.key}
            group={group}
            soundByKey={index.soundByKey}
            progress={data.progress}
          />
        ))
      )}

      <Pager page={current} pageCount={pages.length} onChange={setPage} summary={summary} />
    </div>
  );
}
