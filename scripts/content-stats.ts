/** Summary of the question bank per category and topic, for every level with content. */
import { CATEGORY_LABELS, CATEGORY_ORDER, LEVELS, getLevelIndex, loadAllLevels } from '../content/registry';

await loadAllLevels();

for (const level of LEVELS) {
  const index = getLevelIndex(level.id);
  if (!index) continue;
  const heading = `${level.name} question bank`;
  console.log(`\n${heading}\n${'='.repeat(heading.length)}`);
  for (const c of CATEGORY_ORDER) {
    const list = index.byCategory.get(c) ?? [];
    const topics = index.topicsByCategory.get(c) ?? [];
    const constructs = new Set(list.map((q) => q.constructId));
    console.log(
      `  ${CATEGORY_LABELS[c].padEnd(14)} ${String(list.length).padStart(4)} questions, ` +
      `${String(topics.length).padStart(2)} topics, ${constructs.size} constructs`,
    );
  }
  console.log(`  ${'TOTAL'.padEnd(14)} ${String(index.content.questions.length).padStart(4)} questions`);
}
