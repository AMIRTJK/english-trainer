import type { Question } from '../../types';
import { GB, grammarTopic, type Draft } from './build';

/** Grammar Bank 4A — possessive ’s, Whose…? (SB p.130). */
const possessiveS: Draft[] = [
  { q: 'He’s ___.', o: ['Brad Pitt’s brother', 'the brother of Brad Pitt', 'Brad Pitt brother'], a: 0,
    e: 'Person + ’s for family: Brad Pitt’s brother. NOT the brother of Brad Pitt.', c: 'person-s', d: 3 },
  { q: 'It’s my ___ car.', o: ['parent’s', 'parents’', 'parents'], a: 1,
    e: 'Regular plural: the apostrophe goes after the s: my parents’ car.', c: 'plural-s', d: 3 },
  { q: 'That’s the ___ room.', o: ['childrens’', 'children', 'children’s'], a: 2,
    e: 'Irregular plural + ’s: the children’s room.', c: 'plural-s', d: 3 },
  { q: '___ is this bag? — It’s Maria’s.', o: ['Whose', 'Who’s', 'Who'], a: 0, e: 'Whose…? asks who something belongs to.', c: 'whose', d: 1 },
  { q: '___ that girl? — She’s my sister.', o: ['Whose', 'Who’s', 'Who are'], a: 1, e: 'Who’s = Who is.', c: 'whose-whos', d: 3 },
  { q: 'I’m tired when I go home at ___.', o: ['the day’s end', 'the day end', 'the end of the day'], a: 2,
    e: 'With things we don’t usually use ’s: the end of the day.', c: 'thing-of' },
  { q: 'I live in ___.', o: ['the city centre', 'the city’s centre', 'the centre’s city'], a: 0,
    e: 'Thing + noun: the city centre NOT the city’s centre.', c: 'thing-of' },
  { q: 'Monica Cruz is ___ sister.', o: ['Penelopes', 'Penelope’s', 'Penelopes’'], a: 1, e: 'Person + ’s: Penelope’s sister.', c: 'person-s' },
  { q: 'Those are the ___ desks.', o: ['student’s', 'students', 'students’'], a: 2,
    e: 'Many students (regular plural): students’ desks.', c: 'plural-s' },
  { q: '___ phone is that?', o: ['Whose', 'Who’s', 'Who is'], a: 0, e: 'Whose + noun: Whose phone is that?', c: 'whose-whos' },
  { q: '___ your favourite singer?', o: ['Whose', 'Who’s', 'Who are'], a: 1, e: 'Who’s = Who is: Who’s your favourite singer?', c: 'whose-whos' },
  { q: 'In “Maria’s Spanish”, what does ’s mean?', o: ['of Maria', 'has', 'is'], a: 2,
    e: '“Maria’s Spanish” = Maria is Spanish. In “Maria’s mother” ’s = of Maria.', c: 'meaning', d: 3 },
  { q: 'Whose are the glasses? — They’re ___.', o: ['Bill’s', 'Bills', 'Bill'], a: 0, e: 'They’re Bill’s.', c: 'whose' },
  { q: 'The ___ of the classroom is open.', o: ['door’s', 'door', 'doors’'], a: 1, e: 'The door of the classroom — no ’s for things.', c: 'thing-of' },
];

/** Grammar Bank 4B — prepositions of time and place (SB p.130). */
const prepositions: Draft[] = [
  { q: 'I have a shower ___ the morning.', o: ['in', 'on', 'at'], a: 0, e: 'In + parts of the day: in the morning.', c: 'time-in', d: 1 },
  { q: 'We play tennis ___ Monday.', o: ['in', 'on', 'at'], a: 1, e: 'On + days: on Monday.', c: 'time-on', d: 1 },
  { q: 'The class starts ___ three o’clock.', o: ['in', 'on', 'at'], a: 2, e: 'At + times: at three o’clock.', c: 'time-at', d: 1 },
  { q: 'My birthday is ___ December.', o: ['in', 'on', 'at'], a: 0, e: 'In + months.', c: 'time-in' },
  { q: 'I don’t work ___ the weekend.', o: ['in', 'at', 'on the'], a: 1, e: 'At the weekend.', c: 'time-at' },
  { q: 'It’s hot ___ the summer.', o: ['on', 'at', 'in'], a: 2, e: 'In + seasons: in the summer.', c: 'time-in' },
  { q: 'We go to bed ___ midnight.', o: ['at', 'in', 'on'], a: 0, e: 'At midday / midnight.', c: 'time-at' },
  { q: 'The party is ___ 1 January.', o: ['in', 'on', 'at'], a: 1, e: 'On + dates.', c: 'time-on' },
  { q: 'Sorry, John isn’t here. He’s ___ work.', o: ['in', 'to', 'at'], a: 2, e: 'At + work, home, school, university.', c: 'place-at' },
  { q: 'Sally’s boyfriend works ___ a factory.', o: ['in', 'at', 'to'], a: 0, e: 'In + other places: in a factory, in an office.', c: 'place-in' },
  { q: 'I go ___ the gym on Tuesdays.', o: ['at', 'to', 'in'], a: 1, e: 'To for movement: go to the gym NOT go at the gym.', c: 'place-to', d: 3 },
  { q: 'What time do you go ___?', o: ['to home', 'at home', 'home'], a: 2, e: 'No to before home: go home.', c: 'home', d: 3 },
  { q: 'It’s Monday. The children are ___ school.', o: ['at', 'to', 'on'], a: 0, e: 'At school.', c: 'place-at' },
  { q: 'We live ___ a modern flat.', o: ['at', 'in', 'to'], a: 1, e: 'In a flat.', c: 'place-in' },
  { q: 'My brother studies maths ___ Manchester University.', o: ['on', 'to', 'at'], a: 2, e: 'At university.', c: 'place-at' },
];

/** Grammar Bank 4C — position of adverbs, expressions of frequency (SB p.130). */
const adverbs: Draft[] = [
  { q: 'Which sentence is correct?', o: ['I always walk to work.', 'I walk always to work.', 'Always I walk to work.'], a: 0,
    e: 'Adverbs of frequency go before the main verb.', c: 'before-verb', d: 1 },
  { q: 'Which sentence is correct?', o: ['I’m bored hardly ever.', 'I’m hardly ever bored.', 'I hardly ever am bored.'], a: 1,
    e: 'Adverbs of frequency go after be: I’m hardly ever bored.', c: 'after-be' },
  { q: 'Which sentence is correct?', o: ['She never is stressed.', 'She isn’t never stressed.', 'She’s never stressed.'], a: 2,
    e: 'After be, and with never we use a positive verb: She’s never stressed. NOT She isn’t never.', c: 'never', d: 3 },
  { q: 'My parents ___ go out at night.', o: ['don’t often', 'often don’t', 'don’t never'], a: 0,
    e: 'In negatives the adverb goes between don’t / doesn’t and the verb.', c: 'negative' },
  { q: 'Do you ___ to work?', o: ['drive usually', 'usually drive', 'usually you drive'], a: 1,
    e: 'In questions: Do + subject + adverb + verb.', c: 'question' },
  { q: 'Why are you ___ late?', o: ['late always', 'always is', 'always'], a: 2, e: 'After be: Why are you always late?', c: 'after-be' },
  { q: 'I have English classes ___.', o: ['twice a week', 'a week twice', 'twice week'], a: 0,
    e: 'Expressions of frequency usually go at the end of the sentence.', c: 'expression' },
  { q: 'She doesn’t work ___ day.', o: ['all the', 'every', 'each the'], a: 1, e: 'Every day.', c: 'expression' },
  { q: 'I go to the theatre only once or twice a year. I ___ go to the theatre.', o: ['often', 'usually', 'hardly ever'], a: 2,
    e: 'Only once or twice a year = hardly ever.', c: 'meaning' },
  { q: 'He ___ hungry at lunchtime.', o: ['is always', 'always is', 'is always is'], a: 0, e: 'Be + adverb: He is always hungry.', c: 'after-be' },
  { q: 'We ___ do our homework.', o: ['always don’t', 'don’t always', 'not always'], a: 1, e: 'We don’t always do our homework.', c: 'negative' },
  { q: 'How ___ do you cook? — Every evening.', o: ['much', 'many', 'often'], a: 2, e: 'How often…? asks about frequency.', c: 'how-often', d: 1 },
  { q: 'Our teacher is ___ angry.', o: ['hardly ever', 'ever hardly', 'hardly'], a: 0, e: 'After be: Our teacher is hardly ever angry.', c: 'after-be' },
  { q: 'What time do you ___ work?', o: ['finish usually', 'usually finish', 'usually finishing'], a: 1, e: 'Adverb before the main verb.', c: 'question' },
];

export const gramFile4: Question[] = [
  ...grammarTopic('possessive-s', 'po', 4, GB(130, '4A'), possessiveS),
  ...grammarTopic('prepositions-time-place', 'pr', 4, GB(130, '4B'), prepositions),
  ...grammarTopic('adverbs-frequency', 'af', 4, GB(130, '4C'), adverbs),
];
