/** Print a sample of questions per topic for manual review. */
import { LEVELS, getLevelIndex, loadAllLevels } from '../content/registry';

await loadAllLevels();
const wanted = process.argv[2] ?? 'beg-p-sound-vowels';
// The topic id carries its level prefix, so the level is found from it.
const level = LEVELS.find((l) => getLevelIndex(l.id)?.topicById.has(wanted));
const index = getLevelIndex(level?.id ?? 'beginner')!;
const list = index.byTopic.get(wanted) ?? [];
console.log(`\n${wanted} — ${list.length} questions\n`);
for (const q of list.slice(0, Number(process.argv[3] ?? 12))) {
  const marked = q.options.map((o, i) => (i === q.answer ? `[${o}]` : o)).join('  ');
  console.log(`${q.id}\n  ${q.prompt}\n  ${marked}\n  -> ${q.explanation}\n`);
}
