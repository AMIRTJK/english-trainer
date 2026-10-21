import type { Question } from '../../types';
import { GB, grammarTopic, type Draft } from './build';

/** Grammar Bank 12A — present perfect (SB p.146). */
const presentPerfect: Draft[] = [
  { q: 'A: ___ seen the new Matt Damon film? B: Yes, I have.', o: ['Have you', 'Did you', 'Has you'], a: 0,
    e: 'Present perfect question: Have + you + past participle.', c: 'question', d: 1 },
  { q: 'She ___ any books in English.', o: ['haven’t read', 'hasn’t read', 'hasn’t readed'], a: 1, e: 'He / she / it: hasn’t + past participle.', c: 'negative' },
  { q: 'Have you ___ read a Russian novel?', o: ['last', 'ago', 'ever'], a: 2, e: 'Ever = at any time in your life.', c: 'ever-never' },
  { q: 'I’ve ___ worked in an office.', o: ['never', 'ever', 'ago'], a: 0, e: 'Never = at no time in your life.', c: 'ever-never' },
  { q: 'Your parents ___. They’re in the living room.', o: ['has arrived', 'have arrived', 'arrive'], a: 1, e: 'Recent event: have arrived.', c: 'recent' },
  { q: 'I have seen the film. → I___ seen the film.', o: ['’s', '’d', '’ve'], a: 2, e: 'I have → I’ve.', c: 'contraction' },
  { q: 'He has arrived at the airport. → ___ arrived at the airport.', o: ['He’s', 'He’ve', 'He’d'], a: 0, e: 'In the present perfect ’s = has.', c: 'contraction', d: 3 },
  { q: 'It has stopped raining. → It___ stopped raining.', o: ['’ve', '’s', 'is'], a: 1, e: 'It has → it’s.', c: 'contraction' },
  { q: 'I’ve ___ a famous actor.', o: ['saw', 'see', 'seen'], a: 2, e: 'see → saw → seen.', c: 'participle', d: 3 },
  { q: '___ he accepted the invitation?', o: ['Has', 'Have', 'Did'], a: 0, e: 'Has + he + past participle?', c: 'question' },
  { q: 'The train ___ arrived.', o: ['haven’t', 'hasn’t', 'didn’t'], a: 1, e: 'The train = it: hasn’t.', c: 'negative' },
  { q: 'I’ve read the book, but I ___ the film.', o: ['haven’t saw', 'haven’t see', 'haven’t seen'], a: 2, e: 'Haven’t + past participle: seen.', c: 'participle' },
  { q: 'A: Have you ___ anyone famous? B: Yes, I have.', o: ['ever met', 'ever meet', 'met ever'], a: 0, e: 'Have you ever + past participle?', c: 'ever-never' },
  { q: 'She ___ in a restaurant before.', o: ['has never work', 'has never worked', 'have never worked'], a: 1, e: 'Has never + past participle.', c: 'ever-never' },
  { q: 'He’s ___ the floor. It’s very clean now.', o: ['clean', 'cleaning', 'cleaned'], a: 2, e: 'Regular past participle = past simple: cleaned.', c: 'participle' },
];

/** Grammar Bank 12B — present perfect or past simple? (SB p.146). */
const perfectOrPast: Draft[] = [
  { q: 'A: Have you been to that new Italian restaurant? B: Yes, I have. A: When ___ there?', o: ['did you go', 'have you been', 'have you gone'], a: 0,
    e: 'For details (when) we change to the past simple.', c: 'details', d: 3 },
  { q: 'When ___ the film?', o: ['have you seen', 'did you see', 'you saw'], a: 1, e: 'With when we use the past simple.', c: 'when', d: 3 },
  { q: 'I saw it ___.', o: ['ever', 'never', 'last week'], a: 2, e: 'Past time expressions go with the past simple.', c: 'when' },
  { q: 'Which sentence is correct?', o: ['I saw it last week.', 'I’ve seen it last week.', 'I’ve saw it last week.'], a: 0,
    e: 'Last week → past simple: I saw it last week.', c: 'when' },
  { q: 'I’ve been ___ Rome three times.', o: ['on', 'to', 'at'], a: 1, e: 'Been to = has visited a place.', c: 'been-to' },
  { q: 'My sister isn’t here. She’s ___ to Italy to study Italian.', o: ['been', 'go', 'gone'], a: 2, e: 'Gone to = she is there now.', c: 'been-gone', d: 3 },
  { q: 'I’ve never ___ to the USA.', o: ['been', 'gone', 'went'], a: 0, e: 'Never been to = never visited.', c: 'been-gone' },
  { q: 'My neighbours aren’t at home. They’ve ___ on holiday.', o: ['been', 'gone', 'went'], a: 1, e: 'They are on holiday now: gone.', c: 'been-gone' },
  { q: 'My boyfriend ___ me a ring for my last birthday.', o: ['has given', 'have given', 'gave'], a: 2, e: 'For my last birthday = a finished time: past simple.', c: 'when' },
  { q: 'They ___ a new house last month.', o: ['bought', 'have bought', 'has bought'], a: 0, e: 'Last month → past simple.', c: 'when' },
  { q: '___ ever danced a tango?', o: ['Did you', 'Have you', 'Do you'], a: 1, e: 'Ever (in your life) → present perfect.', c: 'experience' },
  { q: 'A: Have you ever been to Spain? B: No, but I ___ to Portugal last year.', o: ['have been', 'have gone', 'went'], a: 2,
    e: 'Last year → past simple: went.', c: 'details' },
  { q: 'Nick has ___ to Paris. (= he visited Paris and came back)', o: ['been', 'gone', 'went'], a: 0, e: 'Been to = visited and came back.', c: 'been-gone', d: 3 },
  { q: 'We have lots of food. I’ve ___ to the supermarket.', o: ['gone', 'been', 'go'], a: 1, e: 'I went and came back: been.', c: 'been-gone' },
];

/** 12C — revision: question formation (SB p.98). */
const questionFormation: Draft[] = [
  { q: 'What ___ you usually do in the morning?', o: ['do', 'are', 'is'], a: 0, e: 'Present simple: What do you usually do?', c: 'do', d: 1 },
  { q: 'What ___ you do last weekend?', o: ['do', 'have', 'did'], a: 2, e: 'Last weekend → past: did.', c: 'did' },
  { q: 'What ___ your favourite room in your home?', o: ['’s', 'does', 'do'], a: 0, e: 'What’s = What is.', c: 'be' },
  { q: '___ you tidy or untidy?', o: ['Do', 'Are', 'Have'], a: 1, e: 'Tidy is an adjective: Are you tidy?', c: 'be' },
  { q: '___ you do a lot of housework last week?', o: ['Have', 'Do', 'Did'], a: 2, e: 'Last week → Did you…?', c: 'did' },
  { q: 'What languages ___ you speak?', o: ['can', 'are', 'have'], a: 0, e: 'Ability: What languages can you speak?', c: 'can' },
  { q: 'Why ___ you learning English?', o: ['do', 'are', 'have'], a: 1, e: 'Present continuous: Why are you learning…?', c: 'be' },
  { q: 'Where ___ you going to go for your next holiday?', o: ['do', 'did', 'are'], a: 2, e: 'Going to: Where are you going to go?', c: 'be' },
  { q: 'What book ___ you reading at the moment?', o: ['are', 'do', 'have'], a: 0, e: 'At the moment → present continuous.', c: 'be' },
  { q: 'What films ___ you seen recently?', o: ['did', 'have', 'are'], a: 1, e: 'Present perfect: What films have you seen?', c: 'have' },
  { q: '___ you ever been to Britain or the USA?', o: ['Did', 'Are', 'Have'], a: 2, e: 'Have you ever been…?', c: 'have' },
  { q: 'What kind of TV programmes ___ you like watching?', o: ['do', 'are', 'have'], a: 0, e: 'Present simple: do you like…?', c: 'do' },
  { q: 'Where ___ you go for your last holiday?', o: ['have', 'did', 'are'], a: 1, e: 'Last holiday → did.', c: 'did' },
  { q: '___ you sing or play a musical instrument?', o: ['Can', 'Are', 'Have'], a: 0, e: 'Ability: Can you sing…?', c: 'can' },
];

export const gramFile12: Question[] = [
  ...grammarTopic('present-perfect', 'pp', 12, GB(146, '12A'), presentPerfect),
  ...grammarTopic('perfect-or-past', 'pf', 12, GB(146, '12B'), perfectOrPast),
  ...grammarTopic('question-formation', 'qf', 12, { book: 'SB', page: 98, ref: 'Lesson 12C — question formation' }, questionFormation),
];
