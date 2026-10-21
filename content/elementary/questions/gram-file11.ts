import type { Question } from '../../types';
import { GB, grammarTopic, type Draft } from './build';

/** Grammar Bank 11A — adverbs of manner and modifiers (SB p.144). */
const adverbs: Draft[] = [
  { q: 'She eats very ___.', o: ['quickly', 'quick', 'quickily'], a: 0, e: 'Adverb of manner: adjective + -ly: quickly.', c: 'ly', d: 1 },
  { q: 'We speak English ___.', o: ['good', 'well', 'goodly'], a: 1, e: 'good → well (irregular adverb).', c: 'irregular', d: 3 },
  { q: 'I work ___.', o: ['hardly', 'hardily', 'hard'], a: 2, e: 'hard → hard (the same as the adjective).', c: 'irregular', d: 3 },
  { q: 'Which sentence is correct?', o: ['I speak English well.', 'I speak well English.', 'I well speak English.'], a: 0,
    e: 'Adverbs of manner go after the verb or verb phrase: I speak English well.', c: 'position', d: 3 },
  { q: 'Her children always speak ___.', o: ['polite', 'politely', 'politly'], a: 1, e: 'polite → politely.', c: 'ly' },
  { q: 'Professional sports people usually eat very ___.', o: ['healthy', 'healthyly', 'healthily'], a: 2,
    e: 'Consonant + y → -ily: healthily.', c: 'ily' },
  { q: 'She passed the exam ___.', o: ['easily', 'easy', 'easyly'], a: 0, e: 'easy → easily.', c: 'ily' },
  { q: 'Don’t drive ___ when it’s raining.', o: ['fastly', 'fast', 'quick'], a: 1, e: 'fast → fast (same form).', c: 'irregular' },
  { q: 'I’m a careful driver. I drive ___.', o: ['careful', 'carefuly', 'carefully'], a: 2,
    e: 'Careful is an adjective (describes driver); carefully is an adverb (describes drive).', c: 'adj-adverb', d: 3 },
  { q: 'We played ___ in the semi-final and we lost 5–1.', o: ['badly', 'bad', 'worse'], a: 0, e: 'bad → badly.', c: 'ly' },
  { q: 'Can you talk ___, please? I’m trying to sleep.', o: ['quiet', 'quietly', 'quietely'], a: 1, e: 'quiet → quietly.', c: 'ly' },
  { q: 'She drives ___ fast.', o: ['incredible', 'incredibly very', 'incredibly'], a: 2, e: 'Modifiers go before the adverb: incredibly fast.', c: 'modifier' },
  { q: 'It isn’t ___ expensive.', o: ['very', 'much', 'a lot'], a: 0, e: 'Very before an adjective.', c: 'modifier', d: 1 },
  { q: 'He’s a ___ person.', o: ['friendlily', 'friendly', 'friend'], a: 1, e: 'Friendly ends in -ly but it is an adjective.', c: 'friendly', d: 3 },
  { q: 'My sister speaks Spanish ___.', o: ['perfect', 'perfectly', 'perfecter'], a: 1, e: 'perfect → perfectly.', c: 'ly' },
];

/** Grammar Bank 11B — verb + to + infinitive (SB p.144). */
const toInfinitive: Draft[] = [
  { q: 'I want ___ for six months.', o: ['to travel', 'travel', 'travelling'], a: 0, e: 'Want + to + infinitive.', c: 'form', d: 1 },
  { q: 'She decided ___ to Australia.', o: ['go', 'to go', 'going'], a: 1, e: 'Decide + to + infinitive.', c: 'form' },
  { q: 'You need ___ every day.', o: ['practise', 'practising', 'to practise'], a: 2, e: 'Need + to + infinitive.', c: 'form' },
  { q: 'When did you learn ___ the guitar?', o: ['to play', 'play', 'playing'], a: 0, e: 'Learn + to + infinitive.', c: 'form' },
  { q: '___ like to go to Africa?', o: ['Do you', 'Would you', 'Are you'], a: 1, e: 'Would you like to…? = Do you want to…?', c: 'would-like' },
  { q: 'I ___ to be famous. I’m happy as I am.', o: ['don’t would like', 'wouldn’t to like', 'wouldn’t like'], a: 2, e: 'Negative: wouldn’t like to.', c: 'would-like' },
  { q: 'I’d like to dance. = I ___ to dance.', o: ['want', 'enjoy', 'like'], a: 0, e: 'I’d like to = I want to (now). I like dancing = I enjoy it.', c: 'like-vs-would', d: 3 },
  { q: 'I hate ___ so I usually travel by train.', o: ['to flying', 'flying', 'fly'], a: 1, e: 'Hate + -ing.', c: 'ing-vs-to', d: 3 },
  { q: 'My grandmother learned ___ Spanish when she was 60!', o: ['speaking', 'speak', 'to speak'], a: 2, e: 'Learn + to + infinitive.', c: 'form' },
  { q: 'I like ___ at the weekend.', o: ['relaxing', 'to relax to', 'relax'], a: 0, e: 'Like + -ing (in general).', c: 'ing-vs-to' },
  { q: 'He promised ___ his girlfriend when he got home.', o: ['call', 'to call', 'calling'], a: 1, e: 'Promise + to + infinitive.', c: 'form' },
  { q: 'The weather was terrible. We decided ___ at home.', o: ['staying', 'stay', 'to stay'], a: 2, e: 'Decide + to.', c: 'form' },
  { q: 'Most people hate ___ to the dentist.', o: ['going', 'to going', 'go'], a: 0, e: 'Hate + -ing.', c: 'ing-vs-to' },
  { q: 'It’s cold. You need ___ a coat.', o: ['wear', 'to wear', 'wearing'], a: 1, e: 'Need + to + infinitive.', c: 'form' },
  { q: 'My mum doesn’t mind ___.', o: ['to cook', 'cook', 'cooking'], a: 2, e: 'Don’t mind + -ing.', c: 'ing-vs-to' },
];

/** Grammar Bank 11C — definite article: the or no the (SB p.144). */
const article: Draft[] = [
  { q: 'Can you close ___ window, please?', o: ['the', 'an', '–'], a: 0, e: 'The: it is clear which window.', c: 'clear', d: 1 },
  { q: '___ are usually more interested in sport than women.', o: ['The man', 'Men', 'A men'], a: 1, e: 'No the for people in general.', c: 'general', d: 3 },
  { q: 'What time did you have ___?', o: ['the breakfast', 'a breakfast', 'breakfast'], a: 2, e: 'No the with meals: have breakfast.', c: 'meals' },
  { q: 'Jim goes to school ___.', o: ['by bus', 'by the bus', 'by a bus'], a: 0, e: 'No the: by + transport.', c: 'transport' },
  { q: 'She’s ___ cousin.', o: ['the my mother’s', 'my mother’s', 'the mother’s my'], a: 1, e: 'No the before possessive ’s.', c: 'possessive' },
  { q: 'How much time do you spend on ___ internet?', o: ['–', 'a', 'the'], a: 2, e: 'The when there is only one: the internet.', c: 'only-one' },
  { q: 'Let’s stay at ___ tonight.', o: ['home', 'the home', 'a home'], a: 0, e: 'No the with home, work, school, bed.', c: 'places' },
  { q: 'Yolanda is ___ best student in our class.', o: ['a', 'the', '–'], a: 1, e: 'The before superlatives.', c: 'superlative' },
  { q: 'I love clear nights when you can see ___ moon.', o: ['a', '–', 'the'], a: 2, e: 'Only one: the moon.', c: 'only-one' },
  { q: 'Let’s have a pizza. ___ pizzas are very good here.', o: ['The', 'A', 'An'], a: 0, e: 'A the first time, the next time.', c: 'second-mention', d: 3 },
  { q: 'My brother is at ___ studying maths.', o: ['the university', 'university', 'an university'], a: 1, e: 'At university (general place).', c: 'places' },
  { q: 'Lorena doesn’t like ___.', o: ['dog', 'a dogs', 'dogs'], a: 2, e: 'Things in general: no the.', c: 'general' },
  { q: 'It’s ___ longest river in the world.', o: ['the', 'a', '–'], a: 0, e: 'The + superlative.', c: 'superlative' },
  { q: 'Last year we went on holiday ___.', o: ['by the car', 'by car', 'by a car'], a: 1, e: 'By car.', c: 'transport' },
  { q: 'Can you pass ___ salt, please?', o: ['a', '–', 'the'], a: 2, e: 'The salt on our table.', c: 'clear' },
];

export const gramFile11: Question[] = [
  ...grammarTopic('adverbs-manner', 'am', 11, GB(144, '11A'), adverbs),
  ...grammarTopic('verb-to-infinitive', 'ti', 11, GB(144, '11B'), toInfinitive),
  ...grammarTopic('definite-article', 'da', 11, GB(144, '11C'), article),
];
