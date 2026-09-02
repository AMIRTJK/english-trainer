import { Link } from 'react-router-dom';
import { CATEGORY_LABELS } from '@content/registry';
import type { TopicSummary } from '@/entities/attempt/model/types';
import { Bar, Pill, toneForPercent } from '@/shared/ui/primitives';

const STATUS_LABEL: Record<TopicSummary['status'], string> = {
  weak: 'Weak area',
  review: 'Needs review',
  strong: 'Strong',
  'not-enough-data': 'Not enough data',
};

export function TopicRow({ topic, title }: { topic: TopicSummary; title: string }): JSX.Element {
  const unproven = topic.status === 'not-enough-data';
  return (
    <div className="stack gap-8">
      <div className="between">
        <div className="grow">
          <div className="small" style={{ fontWeight: 600 }}>{title}</div>
          <div className="tiny faint">
            {CATEGORY_LABELS[topic.categoryId]} · {topic.seen} answered · {topic.uniqueQuestions} unique
          </div>
        </div>
        <div className="row" style={{ gap: 8 }}>
          {unproven ? <Pill>{STATUS_LABEL[topic.status]}</Pill> : null}
          <span className="mono-num" style={{ fontWeight: 650 }}>
            {topic.seen === 0 ? '—' : `${topic.percent}%`}
          </span>
        </div>
      </div>
      <Bar percent={topic.percent} tone={unproven ? 'neutral' : toneForPercent(topic.percent)} />
    </div>
  );
}

export function WeakAreasCard({
  topics,
  titleOf,
}: {
  topics: TopicSummary[];
  titleOf: (id: string) => string;
}): JSX.Element {
  return (
    <section className="card stack gap-16">
      <div className="between">
        <h2>Your weak areas</h2>
        <Link className="btn btn-sm" to="/tests?start=weak-areas">Practise</Link>
      </div>

      {topics.length === 0 ? (
        <p className="small dim">
          Nothing to report yet. Take a test and the topics you lose marks in will appear here.
        </p>
      ) : (
        <div className="stack gap-16">
          {topics.map((topic) => (
            <TopicRow key={topic.topicId} topic={topic} title={titleOf(topic.topicId)} />
          ))}
        </div>
      )}
    </section>
  );
}
