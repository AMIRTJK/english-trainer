import type { Question } from '../../types';
import { GB, grammarTopic, type Draft } from './build';

/** Grammar Bank 10A — superlative adjectives (SB p.142). */
const superlatives: Draft[] = [
  { q: 'It’s ___ bridge in the world.', o: ['the oldest', 'the older', 'oldest'], a: 0, e: 'The + superlative: the oldest.', c: 'est', d: 1 },
  { q: 'She’s ___ student in the class.', o: ['the goodest', 'the best', 'the better'], a: 1, e: 'good → better → the best.', c: 'irregular', d: 3 },
  { q: 'Monday is ___ day of the week.', o: ['the baddest', 'the worse', 'the worst'], a: 2, e: 'bad → worse → the worst.', c: 'irregular', d: 3 },
  { q: 'It’s the longest road ___ the world.', o: ['in', 'at', 'on'], a: 0, e: 'After superlatives we use in (not of) + places.', c: 'in', d: 3 },
  { q: 'The tigers are ___ animals in the zoo.', o: ['the dangerousest', 'the most dangerous', 'the more dangerous'], a: 1,
    e: 'Two or more syllables: the most + adjective.', c: 'most' },
  { q: 'Our house is ___ house in the street.', o: ['the bigest', 'the most big', 'the biggest'], a: 2, e: 'Double the g: the biggest.', c: 'double' },
  { q: 'My bedroom is ___ room in our house.', o: ['the smallest', 'the most small', 'the smaller'], a: 0, e: 'small → the smallest.', c: 'est' },
  { q: 'Sit here — it’s ___ chair in the room.', o: ['the comfortablest', 'the most comfortable', 'most comfortable'], a: 1,
    e: 'Long adjective: the most comfortable.', c: 'most' },
  { q: 'My neighbours upstairs are ___ people in the world.', o: ['the noisyest', 'the most noisy', 'the noisiest'], a: 2,
    e: 'Consonant + y → -iest: the noisiest.', c: 'iest' },
  { q: 'My boss is ___ person I know.', o: ['the most stressed', 'the stressedest', 'the more stressed'], a: 0,
    e: 'One-syllable adjectives ending in -ed: the most stressed.', c: 'ed-most', d: 3 },
  { q: 'Sophie is ___ student in our English class.', o: ['the most young', 'the youngest', 'the younger'], a: 1, e: 'young → the youngest.', c: 'est' },
  { q: 'For me, Saturday is ___ day of the week.', o: ['the better', 'the most good', 'the best'], a: 2, e: 'The best.', c: 'irregular' },
  { q: 'What’s the ___ city in your country?', o: ['busiest', 'busyest', 'most busy'], a: 0, e: 'busy → the busiest.', c: 'iest' },
  { q: 'hot → ___', o: ['the hotest', 'the hottest', 'the most hot'], a: 1, e: 'Double the t: the hottest.', c: 'double' },
  { q: 'far → ___', o: ['the farest', 'the most far', 'the furthest'], a: 2, e: 'far → further → the furthest.', c: 'irregular' },
];

/** Grammar Bank 10B — be going to (plans), future time expressions (SB p.142). */
const goingToPlans: Draft[] = [
  { q: 'I’m going ___ a holiday next month.', o: ['to have', 'have', 'having'], a: 0, e: 'Be going to + infinitive.', c: 'form', d: 1 },
  { q: 'She doesn’t have a car. She ___ by train.', o: ['going to go', '’s going to go', 'goes to going'], a: 1,
    e: 'Be + going to + infinitive: She’s going to go.', c: 'form' },
  { q: '___ to fly to Paris?', o: ['Do you going', 'You are going', 'Are you going'], a: 2, e: 'Question: Are you going to…?', c: 'question', d: 3 },
  { q: 'My son ___ to university — he wants to get a job.', o: ['isn’t going to go', 'doesn’t going to go', 'not going to go'], a: 0,
    e: 'Negative: isn’t going to + infinitive.', c: 'negative' },
  { q: 'Tomorrow is Saturday. I’m going to stay in bed ___ 10.00!', o: ['at', 'until', 'on'], a: 1, e: 'Until = up to that time.', c: 'until' },
  { q: 'We need a holiday. ___ book a hotel near the beach.', o: ['We going to', 'We’re going', 'We’re going to'], a: 2, e: 'We’re going to + infinitive.', c: 'form' },
  { q: 'What ___ for dinner this evening?', o: ['are we going to have', 'we are going to have', 'do we going to have'], a: 0,
    e: 'What + are + we + going to + infinitive?', c: 'question' },
  { q: 'They love their old car. They ___ buy a new one.', o: ['don’t going to', 'aren’t going to', 'not going to'], a: 1, e: 'Aren’t going to.', c: 'negative' },
  { q: 'Which is a future time expression?', o: ['last week', 'yesterday', 'next week'], a: 2, e: 'Next week, tomorrow, next month = future.', c: 'time-expression' },
  { q: 'I need to talk to my mum. I’m going ___ her tonight.', o: ['to call', 'call', 'calling'], a: 0, e: 'Going to + infinitive.', c: 'form' },
  { q: 'A: Are you going to watch it? B: Yes, I ___.', o: ['do', 'am', 'going'], a: 1, e: 'Short answer: Yes, I am.', c: 'short-answer' },
  { q: 'How ___ to get to work? There’s a lot of snow!', o: ['you are going', 'do you going', 'are you going'], a: 2,
    e: 'How are you going to get to work?', c: 'question' },
  { q: 'Laura and David are going to get ___ soon.', o: ['married', 'marry', 'marrying'], a: 0, e: 'Get married.', c: 'form' },
];

/** Grammar Bank 10C — be going to (predictions) (SB p.142). */
const goingToPredictions: Draft[] = [
  { q: 'Look at the sky. I think it ___ rain.', o: ['’s going to', 'going to', 'is go to'], a: 0, e: 'Prediction: it’s going to rain.', c: 'form', d: 1 },
  { q: 'You’re driving very fast! We ___ have an accident!', o: ['go to', '’re going to', 'going'], a: 1, e: 'We’re going to have an accident.', c: 'form' },
  { q: 'She isn’t a very good student. She ___ pass the exam.', o: ['isn’t going', 'doesn’t going to', 'isn’t going to'], a: 2,
    e: 'Negative prediction: isn’t going to.', c: 'negative' },
  { q: 'It’s very cold. Do you think it’s going ___?', o: ['to snow', 'snow', 'snowing'], a: 0, e: 'Going to + infinitive.', c: 'form' },
  { q: 'They’re playing very well. I think they’re going ___ the match.', o: ['win', 'to win', 'winning'], a: 1, e: 'Going to win.', c: 'form' },
  { q: 'Look at the time. We ___ be late.', o: ['go to', 'are go to', '’re going to'], a: 2, e: 'We’re going to be late.', c: 'form' },
  { q: 'Oh no, it’s a horror film. I’m sure I’m not going ___ it.', o: ['to like', 'like', 'liking'], a: 0, e: 'Not going to like.', c: 'negative' },
  { q: 'He didn’t write down her address. He ___ forget it.', o: ['going to', '’s going to', 'is go'], a: 1, e: 'He’s going to forget it.', c: 'form' },
  { q: 'Venice is a wonderful city. You ___ have a great time there.', o: ['go to', 'going', '’re going to'], a: 2, e: 'You’re going to have a great time.', c: 'form' },
  { q: 'Which sentence is a prediction?', o: ['She’s going to be very lucky.', 'She’s going to go on holiday next week.', 'I’m going to book a hotel.'], a: 0,
    e: 'Plans are what we decide to do; a prediction is what we think will happen.', c: 'plan-prediction', d: 3 },
  { q: 'I have a lot of homework. I ___ finish it tonight.', o: ['’m not going to', 'not going to', 'don’t going to'], a: 0, e: 'I’m not going to.', c: 'negative' },
  { q: 'The baby’s very tired. She’s going to ___ well tonight.', o: ['sleeping', 'sleep', 'slept'], a: 1, e: 'Going to + infinitive.', c: 'form' },
];

export const gramFile10: Question[] = [
  ...grammarTopic('superlatives', 'su', 10, GB(142, '10A'), superlatives),
  ...grammarTopic('going-to-plans', 'gp', 10, GB(142, '10B'), goingToPlans),
  ...grammarTopic('going-to-predictions', 'gd', 10, GB(142, '10C'), goingToPredictions),
];
