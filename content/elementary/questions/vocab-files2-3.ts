import type { Question } from '../../types';
import { VB, vocabTopic, type Draft } from './build';

/** Adjectives, SB p.152, and colours, lesson 2B. */
const adjectives: Draft[] = [
  { q: 'The opposite of cheap is ___.', o: ['expensive', 'rich', 'empty'], a: 0, e: 'cheap ↔ expensive.', c: 'opposites', d: 1 },
  { q: 'The opposite of dirty is ___.', o: ['ugly', 'clean', 'safe'], a: 1, e: 'dirty ↔ clean.', c: 'opposites', d: 1 },
  { q: 'The opposite of full is ___.', o: ['short', 'weak', 'empty'], a: 2, e: 'full ↔ empty.', c: 'opposites' },
  { q: 'The opposite of strong is ___.', o: ['weak', 'slow', 'poor'], a: 0, e: 'strong ↔ weak.', c: 'opposites' },
  { q: 'The opposite of safe is ___.', o: ['wrong', 'dangerous', 'difficult'], a: 1, e: 'safe ↔ dangerous.', c: 'opposites' },
  { q: 'The opposite of high is ___.', o: ['short', 'small', 'low'], a: 2, e: 'high ↔ low.', c: 'opposites' },
  { q: 'Old can be the opposite of new and of ___.', o: ['young', 'rich', 'tall'], a: 0, e: 'old ↔ new (things), old ↔ young (people).', c: 'two-opposites', d: 3 },
  { q: 'Short can be the opposite of long and of ___.', o: ['big', 'tall', 'high'], a: 1, e: 'short ↔ long, short ↔ tall (people).', c: 'two-opposites', d: 3 },
  { q: 'Right can be the opposite of left and of ___.', o: ['bad', 'dark', 'wrong'], a: 2, e: 'right ↔ left, right ↔ wrong.', c: 'two-opposites', d: 3 },
  { q: 'A Ferrari is very ___.', o: ['fast', 'slow', 'cheap'], a: 0, e: 'A Ferrari is very fast and very expensive.', c: 'sentence' },
  { q: 'Bill Gates is very ___.', o: ['poor', 'rich', 'empty'], a: 1, e: 'Bill Gates is very rich.', c: 'sentence' },
  { q: 'Which adjective means “very good”?', o: ['awful', 'terrible', 'fantastic'], a: 2, e: 'Good: nice, great, fantastic. Bad: awful, terrible.', c: 'opinion' },
  { q: 'Which adjective means “very bad”?', o: ['awful', 'great', 'nice'], a: 0, e: 'Awful = very bad.', c: 'opinion' },
  { q: 'Which word is different?', o: ['purple', 'easy', 'grey'], a: 1, e: 'Purple and grey are colours. Easy is not.', c: 'colours' },
  { q: 'In New York the taxis are ___.', o: ['red', 'black', 'yellow'], a: 2, e: 'New York taxis are yellow.', c: 'colours' },
  { q: 'It’s cold today, but not very cold. It’s ___ cold.', o: ['quite', 'really', 'very'], a: 0, e: 'Quite cold = cold, but not very cold.', c: 'modifiers' },
];

/** Feelings, lesson 2C. */
const feelings: Draft[] = [
  { q: 'I want a sandwich. I’m ___.', o: ['thirsty', 'hungry', 'tired'], a: 1, e: 'Hungry = you want to eat.', c: 'meaning', d: 1 },
  { q: 'I want some water. I’m ___.', o: ['thirsty', 'hungry', 'bored'], a: 0, e: 'Thirsty = you want to drink.', c: 'meaning', d: 1 },
  { q: 'I want to go to bed. I’m ___.', o: ['angry', 'worried', 'tired'], a: 2, e: 'Tired.', c: 'meaning' },
  { q: 'This film is boring. I’m ___.', o: ['bored', 'frightened', 'hot'], a: 0, e: 'Bored = not interested.', c: 'meaning' },
  { q: 'It’s dark and there’s a strange noise. I’m ___.', o: ['happy', 'frightened', 'hungry'], a: 1, e: 'Frightened.', c: 'meaning' },
  { q: 'My exam is tomorrow and I can’t sleep. I’m ___.', o: ['bored', 'cold', 'worried'], a: 2, e: 'Worried.', c: 'meaning' },
  { q: 'Which is correct?', o: ['I’m hungry.', 'I have hungry.', 'I’m hungry have.'], a: 0, e: 'Be + hungry, thirsty, hot: I’m hungry NOT I have hungry.', c: 'be', d: 3 },
  { q: 'I have a lot of work and no time. I’m ___.', o: ['stressed', 'sad', 'thirsty'], a: 0, e: 'Stressed.', c: 'meaning' },
  { q: 'My friend didn’t come to my party. I’m ___.', o: ['hot', 'sad', 'hungry'], a: 1, e: 'Sad.', c: 'meaning' },
  { q: 'Which word is different?', o: ['angry', 'sad', 'happy'], a: 2, e: 'Happy is a good feeling. Angry and sad are not.', c: 'odd-one-out' },
];

/** Verb phrases, SB p.153. */
const verbPhrases: Draft[] = [
  { q: '___ the guitar', o: ['play', 'do', 'make'], a: 0, e: 'Play the guitar, play tennis.', c: 'collocation', d: 1 },
  { q: '___ housework', o: ['make', 'do', 'play'], a: 1, e: 'Do housework, do homework, do exercise.', c: 'collocation' },
  { q: '___ glasses', o: ['take', 'drink', 'wear'], a: 2, e: 'Wear glasses.', c: 'collocation' },
  { q: '___ an umbrella', o: ['take', 'wear', 'say'], a: 0, e: 'Take an umbrella.', c: 'collocation' },
  { q: '___ sorry', o: ['speak', 'say', 'tell'], a: 1, e: 'Say sorry.', c: 'collocation' },
  { q: '___ to music', o: ['hear', 'watch', 'listen'], a: 2, e: 'Listen to music.', c: 'collocation' },
  { q: '___ TV', o: ['watch', 'look', 'see at'], a: 0, e: 'Watch TV.', c: 'collocation' },
  { q: '___ German', o: ['talk', 'speak', 'say'], a: 1, e: 'Speak a language: speak German.', c: 'collocation' },
  { q: '___ in a flat', o: ['stay', 'work', 'live'], a: 2, e: 'Live in a flat.', c: 'collocation' },
  { q: '___ mineral water', o: ['drink', 'eat', 'cook'], a: 0, e: 'Drink mineral water.', c: 'collocation' },
  { q: '___ a car', o: ['ride', 'drive', 'play'], a: 1, e: 'Drive a car.', c: 'collocation' },
  { q: 'I ___ a new phone. My phone is very old.', o: ['have', 'like', 'need'], a: 2, e: 'Need a new phone.', c: 'sentence' },
  { q: 'I ___ dinner for my family every evening.', o: ['cook', 'do', 'play'], a: 0, e: 'Cook dinner.', c: 'sentence' },
  { q: '___ exercise', o: ['play', 'do', 'make'], a: 1, e: 'Do exercise.', c: 'collocation' },
];

/** Jobs, SB p.154. */
const jobs: Draft[] = [
  { q: 'This person flies planes.', o: ['a pilot', 'a builder', 'a guide'], a: 0, e: 'A pilot.', c: 'definition', d: 1 },
  { q: 'This person works in a factory.', o: ['an actor', 'a factory worker', 'a model'], a: 1, e: 'A factory worker.', c: 'definition' },
  { q: 'This person looks after animals.', o: ['a nurse', 'a chef', 'a vet'], a: 2, e: 'A vet.', c: 'definition' },
  { q: 'This person cuts your hair.', o: ['a hairdresser', 'a cleaner', 'a lawyer'], a: 0, e: 'A hairdresser.', c: 'definition' },
  { q: 'This person writes for a newspaper.', o: ['an accountant', 'a journalist', 'an engineer'], a: 1, e: 'A journalist.', c: 'definition' },
  { q: 'This person works in a hotel and helps guests when they arrive.', o: ['a soldier', 'a model', 'a receptionist'], a: 2, e: 'A receptionist.', c: 'definition' },
  { q: 'This person designs buildings.', o: ['an architect', 'a builder', 'a musician'], a: 0, e: 'An architect designs; a builder builds.', c: 'definition', d: 3 },
  { q: 'This person brings your food in a restaurant.', o: ['a chef', 'a waiter', 'a cleaner'], a: 1, e: 'A waiter (man) or a waitress (woman).', c: 'definition' },
  { q: 'Which is correct?', o: ['She’s model.', 'She model.', 'She’s a model.'], a: 2, e: 'We use a / an with jobs: She’s a model.', c: 'a-an', d: 3 },
  { q: 'He’s ___ engineer.', o: ['an', 'a', '—'], a: 0, e: 'Engineer begins with a vowel: an engineer.', c: 'a-an' },
  { q: 'I want a job, but I can’t find one. I’m ___.', o: ['retired', 'unemployed', 'a student'], a: 1, e: 'Unemployed = without a job.', c: 'status', d: 3 },
  { q: 'My grandfather is 75. He doesn’t work now. He’s ___.', o: ['unemployed', 'at school', 'retired'], a: 2, e: 'Retired.', c: 'status' },
  { q: 'What do you do? — I’m a musician. I work ___ an IT company.', o: ['for', 'at', 'to'], a: 0, e: 'Work for a company.', c: 'phrases' },
  { q: 'A shop assistant works in ___.', o: ['a school', 'a shop', 'a factory'], a: 1, e: 'In a shop.', c: 'place' },
  { q: 'Which word is different?', o: ['chef', 'pilot', 'factory'], a: 2, e: 'Chef and pilot are jobs. A factory is a place.', c: 'odd-one-out' },
];

export const vocabFiles2to3: Question[] = [
  ...vocabTopic('adjectives-colours', 'aj', 2, VB(152, 'Adjectives'), adjectives),
  ...vocabTopic('feelings', 'fe', 2, { book: 'SB', page: 18, ref: 'Lesson 2C — feelings' }, feelings),
  ...vocabTopic('verb-phrases', 'vp', 3, VB(153, 'Verb phrases'), verbPhrases),
  ...vocabTopic('jobs', 'jb', 3, VB(154, 'Jobs'), jobs),
];
