import type { Question } from '../../types';
import { makeQuestions, type Draft } from './build';

const SRC = { book: 'SB', page: 110, ref: 'Grammar Bank 10B' } as const;

const drafts: Draft[] = [
  // --- positive ---------------------------------------------------------------
  { q: 'I ___ at home at eight o’clock.', o: ['was', 'were', 'am'], a: 0,
    e: 'I takes was in the past simple.', c: 'positive', d: 1 },
  { q: 'They ___ in London last month.', o: ['was', 'were', 'are'], a: 1,
    e: 'They takes were.', c: 'positive', d: 1 },
  { q: 'It ___ very hot last week.', o: ['were', 'was', 'is'], a: 1,
    e: 'It takes was.', c: 'positive', d: 1 },
  { q: 'We ___ late for the film yesterday.', o: ['was', 'were', 'are'], a: 1,
    e: 'We takes were.', c: 'positive' },
  { q: 'My brother ___ a taxi driver in 2019.', o: ['was', 'were', 'is'], a: 0,
    e: 'My brother is singular, so we use was.', c: 'positive' },
  { q: 'You ___ in class yesterday.', o: ['was', 'were', 'are'], a: 1,
    e: 'You always takes were.', c: 'positive' },
  { q: 'Petra ___ tired last night.', o: ['was', 'were', 'is'], a: 0,
    e: 'Petra is one person, so we use was.', c: 'positive' },
  { q: 'The children ___ at school this morning.', o: ['was', 'were', 'is'], a: 1,
    e: 'Children is plural, so we use were.', c: 'positive' },

  // --- negative ---------------------------------------------------------------
  { q: 'She ___ at work yesterday.', o: ['weren’t', 'wasn’t', 'isn’t'], a: 1,
    e: 'She takes wasn’t (was not).', c: 'negative' },
  { q: 'They ___ at home yesterday evening.', o: ['wasn’t', 'isn’t', 'weren’t'], a: 2,
    e: 'They takes weren’t (were not).', c: 'negative' },
  { q: 'I ___ hungry this morning.', o: ['wasn’t', 'weren’t', 'am not'], a: 0,
    e: 'I takes wasn’t.', c: 'negative' },
  { q: 'We ___ in Mexico last year.', o: ['wasn’t', 'weren’t', 'aren’t'], a: 1,
    e: 'We takes weren’t.', c: 'negative' },
  { q: 'The hotel ___ very expensive.', o: ['weren’t', 'wasn’t', 'isn’t'], a: 1,
    e: 'The hotel is singular, so we use wasn’t.', c: 'negative' },
  { q: 'My parents ___ at the restaurant last night.', o: ['wasn’t', 'weren’t', 'isn’t'], a: 1,
    e: 'Parents is plural, so we use weren’t.', c: 'negative' },

  // --- questions ---------------------------------------------------------------
  { q: '___ you in London last week?', o: ['Was', 'Were', 'Are'], a: 1,
    e: 'You takes were, and in questions the verb comes first.', c: 'question' },
  { q: '___ she late for work this morning?', o: ['Was', 'Were', 'Is'], a: 0,
    e: 'She takes was.', c: 'question' },
  { q: 'Was ___ in the cinema yesterday afternoon?', o: ['we', 'you', 'she'], a: 2,
    e: 'Was goes with I, he, she and it. We and you take were.', c: 'question', d: 3 },
  { q: 'Were ___ at the party on Saturday?', o: ['he', 'they', 'she'], a: 1,
    e: 'Were goes with you, we and they.', c: 'question', d: 3 },
  { q: '___ your friends at the airport?', o: ['Was', 'Were', 'Is'], a: 1,
    e: 'Friends is plural, so we use Were.', c: 'question' },
  { q: '___ the food good at the hotel?', o: ['Were', 'Was', 'Are'], a: 1,
    e: 'The food is singular, so we use Was.', c: 'question' },

  // --- short answers ------------------------------------------------------------
  { q: 'A: Were you in London last week? B: No, I ___.', o: ['was', 'wasn’t', 'weren’t'], a: 1,
    e: 'The answer is about I, so we use wasn’t.', c: 'short-answer', d: 3 },
  { q: 'A: Was Rosa late for work this morning? B: Yes, ___.', o: ['she late', 'was she', 'she was'], a: 2,
    e: 'In a short answer the subject comes before the verb: Yes, she was.', c: 'short-answer', d: 3 },
  { q: 'A: Were they at the gym? B: No, ___.', o: ['they weren’t', 'they wasn’t', 'weren’t they'], a: 0,
    e: 'They takes weren’t, and the subject comes first.', c: 'short-answer' },
  { q: 'A: Was it a good film? B: Yes, ___.', o: ['it was', 'was it', 'it were'], a: 0,
    e: 'It takes was: Yes, it was.', c: 'short-answer' },

  // --- Wh- questions --------------------------------------------------------------
  { q: '___ you yesterday?', o: ['Where are', 'Where was', 'Where were'], a: 2,
    e: 'You takes were, and yesterday means the past.', c: 'wh-question', d: 3 },
  { q: '___ you last week?', o: ['Where were', 'Where was', 'Where are'], a: 0,
    e: 'You takes were in the past.', c: 'wh-question' },
  { q: 'A: Where was your son’s football match? B: It ___ the park.', o: ['was in', 'were in', 'was there'], a: 0,
    e: 'It takes was, and we use in with the park.', c: 'wh-question', d: 3 },
  { q: '___ the concert? It was on Tuesday.', o: ['When was', 'When were', 'When is'], a: 0,
    e: 'The concert is singular, so we use was.', c: 'wh-question' },

  // --- there was / there were -------------------------------------------------------
  { q: '___ a party at the school last night.', o: ['There was', 'There were', 'There is'], a: 0,
    e: 'A party is singular, so the past is There was.', c: 'there-past' },
  { q: '___ some good films on TV last weekend.', o: ['There was', 'There were', 'There are'], a: 1,
    e: 'Films is plural, so the past is There were.', c: 'there-past' },
  { q: '___ any people at reception this morning.', o: ['There weren’t', 'There wasn’t', 'There aren’t'], a: 0,
    e: 'People is plural and the sentence is negative and in the past: There weren’t any.', c: 'there-past', d: 3 },

  // --- present to past ---------------------------------------------------------------
  { q: 'He is at home today. He ___ at home yesterday too.', o: ['is', 'was', 'were'], a: 1,
    e: 'The past of is is was.', c: 'present-to-past', d: 1 },
  { q: 'They are in Spain now. They ___ in Italy last month.', o: ['was', 'were', 'are'], a: 1,
    e: 'The past of are is were.', c: 'present-to-past', d: 1 },
  { q: 'Which past time expression is correct?',
    o: ['I was tired yesterday night.', 'I was tired last night.', 'I was tired the last night.'], a: 1,
    e: 'The book uses last night, last week, last month, last year and yesterday.', c: 'present-to-past', d: 3 },
];

export const gramPastBe: Question[] = makeQuestions(
  {
    topicId: 'beg-g-past-simple-be',
    categoryId: 'grammar',
    unit: 10,
    type: 'gap-fill',
    source: SRC,
    slug: 'pb',
  },
  drafts,
);
