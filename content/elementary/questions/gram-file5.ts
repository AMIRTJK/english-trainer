import type { Question } from '../../types';
import { GB, grammarTopic, type Draft } from './build';

/** Grammar Bank 5A — can / can’t (SB p.132). */
const can: Draft[] = [
  { q: 'I’m sorry. I ___ remember your name.', o: ['can’t', 'don’t can', 'can’t to'], a: 0, e: 'Negative: can’t + verb.', c: 'form', d: 1 },
  { q: 'My girlfriend ___ French, but not Spanish.', o: ['cans speak', 'can speak', 'can to speak'], a: 1,
    e: 'Can is the same for all persons and has no to: She can speak. NOT She cans / can to speak.', c: 'form', d: 3 },
  { q: '___ help me? This box is very heavy.', o: ['Do you can', 'You can', 'Can you'], a: 2, e: 'Question: Can + you + verb.', c: 'request' },
  { q: 'It says ‘No parking’. We ___ park here.', o: ['can’t', 'can', 'don’t can'], a: 0, e: 'It’s not permitted: we can’t park here.', c: 'permission' },
  { q: 'Andy doesn’t want to go to the beach. He ___ swim.', o: ['can', 'can’t', 'cans'], a: 1, e: 'He doesn’t know how: he can’t swim.', c: 'ability' },
  { q: '___ use your phone? I want to call my parents.', o: ['Can you', 'Do I', 'Can I'], a: 2, e: 'Can I…? = Is it OK if I do it?', c: 'permission' },
  { q: 'I know how to play the piano. → I ___ the piano.', o: ['can play', 'can playing', 'can plays'], a: 0, e: 'Can = know how to.', c: 'ability' },
  { q: 'Please open the door. → ___ the door?', o: ['Can I open', 'Can you open', 'Do you open'], a: 1,
    e: 'Can you…? = Please do it.', c: 'request' },
  { q: 'It’s not permitted to take photos here. → You ___ photos here.', o: ['can take', 'don’t take', 'can’t take'], a: 2,
    e: 'Can’t = it’s not permitted.', c: 'permission' },
  { q: 'Is it OK if I use your car? → ___ your car?', o: ['Can I use', 'Can you use', 'Can I to use'], a: 0, e: 'Can I…? asks for permission.', c: 'permission' },
  { q: 'A: Can you play a musical instrument? B: Yes, I ___.', o: ['do', 'can', 'play'], a: 1, e: 'Short answer: Yes, I can.', c: 'short-answer' },
  { q: 'I can come on Tuesday, but I ___ come on Wednesday.', o: ['not can', 'don’t can', 'can’t'], a: 2, e: 'Can’t = it isn’t possible for me.', c: 'possibility' },
  { q: 'She ___ meet me after work. (= It’s possible for her.)', o: ['can', 'can to', 'cans'], a: 0, e: 'She can meet me.', c: 'possibility' },
];

/** Grammar Bank 5B — present continuous (SB p.132). */
const continuous: Draft[] = [
  { q: 'They ___ a party next door.', o: ['have', 'are having', 'having'], a: 1, e: 'Happening now: be + verb + -ing.', c: 'form', d: 1 },
  { q: 'Oh no! The baby ___.', o: ['cries', 'crying', 'is crying'], a: 2, e: 'Now: The baby is crying.', c: 'form' },
  { q: 'Look outside. It ___.', o: ['’s raining', 'rains', 'rain'], a: 0, e: 'It’s raining (now).', c: 'form' },
  { q: 'A: What ___ doing? B: I’m waiting for my brother.', o: ['you are', 'are you', 'do you'], a: 1, e: 'Question: are + you + -ing.', c: 'question', d: 3 },
  { q: 'She’s working in a café, but she ___ it much.', o: ['doesn’t enjoy', 'not enjoying', 'isn’t enjoying'], a: 2,
    e: 'Negative: isn’t + -ing.', c: 'negative' },
  { q: 'I’m ___ with my parents for a week.', o: ['staying', 'stay', 'stays'], a: 0, e: 'Be + verb + -ing: I’m staying.', c: 'form' },
  { q: 'dance → ___', o: ['danceing', 'dancing', 'dancting'], a: 1, e: 'Verb ending in e: drop the e and add -ing: dancing.', c: 'spelling' },
  { q: 'swim → ___', o: ['swiming', 'swimming', 'swimeing'], a: 1,
    e: 'One vowel + one consonant: double the consonant: swimming.', c: 'spelling' },
  { q: 'shop → ___', o: ['shoping', 'shopping', 'shopeing'], a: 1, e: 'Double the p: shopping.', c: 'spelling' },
  { q: 'study → ___', o: ['studing', 'studiing', 'studying'], a: 2, e: 'Just add -ing: studying.', c: 'spelling' },
  { q: 'What’s he doing? — He ___.', o: ['’s cooking', 'cooks', 'cook'], a: 0, e: 'Now: He’s cooking.', c: 'form' },
  { q: 'A: Is she still studying drama? B: No, she ___.', o: ['doesn’t', 'isn’t', 'not'], a: 1, e: 'No, she isn’t.', c: 'short-answer' },
  { q: 'I’m working at home ___ because my daughter isn’t very well.', o: ['every day', 'usually', 'this week'], a: 2,
    e: 'Present continuous for a temporary period: this week.', c: 'temporary', d: 3 },
  { q: 'A: Are they watching TV? B: Yes, they ___.', o: ['are', 'do', 'watch'], a: 0, e: 'Yes, they are.', c: 'short-answer' },
];

/** Grammar Bank 5C — present simple or present continuous? (SB p.132). */
const simpleOrCont: Draft[] = [
  { q: 'It always ___ here in winter.', o: ['snows', 'is snowing', 'snowing'], a: 0, e: 'Always = habit: present simple.', c: 'habit', d: 1 },
  { q: 'Look! It ___.', o: ['snows', 'is snowing', 'snow'], a: 1, e: 'Look! = now: present continuous.', c: 'now', d: 1 },
  { q: 'My sister works in a bank. Today she ___ at home.', o: ['works', 'work', 'is working'], a: 2,
    e: 'Today = now / around now: present continuous.', c: 'now' },
  { q: 'A: What ___? B: I’m a teacher.', o: ['do you do', 'are you doing', 'you do'], a: 0,
    e: 'What do you do? = What’s your job?', c: 'job', d: 3 },
  { q: 'A: What ___? B: I’m waiting for a friend.', o: ['do you do', 'are you doing', 'you are doing'], a: 1,
    e: 'What are you doing? = now.', c: 'job', d: 3 },
  { q: 'Is Martin at home? — No, he isn’t. He ___ football with his friends.', o: ['plays', 'play', 'is playing'], a: 2,
    e: 'Now: He’s playing football.', c: 'now' },
  { q: 'How often ___ to the hairdresser’s? — About once a month.', o: ['do you go', 'are you going', 'you go'], a: 0,
    e: 'How often / once a month = habit: present simple.', c: 'habit' },
  { q: 'Don’t make a noise! Your father ___.', o: ['sleeps', 'is sleeping', 'sleep'], a: 1, e: 'Now: is sleeping.', c: 'now' },
  { q: 'He doesn’t usually ___ in the afternoon.', o: ['sleeping', 'is sleeping', 'sleep'], a: 2, e: 'Usually = habit: doesn’t + infinitive.', c: 'habit' },
  { q: 'Listen! The neighbours ___ a party again.', o: ['are having', 'have', 'has'], a: 0, e: 'Listen! = now.', c: 'now' },
  { q: 'They ___ a party every weekend!', o: ['are having', 'have', 'having'], a: 1, e: 'Every weekend = habit.', c: 'habit' },
  { q: 'I’m a vegetarian. I ___ meat.', o: ['am not eating', 'not eat', 'don’t eat'], a: 2, e: 'General truth: present simple.', c: 'habit' },
  { q: 'What are you cooking? I ___ really hungry.', o: ['’m', '’m being', 'am being'], a: 0,
    e: 'Be (hungry) is a state: I’m hungry.', c: 'state', d: 3 },
];

export const gramFile5: Question[] = [
  ...grammarTopic('can-cant', 'cn', 5, GB(132, '5A'), can),
  ...grammarTopic('present-continuous', 'pc', 5, GB(132, '5B'), continuous),
  ...grammarTopic('simple-or-continuous', 'sc', 5, GB(132, '5C'), simpleOrCont),
];
