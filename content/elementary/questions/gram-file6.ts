import type { Question } from '../../types';
import { GB, grammarTopic, type Draft } from './build';

/** Grammar Bank 6A — object pronouns (SB p.134). */
const objectPronouns: Draft[] = [
  { q: 'Can you help ___?', o: ['me', 'I', 'my'], a: 0, e: 'After a verb we use an object pronoun: help me.', c: 'form', d: 1 },
  { q: 'She doesn’t love ___.', o: ['he', 'him', 'his'], a: 1, e: 'Object pronoun for he: him.', c: 'form', d: 1 },
  { q: 'He phones ___ every day.', o: ['she', 'hers', 'her'], a: 2, e: 'Object pronoun for she: her.', c: 'form' },
  { q: 'Wait for ___!', o: ['us', 'we', 'our'], a: 0, e: 'After a preposition: for us.', c: 'preposition' },
  { q: 'Please help ___.', o: ['they', 'them', 'their'], a: 1, e: 'Object pronoun for they: them.', c: 'form' },
  { q: 'I call my mother once a week. → I call ___ once a week.', o: ['him', 'it', 'her'], a: 2, e: 'My mother → her.', c: 'replace' },
  { q: 'I can’t find my wallet. → I can’t find ___.', o: ['it', 'him', 'them'], a: 0, e: 'My wallet (a thing) → it.', c: 'replace' },
  { q: 'He meets his friends after work. → He meets ___ after work.', o: ['they', 'them', 'him'], a: 1, e: 'His friends → them.', c: 'replace' },
  { q: 'Can you help my friend and me? → Can you help ___?', o: ['we', 'them', 'us'], a: 2, e: 'My friend and me → us.', c: 'replace' },
  { q: 'Which sentence is correct?', o: ['I love you.', 'I you love.', 'I love your.'], a: 0,
    e: 'Object pronouns go after the verb: I love you. NOT I you love.', c: 'position', d: 3 },
  { q: 'I’m in love with ___.', o: ['she', 'her', 'hers'], a: 1, e: 'After a preposition: with her NOT with she.', c: 'preposition', d: 3 },
  { q: 'Give this money to ___.', o: ['he', 'his', 'him'], a: 2, e: 'After to: to him NOT to he.', c: 'preposition' },
  { q: 'My grandfather watches TV all day and never turns ___ off.', o: ['it', 'him', 'them'], a: 0, e: 'The TV → it.', c: 'replace' },
  { q: 'Mark loves Ruth but she doesn’t like ___.', o: ['he', 'him', 'her'], a: 1, e: 'Mark → him.', c: 'replace' },
];

/** Grammar Bank 6B — like + (verb + -ing) (SB p.134). */
const likeIng: Draft[] = [
  { q: 'I love ___.', o: ['shopping', 'shop', 'to shopping'], a: 0, e: 'Verb + -ing after love, like, don’t mind, hate.', c: 'form', d: 1 },
  { q: 'I don’t mind ___ up early.', o: ['get', 'getting', 'to getting'], a: 1, e: 'Don’t mind + -ing: getting up.', c: 'form' },
  { q: 'I hate ___ at night.', o: ['drive', 'drives', 'driving'], a: 2, e: 'Hate + -ing: driving.', c: 'form' },
  { q: 'I don’t like ___ housework.', o: ['doing', 'do', 'does'], a: 0, e: 'Like + -ing: doing housework.', c: 'form' },
  { q: 'I enjoy ___ football on TV.', o: ['watch', 'watching', 'watches'], a: 1, e: 'Enjoy + -ing.', c: 'enjoy-prefer' },
  { q: 'Matt loves ___ tennis.', o: ['playing', 'plays', 'play'], a: 0, e: 'Love + -ing.', c: 'form' },
  { q: 'He hates ___ a tie.', o: ['wear', 'wearing', 'wears'], a: 1, e: 'Hate + -ing.', c: 'form' },
  { q: 'run → ___', o: ['runing', 'runeing', 'running'], a: 2, e: 'One vowel + one consonant: double: running.', c: 'spelling' },
  { q: 'write → ___', o: ['writing', 'writeing', 'writting'], a: 0, e: 'Drop the e: writing.', c: 'spelling' },
  { q: 'get → ___', o: ['geting', 'getting', 'geteing'], a: 1, e: 'Double the t: getting.', c: 'spelling' },
  { q: 'I like ___ to the cinema.', o: ['go', 'goes', 'going'], a: 2, e: 'Like + -ing: going.', c: 'form' },
  { q: 'He doesn’t mind ___ in an office.', o: ['working', 'work', 'works'], a: 0, e: 'Don’t mind + -ing.', c: 'form' },
  { q: 'I hate ___ early.', o: ['get up', 'getting up', 'gets up'], a: 1, e: 'Hate + -ing.', c: 'form' },
];

/** Grammar Bank 6C — be or do? (SB p.134). */
const beOrDo: Draft[] = [
  { q: '___ hungry?', o: ['Are you', 'Do you', 'Does you'], a: 0, e: 'Hungry is an adjective, so we use be: Are you hungry?', c: 'adjective', d: 1 },
  { q: '___ have a car?', o: ['Are you', 'Do you', 'Is you'], a: 1, e: 'Have is a normal verb: Do you have…?', c: 'verb', d: 1 },
  { q: '___ listening to me?', o: ['Do you', 'Does you', 'Are you'], a: 2, e: 'Present continuous: Are you + -ing?', c: 'continuous' },
  { q: '___ know those people?', o: ['Do you', 'Are you', 'Is you'], a: 0, e: 'Know is a normal verb: Do you know…?', c: 'verb' },
  { q: '___ waiting for a friend?', o: ['Do you', 'Are you', 'Have you'], a: 1, e: 'Present continuous: Are you waiting…?', c: 'continuous' },
  { q: '___ like classical music?', o: ['Are you', 'Is you', 'Do you'], a: 2, e: 'Like is a normal verb: Do you like…?', c: 'verb' },
  { q: 'Where ___ Gemma going? — She’s going to the gym.', o: ['is', 'does', 'do'], a: 0, e: 'Present continuous: Where is she going?', c: 'continuous' },
  { q: '___ Matt like shopping? — He doesn’t mind it.', o: ['Is', 'Does', 'Do'], a: 1, e: 'Present simple: Does Matt like…?', c: 'verb' },
  { q: 'Why ___ crying? — Because I’m sad.', o: ['do you', 'you are', 'are you'], a: 2, e: 'Present continuous: Why are you crying?', c: 'continuous' },
  { q: '___ your boyfriend cook? — Yes. He’s making dinner right now.', o: ['Does', 'Is', 'Do'], a: 0, e: 'Present simple: Does he cook?', c: 'verb' },
  { q: 'How old ___ your father? — He’s 66.', o: ['does', 'is', 'do'], a: 1, e: 'Age uses be: How old is…?', c: 'adjective' },
  { q: 'He’s Spanish. → ___ Spanish?', o: ['Does he', 'Do he', 'Is he'], a: 2, e: 'Invert be and the subject: Is he Spanish?', c: 'adjective' },
  { q: 'He plays the piano. → ___ the piano?', o: ['Does he play', 'Is he play', 'Does he plays'], a: 0, e: 'Does + he + infinitive.', c: 'verb', d: 3 },
  { q: 'A: ___ busy? B: Yes. We’re doing our homework.', o: ['Do you', 'Are you', 'Does you'], a: 1, e: 'Busy is an adjective: Are you busy?', c: 'adjective' },
];

export const gramFile6: Question[] = [
  ...grammarTopic('object-pronouns', 'op', 6, GB(134, '6A'), objectPronouns),
  ...grammarTopic('like-verb-ing', 'li', 6, GB(134, '6B'), likeIng),
  ...grammarTopic('be-or-do', 'bd', 6, GB(134, '6C'), beOrDo),
];
