import { beginner } from './beginner';
/**
 * Every level the app knows about. Adding Elementary means adding a folder and
 * one line here — no business logic changes (AGENTS.md §8).
 */
export const LEVELS = [
    beginner.meta,
    { id: 'elementary', name: 'Elementary', order: 2, contentVersion: '0.0.0', book: 'English File 4th edition Elementary' },
    { id: 'pre-intermediate', name: 'Pre-Intermediate', order: 3, contentVersion: '0.0.0', book: 'English File 4th edition Pre-Intermediate' },
    { id: 'intermediate', name: 'Intermediate', order: 4, contentVersion: '0.0.0', book: 'English File 4th edition Intermediate' },
];
const CONTENT = { [beginner.meta.id]: beginner };
/** Indexes are built once per level and cached (Performance.md §1). */
const indexCache = new Map();
function buildIndex(content) {
    const byId = new Map();
    const byTopic = new Map();
    const byCategory = new Map();
    const byConstruct = new Map();
    for (const q of content.questions) {
        byId.set(q.id, q);
        push(byTopic, q.topicId, q);
        push(byCategory, q.categoryId, q);
        push(byConstruct, q.constructId, q);
    }
    const topicById = new Map(content.topics.map((t) => [t.id, t]));
    const topicsByCategory = new Map();
    for (const t of content.topics)
        push(topicsByCategory, t.categoryId, t);
    return { content, byId, byTopic, byCategory, byConstruct, topicById, topicsByCategory };
}
function push(map, key, value) {
    const list = map.get(key);
    if (list)
        list.push(value);
    else
        map.set(key, [value]);
}
export function hasContent(levelId) {
    return CONTENT[levelId] !== undefined;
}
export function getLevelIndex(levelId) {
    const cached = indexCache.get(levelId);
    if (cached)
        return cached;
    const content = CONTENT[levelId];
    if (!content)
        return null;
    const index = buildIndex(content);
    indexCache.set(levelId, index);
    return index;
}
export function getLevelMeta(levelId) {
    return LEVELS.find((l) => l.id === levelId);
}
export const DEFAULT_LEVEL_ID = beginner.meta.id;
export const CATEGORY_LABELS = {
    grammar: 'Grammar',
    vocabulary: 'Vocabulary',
    pronunciation: 'Pronunciation',
    'word-stress': 'Word Stress',
};
export const CATEGORY_ORDER = ['grammar', 'vocabulary', 'pronunciation', 'word-stress'];
