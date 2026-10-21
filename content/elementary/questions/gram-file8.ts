import type { Question } from '../../types';
import { GB, grammarTopic, type Draft } from './build';

/** Grammar Bank 8A — past simple: regular and irregular (SB p.138). */
const pastMixed: Draft[] = [
  { q: 'Gordon ___ Jeremy’s business partner.', o: ['was', 'were', 'did'], a: 0, e: 'Past of be with he: was.', c: 'be', d: 1 },
  { q: 'Last night I ___ sleep. There was a lot of noise.', o: ['didn’t can', 'couldn’t', 'can’t'], a: 1, e: 'Past of can’t: couldn’t.', c: 'could' },
  { q: 'She ___ to be a doctor.', o: ['wanted', 'wantted', 'want'], a: 0, e: 'Regular past: wanted.', c: 'regular' },
  { q: 'They ___ until very late.', o: ['didn’t arrived', 'didn’t arrive', 'don’t arrived'], a: 1,
    e: 'didn’t + infinitive, for regular and irregular verbs.', c: 'negative', d: 3 },
  { q: 'She ___ on the sofa.', o: ['sleeped', 'sleep', 'slept'], a: 2, e: 'sleep → slept.', c: 'irregular' },
  { q: 'He ___ home last night.', o: ['didn’t come', 'didn’t came', 'not came'], a: 0, e: 'didn’t + infinitive.', c: 'negative' },
  { q: '___ ill yesterday?', o: ['Did you', 'Were you', 'Was you'], a: 1, e: 'Ill is an adjective: Were you ill?', c: 'be-question', d: 3 },
  { q: 'Where ___ lunch?', o: ['did you had', 'you had', 'did you have'], a: 2, e: 'Where did you have lunch?', c: 'question' },
  { q: 'We watched TV and then we ___ a light dinner.', o: ['had', 'haved', 'have'], a: 0, e: 'have → had.', c: 'irregular' },
  { q: 'A: Did you hear a noise during the night? B: No, I didn’t ___ anything.', o: ['heard', 'hear', 'hears'], a: 1, e: 'didn’t + infinitive.', c: 'negative' },
  { q: 'They ___ quietly for a few minutes.', o: ['speaked', 'speak', 'spoke'], a: 2, e: 'speak → spoke.', c: 'irregular' },
  { q: 'I ___ three books last week.', o: ['read', 'readed', 'reads'], a: 0, e: 'read /riːd/ → read /red/.', c: 'irregular' },
  { q: 'He ___ her with another man.', o: ['seed', 'saw', 'seen'], a: 1, e: 'see → saw.', c: 'irregular' },
  { q: 'We ___ together last class.', o: ['sitted', 'sit', 'sat'], a: 2, e: 'sit → sat.', c: 'irregular' },
  { q: '___ you see anybody in the library?', o: ['Could', 'Can', 'Were'], a: 0, e: 'Past question with can: Could you…?', c: 'could' },
];

/** Grammar Bank 8B — there is / there are, some / any (SB p.138). */
const thereIsAre: Draft[] = [
  { q: '___ a garage.', o: ['There’s', 'There are', 'It’s'], a: 0, e: 'Singular: There’s (There is).', c: 'sing-plural', d: 1 },
  { q: 'There ___ some pictures on the wall.', o: ['is', 'are', 'be'], a: 1, e: 'Plural: there are.', c: 'sing-plural', d: 1 },
  { q: 'There aren’t ___ plants in the room.', o: ['some', 'a', 'any'], a: 2, e: 'Negative plural: any.', c: 'some-any' },
  { q: '___ a bathroom downstairs?', o: ['Is there', 'Are there', 'There is'], a: 0, e: 'Singular question: Is there…?', c: 'question' },
  { q: '___ any neighbours with children?', o: ['Is there', 'Are there', 'There are'], a: 1, e: 'Plural question: Are there…?', c: 'question' },
  { q: 'A: Is there a toilet downstairs? B: No, ___.', o: ['it isn’t', 'there aren’t', 'there isn’t'], a: 2, e: 'No, there isn’t.', c: 'short-answer' },
  { q: 'In my bedroom ___ a bed, two chairs and a desk.', o: ['there’s', 'there are', 'it’s'], a: 0,
    e: 'In a list, use there is if the first thing is singular: there’s a bed…', c: 'list', d: 3 },
  { q: 'In the living room ___ two armchairs and a sofa.', o: ['there’s', 'there are', 'they are'], a: 1,
    e: 'The first thing in the list is plural: there are two armchairs…', c: 'list', d: 3 },
  { q: 'There’s a key on the table. ___ the key to the kitchen.', o: ['There’s', 'They’re', 'It’s'], a: 2,
    e: 'There’s = it exists; It’s = we talk about that thing.', c: 'there-it', d: 3 },
  { q: 'There are three bedrooms in the flat. ___ all quite small.', o: ['They’re', 'There are', 'It’s'], a: 0,
    e: 'They’re = the three bedrooms.', c: 'there-it', d: 3 },
  { q: 'There are ___ eggs in the fridge.', o: ['any', 'some', 'a'], a: 1, e: 'Positive plural: some.', c: 'some-any' },
  { q: 'Are there ___ glasses in the cupboard?', o: ['some', 'a', 'any'], a: 2, e: 'Question plural: any.', c: 'some-any' },
  { q: 'There ___ a TV in the kitchen.', o: ['isn’t', 'aren’t', 'not'], a: 0, e: 'Singular negative: there isn’t.', c: 'negative' },
  { q: 'There ___ any cupboards in the dining room.', o: ['isn’t', 'aren’t', 'not'], a: 1, e: 'Plural negative: there aren’t any.', c: 'negative' },
  { q: 'Is there ___ fireplace in the living room?', o: ['any', 'some', 'a'], a: 2, e: 'Singular: a / an with there is.', c: 'some-any' },
];

/** Grammar Bank 8C — there was / there were (SB p.138). */
const thereWasWere: Draft[] = [
  { q: '___ a big mirror in the room.', o: ['There was', 'There were', 'It were'], a: 0, e: 'Singular past: there was.', c: 'sing-plural', d: 1 },
  { q: 'There ___ four lamps.', o: ['was', 'were', 'is'], a: 1, e: 'Plural past: there were.', c: 'sing-plural', d: 1 },
  { q: 'There ___ any ghosts.', o: ['wasn’t', 'isn’t', 'weren’t'], a: 2, e: 'Plural negative: there weren’t any.', c: 'negative' },
  { q: '___ a bathroom? — Yes, there was.', o: ['Was there', 'Were there', 'There was'], a: 0, e: 'Was there…?', c: 'question' },
  { q: '___ any windows? — No, there weren’t.', o: ['Was there', 'Were there', 'There were'], a: 1, e: 'Were there any…?', c: 'question' },
  { q: 'A: Was there a restaurant? B: No, ___, but there was a bar.', o: ['it wasn’t', 'there weren’t', 'there wasn’t'], a: 2,
    e: 'No, there wasn’t.', c: 'short-answer' },
  { q: 'There were two computers in the office, but there ___ a printer.', o: ['wasn’t', 'weren’t', 'isn’t'], a: 0,
    e: 'A printer is singular: there wasn’t.', c: 'negative' },
  { q: 'How many guests ___ in the hotel?', o: ['there were', 'were there', 'was there'], a: 1, e: 'How many + noun + were there?', c: 'question', d: 3 },
  { q: 'My sister didn’t have a shower because there ___ a spider in the bath.', o: ['were', 'was', 'is'], a: 1, e: 'A spider: there was.', c: 'sing-plural' },
  { q: 'We couldn’t watch the news because there ___ a TV in our room.', o: ['weren’t', 'wasn’t', 'isn’t'], a: 1, e: 'There wasn’t a TV.', c: 'negative' },
  { q: 'I couldn’t sleep because there ___ some noisy children behind me.', o: ['was', 'are', 'were'], a: 2, e: 'Plural: there were some…', c: 'sing-plural' },
  { q: 'They couldn’t park because there ___ a car park.', o: ['wasn’t', 'weren’t', 'wasn’t any'], a: 0, e: 'Singular: there wasn’t a car park.', c: 'negative' },
  { q: 'She didn’t have a coffee because there ___ any cups.', o: ['wasn’t', 'weren’t', 'were'], a: 1, e: 'Cups: there weren’t any.', c: 'negative' },
];

export const gramFile8: Question[] = [
  ...grammarTopic('past-mixed', 'pm', 8, GB(138, '8A'), pastMixed),
  ...grammarTopic('there-is-are', 'th', 8, GB(138, '8B'), thereIsAre),
  ...grammarTopic('there-was-were', 'tw', 8, GB(138, '8C'), thereWasWere),
];
