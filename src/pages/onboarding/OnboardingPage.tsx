import { useState } from 'react';
import { DEFAULT_LEVEL_ID, LEVELS, getLevelMeta, hasContent } from '@content/registry';
import { IMPORTED_TEST_META, IMPORTED_TEST_LEVEL_ID } from '@content/beginner/imported-quick-test';
import { useApp } from '@/app/store/app-store';
import { Select } from '@/shared/ui/Select';

export function OnboardingPage(): JSX.Element {
  const { createUser } = useApp();
  const [name, setName] = useState('');
  const [levelId, setLevelId] = useState(DEFAULT_LEVEL_ID);
  const [seed, setSeed] = useState(true);

  const available = hasContent(levelId);
  // The paper test belongs to one level; it is never offered for another.
  const canImport = levelId === IMPORTED_TEST_LEVEL_ID;

  return (
    <div className="page" style={{ maxWidth: 520, paddingTop: 48 }}>
      <div className="stack gap-24">
        <div className="stack gap-8">
          <h1>English File Trainer</h1>
          <p className="dim">
            Practice built only from your own course book —{' '}
            {getLevelMeta(levelId)?.book ?? 'English File 4th edition'}.
            Everything is stored in this browser.
          </p>
        </div>

        <form
          className="card stack gap-16"
          onSubmit={(event) => {
            event.preventDefault();
            if (available) createUser(name, levelId, seed && canImport);
          }}
        >
          <div className="stack gap-8">
            <label className="small" htmlFor="name">Your name</label>
            <input
              id="name"
              className="input"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="akteam"
              autoComplete="given-name"
            />
          </div>

          <div className="stack gap-8">
            <label className="small" htmlFor="level">Current level</label>
            <Select
              id="level"
              value={levelId}
              options={LEVELS.map((level) => ({
                value: level.id,
                label: level.name,
                hint: hasContent(level.id) ? undefined : 'no content yet',
              }))}
              onChange={setLevelId}
            />
            {!available ? (
              <p className="notice notice-warn">Content for this level is not available yet.</p>
            ) : null}
          </div>

          {canImport ? (
            <label className="row" style={{ alignItems: 'flex-start', gap: 10 }}>
              <input
                type="checkbox"
                checked={seed}
                onChange={(event) => setSeed(event.target.checked)}
                style={{ marginTop: 4 }}
              />
              <span className="small">
                <strong>Import my paper Quick Test</strong>
                <br />
                <span className="dim">
                  Adds the {IMPORTED_TEST_META.paper} result
                  ({IMPORTED_TEST_META.correct}/{IMPORTED_TEST_META.total},
                  {' '}{IMPORTED_TEST_META.percent}%) and all {IMPORTED_TEST_META.wrong} mistakes
                  as your starting history.
                </span>
              </span>
            </label>
          ) : null}

          <button className="btn btn-primary btn-block" type="submit" disabled={!available}>
            Start
          </button>
        </form>

        <footer className="credits">
          <span className="faint">Made by</span>
          <span className="credits-name">akteam</span>
        </footer>
      </div>
    </div>
  );
}
