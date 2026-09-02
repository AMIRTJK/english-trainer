import { CATEGORY_LABELS, CATEGORY_ORDER } from '@content/registry';
import { useLevelData } from '@/entities/topic/model/use-level-data';
import { Empty } from '@/shared/ui/primitives';
import { TopicRow } from '@/widgets/weak-areas/WeakAreasCard';

export default function TopicsPage(): JSX.Element {
  const data = useLevelData();

  if (!data.hasContent || !data.index) {
    return (
      <div className="page">
        <Empty title="Content for this level is not available yet" />
      </div>
    );
  }

  const index = data.index;

  return (
    <div className="page stack gap-24">
      <header className="stack gap-8">
        <h1>Topics</h1>
        <p className="dim small">
          Everything you have studied in {data.levelName}, grouped by section.
          Percentages appear once you have answered questions in a topic.
        </p>
      </header>

      {CATEGORY_ORDER.map((categoryId) => {
        const topics = index.topicsByCategory.get(categoryId) ?? [];
        if (topics.length === 0) return null;
        return (
          <section key={categoryId} className="card stack gap-16">
            <div className="between">
              <h2>{CATEGORY_LABELS[categoryId]}</h2>
              <span className="small dim">{topics.length} topics</span>
            </div>
            <div className="stack gap-16">
              {topics.map((topic) => {
                const summary = data.byTopicId.get(topic.id);
                const count = index.byTopic.get(topic.id)?.length ?? 0;
                if (!summary) return null;
                return (
                  <div key={topic.id} className="stack gap-8">
                    <TopicRow topic={summary} title={topic.title} />
                    <p className="tiny faint">
                      {topic.summary} · {count} verified question{count === 1 ? '' : 's'}
                      {' '}· Unit {topic.unitId.replace('beg-u', '')}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
