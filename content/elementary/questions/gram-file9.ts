import type { Question } from '../../types';
import { GB, grammarTopic, type Draft } from './build';

/** Grammar Bank 9A — countable / uncountable nouns, a / an, some / any (SB p.140). */
const countable: Draft[] = [
  { q: 'We need ___ apple.', o: ['an', 'a', 'some'], a: 0, e: 'Singular countable + vowel sound: an apple.', c: 'a-an', d: 1 },
  { q: 'We need ___ butter.', o: ['a', 'some', 'an'], a: 1, e: 'Uncountable in a positive sentence: some butter.', c: 'some', d: 1 },
  { q: 'We don’t need ___ rice.', o: ['a', 'some', 'any'], a: 2, e: 'Uncountable in a negative: any rice.', c: 'any' },
  { q: 'Do we need ___ oranges?', o: ['any', 'a', 'an'], a: 0, e: 'Plural in a question: any oranges.', c: 'any' },
  { q: 'Which is correct?', o: ['two rices', 'some rice', 'a rice'], a: 1, e: 'Rice is uncountable: some rice NOT two rices.', c: 'uncountable', d: 3 },
  { q: 'We don’t need ___ tomato.', o: ['any', 'some', 'a'], a: 2, e: 'Singular countable: a tomato.', c: 'a-an' },
  { q: 'Can I have ___ sugar, please?', o: ['some', 'any', 'a'], a: 0, e: 'We use some in questions to ask for things.', c: 'some-offer', d: 3 },
  { q: 'Would you like ___ coffee?', o: ['any', 'some', 'a'], a: 1, e: 'We use some to offer things: Would you like some coffee?', c: 'some-offer', d: 3 },
  { q: 'Oh no! There isn’t ___ cheese!', o: ['some', 'a', 'any'], a: 2, e: 'Negative + uncountable: any cheese.', c: 'any' },
  { q: 'I bought ___ steak yesterday.', o: ['some', 'any', 'a'], a: 0, e: 'Positive + uncountable: some steak.', c: 'some' },
  { q: 'There’s ___ apple and some bananas, too.', o: ['a', 'an', 'any'], a: 1, e: 'An apple.', c: 'a-an' },
  { q: 'Are there ___ potatoes? — Yes, there are.', o: ['some', 'a', 'any'], a: 2, e: 'Plural question: any.', c: 'any' },
  { q: 'Let’s make ___ pizza.', o: ['a', 'some', 'any'], a: 0, e: 'One pizza: a pizza.', c: 'a-an' },
  { q: 'Which word is uncountable?', o: ['egg', 'milk', 'carrot'], a: 1, e: 'Milk is uncountable: some milk. Eggs and carrots can be counted.', c: 'uncountable' },
];

/** Grammar Bank 9B — quantifiers (SB p.140). */
const quantifiers: Draft[] = [
  { q: 'How ___ sugar do you eat?', o: ['much', 'many', 'lot'], a: 0, e: 'How much + uncountable.', c: 'how-much', d: 1 },
  { q: 'How ___ sweets do you eat?', o: ['much', 'many', 'a lot'], a: 1, e: 'How many + plural countable.', c: 'how-much', d: 1 },
  { q: 'How ___ coffee does he drink?', o: ['many', 'lot', 'much'], a: 2, e: 'Coffee is uncountable: How much?', c: 'how-much' },
  { q: 'How ___ bottles of water did you buy?', o: ['many', 'much', 'lot of'], a: 0, e: 'Bottles is plural: How many?', c: 'how-much' },
  { q: 'I don’t put ___ salt on my food.', o: ['many', 'much', 'a few'], a: 1, e: 'Negative + uncountable: not much.', c: 'not-much' },
  { q: 'We eat ___ fish. We love it!', o: ['many', 'much', 'a lot of'], a: 2, e: 'Positive sentences usually use a lot of.', c: 'a-lot' },
  { q: 'Donna didn’t eat ___ chips.', o: ['many', 'much', 'a little'], a: 0, e: 'Negative + plural: not many.', c: 'not-much' },
  { q: 'I have a cup of tea and ___ cereal for breakfast.', o: ['a few', 'a little', 'many'], a: 1, e: 'Small quantity + uncountable: a little.', c: 'little-few' },
  { q: 'I eat ___ sweets. (= a small number)', o: ['a little', 'much', 'a few'], a: 2, e: 'Small quantity + plural: a few.', c: 'little-few' },
  { q: 'A: How many vegetables do you eat? B: ___. I don’t like them.', o: ['None', 'Any', 'No'], a: 0, e: 'Zero in a short answer: None.', c: 'none' },
  { q: 'A: Do you eat much meat? B: No, I don’t eat ___ meat. I’m a vegetarian.', o: ['some', 'any', 'none'], a: 1, e: 'Zero: not … any.', c: 'none' },
  { q: 'He eats ___ cheese. (= a lot of)', o: ['lots of', 'lot', 'many'], a: 0, e: 'A lot of = lots of.', c: 'a-lot' },
  { q: 'A: How much chocolate do you eat? B: ___.', o: ['A few', 'Many', 'A little'], a: 2, e: 'Chocolate is uncountable: a little.', c: 'little-few' },
  { q: 'We don’t eat ___ sweets.', o: ['a lot of', 'much', 'a little'], a: 0, e: 'In negatives we can also use a lot of.', c: 'a-lot' },
];

/** Grammar Bank 9C — comparative adjectives (SB p.140). */
const comparatives: Draft[] = [
  { q: 'A whale is ___ than a lion.', o: ['louder', 'more loud', 'loudest'], a: 0, e: 'One syllable + -er: louder.', c: 'er', d: 1 },
  { q: 'Canada is ___ than the USA.', o: ['biger', 'bigger', 'more big'], a: 1, e: 'One vowel + one consonant: double + -er: bigger.', c: 'double' },
  { q: 'K2 is ___ to climb than Mount Everest.', o: ['difficulter', 'difficultest', 'more difficult'], a: 2,
    e: 'Two or more syllables: more + adjective.', c: 'more' },
  { q: 'My new job is ___ than my old one.', o: ['better', 'gooder', 'more good'], a: 0, e: 'good → better (irregular).', c: 'irregular', d: 3 },
  { q: 'The traffic is always ___ in the evening.', o: ['badder', 'worse', 'more bad'], a: 1, e: 'bad → worse (irregular).', c: 'irregular', d: 3 },
  { q: 'Milan is ___ from the sea than Rome.', o: ['farer', 'more far', 'further'], a: 2, e: 'far → further.', c: 'irregular' },
  { q: 'Italian is ___ for Spanish people than it is for English people.', o: ['easier', 'easyer', 'more easy'], a: 0,
    e: 'Consonant + y → -ier: easier.', c: 'ier' },
  { q: 'I always feel ___ in the afternoon than in the morning.', o: ['tireder', 'more tired', 'tiredder'], a: 1,
    e: 'One-syllable adjectives ending in -ed use more: more tired.', c: 'ed-more', d: 3 },
  { q: 'I find science ___ than history.', o: ['interestinger', 'more interesting than', 'more interesting'], a: 2,
    e: 'Long adjective: more interesting (than is already in the sentence).', c: 'more' },
  { q: 'The market is ___ the supermarket for vegetables.', o: ['cheaper than', 'cheaper that', 'more cheap than'], a: 0,
    e: 'Comparative + than: cheaper than.', c: 'than', d: 3 },
  { q: 'My sister is ___ than me.', o: ['more young', 'younger', 'youngest'], a: 1, e: 'young → younger.', c: 'er' },
  { q: 'Come in the summer. The weather is ___ than in the spring.', o: ['more good', 'gooder', 'better'], a: 2, e: 'good → better.', c: 'irregular' },
  { q: 'hot → ___', o: ['hotter', 'hoter', 'more hot'], a: 0, e: 'Double the t: hotter.', c: 'double' },
  { q: 'happy → ___', o: ['happyer', 'happier', 'more happy'], a: 1, e: 'Consonant + y → -ier: happier.', c: 'ier' },
  { q: 'famous → ___', o: ['famouser', 'famoser', 'more famous'], a: 2, e: 'Two syllables: more famous.', c: 'more' },
];

export const gramFile9: Question[] = [
  ...grammarTopic('countable-uncountable', 'cu', 9, GB(140, '9A'), countable),
  ...grammarTopic('quantifiers', 'qu', 9, GB(140, '9B'), quantifiers),
  ...grammarTopic('comparatives', 'co', 9, GB(140, '9C'), comparatives),
];
