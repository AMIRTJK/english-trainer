import type { Question } from '../../types';
import { makeQuestions, type Draft } from './build';

const VB = (page: number, ref: string) => ({ book: 'SB' as const, page, ref });

const classroomDrafts: Draft[] = [
  { q: 'You write on this with a pen.', o: ['a piece of paper', 'a chair', 'a coat'], a: 0,
    e: 'You write on paper.', c: 'objects', d: 1 },
  { q: 'You look at this in class and the teacher writes on it.', o: ['the door', 'the board', 'the window'], a: 1,
    e: 'The teacher writes on the board.', c: 'objects' },
  { q: 'You look for a word in this.', o: ['a dictionary', 'a notebook', 'a bag'], a: 0,
    e: 'A dictionary gives you words.', c: 'objects' },
  { q: 'You sit on this.', o: ['a table', 'a chair', 'a laptop'], a: 1,
    e: 'You sit on a chair.', c: 'objects', d: 1 },
  { q: 'The teacher says: "___ your books." (start reading)', o: ['Close', 'Open', 'Stand'], a: 1,
    e: 'Open your books means start using them.', c: 'language' },
  { q: 'You don’t know a word. You say: "___"', o: ['I don’t understand.', 'Sit down.', 'Go to page 10.'], a: 0,
    e: 'I don’t understand means the word is not clear to you.', c: 'language' },
  { q: 'You want the spelling. You say: "___"', o: ['How do you spell it?', 'How are you?', 'How old are you?'], a: 0,
    e: 'How do you spell it? asks for the letters.', c: 'language' },
  { q: 'You didn’t hear. You say: "Sorry? Can you ___ that, please?"', o: ['repeat', 'close', 'stand'], a: 0,
    e: 'Repeat means say it again.', c: 'language' },
];

const smallThingsDrafts: Draft[] = [
  { q: 'You put your money and cards in this.', o: ['a wallet', 'a camera', 'a key'], a: 0,
    e: 'Money and cards go in a wallet or a purse.', c: 'objects' },
  { q: 'You need this to open a door.', o: ['a pencil', 'a key', 'a watch'], a: 1,
    e: 'A key opens a door.', c: 'objects', d: 1 },
  { q: 'You need this to travel to another country.', o: ['a passport', 'a notebook', 'a charger'], a: 0,
    e: 'A passport is for travelling.', c: 'objects' },
  { q: 'You use this when it’s raining.', o: ['a camera', 'an umbrella', 'a tablet'], a: 1,
    e: 'An umbrella keeps you dry.', c: 'objects', d: 1 },
  { q: 'You take photos with this.', o: ['a camera', 'a wallet', 'a pencil'], a: 0,
    e: 'A camera takes photos.', c: 'objects', d: 1 },
  { q: 'You look at the time with this.', o: ['a watch', 'a key', 'a purse'], a: 0,
    e: 'A watch tells the time.', c: 'objects' },
  { q: 'You read the news in this.', o: ['a notebook', 'a newspaper', 'a dictionary'], a: 1,
    e: 'A newspaper has the news.', c: 'objects' },
  { q: 'You need this when your phone has no battery.', o: ['a charger', 'a passport', 'a wallet'], a: 0,
    e: 'A charger charges your phone.', c: 'objects' },
  { q: 'You wear these to see better.', o: ['glasses', 'shoes', 'socks'], a: 0,
    e: 'Glasses help you see.', c: 'objects' },
];

const familyDrafts: Draft[] = [
  { q: 'Your mother and father are your ___.', o: ['parents', 'children', 'friends'], a: 0,
    e: 'Mother plus father equals parents.', c: 'family', d: 1 },
  { q: 'Your father’s father is your ___.', o: ['brother', 'grandfather', 'son'], a: 1,
    e: 'Your father’s father is your grandfather.', c: 'family' },
  { q: 'Your parents’ daughter is your ___.', o: ['sister', 'mother', 'wife'], a: 0,
    e: 'Your parents’ daughter is your sister.', c: 'family' },
  { q: 'A woman’s husband is a ___.', o: ['woman', 'man', 'child'], a: 1,
    e: 'A husband is a man.', c: 'family', d: 1 },
  { q: 'Your brother’s son is your parents’ ___.', o: ['grandson', 'grandfather', 'grandmother'], a: 0,
    e: 'Their son’s son is their grandson.', c: 'family', d: 3 },
  { q: 'Which word is different? a boy', o: ['a girl', 'a man', 'a chair'], a: 2,
    e: 'A boy, a girl and a man are people. A chair is a thing.', c: 'family', d: 1 },
  { q: 'Which word is different? a mother', o: ['a sister', 'a daughter', 'a boyfriend'], a: 2,
    e: 'A mother, a sister and a daughter are family. A boyfriend is not family.', c: 'family', d: 3 },
  { q: 'Grandmother and grandfather are your ___.', o: ['parents', 'grandparents', 'children'], a: 1,
    e: 'Together they are your grandparents.', c: 'family' },
];

const foodDrafts: Draft[] = [
  { q: 'You have this meal in the morning.', o: ['lunch', 'dinner', 'breakfast'], a: 2,
    e: 'Breakfast is the morning meal.', c: 'meals', d: 1 },
  { q: 'You have this meal in the evening.', o: ['dinner', 'breakfast', 'lunch'], a: 0,
    e: 'Dinner is the evening meal.', c: 'meals', d: 1 },
  { q: 'Which word is different? coffee', o: ['tea', 'water', 'bread'], a: 2,
    e: 'Coffee, tea and water are drinks. Bread is food.', c: 'odd-one-out' },
  { q: 'Which word is different? fish', o: ['meat', 'wine', 'cheese'], a: 1,
    e: 'Fish, meat and cheese are food. Wine is a drink.', c: 'odd-one-out' },
  { q: 'Which word is different? an orange', o: ['fruit', 'a potato', 'chocolate'], a: 2,
    e: 'An orange, fruit and a potato grow. Chocolate does not.', c: 'odd-one-out', d: 3 },
  { q: 'You put this in coffee to make it sweet.', o: ['salt', 'sugar', 'butter'], a: 1,
    e: 'Sugar makes coffee sweet.', c: 'items' },
  { q: 'You put this on bread.', o: ['butter', 'rice', 'pasta'], a: 0,
    e: 'You put butter on bread.', c: 'items' },
  { q: 'Carrots and potatoes are ___.', o: ['fruit', 'vegetables', 'meat'], a: 1,
    e: 'They are vegetables.', c: 'items' },
  { q: 'I ___ tea with milk every morning.', o: ['eat', 'drink', 'have a'], a: 1,
    e: 'We drink tea and eat food.', c: 'verbs', d: 3 },
  { q: 'I ___ breakfast at eight o’clock.', o: ['have', 'do', 'make'], a: 0,
    e: 'The book uses have breakfast.', c: 'verbs', d: 3 },
  { q: 'I ___ a lot of fruit.', o: ['drink', 'eat', 'do'], a: 1,
    e: 'We eat fruit.', c: 'verbs' },
];

const colourDrafts: Draft[] = [
  { q: 'What colour is the sky on a beautiful day?', o: ['blue', 'brown', 'black'], a: 0,
    e: 'The sky is blue.', c: 'colours', d: 1 },
  { q: 'Milk is ___.', o: ['green', 'white', 'red'], a: 1,
    e: 'Milk is white.', c: 'colours', d: 1 },
  { q: 'Which word is different? red', o: ['green', 'yellow', 'big'], a: 2,
    e: 'Red, green and yellow are colours. Big is a size.', c: 'colours', d: 1 },
  { q: 'A Ferrari is usually ___.', o: ['red', 'grey', 'brown'], a: 0,
    e: 'A Ferrari is famously red.', c: 'colours' },
  { q: 'What colour do you get from black and white?', o: ['pink', 'grey', 'orange'], a: 1,
    e: 'Black plus white makes grey.', c: 'colours' },
];

const cfg = (topicId: string, unit: number, slug: string, page: number, ref: string) =>
  ({ topicId, categoryId: 'vocabulary' as const, unit, type: 'choose-word' as const, source: VB(page, ref), slug });

export const vocabClassroom: Question[] = makeQuestions(
  cfg('beg-v-classroom', 1, 'cl', 118, 'Vocabulary Bank — The classroom'), classroomDrafts);
export const vocabSmallThings: Question[] = makeQuestions(
  cfg('beg-v-small-things', 3, 'st', 119, 'Vocabulary Bank — Small things'), smallThingsDrafts);
export const vocabFamily: Question[] = makeQuestions(
  cfg('beg-v-people-family', 4, 'fa', 120, 'Vocabulary Bank — People and family'), familyDrafts);
export const vocabFood: Question[] = makeQuestions(
  cfg('beg-v-food-drink', 5, 'fo', 122, 'Vocabulary Bank — Food and drink'), foodDrafts);
export const vocabColours: Question[] = makeQuestions(
  cfg('beg-v-colours-adjectives', 4, 'co', 121, 'Vocabulary Bank — Adjectives'), colourDrafts);
