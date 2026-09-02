/** Print a sample of questions per topic for manual review. */
import { getLevelIndex } from '../content/registry';

const index = getLevelIndex('beginner')!;
const wanted = process.argv[2] ?? 'beg-p-sound-vowels';
const list = index.byTopic.get(wanted) ?? [];
console.log(`\n${wanted} — ${list.length} questions\n`);
for (const q of list.slice(0, Number(process.argv[3] ?? 12))) {
  const marked = q.options.map((o, i) => (i === q.answer ? `[${o}]` : o)).join('  ');
  console.log(`${q.id}\n  ${q.prompt}\n  ${marked}\n  -> ${q.explanation}\n`);
}
