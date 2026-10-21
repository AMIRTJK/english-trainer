import type { Question } from '../../types';
import { VB, vocabTopic, type Draft } from './build';

/** Places and buildings, SB p.164; city holidays and verb phrases, lessons 10B–10C. */
const places: Draft[] = [
  { q: 'You buy medicine here.', o: ['a chemist’s', 'a castle', 'a square'], a: 0, e: 'A chemist’s (or pharmacy).', c: 'definition', d: 1 },
  { q: 'You send letters here.', o: ['a police station', 'a post office', 'a town hall'], a: 1, e: 'A post office.', c: 'definition' },
  { q: 'You can see animals here.', o: ['a museum', 'a market', 'a zoo'], a: 2, e: 'A zoo.', c: 'definition' },
  { q: 'You can see art and pictures here.', o: ['an art gallery', 'a bus station', 'a car park'], a: 0, e: 'An art gallery.', c: 'definition' },
  { q: 'You can see a play here.', o: ['a hospital', 'a theatre', 'a bridge'], a: 1, e: 'A theatre.', c: 'definition' },
  { q: 'You take a train here.', o: ['a bus station', 'a car park', 'a railway station'], a: 2, e: 'A railway station.', c: 'definition' },
  { q: 'A big shop with many floors and many different things = a ___ store.', o: ['department', 'shopping', 'supermarket'], a: 0, e: 'A department store.', c: 'definition', d: 3 },
  { q: 'Which is a place of worship?', o: ['a castle', 'a mosque', 'a market'], a: 1, e: 'A mosque, a church, a cathedral, a temple, a synagogue.', c: 'worship' },
  { q: 'Which word is different?', o: ['river', 'road', 'cathedral'], a: 2, e: 'A cathedral is a building. A river and a road are not.', c: 'odd-one-out', d: 3 },
  { q: '___ a flight, a train, accommodation', o: ['book', 'rent', 'stay'], a: 0, e: 'Book a flight.', c: 'holiday' },
  { q: '___ a car / a flat', o: ['stay', 'rent', 'eat'], a: 1, e: 'Rent a car, rent a flat.', c: 'holiday' },
  { q: '___ in a hotel / hostel', o: ['book', 'meet', 'stay'], a: 2, e: 'Stay in a hotel.', c: 'holiday' },
  { q: '___ out in local restaurants', o: ['eat', 'go', 'have'], a: 0, e: 'Eat out.', c: 'holiday' },
  { q: '___ souvenirs', o: ['visit', 'buy', 'meet'], a: 1, e: 'Buy souvenirs.', c: 'holiday' },
  { q: '___ in love', o: ['get', 'become', 'fall'], a: 2, e: 'Fall in love.', c: 'verb-phrases' },
  { q: '___ famous', o: ['become', 'fall', 'move'], a: 0, e: 'Become famous.', c: 'verb-phrases' },
  { q: '___ house (= go to live in a new house)', o: ['change', 'move', 'go'], a: 1, e: 'Move house.', c: 'verb-phrases', d: 3 },
];

/** Phones and the internet, lesson 11C; common adverbs, lesson 11A. */
const phones: Draft[] = [
  { q: '___ an app', o: ['download', 'post', 'log'], a: 0, e: 'Download an app.', c: 'internet', d: 1 },
  { q: '___ a tweet', o: ['upload', 'post', 'search'], a: 1, e: 'Post a tweet.', c: 'internet' },
  { q: '___ a video', o: ['message', 'log in', 'upload'], a: 2, e: 'Upload a video.', c: 'internet' },
  { q: 'Log ___ with your username and password.', o: ['in', 'on', 'up'], a: 0, e: 'Log in.', c: 'internet' },
  { q: 'Don’t open an ___ if you don’t know who it’s from.', o: ['website', 'attachment', 'app'], a: 1, e: 'An attachment comes with an email.', c: 'internet' },
  { q: 'You can find all the information on the hotel’s ___.', o: ['attachment', 'broadband', 'website'], a: 2, e: 'Website.', c: 'internet' },
  { q: 'I always shop ___ these days.', o: ['online', 'wi-fi', 'download'], a: 0, e: 'Shop online.', c: 'internet' },
  { q: 'You can search ___ most information on the internet.', o: ['to', 'for', 'at'], a: 1, e: 'Search for.', c: 'internet' },
  { q: 'Have you ever seen a film ___ subtitles?', o: ['in', 'on', 'with'], a: 2, e: 'A film with subtitles.', c: 'internet' },
  { q: 'The opposite of quickly is ___.', o: ['slowly', 'badly', 'quietly'], a: 0, e: 'quickly ↔ slowly.', c: 'adverbs' },
  { q: 'The opposite of well is ___.', o: ['bad', 'badly', 'good'], a: 1, e: 'well ↔ badly.', c: 'adverbs', d: 3 },
  { q: 'The opposite of noisy is ___.', o: ['loud', 'safe', 'quiet'], a: 2, e: 'noisy ↔ quiet.', c: 'adverbs' },
];

/** Irregular verbs, SB p.165, and lessons 12A–12B. */
const irregular: Draft[] = [
  { q: 'see — saw — ___', o: ['seen', 'saw', 'seed'], a: 0, e: 'see, saw, seen.', c: 'participle', d: 1 },
  { q: 'go — went — ___', o: ['went', 'gone', 'goed'], a: 1, e: 'go, went, gone.', c: 'participle' },
  { q: 'give — gave — ___', o: ['gave', 'gived', 'given'], a: 2, e: 'give, gave, given.', c: 'participle' },
  { q: 'fall — fell — ___', o: ['fallen', 'fell', 'falled'], a: 0, e: 'fall, fell, fallen.', c: 'participle' },
  { q: 'take — took — ___', o: ['took', 'taken', 'taked'], a: 1, e: 'take, took, taken.', c: 'participle' },
  { q: 'know — knew — ___', o: ['knowed', 'knew', 'known'], a: 2, e: 'know, knew, known.', c: 'participle' },
  { q: 'buy — ___ — bought', o: ['bought', 'buyed', 'buy'], a: 0, e: 'buy, bought, bought.', c: 'past' },
  { q: 'tell — ___ — told', o: ['telled', 'told', 'tell'], a: 1, e: 'tell, told, told.', c: 'past' },
  { q: 'speak — spoke — ___', o: ['speaked', 'spoke', 'spoken'], a: 2, e: 'speak, spoke, spoken.', c: 'participle' },
  { q: 'eat — ___ — eaten', o: ['ate', 'eated', 'eaten'], a: 0, e: 'eat, ate, eaten.', c: 'past' },
  { q: 'drink — drank — ___', o: ['drinked', 'drunk', 'drank'], a: 1, e: 'drink, drank, drunk.', c: 'participle', d: 3 },
  { q: 'write — wrote — ___', o: ['wrote', 'writed', 'written'], a: 2, e: 'write, wrote, written.', c: 'participle' },
  { q: 'Which verb has the same form for the past simple and the past participle?', o: ['meet', 'see', 'go'], a: 0,
    e: 'meet, met, met. See and go are different: saw / seen, went / gone.', c: 'same-form', d: 3 },
  { q: 'Which verb has the same form for the past simple and the past participle?', o: ['eat', 'win', 'speak'], a: 1,
    e: 'win, won, won.', c: 'same-form', d: 3 },
  { q: 'Which verb has a different past participle?', o: ['lose', 'get', 'sing'], a: 2,
    e: 'sing, sang, sung. Lose and get: lost / lost, got / got.', c: 'same-form', d: 3 },
];

/** Practical English episodes 1–6 (SB pp.12, 28, 44, 60, 76, 92). */
const practical: Draft[] = [
  { q: 'In a hotel, the lift takes you to the third ___.', o: ['floor', 'room', 'stairs'], a: 0, e: 'The third floor.', c: 'hotel', d: 1 },
  { q: 'A room for one person is a ___ room.', o: ['double', 'single', 'one'], a: 1, e: 'A single room.', c: 'hotel' },
  { q: 'Lift is British English. In American English it is ___.', o: ['tube', 'subway', 'elevator'], a: 2, e: 'Lift (BrE) = elevator (AmE).', c: 'hotel', d: 3 },
  { q: 'We say ___ to a man in a polite way.', o: ['sir', 'madam', 'Mrs'], a: 0, e: 'Sir for a man, madam for a woman.', c: 'hotel' },
  { q: 'It’s 9 p.m. You arrive at a hotel. You say: “Good ___.”', o: ['morning', 'evening', 'night'], a: 1,
    e: 'Good evening (after 18.00). Goodnight = goodbye when you go to bed.', c: 'greetings', d: 3 },
  { q: 'We usually wear a ___ under a jacket.', o: ['skirt', 'shoes', 'shirt'], a: 2, e: 'A shirt.', c: 'clothes' },
  { q: 'The shirt is very nice. Can I ___?', o: ['try it on', 'try on it', 'put it'], a: 0, e: 'Can I try it on?', c: 'clothes', d: 3 },
  { q: '£5.50 = five pounds ___', o: ['fifty pounds', 'fifty', 'and fifty pounds'], a: 1, e: '£5.50 = five pounds fifty.', c: 'money', d: 3 },
  { q: 'Go ___ on and turn left at the traffic lights.', o: ['past', 'through', 'straight'], a: 2, e: 'Go straight on.', c: 'directions' },
  { q: 'Go ___ the church, then turn right.', o: ['past', 'on', 'straight'], a: 0, e: 'Go past the church.', c: 'directions' },
  { q: 'It’s my birthday today. — ___!', o: ['Congratulations', 'Happy Birthday', 'Well done'], a: 1, e: 'Happy Birthday!', c: 'responding' },
  { q: 'I have my driving test tomorrow. — ___!', o: ['Well done', 'Congratulations', 'Good luck'], a: 2, e: 'Good luck!', c: 'responding' },
  { q: 'I didn’t pass my exam. — Oh dear! ___.', o: ['Never mind', 'Good luck', 'Well done'], a: 0, e: 'Oh dear! Never mind.', c: 'responding' },
  { q: 'On a menu, the first course is the ___.', o: ['dessert', 'starter', 'main course'], a: 1, e: 'Starters, main courses, desserts.', c: 'menu' },
  { q: 'In London the buses are ___.', o: ['black', 'yellow', 'red'], a: 2, e: 'London buses are red; London taxis are black.', c: 'transport' },
  { q: 'Intercity buses are also called ___.', o: ['coaches', 'trams', 'cabs'], a: 0, e: 'Coaches. Taxis are also called cabs.', c: 'transport', d: 3 },
  { q: 'In London the underground is called the ___.', o: ['subway', 'Tube', 'train'], a: 1, e: 'The Tube.', c: 'transport' },
];

export const vocabFiles10to12: Question[] = [
  ...vocabTopic('places-holidays', 'pl', 10, VB(164, 'Places and buildings'), places),
  ...vocabTopic('phones-internet', 'ph', 11, { book: 'SB', page: 90, ref: 'Lessons 11A and 11C — adverbs, phones and the internet' }, phones),
  ...vocabTopic('irregular-verbs', 'iv', 12, { book: 'SB', page: 165, ref: 'Irregular verbs' }, irregular),
  ...vocabTopic('practical-english', 'pe', 1, { book: 'SB', page: 12, ref: 'Practical English, episodes 1–6' }, practical),
];
