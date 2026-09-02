import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { TestKind } from '@/entities/attempt/model/types';
import { PRESETS, findPreset } from '@/features/build-test/model/presets';
import { planTest } from '@/features/build-test/model/plan-test';
import { createSession } from '@/features/run-test/model/session';
import { useLevelData } from '@/entities/topic/model/use-level-data';
import { useApp } from '@/app/store/app-store';
import { Empty } from '@/shared/ui/primitives';
import { saveSession } from '@/features/run-test/model/session-store';
import { CustomTestBuilder, type CustomSelection } from './CustomTestBuilder';

export default function TestSelectPage(): JSX.Element {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const data = useLevelData();
  const { user } = useApp();
  const [error, setError] = useState<string | null>(null);

  const start = useCallback((kind: TestKind, custom?: CustomSelection) => {
    const preset = findPreset(kind);
    const count = custom?.count ?? preset?.count ?? 20;
    const plan = planTest({
      levelId: data.levelId,
      kind,
      count,
      topicIds: custom?.topicIds ?? [],
      categoryIds: custom?.categoryIds ?? [],
      adaptive: custom?.adaptive ?? preset?.adaptive ?? false,
      mistakesOnly: preset?.mistakesOnly ?? false,
      mix: custom ? null : preset?.mix ?? null,
    }, data.progress);

    if (plan.items.length === 0) {
      setError(
        kind === 'mistakes'
          ? 'You have no recorded mistakes yet, so there is nothing to practise here. Take a test first.'
          : 'No questions match this selection. Choose at least one topic that has questions.',
      );
      return;
    }

    const fresh = plan.items
      .filter((item) => !data.progress.questionStats[item.questionId])
      .map((item) => item.questionId);

    const session = createSession(plan, {
      timed: (preset?.timed ?? false) && (user?.profile.settings.timerEnabled ?? true),
      allowBack: user?.profile.settings.allowBack ?? true,
      freshIds: fresh,
    });
    saveSession(session);
    navigate('/test/run');
  }, [data.levelId, data.progress, navigate, user]);

  // Allow deep links like /tests?start=quick from the dashboard.
  const requested = params.get('start');
  useEffect(() => {
    if (!requested) return;
    setParams({}, { replace: true });
    if (PRESETS.some((p) => p.kind === requested)) start(requested as TestKind);
  }, [requested, setParams, start]);

  if (!data.hasContent) {
    return (
      <div className="page">
        <Empty title="Content for this level is not available yet" />
      </div>
    );
  }

  return (
    <div className="page stack gap-24">
      <header className="stack gap-8">
        <h1>Tests</h1>
        <p className="dim small">
          Every question comes from your course books and has been checked before being used.
        </p>
      </header>

      {error ? <div className="notice notice-warn" role="alert">{error}</div> : null}

      <section className="grid grid-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.kind}
            type="button"
            className="card stack gap-8"
            style={{ textAlign: 'left', cursor: 'pointer' }}
            onClick={() => { setError(null); start(preset.kind); }}
          >
            <div className="between">
              <h3>{preset.title}</h3>
              <span className="pill pill-accent">{preset.count} q</span>
            </div>
            <p className="small dim">{preset.description}</p>
          </button>
        ))}
      </section>

      <CustomTestBuilder
        topics={data.index?.content.topics ?? []}
        summaries={data.byTopicId}
        countsByTopic={(id) => data.index?.byTopic.get(id)?.length ?? 0}
        onStart={(selection) => { setError(null); start('custom', selection); }}
      />
    </div>
  );
}
