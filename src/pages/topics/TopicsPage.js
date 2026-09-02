import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CATEGORY_LABELS, CATEGORY_ORDER } from '@content/registry';
import { useLevelData } from '@/entities/topic/model/use-level-data';
import { Empty } from '@/shared/ui/primitives';
import { TopicRow } from '@/widgets/weak-areas/WeakAreasCard';
export default function TopicsPage() {
    const data = useLevelData();
    if (!data.hasContent || !data.index) {
        return (_jsx("div", { className: "page", children: _jsx(Empty, { title: "Content for this level is not available yet" }) }));
    }
    const index = data.index;
    return (_jsxs("div", { className: "page stack gap-24", children: [_jsxs("header", { className: "stack gap-8", children: [_jsx("h1", { children: "Topics" }), _jsxs("p", { className: "dim small", children: ["Everything you have studied in ", data.levelName, ", grouped by section. Percentages appear once you have answered questions in a topic."] })] }), CATEGORY_ORDER.map((categoryId) => {
                const topics = index.topicsByCategory.get(categoryId) ?? [];
                if (topics.length === 0)
                    return null;
                return (_jsxs("section", { className: "card stack gap-16", children: [_jsxs("div", { className: "between", children: [_jsx("h2", { children: CATEGORY_LABELS[categoryId] }), _jsxs("span", { className: "small dim", children: [topics.length, " topics"] })] }), _jsx("div", { className: "stack gap-16", children: topics.map((topic) => {
                                const summary = data.byTopicId.get(topic.id);
                                const count = index.byTopic.get(topic.id)?.length ?? 0;
                                if (!summary)
                                    return null;
                                return (_jsxs("div", { className: "stack gap-8", children: [_jsx(TopicRow, { topic: summary, title: topic.title }), _jsxs("p", { className: "tiny faint", children: [topic.summary, " \u00B7 ", count, " verified question", count === 1 ? '' : 's', ' ', "\u00B7 Unit ", topic.unitId.replace('beg-u', '')] })] }, topic.id));
                            }) })] }, categoryId));
            })] }));
}
