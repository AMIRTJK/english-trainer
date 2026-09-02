import { useRef, useState } from 'react';
import { LEVELS, hasContent } from '@content/registry';
import { useApp } from '@/app/store/app-store';
import { useLevelData } from '@/entities/topic/model/use-level-data';
import { flushUser } from '@/entities/user/model/repository';
import { buildExport, downloadJson, parseImport } from '@/features/manage-data/model/export-import';
import { clearSession } from '@/features/run-test/model/session-store';
import { storageAvailable } from '@/shared/storage/local-store';

export default function SettingsPage(): JSX.Element {
  const { user, setActiveLevel, updateUser, replaceUser, clearEverything } = useApp();
  const data = useLevelData();
  const fileRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<{ tone: 'ok' | 'warn'; text: string } | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);

  if (!user) return <div className="page" />;

  const goals = user.profile.goals[data.levelId] ?? { quick: 45, official: 90 };

  const onExport = (): void => {
    flushUser();
    downloadJson(buildExport(user), `english-file-trainer-${new Date().toISOString().slice(0, 10)}.json`);
    setMessage({ tone: 'ok', text: 'Backup downloaded.' });
  };

  const onImportFile = async (file: File): Promise<void> => {
    const text = await file.text();
    const result = parseImport(text);
    if (!result.ok || !result.data) {
      setMessage({ tone: 'warn', text: result.error ?? 'Could not read that backup.' });
      return;
    }
    replaceUser(result.data);
    clearSession();
    setMessage({
      tone: result.warnings.length ? 'warn' : 'ok',
      text: result.warnings.length ? result.warnings.join(' ') : 'Backup restored.',
    });
  };

  return (
    <div className="page stack gap-24">
      <h1>Settings</h1>

      {message ? (
        <div className={`notice ${message.tone === 'warn' ? 'notice-warn' : ''}`} role="status">
          {message.text}
        </div>
      ) : null}

      {!storageAvailable() ? (
        <div className="notice notice-warn">
          This browser is blocking local storage, so results will be lost when you close the tab.
          Export a backup before you leave.
        </div>
      ) : null}

      <section className="card stack gap-16">
        <h2>Profile</h2>
        <div className="stack gap-8">
          <label className="small" htmlFor="name">Name</label>
          <input
            id="name" className="input" value={user.profile.name}
            onChange={(e) => updateUser((draft) => { draft.profile.name = e.target.value; })}
          />
        </div>

        <div className="stack gap-8">
          <label className="small" htmlFor="level">Active level</label>
          <select
            id="level" className="select" value={user.profile.activeLevelId}
            onChange={(e) => setActiveLevel(e.target.value)}
          >
            {LEVELS.map((level) => (
              <option key={level.id} value={level.id}>
                {level.name}{hasContent(level.id) ? '' : ' — no content yet'}
              </option>
            ))}
          </select>
          {!hasContent(user.profile.activeLevelId) ? (
            <p className="notice notice-warn">Content for this level is not available yet.</p>
          ) : (
            <p className="tiny faint">
              Results are stored per level and never mixed together.
            </p>
          )}
        </div>
      </section>

      <section className="card stack gap-16">
        <h2>Targets for {data.levelName}</h2>
        {([['quick', 'Quick Test', 50], ['official', 'Official Test', 100]] as const).map(
          ([key, label, max]) => (
            <div key={key} className="stack gap-8">
              <label className="small" htmlFor={`goal-${key}`}>{label} target (out of {max})</label>
              <input
                id={`goal-${key}`} className="input" type="number" min={0} max={max}
                value={goals[key]}
                onChange={(e) => {
                  const value = Math.max(0, Math.min(max, Number(e.target.value) || 0));
                  updateUser((draft) => {
                    draft.profile.goals[data.levelId] = { ...goals, [key]: value };
                  });
                }}
              />
            </div>
          ),
        )}
      </section>

      <section className="card stack gap-12">
        <h2>Test behaviour</h2>
        {([
          ['timerEnabled', 'Show a timer during timed tests'],
          ['allowBack', 'Allow going back to a previous question'],
          ['shuffleOptions', 'Shuffle the answer options'],
        ] as const).map(([key, label]) => (
          <label key={key} className="row" style={{ gap: 9 }}>
            <input
              type="checkbox" checked={user.profile.settings[key]}
              onChange={(e) => updateUser((draft) => { draft.profile.settings[key] = e.target.checked; })}
            />
            <span className="small">{label}</span>
          </label>
        ))}
      </section>

      <section className="card stack gap-12">
        <h2>Your data</h2>
        <p className="small dim">
          Everything is stored in this browser only. Export a backup so a cleared browser
          does not lose your history.
        </p>
        <div className="row">
          <button className="btn" type="button" onClick={onExport}>Export JSON</button>
          <button className="btn" type="button" onClick={() => fileRef.current?.click()}>
            Import JSON
          </button>
          <input
            ref={fileRef} type="file" accept="application/json,.json" className="visually-hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void onImportFile(file);
              e.target.value = '';
            }}
          />
        </div>
      </section>

      <section className="card stack gap-12">
        <h2>Clear all data</h2>
        <p className="small dim">
          Removes your name, level, goals, settings, test history, mistakes and statistics
          from this browser. This cannot be undone.
        </p>
        {confirmClear ? (
          <div className="stack gap-12">
            <p className="notice notice-bad">
              This will permanently delete everything. Export a backup first if you want to keep it.
            </p>
            <div className="row">
              <button className="btn" type="button" onClick={() => setConfirmClear(false)}>Cancel</button>
              <button
                className="btn btn-danger" type="button"
                onClick={() => { clearSession(); clearEverything(); }}
              >
                Yes, delete everything
              </button>
            </div>
          </div>
        ) : (
          <button className="btn btn-danger" type="button" onClick={() => setConfirmClear(true)}>
            Clear all data
          </button>
        )}
      </section>
    </div>
  );
}
