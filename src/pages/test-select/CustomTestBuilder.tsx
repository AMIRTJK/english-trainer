import { useMemo, useState } from 'react';
import type { CategoryId, Topic } from '@content/types';
import { CATEGORY_LABELS, CATEGORY_ORDER } from '@content/registry';
import type { TopicSummary } from '@/entities/attempt/model/types';

export interface CustomSelection {
  topicIds: string[];
  categoryIds: CategoryId[];
  count: number;
  adaptive: boolean;
}

const COUNTS = [10, 20, 30, 50, 100];

export function CustomTestBuilder({
  topics, summaries, countsByTopic, onStart,
}: {
  topics: Topic[];
  summaries: Map<string, TopicSummary>;
  countsByTopic: (topicId: string) => number;
  onStart: (selection: CustomSelection) => void;
}): JSX.Element {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [count, setCount] = useState(20);
  const [adaptive, setAdaptive] = useState(false);
  const [touched, setTouched] = useState(false);

  const grouped = useMemo(() => {
    const map = new Map<CategoryId, Topic[]>();
    for (const topic of topics) {
      const list = map.get(topic.categoryId);
      if (list) list.push(topic);
      else map.set(topic.categoryId, [topic]);
    }
    return map;
  }, [topics]);

  const available = useMemo(() => {
    let total = 0;
    for (const id of selected) total += countsByTopic(id);
    return total;
  }, [selected, countsByTopic]);

  const toggle = (id: string): void => {
    setTouched(true);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleCategory = (categoryId: CategoryId): void => {
    setTouched(true);
    const ids = (grouped.get(categoryId) ?? []).map((t) => t.id);
    setSelected((prev) => {
      const next = new Set(prev);
      const allOn = ids.every((id) => next.has(id));
      for (const id of ids) {
        if (allOn) next.delete(id);
        else next.add(id);
      }
      return next;
    });
  };

  const empty = selected.size === 0;
  const tooFew = !empty && available < count;

  return (
    <section className="card stack gap-16">
      <div className="stack gap-8">
        <h2>Custom test</h2>
        <p className="small dim">
          Pick the topics you want. The test will contain questions from those topics only.
        </p>
      </div>

      {CATEGORY_ORDER.map((categoryId) => {
        const list = grouped.get(categoryId);
        if (!list || list.length === 0) return null;
        return (
          <fieldset key={categoryId} className="stack gap-8" style={{ border: 0, padding: 0, margin: 0 }}>
            <div className="between">
              <legend className="small" style={{ fontWeight: 650, padding: 0 }}>
                {CATEGORY_LABELS[categoryId]}
              </legend>
              <button type="button" className="link-btn tiny" onClick={() => toggleCategory(categoryId)}>
                Toggle all
              </button>
            </div>
            <div className="grid grid-2" style={{ gap: 8 }}>
              {list.map((topic) => {
                const n = countsByTopic(topic.id);
                const summary = summaries.get(topic.id);
                return (
                  <label
                    key={topic.id}
                    className="row card card-tight"
                    style={{ alignItems: 'flex-start', gap: 9, cursor: n === 0 ? 'not-allowed' : 'pointer' }}
                  >
                    <input
                      type="checkbox"
                      checked={selected.has(topic.id)}
                      disabled={n === 0}
                      onChange={() => toggle(topic.id)}
                      style={{ marginTop: 3 }}
                    />
                    <span className="grow">
                      <span className="small" style={{ fontWeight: 600 }}>{topic.title}</span>
                      <span className="tiny faint" style={{ display: 'block' }}>
                        {n} question{n === 1 ? '' : 's'}
                        {summary && summary.seen > 0 ? ` · ${summary.percent}% so far` : ''}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        );
      })}

      <hr className="divider" />

      <div className="stack gap-12">
        <div className="row">
          <span className="small" style={{ fontWeight: 600 }}>Questions</span>
          {COUNTS.map((n) => (
            <button
              key={n}
              type="button"
              className={`btn btn-sm${count === n ? ' btn-primary' : ''}`}
              onClick={() => setCount(n)}
            >
              {n}
            </button>
          ))}
        </div>

        <label className="row" style={{ gap: 9 }}>
          <input type="checkbox" checked={adaptive} onChange={(e) => setAdaptive(e.target.checked)} />
          <span className="small">
            Focus on my weak spots
            <span className="faint"> — give more room to topics and questions I get wrong</span>
          </span>
        </label>

        {touched && empty ? (
          <p className="notice notice-warn" role="alert">
            Choose at least one topic before starting the test.
          </p>
        ) : null}

        {tooFew ? (
          <p className="notice notice-warn">
            These topics have {available} verified question{available === 1 ? '' : 's'}.
            The test will have {available} instead of {count} — nothing is repeated to pad it out.
          </p>
        ) : null}

        <button
          type="button"
          className="btn btn-primary"
          disabled={empty}
          onClick={() => onStart({
            topicIds: [...selected], categoryIds: [], count, adaptive,
          })}
        >
          Start custom test
          {empty ? '' : ` · ${Math.min(count, available)} questions`}
        </button>
      </div>
    </section>
  );
}
