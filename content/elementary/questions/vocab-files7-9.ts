import type { Question } from '../../types';
import { VB, vocabTopic, type Draft } from './build';

/** Word formation, lesson 7A (SB p.55). */
const wordFormation: Draft[] = [
  { q: 'write → ___', o: ['writer', 'writist', 'writian'], a: 0, e: 'Verb + -er: writer.', c: 'er-or', d: 1 },
  { q: 'act → ___', o: ['acter', 'actor', 'actist'], a: 1, e: 'Verb + -or: actor.', c: 'er-or' },
  { q: 'paint → ___', o: ['paintor', 'paintist', 'painter'], a: 2, e: 'Verb + -er: painter.', c: 'er-or' },
  { q: 'art → ___', o: ['artist', 'arter', 'artian'], a: 0, e: 'Noun + -ist: artist.', c: 'ist-ian' },
  { q: 'science → ___', o: ['sciencer', 'scientist', 'sciencian'], a: 1, e: 'Science → scientist.', c: 'ist-ian', d: 3 },
  { q: 'music → ___', o: ['musicer', 'musicist', 'musician'], a: 2, e: 'Noun + -ian: musician.', c: 'ist-ian' },
  { q: 'politics → ___', o: ['politician', 'politicist', 'politicer'], a: 0, e: 'Politics → politician.', c: 'ist-ian', d: 3 },
  { q: 'invent → ___', o: ['inventist', 'inventor', 'inventian'], a: 1, e: 'Verb + -or: inventor.', c: 'er-or' },
  { q: 'novel → ___', o: ['noveler', 'novelor', 'novelist'], a: 2, e: 'Noun + -ist: novelist.', c: 'ist-ian' },
  { q: 'dance → ___', o: ['dancer', 'dancist', 'dancor'], a: 0, e: 'Dance → dancer.', c: 'er-or' },
  { q: 'direct → ___', o: ['directer', 'director', 'directist'], a: 1, e: 'Direct → director.', c: 'er-or' },
  { q: 'Who was Charles Darwin? — He was a British ___.', o: ['singer', 'painter', 'scientist'], a: 2, e: 'Darwin was a scientist.', c: 'sentence' },
];

/** Past time expressions, lesson 7B (SB p.57). */
const pastTime: Draft[] = [
  { q: 'I saw her five minutes ___.', o: ['ago', 'last', 'before'], a: 0, e: 'Five minutes ago.', c: 'ago', d: 1 },
  { q: 'We went to Italy ___ summer.', o: ['the last', 'last', 'ago'], a: 1, e: 'Last summer NOT the last summer.', c: 'last', d: 3 },
  { q: 'I called her ___ morning.', o: ['last', 'ago', 'yesterday'], a: 2, e: 'Yesterday morning (but last night).', c: 'yesterday', d: 3 },
  { q: 'I went to the gym ___ night.', o: ['last', 'yesterday', 'ago'], a: 0, e: 'Last night.', c: 'last' },
  { q: 'The day before yesterday was two days ___.', o: ['last', 'ago', 'before ago'], a: 1, e: 'Two days ago.', c: 'ago' },
  { q: 'Which time is the nearest to now?', o: ['last month', 'a year ago', 'five minutes ago'], a: 2, e: 'Five minutes ago is the most recent.', c: 'order', d: 3 },
  { q: 'We met ___ 2017.', o: ['in', 'on', 'at'], a: 0, e: 'In + year.', c: 'in-year' },
  { q: 'Which is correct?', o: ['the last week', 'last week', 'last week ago'], a: 1, e: 'Last week.', c: 'last' },
];

/** go, have, get, SB p.160. */
const goHaveGet: Draft[] = [
  { q: '___ out on Friday night', o: ['go', 'have', 'get'], a: 0, e: 'Go out.', c: 'go', d: 1 },
  { q: '___ a good time', o: ['go', 'have', 'get'], a: 1, e: 'Have a good time.', c: 'have', d: 1 },
  { q: '___ dressed', o: ['go', 'have', 'get'], a: 2, e: 'Get dressed.', c: 'get' },
  { q: '___ shopping', o: ['go', 'have', 'get'], a: 0, e: 'Go shopping.', c: 'go' },
  { q: '___ long hair', o: ['go', 'have', 'get'], a: 1, e: 'Have long hair.', c: 'have' },
  { q: '___ an email (= receive)', o: ['go', 'have', 'get'], a: 2, e: 'Get an email = receive it.', c: 'get' },
  { q: '___ on holiday', o: ['go', 'have', 'get'], a: 0, e: 'Go on holiday.', c: 'go' },
  { q: '___ a taxi (= take)', o: ['go', 'have', 'get'], a: 2, e: 'Get a taxi = take a taxi.', c: 'get' },
  { q: '___ a drink', o: ['go', 'have', 'get'], a: 1, e: 'Have a drink.', c: 'have' },
  { q: '___ to the airport (= arrive)', o: ['have', 'get', 'go by'], a: 1, e: 'Get to = arrive.', c: 'get', d: 3 },
  { q: '___ back to work', o: ['go', 'have', 'get up'], a: 0, e: 'Go back to work.', c: 'go' },
  { q: '___ a newspaper (= buy)', o: ['go', 'have', 'get'], a: 2, e: 'Get a newspaper = buy it.', c: 'get' },
  { q: 'We usually go to school ___ car.', o: ['by', 'in', 'on the'], a: 0, e: 'Go by bus, by car, by plane.', c: 'go' },
];

/** The house, SB p.161. */
const house: Draft[] = [
  { q: 'You cook in this room.', o: ['the kitchen', 'the hall', 'the study'], a: 0, e: 'The kitchen.', c: 'rooms', d: 1 },
  { q: 'You sleep in this room.', o: ['the dining room', 'the bedroom', 'the garage'], a: 1, e: 'The bedroom.', c: 'rooms', d: 1 },
  { q: 'You leave your car here.', o: ['the balcony', 'the hall', 'the garage'], a: 2, e: 'The garage.', c: 'rooms' },
  { q: 'You keep food cold in it.', o: ['a fridge', 'a cooker', 'a wardrobe'], a: 0, e: 'A fridge.', c: 'things' },
  { q: 'You put your clothes in it.', o: ['a dishwasher', 'a wardrobe', 'a fridge'], a: 1, e: 'A wardrobe.', c: 'things' },
  { q: 'It washes cups and glasses.', o: ['a washing machine', 'a microwave', 'a dishwasher'], a: 2, e: 'A dishwasher washes plates; a washing machine washes clothes.', c: 'things', d: 3 },
  { q: 'You look at yourself in it.', o: ['a mirror', 'a carpet', 'a shelf'], a: 0, e: 'A mirror.', c: 'things' },
  { q: 'You walk up and down them to go upstairs.', o: ['walls', 'stairs', 'shelves'], a: 1, e: 'Stairs.', c: 'parts' },
  { q: 'It is above you in a room.', o: ['the floor', 'the wall', 'the ceiling'], a: 2, e: 'The ceiling.', c: 'parts' },
  { q: 'A system that makes a house warm = central ___.', o: ['heating', 'conditioning', 'cooker'], a: 0, e: 'Central heating.', c: 'systems', d: 3 },
  { q: 'one shelf, two ___', o: ['shelfs', 'shelves', 'shelvs'], a: 1, e: 'Shelf → shelves.', c: 'plural', d: 3 },
  { q: 'Which word is different?', o: ['sofa', 'armchair', 'balcony'], a: 2, e: 'A sofa and an armchair are furniture. A balcony is part of the house.', c: 'odd-one-out', d: 3 },
  { q: 'Which word is different?', o: ['hall', 'fridge', 'cooker'], a: 0, e: 'A hall is a room. A fridge and a cooker are things in the kitchen.', c: 'odd-one-out', d: 3 },
];

/** Prepositions of place and movement, SB p.162. */
const prepositions: Draft[] = [
  { q: 'The ghost is ___ the bed. (below it)', o: ['under', 'over', 'on'], a: 0, e: 'Under the bed.', c: 'place', d: 1 },
  { q: 'The ghost is ___ the sofa. (at the back of it)', o: ['in front of', 'behind', 'opposite'], a: 1, e: 'Behind the sofa.', c: 'place' },
  { q: 'The lamp is ___ the two windows.', o: ['next', 'opposite', 'between'], a: 2, e: 'Between the windows.', c: 'place' },
  { q: 'The chair is ___ the armchair.', o: ['next to', 'next', 'next of'], a: 0, e: 'Next to.', c: 'place' },
  { q: 'Above is similar to ___.', o: ['under', 'over', 'between'], a: 1, e: 'Above ≈ over; below ≈ under.', c: 'similar', d: 3 },
  { q: 'The ghost is going ___ the stairs. (to the first floor)', o: ['down', 'through', 'up'], a: 2, e: 'Up the stairs.', c: 'movement' },
  { q: 'He went ___ the wardrobe and closed the door.', o: ['into', 'out of', 'from'], a: 0, e: 'Into = movement to inside.', c: 'movement' },
  { q: 'The ghost came in ___ the window.', o: ['between', 'through', 'over to'], a: 1, e: 'Through the window.', c: 'movement' },
  { q: 'She walked ___ the bedroom ___ the bathroom.', o: ['in / at', 'on / in', 'from / to'], a: 2, e: 'From … to …', c: 'movement' },
  { q: 'The woman is sitting ___ the man. (in front of him, looking at him)', o: ['opposite', 'behind', 'under'], a: 0, e: 'Opposite.', c: 'place' },
  { q: 'He came ___ the wardrobe.', o: ['into', 'out of', 'out'], a: 1, e: 'Out of the wardrobe.', c: 'movement' },
];

/** Food and drink, SB p.163, and food containers, lesson 9B. */
const food: Draft[] = [
  { q: 'Which is a fruit?', o: ['a pineapple', 'a lettuce', 'an onion'], a: 0, e: 'A pineapple is a fruit.', c: 'groups', d: 1 },
  { q: 'Which is a vegetable?', o: ['a banana', 'peas', 'strawberries'], a: 1, e: 'Peas are vegetables.', c: 'groups' },
  { q: 'Which is a snack?', o: ['steak', 'rice', 'crisps'], a: 2, e: 'Crisps are a snack.', c: 'groups' },
  { q: 'Chicken, sausages, steak and ham are ___.', o: ['meat', 'fish', 'seafood'], a: 0, e: 'Meat.', c: 'groups' },
  { q: 'Salmon and tuna are ___.', o: ['meat', 'fish', 'vegetables'], a: 1, e: 'Fish.', c: 'groups' },
  { q: 'Cake, fruit salad and ice cream are ___.', o: ['snacks', 'vegetables', 'desserts'], a: 2, e: 'Desserts.', c: 'groups' },
  { q: 'Which word is different?', o: ['dessert', 'breakfast', 'lunch'], a: 0, e: 'Breakfast and lunch are meals. Dessert is part of a meal.', c: 'odd-one-out', d: 3 },
  { q: 'Which word is different?', o: ['mushrooms', 'strawberries', 'onions'], a: 1, e: 'Strawberries are fruit. Mushrooms and onions are vegetables.', c: 'odd-one-out', d: 3 },
  { q: 'Which word is different?', o: ['milk', 'orange juice', 'sugar'], a: 2, e: 'Milk and orange juice are drinks. Sugar is not.', c: 'odd-one-out' },
  { q: 'a ___ of jam', o: ['jar', 'can', 'carton'], a: 0, e: 'A jar of jam / honey.', c: 'containers' },
  { q: 'a ___ of milk', o: ['tin', 'carton', 'jar'], a: 1, e: 'A carton of milk / fruit juice.', c: 'containers' },
  { q: 'a ___ of tuna', o: ['carton', 'bottle', 'tin'], a: 2, e: 'A tin of tuna / tomatoes.', c: 'containers' },
  { q: 'a ___ of Coke', o: ['can', 'jar', 'packet'], a: 0, e: 'A can of Coke / beer.', c: 'containers' },
  { q: 'a ___ of biscuits', o: ['tin', 'packet', 'carton'], a: 1, e: 'A packet of biscuits / crisps.', c: 'containers' },
  { q: 'Chips are called French ___ in the USA.', o: ['crisps', 'potatoes', 'fries'], a: 2, e: 'Chips = French fries.', c: 'groups', d: 3 },
  { q: 'a ___ of mineral water', o: ['bottle', 'jar', 'tin'], a: 0, e: 'A bottle of water.', c: 'containers' },
];

export const vocabFiles7to9: Question[] = [
  ...vocabTopic('word-formation', 'wf', 7, { book: 'SB', page: 55, ref: 'Lesson 7A — word formation' }, wordFormation),
  ...vocabTopic('past-time', 'pt', 7, { book: 'SB', page: 57, ref: 'Lesson 7B — past time expressions' }, pastTime),
  ...vocabTopic('go-have-get', 'gh', 7, VB(160, 'go, have, get'), goHaveGet),
  ...vocabTopic('house', 'hs', 8, VB(161, 'The house'), house),
  ...vocabTopic('prepositions', 'pp', 8, VB(162, 'Prepositions'), prepositions),
  ...vocabTopic('food-drink', 'fd', 9, VB(163, 'Food and drink'), food),
];
