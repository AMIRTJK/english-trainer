/** Summary of the question bank per category and topic. */
import { getLevelIndex, CATEGORY_ORDER, CATEGORY_LABELS } from '../content/registry';
const index = getLevelIndex('beginner');
console.log('\nBeginner question bank\n======================');
for (const c of CATEGORY_ORDER) {
    const list = index.byCategory.get(c) ?? [];
    const topics = index.topicsByCategory.get(c) ?? [];
    const constructs = new Set(list.map((q) => q.constructId));
    console.log(`  ${CATEGORY_LABELS[c].padEnd(14)} ${String(list.length).padStart(4)} questions, ` +
        `${String(topics.length).padStart(2)} topics, ${constructs.size} constructs`);
}
console.log(`  ${'TOTAL'.padEnd(14)} ${String(index.content.questions.length).padStart(4)} questions`);
