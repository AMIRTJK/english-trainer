import type { Question } from '../../types';
import { VB, vocabTopic, type Draft } from './build';

/** The family, SB p.155. */
const family: Draft[] = [
  { q: 'My mother’s brother is my ___.', o: ['uncle', 'nephew', 'cousin'], a: 0, e: 'Your mother’s or father’s brother is your uncle.', c: 'relation', d: 1 },
  { q: 'My father’s sister is my ___.', o: ['niece', 'aunt', 'cousin'], a: 1, e: 'Aunt.', c: 'relation', d: 1 },
  { q: 'My brother’s daughter is my ___.', o: ['aunt', 'nephew', 'niece'], a: 2, e: 'Niece.', c: 'relation' },
  { q: 'My sister’s son is my ___.', o: ['nephew', 'uncle', 'grandson'], a: 0, e: 'Nephew.', c: 'relation' },
  { q: 'My aunt’s children are my ___.', o: ['nephews', 'cousins', 'grandparents'], a: 1, e: 'Cousins.', c: 'relation' },
  { q: 'My father and my mother are my ___.', o: ['grandparents', 'children', 'parents'], a: 2, e: 'Parents.', c: 'group' },
  { q: 'A husband and wife = a married ___.', o: ['couple', 'family', 'partner'], a: 0, e: 'A (married) couple.', c: 'group' },
  { q: 'My wife’s mother is my ___.', o: ['stepmother', 'mother-in-law', 'grandmother'], a: 1, e: 'Mother-in-law.', c: 'in-law', d: 3 },
  { q: 'My mother’s new husband is my ___.', o: ['father-in-law', 'uncle', 'stepfather'], a: 2, e: 'Stepfather.', c: 'in-law', d: 3 },
  { q: 'My husband’s sister is my ___.', o: ['sister-in-law', 'stepsister', 'niece'], a: 0, e: 'Sister-in-law.', c: 'in-law', d: 3 },
  { q: 'My son and my daughter are my ___.', o: ['parents', 'children', 'cousins'], a: 1, e: 'Children.', c: 'group' },
  { q: 'Which word is different?', o: ['brother', 'uncle', 'niece'], a: 2, e: 'Niece is a woman. Brother and uncle are men.', c: 'odd-one-out', d: 3 },
  { q: 'The person I am in a relationship with = my ___.', o: ['partner', 'cousin', 'nephew'], a: 0, e: 'My partner.', c: 'relation' },
];

/** Daily routine, SB p.156. */
const routine: Draft[] = [
  { q: 'I ___ up at 7.00.', o: ['wake', 'go', 'make'], a: 0, e: 'Wake up / get up.', c: 'phrase', d: 1 },
  { q: 'I ___ a shower.', o: ['do', 'have', 'make'], a: 1, e: 'Have a shower, have a bath.', c: 'have', d: 1 },
  { q: 'I get ___ and have breakfast.', o: ['dress', 'dresses', 'dressed'], a: 2, e: 'Get dressed.', c: 'phrase' },
  { q: 'I go to work ___ bus.', o: ['by', 'on the', 'with'], a: 0, e: 'Go to work by bus.', c: 'phrase' },
  { q: 'I ___ my emails.', o: ['look', 'check', 'see'], a: 1, e: 'Check emails.', c: 'phrase' },
  { q: 'I ___ the housework.', o: ['make', 'have', 'do'], a: 2, e: 'Do the housework.', c: 'phrase' },
  { q: 'I go ___ bed at 11.00.', o: ['to', 'in', 'at'], a: 0, e: 'Go to bed.', c: 'phrase' },
  { q: 'I take the dog for a ___.', o: ['run', 'walk', 'swim'], a: 1, e: 'Take the dog for a walk.', c: 'phrase' },
  { q: 'He ___ a shave every morning.', o: ['does', 'makes', 'has'], a: 2, e: 'Have a shave.', c: 'have' },
  { q: 'She ___ on make-up.', o: ['puts', 'gets', 'does'], a: 0, e: 'Put on make-up.', c: 'phrase' },
  { q: 'I ___ home late.', o: ['arrive to', 'get', 'go to'], a: 1, e: 'Get home (no to).', c: 'phrase', d: 3 },
  { q: 'I ___ for eight hours.', o: ['bed', 'wake', 'sleep'], a: 2, e: 'Sleep for eight hours.', c: 'phrase' },
  { q: 'I have three children. Here have means…', o: ['family and possessions', 'activities', 'food and drink'], a: 0,
    e: 'Have = family and possessions here. In have lunch it is an activity.', c: 'have', d: 3 },
];

/** Time and frequency, SB p.157, and months, lesson 4C. */
const time: Draft[] = [
  { q: '6.15 = It’s ___ past six.', o: ['quarter', 'half', 'fifteen to'], a: 0, e: '6.15 = (a) quarter past six.', c: 'time', d: 1 },
  { q: '6.30 = It’s ___ past six.', o: ['quarter', 'half', 'thirty'], a: 1, e: '6.30 = half past six.', c: 'time', d: 1 },
  { q: '6.45 = It’s quarter ___ seven.', o: ['past', 'at', 'to'], a: 2, e: '6.45 = (a) quarter to seven.', c: 'time' },
  { q: '6.35 = It’s ___ to seven.', o: ['twenty-five', 'thirty-five', 'twenty'], a: 0, e: '6.35 = twenty-five to seven.', c: 'time', d: 3 },
  { q: '6.03 = It’s three ___ past six.', o: ['o’clock', 'minutes', 'hours'], a: 1, e: 'Not multiples of five: three minutes past six.', c: 'time', d: 3 },
  { q: 'What time do you get up? — At ___ 7.00. (not exact)', o: ['quite', 'around of', 'about'], a: 2, e: 'At about 7.00.', c: 'time' },
  { q: 'Only on Mondays = ___ a week.', o: ['once', 'twice', 'one time'], a: 0, e: 'Once a week.', c: 'frequency' },
  { q: 'On Mondays and Wednesdays = ___ a week.', o: ['once', 'twice', 'two'], a: 1, e: 'Twice a week.', c: 'frequency' },
  { q: 'January, April, July and October = four ___ a year.', o: ['once', 'twice', 'times'], a: 2, e: 'Four times a year.', c: 'frequency' },
  { q: 'I normally get up early. = I ___ get up early.', o: ['usually', 'never', 'hardly ever'], a: 0, e: 'Normally = usually.', c: 'adverbs' },
  { q: 'I don’t like coffee. I ___ have coffee.', o: ['often', 'never', 'sometimes'], a: 1, e: 'Never.', c: 'adverbs' },
  { q: 'The month after June is ___.', o: ['August', 'May', 'July'], a: 2, e: 'June, July, August.', c: 'months', d: 1 },
  { q: 'The month before March is ___.', o: ['February', 'April', 'January'], a: 0, e: 'January, February, March.', c: 'months' },
  { q: 'How often do you see your friends? — ___ day.', o: ['All', 'Every', 'Each the'], a: 1, e: 'Every day.', c: 'frequency' },
];

/** More verb phrases, SB p.158. */
const moreVerbs: Draft[] = [
  { q: '___ a taxi', o: ['call', 'tell', 'talk'], a: 0, e: 'Call a taxi.', c: 'collocation', d: 1 },
  { q: '___ somebody a secret', o: ['say', 'talk', 'tell'], a: 2, e: 'Tell somebody a secret.', c: 'collocation', d: 3 },
  { q: '___ for a bus', o: ['look', 'wait', 'try'], a: 1, e: 'Wait for a bus.', c: 'collocation' },
  { q: '___ for your keys', o: ['look', 'find', 'see'], a: 0, e: 'Look for your keys = try to find them.', c: 'collocation' },
  { q: '___ a photo', o: ['make', 'take', 'do'], a: 1, e: 'Take a photo.', c: 'collocation' },
  { q: '___ a text message', o: ['tell', 'say', 'send'], a: 2, e: 'Send a text message.', c: 'collocation' },
  { q: '___ a parking space', o: ['find', 'look', 'meet'], a: 0, e: 'Find a parking space.', c: 'collocation' },
  { q: '___ the internet', o: ['try', 'use', 'run'], a: 1, e: 'Use the internet.', c: 'collocation' },
  { q: '___ a race', o: ['dance', 'draw', 'run'], a: 2, e: 'Run a race.', c: 'collocation' },
  { q: '___ the tango', o: ['dance', 'sing', 'play'], a: 0, e: 'Dance the tango.', c: 'collocation' },
  { q: 'I can’t ___ his name. What is it?', o: ['forget', 'remember', 'tell'], a: 1, e: 'Remember somebody’s name.', c: 'sentence' },
  { q: 'Oh no! I ___ my bag on the train!', o: ['said', 'gave', 'left'], a: 2, e: 'Leave your bag on a train.', c: 'sentence', d: 3 },
  { q: 'Can you ___ me? This box is very heavy.', o: ['help', 'meet', 'give'], a: 0, e: 'Help somebody.', c: 'sentence' },
  { q: 'I ___ a noise. What is it?', o: ['listen', 'hear', 'see'], a: 1, e: 'Hear a noise.', c: 'sentence' },
];

/** The weather and dates, SB p.159. */
const weather: Draft[] = [
  { q: 'There’s a lot of sun. It’s ___.', o: ['sunny', 'cloudy', 'foggy'], a: 0, e: 'Sun → sunny.', c: 'weather', d: 1 },
  { q: 'There’s a lot of wind. It’s ___.', o: ['wet', 'windy', 'snowing'], a: 1, e: 'Wind → windy.', c: 'weather', d: 1 },
  { q: 'You can’t see far. It’s ___.', o: ['sunny', 'hot', 'foggy'], a: 2, e: 'Fog → foggy.', c: 'weather' },
  { q: 'Warm = not very ___.', o: ['hot', 'cold', 'wet'], a: 0, e: 'Warm = not very hot (opposite: cool).', c: 'adjectives', d: 3 },
  { q: 'Wet = ___.', o: ['snowing', 'raining', 'windy'], a: 1, e: 'Wet = raining (opposite: dry).', c: 'adjectives' },
  { q: 'Which word is a noun?', o: ['cloudy', 'sunny', 'cloud'], a: 2, e: 'Cloud is a noun; cloudy is an adjective.', c: 'noun-adjective', d: 3 },
  { q: 'The four seasons: spring, summer, ___ and winter.', o: ['autumn', 'August', 'season'], a: 0, e: 'Spring, summer, autumn, winter.', c: 'seasons' },
  { q: '3rd = ___', o: ['threeth', 'third', 'thirty'], a: 1, e: '3rd = third.', c: 'ordinals' },
  { q: '12th = ___', o: ['twelveth', 'twelve', 'twelfth'], a: 2, e: '12th = twelfth.', c: 'ordinals', d: 3 },
  { q: '22nd March → we say “the twenty-second ___ March”.', o: ['of', 'in', 'on'], a: 0, e: 'The twenty-second of March.', c: 'dates' },
  { q: 'My birthday’s ___ February.', o: ['on', 'in', 'at'], a: 1, e: 'In + months.', c: 'dates' },
  { q: 'The meeting is ___ Friday 5th September.', o: ['in', 'at', 'on'], a: 2, e: 'On + dates.', c: 'dates' },
  { q: '1936 = nineteen ___', o: ['thirty-six', 'hundred thirty-six', 'thirty-sixth'], a: 0, e: '1936 = nineteen thirty-six.', c: 'years', d: 3 },
  { q: 'What’s the weather ___? — It’s raining.', o: ['as', 'like', 'how'], a: 1, e: 'What’s the weather like?', c: 'weather' },
];

/** Music and noise, lessons 5B and 6C. */
const musicNoise: Draft[] = [
  { q: 'A person who plays the drums is a ___.', o: ['drummer', 'drumist', 'drumer'], a: 0, e: 'Drums → drummer.', c: 'musicians' },
  { q: 'A person who plays the piano is a ___.', o: ['pianer', 'pianist', 'pianoist'], a: 1, e: 'Piano → pianist.', c: 'musicians' },
  { q: 'A person who plays the guitar is a ___.', o: ['guitarer', 'guitarman', 'guitarist'], a: 2, e: 'Guitar → guitarist.', c: 'musicians' },
  { q: 'A person who performs music in a public place and asks for money is a ___.', o: ['busker', 'singer', 'judge'], a: 0, e: 'A busker.', c: 'musicians', d: 3 },
  { q: 'Which word is different?', o: ['violin', 'drummer', 'trumpet'], a: 1, e: 'A drummer is a person. A violin and a trumpet are instruments.', c: 'odd-one-out', d: 3 },
  { q: 'The neighbours’ dog ___ all day — and all night!', o: ['cries', 'argues', 'barks'], a: 2, e: 'Dogs bark.', c: 'noise' },
  { q: 'The baby in the flat upstairs ___ all the time.', o: ['cries', 'barks', 'plays'], a: 0, e: 'Babies cry.', c: 'noise' },
  { q: 'The couple next door ___ a lot.', o: ['bark', 'argue', 'cry'], a: 1, e: 'Argue = speak angrily to each other.', c: 'noise' },
  { q: 'The people next door have the TV on very ___.', o: ['noisy', 'quiet', 'loud'], a: 2, e: 'Have the TV on loud.', c: 'noise' },
  { q: 'My sister ___ the piano for hours.', o: ['practises', 'argues', 'barks'], a: 0, e: 'Practise an instrument.', c: 'noise' },
  { q: 'Which word is different?', o: ['jazz', 'guitar', 'reggae'], a: 1, e: 'Jazz and reggae are kinds of music. A guitar is an instrument.', c: 'odd-one-out' },
];

export const vocabFiles4to6: Question[] = [
  ...vocabTopic('family', 'fm', 4, VB(155, 'The family'), family),
  ...vocabTopic('daily-routine', 'dr', 4, VB(156, 'Daily routine'), routine),
  ...vocabTopic('time-frequency', 'tf', 4, VB(157, 'Time'), time),
  ...vocabTopic('more-verb-phrases', 'mv', 5, VB(158, 'More verb phrases'), moreVerbs),
  ...vocabTopic('weather-dates', 'wd', 5, VB(159, 'The weather and dates'), weather),
  ...vocabTopic('music-noise', 'mn', 6, { book: 'SB', page: 50, ref: 'Lessons 5B and 6C — noise and music' }, musicNoise),
];
