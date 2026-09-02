import type { Question, SourceRef } from '../../types';
import { makeQuestions, type Draft } from './build';

const P100 = { book: 'SB', page: 100, ref: 'Grammar Bank 5A / 5B' } as const;
const P102 = { book: 'SB', page: 102, ref: 'Grammar Bank 6A / 6B' } as const;

const posNegDrafts: Draft[] = [
  { q: 'I ___ cereal for breakfast every day.', o: ['have', 'has', 'having'], a: 0,
    e: 'I takes the infinitive form: have.', c: 'pos-neg', d: 1 },
  { q: 'We ___ coffee for breakfast.', o: ['has', 'have', 'haves'], a: 1,
    e: 'We takes have.', c: 'pos-neg', d: 1 },
  { q: 'They ___ meat for dinner.', o: ['don’t have', 'doesn’t have', 'not have'], a: 0,
    e: 'They takes don’t in the negative.', c: 'pos-neg' },
  { q: 'You ___ pasta for lunch.', o: ['doesn’t have', 'don’t have', 'aren’t have'], a: 1,
    e: 'You takes don’t.', c: 'pos-neg' },
  { q: 'Which sentence is correct?',
    o: ['We not have coffee.', 'We don’t have coffee.', 'We doesn’t have coffee.'], a: 1,
    e: 'Negatives use don’t plus the verb.', c: 'pos-neg', d: 3 },
  { q: 'In my country, we ___ a lot of rice.', o: ['eats', 'eat', 'eating'], a: 1,
    e: 'We takes the infinitive: eat.', c: 'pos-neg' },
  { q: 'I ___ in a small flat in London.', o: ['lives', 'live', 'living'], a: 1,
    e: 'I takes live.', c: 'pos-neg', d: 1 },
  { q: 'My friends ___ Spanish at university.', o: ['studies', 'study', 'studys'], a: 1,
    e: 'My friends is plural, so we use study.', c: 'pos-neg' },

  { q: '___ you live near here?', o: ['Do', 'Does', 'Are'], a: 0,
    e: 'You takes Do in questions.', c: 'questions', d: 1 },
  { q: '___ they like children?', o: ['Does', 'Do', 'Is'], a: 1,
    e: 'They takes Do.', c: 'questions', d: 1 },
  { q: 'A: Do you drink tea? B: Yes, I ___.', o: ['am', 'do', 'does'], a: 1,
    e: 'The short answer uses do: Yes, I do.', c: 'questions' },
  { q: 'A: Do they work in a bank? B: No, they ___.', o: ['aren’t', 'don’t', 'doesn’t'], a: 1,
    e: 'The short answer uses don’t.', c: 'questions' },
  { q: 'Which question is correct?',
    o: ['You live here?', 'Live you here?', 'Do you live here?'], a: 2,
    e: 'Present simple questions use do plus the subject plus the verb.', c: 'questions', d: 3 },
  { q: '___ we have good seats?', o: ['Do', 'Does', 'Are'], a: 0,
    e: 'We takes Do.', c: 'questions' },
  { q: 'What ___ you do?', o: ['does', 'do', 'are'], a: 1,
    e: 'You takes do.', c: 'questions' },
];

const heSheItDrafts: Draft[] = [
  { q: 'He ___ in an office.', o: ['work', 'works', 'working'], a: 1,
    e: 'He, she and it add -s to the verb.', c: 'third-person', d: 1 },
  { q: 'She ___ CNN every evening.', o: ['watchs', 'watches', 'watch'], a: 1,
    e: 'After ch we add -es: watches.', c: 'third-person', d: 3 },
  { q: 'He ___ history at university.', o: ['studys', 'studies', 'study'], a: 1,
    e: 'A consonant plus y becomes -ies: studies.', c: 'third-person', d: 3 },
  { q: 'The film ___ at eight o’clock.', o: ['finishs', 'finishes', 'finish'], a: 1,
    e: 'After sh we add -es: finishes.', c: 'third-person', d: 3 },
  { q: 'She ___ a car.', o: ['have', 'has', 'haves'], a: 1,
    e: 'Have is irregular: he, she and it take has.', c: 'third-person' },
  { q: 'He ___ to school by bus.', o: ['gos', 'goes', 'go'], a: 1,
    e: 'Go is irregular: he, she and it take goes.', c: 'third-person' },
  { q: 'She ___ her homework in the evening.', o: ['does', 'do', 'dos'], a: 0,
    e: 'Do is irregular: he, she and it take does.', c: 'third-person' },
  { q: 'He ___ meat.', o: ['don’t eat', 'doesn’t eat', 'doesn’t eats'], a: 1,
    e: 'He takes doesn’t plus the infinitive.', c: 'third-person', d: 3 },
  { q: '___ she work in a hospital?', o: ['Do', 'Does', 'Is'], a: 1,
    e: 'She takes Does in questions.', c: 'third-person' },
  { q: 'A: Does he speak English? B: Yes, he ___.', o: ['do', 'does', 'is'], a: 1,
    e: 'The short answer uses does.', c: 'third-person' },
  { q: 'Which sentence is correct?',
    o: ['She doesn’t works here.', 'She doesn’t work here.', 'She don’t work here.'], a: 1,
    e: 'After doesn’t we use the infinitive without -s.', c: 'third-person', d: 3 },
  { q: 'Where ___ your sister work?', o: ['do', 'does', 'is'], a: 1,
    e: 'Your sister is she, so we use does.', c: 'third-person' },
  { q: 'My brother ___ in a factory.', o: ['work', 'works', 'is work'], a: 1,
    e: 'My brother is he, so the verb takes -s.', c: 'third-person' },
];

const frequencyDrafts: Draft[] = [
  { q: 'Which sentence is correct?',
    o: ['Always I have breakfast.', 'I have always breakfast.', 'I always have breakfast.'], a: 2,
    e: 'Adverbs of frequency go before the main verb.', c: 'position', d: 3 },
  { q: 'They ___ finish work at five o’clock.', o: ['usually', 'usual', 'usually are'], a: 0,
    e: 'Usually goes before the main verb.', c: 'position' },
  { q: 'She ___ watches TV in the evening.', o: ['sometime', 'sometimes', 'sometimes is'], a: 1,
    e: 'The adverb is sometimes, before the verb.', c: 'position' },
  { q: 'Which sentence is correct?',
    o: ['He never eats meat.', 'He doesn’t never eat meat.', 'He never doesn’t eat meat.'], a: 0,
    e: 'With never we use a positive verb.', c: 'never', d: 3 },
  { q: 'Which question is correct?',
    o: ['Does usually she go shopping?', 'Does she usually go shopping?', 'Usually does she go shopping?'],
    a: 1, e: 'In questions the adverb goes after the subject.', c: 'position', d: 3 },
  { q: 'What time do you ___ get up?', o: ['usually', 'usual', 'always is'], a: 0,
    e: 'The adverb goes before the main verb.', c: 'position' },
  { q: 'Which adverb means 100%?', o: ['never', 'sometimes', 'always'], a: 2,
    e: 'Always is 100% and never is 0%.', c: 'meaning', d: 1 },
  { q: 'Which adverb means 0%?', o: ['never', 'usually', 'always'], a: 0,
    e: 'Never means 0%.', c: 'meaning', d: 1 },
  { q: 'Which sentence is correct?',
    o: ['I never am late for work.', 'I am never late for work.', 'Never I am late for work.'], a: 1,
    e: 'With the verb be the adverb goes after it: I am never late.', c: 'position', d: 3 },
  { q: 'He ___ goes to the gym on Saturday.', o: ['sometimes', 'sometime', 'some time'], a: 0,
    e: 'The adverb is sometimes.', c: 'meaning' },
];

const cfg = (topicId: string, unit: number, slug: string, source: SourceRef) =>
  ({ topicId, categoryId: 'grammar' as const, unit, type: 'gap-fill' as const, source, slug });

export const gramPresentSimplePosNeg: Question[] = makeQuestions(
  cfg('beg-g-present-simple-pos-neg', 5, 'ps', P100), posNegDrafts.slice(0, 8));
export const gramPresentSimpleQuestions: Question[] = makeQuestions(
  cfg('beg-g-present-simple-questions', 5, 'pq', P100), posNegDrafts.slice(8));
export const gramPresentSimpleHeShe: Question[] = makeQuestions(
  cfg('beg-g-present-simple-he-she-it', 6, 'p3', P102), heSheItDrafts);
export const gramAdverbsFrequency: Question[] = makeQuestions(
  cfg('beg-g-adverbs-frequency', 6, 'af', P102), frequencyDrafts);
