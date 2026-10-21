import type { Question } from '../../types';
import { GB, grammarTopic, type Draft } from './build';

/** Grammar Bank 3A — present simple + and − (SB p.128). */
const posNeg: Draft[] = [
  { q: 'My mother ___ fantastic food.', o: ['cook', 'cooks', 'cooking'], a: 1, e: 'He / she / it + verb + -s: she cooks.', c: 'third-person', d: 1 },
  { q: 'I ___ drink tea.', o: ['don’t', 'doesn’t', 'not'], a: 0, e: 'With I the negative is don’t + verb.', c: 'negative', d: 1 },
  { q: 'He ___ the guitar.', o: ['don’t play', 'doesn’t plays', 'doesn’t play'], a: 2,
    e: 'Negative: doesn’t + infinitive: He doesn’t play. NOT He doesn’t plays.', c: 'negative', d: 3 },
  { q: 'She ___ two children.', o: ['has', 'haves', 'have'], a: 0, e: 'Have is irregular: he / she / it has /hæz/.', c: 'irregular', d: 3 },
  { q: 'He ___ to the cinema on Fridays.', o: ['go', 'goes', 'gos'], a: 1, e: 'Go → goes /gəʊz/ with he, she, it.', c: 'irregular' },
  { q: 'My husband ___ housework.', o: ['do', 'dos', 'does'], a: 2, e: 'Do → does /dʌz/ with he, she, it.', c: 'irregular' },
  { q: 'The supermarket ___ at 5.30.', o: ['closes', 'close', 'closs'], a: 0, e: 'It closes: the supermarket = it.', c: 'third-person' },
  { q: 'My sister ___ French.', o: ['don’t study', 'doesn’t study', 'doesn’t studies'], a: 1,
    e: 'She doesn’t + infinitive: She doesn’t study French.', c: 'negative' },
  { q: 'He ___ in a flat in the city centre.', o: ['live', 'living', 'lives'], a: 2, e: 'He lives.', c: 'third-person' },
  { q: 'My son ___ a guitar for his birthday.', o: ['wants', 'want', 'wantes'], a: 0, e: 'He wants.', c: 'third-person' },
  { q: 'Our lessons ___ at 5.00.', o: ['finishes', 'finish', 'finishs'], a: 1,
    e: 'Our lessons = they, so no -s: they finish.', c: 'plural-subject', d: 3 },
  { q: 'She ___ every evening.', o: ['studys', 'study', 'studies'], a: 2, e: 'Consonant + y → -ies: she studies.', c: 'spelling' },
  { q: 'British people ___ gardens.', o: ['like', 'likes', 'liking'], a: 0, e: 'British people = they: they like.', c: 'plural-subject' },
  { q: 'Paolo ___ glasses.', o: ['wear', 'wears', 'wearing'], a: 1, e: 'Paolo = he: he wears.', c: 'third-person' },
  { q: 'They ___ fast food.', o: ['doesn’t eat', 'not eat', 'don’t eat'], a: 2, e: 'They don’t + verb.', c: 'negative' },
];

/** Grammar Bank 3B — present simple ? (SB p.128). */
const questions: Draft[] = [
  { q: '___ you live in New York?', o: ['Do', 'Does', 'Are'], a: 0, e: 'Questions with you: Do + you + infinitive.', c: 'do-does', d: 1 },
  { q: '___ he work at night?', o: ['Do', 'Does', 'Is'], a: 1, e: 'With he / she / it we use does.', c: 'do-does', d: 1 },
  { q: '___ your husband cook?', o: ['Do', 'Is', 'Does'], a: 2, e: 'Your husband = he: Does your husband cook?', c: 'do-does' },
  { q: 'Does she ___ the guitar?', o: ['play', 'plays', 'playing'], a: 0,
    e: 'After does we use the infinitive: Does she play? NOT Does she plays?', c: 'infinitive', d: 3 },
  { q: '___ the students in this class speak good English?', o: ['Does', 'Do', 'Are'], a: 1,
    e: 'The students = they: Do they speak…?', c: 'do-does' },
  { q: '___ it rain a lot in your country?', o: ['Do', 'Is', 'Does'], a: 2, e: 'It → Does it rain…?', c: 'do-does' },
  { q: 'A: Do you live in New York? B: No, we ___.', o: ['don’t', 'doesn’t', 'aren’t'], a: 0, e: 'Short answer: No, we don’t.', c: 'short-answer' },
  { q: 'A: Does he work at night? B: Yes, he ___.', o: ['do', 'does', 'works'], a: 1, e: 'Short answer: Yes, he does.', c: 'short-answer' },
  { q: 'A: Does Angela like her job? B: No, she ___.', o: ['don’t', 'isn’t', 'doesn’t'], a: 2, e: 'No, she doesn’t.', c: 'short-answer' },
  { q: 'She speaks foreign languages. ___ German?', o: ['Does she speak', 'Does she speaks', 'Do she speak'], a: 0,
    e: 'Does + she + infinitive: Does she speak German?', c: 'infinitive' },
  { q: 'My dad drives a Ferrari. ___ fast?', o: ['Do he drive', 'Does he drive', 'Does he drives'], a: 1,
    e: 'Does + he + infinitive.', c: 'infinitive' },
  { q: 'We have two children. — ___ boys or girls?', o: ['Does you have', 'Have you', 'Do you have'], a: 2,
    e: 'Present simple question: Do you have…?', c: 'do-does' },
  { q: 'Teresa doesn’t live in a flat. ___ in a house?', o: ['Does she live', 'Is she live', 'Do she lives'], a: 0,
    e: 'Does she live…?', c: 'infinitive' },
  { q: 'In “Does she live here?”, what is does?', o: ['a main verb', 'an auxiliary', 'a past form'], a: 1,
    e: 'In questions do / does is an auxiliary. In “He does exercise every day” it is a normal verb.', c: 'auxiliary', d: 3 },
];

/** Grammar Bank 3C — word order in questions (SB p.128). */
const wordOrder: Draft[] = [
  { q: 'Which question is correct?', o: ['Where you live?', 'Where do you live?', 'Where live you?'], a: 1,
    e: 'QuASI: Question word + Auxiliary + Subject + Infinitive: Where do you live?', c: 'quasi', d: 1 },
  { q: 'Which question is correct?', o: ['How many children do you have?', 'How many children you have?', 'How many do you children have?'], a: 0,
    e: 'How many + noun + do + you + have?', c: 'quasi' },
  { q: 'Which question is correct?', o: ['Your job is interesting?', 'Is interesting your job?', 'Is your job interesting?'], a: 2,
    e: 'With be: be before the subject: Is your job interesting?', c: 'be' },
  { q: 'What colour ___?', o: ['is his car', 'his car is', 'does his car'], a: 0, e: 'What colour + is + his car?', c: 'what-phrase' },
  { q: 'Where ___ work?', o: ['your brother does', 'does your brother', 'do your brother'], a: 1,
    e: 'Where + does + your brother + work?', c: 'quasi' },
  { q: 'What kind of magazines ___?', o: ['you read', 'read you', 'do you read'], a: 2, e: 'What kind of + noun + do + you + read?', c: 'what-phrase' },
  { q: 'What ___ at the weekend?', o: ['does he do', 'he does', 'does he'], a: 0, e: 'What + does + he + do?', c: 'quasi' },
  { q: '___ stressed in your job?', o: ['Do you', 'Are you', 'You are'], a: 1, e: 'Stressed is an adjective, so we use be: Are you stressed?', c: 'be', d: 3 },
  { q: 'How do you ___ that in English?', o: ['saying', 'says', 'say'], a: 2, e: 'How + do + you + say (infinitive)?', c: 'quasi' },
  { q: 'Who ___ live with?', o: ['do you', 'are you', 'you'], a: 0, e: 'Who do you live with?', c: 'quasi' },
  { q: 'What ___ your father do?', o: ['do', 'does', 'is'], a: 1, e: 'Your father = he: What does your father do?', c: 'quasi' },
  { q: '___ old is she?', o: ['What', 'Who', 'How'], a: 2, e: 'We ask about age with How old…?', c: 'question-word', d: 1 },
  { q: '___ do you prefer, cats or dogs?', o: ['Which', 'Who', 'Where'], a: 0,
    e: 'Which = a choice between a small number of things.', c: 'question-word' },
  { q: '___ do you have language classes? — On Mondays and Wednesdays.', o: ['Where', 'When', 'Who'], a: 1,
    e: 'When asks about time.', c: 'question-word' },
  { q: '___ do you like him? — Because he’s a fantastic actor.', o: ['How', 'What', 'Why'], a: 2,
    e: 'Why asks for a reason; the answer starts with because.', c: 'question-word' },
];

export const gramFile3: Question[] = [
  ...grammarTopic('present-simple-pos-neg', 'ps', 3, GB(128, '3A'), posNeg),
  ...grammarTopic('present-simple-questions', 'pq', 3, GB(128, '3B'), questions),
  ...grammarTopic('question-word-order', 'wo', 3, GB(128, '3C'), wordOrder),
];
