import type { Question, SourceRef } from '../../types';
import { makeQuestions, type Draft } from './build';

const P92 = { book: 'SB', page: 92, ref: 'Grammar Bank 1A / 1B' } as const;
const P94 = { book: 'SB', page: 94, ref: 'Grammar Bank 2A / 2B' } as const;

const singularDrafts: Draft[] = [
  { q: 'Hello. ___ Maria. What’s your name?', o: ['I’m', 'You’re', 'It’s'], a: 0,
    e: 'We use I’m (I am) to say our name.', c: 'i-you', d: 1 },
  { q: 'Hi. ___ in my class.', o: ['I’m', 'You’re', 'He’s'], a: 1,
    e: 'You’re (you are) talks about the other person.', c: 'i-you', d: 1 },
  { q: '___ Tom. I’m Tony.', o: ['I’m not', 'You aren’t', 'I’m'], a: 0,
    e: 'The second sentence says I’m Tony, so the first must be I’m not Tom.', c: 'i-you' },
  { q: 'I’m in class 5. ___ in class 4.', o: ['I’m', 'You’re', 'It’s'], a: 1,
    e: 'The other person is in class 4, so we use You’re.', c: 'i-you' },
  { q: '___ Sam? Yes, I am.', o: ['You are', 'Are you', 'Is you'], a: 1,
    e: 'In questions the verb comes first: Are you…?', c: 'i-you' },
  { q: 'A: Am I in room 8? B: No, you ___.', o: ['aren’t', 'isn’t', 'am not'], a: 0,
    e: 'The answer is about you, so we use aren’t.', c: 'i-you', d: 3 },
  { q: 'A: Are you Henry? B: Yes, I ___.', o: ['are', 'am', 'is'], a: 1,
    e: 'The short answer for I is Yes, I am.', c: 'i-you' },
  { q: '___ your teacher. Open your books, please.', o: ['I’m', 'You’re', 'They’re'], a: 0,
    e: 'The teacher is speaking about himself or herself: I’m.', c: 'i-you' },

  { q: 'Where’s London? ___ in England.', o: ['He’s', 'She’s', 'It’s'], a: 2,
    e: 'London is a thing or place, so we use It’s.', c: 'he-she-it', d: 1 },
  { q: 'Where’s Lisa from? ___ from Germany.', o: ['He’s', 'She’s', 'It’s'], a: 1,
    e: 'Lisa is a woman, so we use She’s.', c: 'he-she-it', d: 1 },
  { q: 'Where’s Mario from? ___ from Brazil.', o: ['She’s', 'He’s', 'It’s'], a: 1,
    e: 'Mario is a man, so we use He’s.', c: 'he-she-it', d: 1 },
  { q: '___ Ana from Mexico? No, she isn’t.', o: ['Is', 'Are', 'Am'], a: 0,
    e: 'Ana is she, so the question uses Is.', c: 'he-she-it' },
  { q: 'She isn’t from Mexico. ___ from Spain.', o: ['She’s', 'He’s', 'It’s'], a: 0,
    e: 'We keep talking about the same woman: She’s.', c: 'he-she-it' },
  { q: '___ Mark from the USA? No, he’s from England.', o: ['Are', 'Is', 'Am'], a: 1,
    e: 'Mark is he, so we use Is.', c: 'he-she-it' },
  { q: 'A: Is he from France? B: No, he ___.', o: ['isn’t', 'aren’t', 'not'], a: 0,
    e: 'The negative short answer for he is No, he isn’t.', c: 'he-she-it' },
  { q: 'Is it good? Yes, ___.', o: ['it is', 'is it', 'it’s'], a: 0,
    e: 'Short answers do not use the contraction: Yes, it is.', c: 'he-she-it', d: 3 },
  { q: 'Strasbourg isn’t in Germany. ___ in France.', o: ['He’s', 'It’s', 'She’s'], a: 1,
    e: 'A city is it.', c: 'he-she-it' },
];

const pluralDrafts: Draft[] = [
  { q: 'We ___ American.', o: ['am', 'is', 'are'], a: 2,
    e: 'We takes are.', c: 'plural-forms', d: 1 },
  { q: 'They ___ German.', o: ['are', 'is', 'am'], a: 0,
    e: 'They takes are.', c: 'plural-forms', d: 1 },
  { q: 'We ___ Egyptian. We’re Turkish.', o: ['isn’t', 'aren’t', 'am not'], a: 1,
    e: 'We takes aren’t in the negative.', c: 'plural-forms' },
  { q: '___ you from Russia? Yes, we are.', o: ['Is', 'Are', 'Am'], a: 1,
    e: 'You takes Are.', c: 'plural-forms', d: 1 },
  { q: 'A: Are they Mexican? B: No, they ___.', o: ['isn’t', 'aren’t', 'not'], a: 1,
    e: 'They takes aren’t.', c: 'plural-forms' },
  { q: 'A: Are we late? B: Yes, ___.', o: ['we are', 'you are', 'they are'], a: 1,
    e: 'Are we…? is answered with Yes, you are.', c: 'plural-forms', d: 3 },
  { q: 'Which sentence is correct?',
    o: ['They’re from Italy.', 'They is from Italy.', 'They am from Italy.'], a: 0,
    e: 'They are is contracted to They’re.', c: 'plural-forms', d: 1 },
  { q: 'My brother and I ___ students.', o: ['am', 'is', 'are'], a: 2,
    e: 'My brother and I means we, so we use are.', c: 'plural-forms', d: 3 },
  { q: 'The keys ___ on the table.', o: ['is', 'are', 'am'], a: 1,
    e: 'Keys is plural, so we use are.', c: 'plural-forms' },
  { q: 'You and Ben ___ in class 4.', o: ['are', 'is', 'am'], a: 0,
    e: 'You and Ben is plural, so we use are.', c: 'plural-forms' },
];

const whDrafts: Draft[] = [
  { q: '___ your name? My name is Ana.', o: ['Who’s', 'What’s', 'Where’s'], a: 1,
    e: 'We ask about a name with What.', c: 'wh-words', d: 1 },
  { q: '___ you from? I’m from Brighton.', o: ['Where are', 'What are', 'Who are'], a: 0,
    e: 'We ask about a place with Where.', c: 'wh-words', d: 1 },
  { q: '___ Tom? He’s a friend.', o: ['What’s', 'Where’s', 'Who’s'], a: 2,
    e: 'We ask about a person with Who.', c: 'wh-words' },
  { q: '___ the concert? It’s on Tuesday.', o: ['When’s', 'Where’s', 'How’s'], a: 0,
    e: 'We ask about a time or day with When.', c: 'wh-words' },
  { q: '___ you? I’m fine, thanks.', o: ['What are', 'How are', 'Who are'], a: 1,
    e: 'How are you? asks about how someone feels.', c: 'wh-words', d: 1 },
  { q: '___ is she? She’s ten.', o: ['How old', 'How', 'What'], a: 0,
    e: 'We ask about age with How old.', c: 'wh-words' },
  { q: 'Which question is correct?',
    o: ['Where he is from?', 'Where is he from?', 'Where from is he?'], a: 1,
    e: 'The word order is question word, verb, subject.', c: 'wh-order', d: 3 },
  { q: 'Which question is correct?',
    o: ['How old is she?', 'How old’s she?', 'How old she is?'], a: 0,
    e: 'We do not contract is when the last word is a pronoun.', c: 'wh-order', d: 3 },
  { q: '___ your email? It’s john@gmail.com.', o: ['Who’s', 'What’s', 'When’s'], a: 1,
    e: 'We ask about an email address with What.', c: 'wh-words' },
  { q: '___ are your friends? They’re at the airport.', o: ['Where', 'What', 'How old'], a: 0,
    e: 'We ask about a place with Where.', c: 'wh-words' },
];

const cfg = (topicId: string, unit: number, slug: string, source: SourceRef) =>
  ({ topicId, categoryId: 'grammar' as const, unit, type: 'gap-fill' as const, source, slug });

export const gramBeSingularIYou: Question[] = makeQuestions(
  cfg('beg-g-be-sing-i-you', 1, 'iy', P92), singularDrafts.slice(0, 8));

export const gramBeSingularHeShe: Question[] = makeQuestions(
  cfg('beg-g-be-sing-he-she-it', 1, 'hs', P92), singularDrafts.slice(8));

export const gramBePlural: Question[] = makeQuestions(
  cfg('beg-g-be-plural', 2, 'pl', P94), pluralDrafts);

export const gramWhQuestionsBe: Question[] = makeQuestions(
  cfg('beg-g-wh-questions-be', 2, 'wh', P94), whDrafts);
