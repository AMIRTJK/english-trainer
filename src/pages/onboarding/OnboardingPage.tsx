import { useState } from 'react';
import { LEVELS, hasContent } from '@content/registry';
import { IMPORTED_TEST_META } from '@content/beginner/imported-quick-test';
import { useApp } from '@/app/store/app-store';

export function OnboardingPage(): JSX.Element {
  const { createUser } = useApp();
  const [name, setName] = useState('');
  const [levelId, setLevelId] = useState('beginner');
  const [seed, setSeed] = useState(true);

  const available = hasContent(levelId);

  return (
    <div className="page" style={{ maxWidth: 520, paddingTop: 48 }}>
      <div className="stack gap-24">
        <div className="stack gap-8">
          <h1>English File Trainer</h1>
          <p className="dim">
            Practice built only from your own course books — English File 4th edition Beginner,
            Student’s Book and Workbook. Everything is stored in this browser.
          </p>
        </div>

        <form
          className="card stack gap-16"
          onSubmit={(event) => {
            event.preventDefault();
            if (available) createUser(name, levelId, seed);
          }}
        >
          <div className="stack gap-8">
            <label className="small" htmlFor="name">Your name</label>
            <input
              id="name"
              className="input"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Amir"
              autoComplete="given-name"
            />
          </div>

          <div className="stack gap-8">
            <label className="small" htmlFor="level">Current level</label>
            <select
              id="level"
              className="select"
              value={levelId}
              onChange={(event) => setLevelId(event.target.value)}
            >
              {LEVELS.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.name}{hasContent(level.id) ? '' : ' — no content yet'}
                </option>
              ))}
            </select>
            {!available ? (
              <p className="notice notice-warn">Content for this level is not available yet.</p>
            ) : null}
          </div>

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

          <button className="btn btn-primary btn-block" type="submit" disabled={!available}>
            Start
          </button>
        </form>
      </div>
    </div>
  );
}
