/**
 * Content quality gate (AGENTS.md §3, PROJECT_SPEC §27/§29).
 *
 * Checks every question in every level:
 *  - structural integrity (3 distinct options, answer in range, required fields)
 *  - lexicon compliance: every word shown to the user exists in the level's
 *    allowed word list, so no question can use vocabulary outside the book
 *  - no duplicate ids, no duplicate prompt+options pairs
 *  - "different sound" items really contain one odd word and two matching ones
 *  - word-stress items have consistent syllable metadata
 *  - options that differ only by order are reported (not a new question)
 *
 * Run: npm run lint:content
 */
import { LEVELS, getLevelIndex } from '../content/registry';
import { unknownWords, wrongForms, wrongFormsIn } from '../content/beginner/lexicon';
import type { Question } from '../content/types';
import { validateVocabulary } from './validate-vocabulary';

const errors: string[] = [];
const warnings: string[] = [];

const err = (q: Question, msg: string) => errors.push(`[${q.id}] ${msg}`);
const warn = (q: Question, msg: string) => warnings.push(`[${q.id}] ${msg}`);

/** The prompt plus the correct answer: this must be flawless book English. */
function correctText(q: Question): string {
  if (q.type === 'word-stress') return `${q.prompt} ${q.stress?.word ?? ''}`;
  return `${q.prompt} ${q.options[q.answer] ?? ''}`;
}

/** The two wrong options. These may use forms that are wrong on purpose. */
function distractorText(q: Question): string {
  if (q.type === 'word-stress') return '';
  return q.options.filter((_, i) => i !== q.answer).join(' ');
}

function checkStructure(q: Question): void {
  if (q.options.length !== 3) err(q, `expected 3 options, got ${q.options.length}`);
  if (q.answer < 0 || q.answer > 2) err(q, `answer index ${q.answer} out of range`);
  const trimmed = q.options.map((o) => o.trim().toLowerCase());
  if (new Set(trimmed).size !== 3) err(q, `duplicate options: ${q.options.join(' | ')}`);
  if (q.options.some((o) => o.trim() === '')) err(q, 'empty option');
  if (!q.explanation.trim()) err(q, 'missing explanation');
  if (!q.source.ref) err(q, 'missing source reference');
  if (!q.constructId) err(q, 'missing constructId');
  if (q.prompt.includes('___') === false && q.type === 'gap-fill' && !q.prompt.endsWith('?')) {
    warn(q, 'gap-fill prompt has no gap marker and is not a question');
  }
}

function checkLexicon(q: Question): void {
  const unknown = unknownWords(correctText(q));
  if (unknown.length > 0) {
    err(q, `prompt/answer uses words outside the allowed lexicon: ${[...new Set(unknown)].join(', ')}`);
  }

  // A form that is wrong on purpose must never be the correct answer.
  const badInAnswer = wrongFormsIn(correctText(q));
  if (badInAnswer.length > 0) {
    err(q, `correct answer contains a deliberately wrong form: ${badInAnswer.join(', ')}`);
  }

  // Distractors may use the declared wrong forms, but nothing else new.
  const unknownDistractors = unknownWords(distractorText(q), wrongForms);
  if (unknownDistractors.length > 0) {
    err(q, `distractor uses unlisted words: ${[...new Set(unknownDistractors)].join(', ')}`);
  }
}

function checkSound(q: Question): void {
  if (q.type !== 'different-sound') return;
  if (!q.sound) {
    err(q, 'different-sound question without sound metadata');
    return;
  }
  const ipaCount = Object.keys(q.sound.ipa).length;
  if (ipaCount !== 3) err(q, `expected IPA for 3 words, got ${ipaCount}`);
  for (const [word, ipa] of Object.entries(q.sound.ipa)) {
    if (!ipa) err(q, `missing IPA for "${word}"`);
  }
  if (q.sound.target === q.sound.others) {
    err(q, `odd sound and shared sound are the same (${q.sound.target})`);
  }
}

function checkStress(q: Question): void {
  if (q.type !== 'word-stress') return;
  if (!q.stress) {
    err(q, 'word-stress question without stress metadata');
    return;
  }
  const { syllables, stressed, word } = q.stress;
  if (stressed < 0 || stressed >= syllables.length) {
    err(q, `stressed index ${stressed} out of range for ${syllables.length} syllables`);
  }
  const joined = syllables.join('').toLowerCase();
  if (joined !== word.toLowerCase().replace(/[^a-z]/gi, '')) {
    err(q, `syllables "${syllables.join('|')}" do not spell "${word}"`);
  }
  const marked = q.options.filter((o) => o.includes("'"));
  if (marked.length !== 3) err(q, 'every option must mark exactly one stressed syllable');
  const correct = q.options[q.answer] ?? '';
  const correctIndex = correct.split('|').findIndex((s) => s.startsWith("'"));
  if (correctIndex !== stressed) {
    err(q, `correct option marks syllable ${correctIndex} but metadata says ${stressed}`);
  }
}

function main(): void {
  let total = 0;
  const perLevel: string[] = [];

  for (const level of LEVELS) {
    const index = getLevelIndex(level.id);
    if (!index) {
      perLevel.push(`${level.name}: no content yet`);
      continue;
    }

    const seenIds = new Set<string>();
    const seenPrompts = new Map<string, string>();
    const seenOptionSets = new Map<string, string>();
    const topicIds = new Set(index.content.topics.map((t) => t.id));

    for (const q of index.content.questions) {
      total += 1;
      if (seenIds.has(q.id)) errors.push(`duplicate question id: ${q.id}`);
      seenIds.add(q.id);

      if (!topicIds.has(q.topicId)) err(q, `unknown topicId ${q.topicId}`);
      if (q.levelId !== level.id) err(q, `levelId ${q.levelId} does not match ${level.id}`);
      if (q.status !== 'verified') err(q, `status ${q.status} must not be in the active pool`);

      checkStructure(q);
      checkLexicon(q);
      checkSound(q);
      checkStress(q);

      const promptKey = `${q.prompt}::${q.options.join('|')}`;
      const prev = seenPrompts.get(promptKey);
      if (prev) errors.push(`identical question in ${prev} and ${q.id}`);
      else seenPrompts.set(promptKey, q.id);

      // Same prompt + same option set in a different order is not a new question.
      const orderKey = `${q.prompt}::${[...q.options].map((o) => o.toLowerCase()).sort().join('|')}`;
      const prevOrder = seenOptionSets.get(orderKey);
      if (prevOrder && prevOrder !== q.id) {
        errors.push(`${q.id} is only a reordering of ${prevOrder}`);
      } else seenOptionSets.set(orderKey, q.id);
    }

    const emptyTopics = index.content.topics.filter((t) => !(index.byTopic.get(t.id)?.length));
    for (const t of emptyTopics) warnings.push(`topic "${t.title}" (${t.id}) has no questions`);

    perLevel.push(
      `${level.name}: ${index.content.questions.length} verified questions, ` +
      `${index.content.topics.length} topics, ${index.byConstruct.size} constructs`,
    );

    if (index.content.vocabulary) {
      const report = validateVocabulary(level.id);
      errors.push(...report.errors);
      warnings.push(...report.warnings);
      perLevel.push(`  vocabulary — ${report.summary}`);
    }
  }

  console.log('\nContent validation');
  console.log('==================');
  for (const line of perLevel) console.log('  ' + line);
  console.log(`  total active questions: ${total}`);

  if (warnings.length) {
    console.log(`\n  ${warnings.length} warning(s):`);
    for (const w of warnings.slice(0, 40)) console.log('   ! ' + w);
  }

  if (errors.length) {
    console.error(`\n  ${errors.length} error(s):`);
    for (const e of errors.slice(0, 80)) console.error('   x ' + e);
    process.exit(1);
  }

  console.log('\n  OK — all active content passed.\n');
}

main();
