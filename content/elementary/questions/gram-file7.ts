import type { Question } from '../../types';
import { GB, grammarTopic, type Draft } from './build';

/** Grammar Bank 7A — past simple of be: was / were (SB p.136). */
const pastBe: Draft[] = [
  { q: 'Vincent van Gogh ___ an artist.', o: ['was', 'were', 'is'], a: 0, e: 'Past of is with he / she / it: was.', c: 'form', d: 1 },
  { q: 'The Beatles ___ famous in the 1960s.', o: ['was', 'were', 'are'], a: 1, e: 'Past of are with they: were.', c: 'form', d: 1 },
  { q: 'She ___ in class yesterday.', o: ['weren’t', 'isn’t', 'wasn’t'], a: 2, e: 'Negative past with she: wasn’t.', c: 'negative' },
  { q: 'Where ___ last night?', o: ['were you', 'you were', 'was you'], a: 0, e: 'Question: were + you: Where were you?', c: 'question', d: 3 },
  { q: 'I ___ born in Scotland.', o: ['were', 'was', 'am'], a: 1, e: 'We use was / were with born: I was born.', c: 'born' },
  { q: 'Where ___ your mother born?', o: ['were', 'did', 'was'], a: 2, e: 'Where was your mother born?', c: 'born' },
  { q: 'A: Was it good? B: No, it ___.', o: ['wasn’t', 'weren’t', 'didn’t'], a: 0, e: 'Short answer: No, it wasn’t.', c: 'short-answer' },
  { q: 'A: Were the tickets expensive? B: Yes, they ___.', o: ['was', 'were', 'are'], a: 1, e: 'Yes, they were.', c: 'short-answer' },
  { q: 'My father’s at work. → (yesterday) My father ___ at work.', o: ['is', 'were', 'was'], a: 2, e: 'is → was.', c: 'present-to-past' },
  { q: 'They aren’t in the office. → They ___ in the office.', o: ['weren’t', 'wasn’t', 'didn’t'], a: 0, e: 'aren’t → weren’t.', c: 'present-to-past' },
  { q: 'Is it hot today? → ___ hot yesterday?', o: ['Were it', 'Was it', 'Did it'], a: 1, e: 'Is it → Was it.', c: 'present-to-past' },
  { q: 'I’m not at school. → I ___ at school.', o: ['weren’t', 'didn’t', 'wasn’t'], a: 2, e: 'I’m not → I wasn’t.', c: 'present-to-past' },
  { q: 'Her father ___ German and her mother was from Italy.', o: ['was', 'were', 'is'], a: 0, e: 'Her father = he: was.', c: 'form' },
  { q: 'A: Were her parents Argentinian? B: No, they ___.', o: ['wasn’t', 'weren’t', 'didn’t'], a: 1, e: 'No, they weren’t.', c: 'short-answer' },
];

/** Grammar Bank 7B — past simple: regular verbs (SB p.136). */
const pastRegular: Draft[] = [
  { q: 'I ___ the flights yesterday.', o: ['booked', 'book', 'booking'], a: 0, e: 'Regular past: verb + -ed.', c: 'form', d: 1 },
  { q: 'We ___ at the airport at 10.00 this morning.', o: ['arriveed', 'arrived', 'arrive'], a: 1, e: 'Verb ending in e: add -d: arrived.', c: 'spelling' },
  { q: 'I ___ English at school.', o: ['studyed', 'study', 'studied'], a: 2, e: 'Consonant + y → -ied: studied.', c: 'spelling' },
  { q: 'stop → ___', o: ['stopped', 'stoped', 'stopt'], a: 0, e: 'One vowel + one consonant: double + -ed: stopped.', c: 'spelling' },
  { q: 'He ___ last night.', o: ['didn’t cooked', 'didn’t cook', 'not cooked'], a: 1,
    e: 'Negative: didn’t + infinitive: He didn’t cook. NOT didn’t cooked.', c: 'negative', d: 3 },
  { q: '___ you listen to the news yesterday?', o: ['Do', 'Were', 'Did'], a: 2, e: 'Past question: Did + you + infinitive.', c: 'question' },
  { q: 'Did she ___ sport at university?', o: ['play', 'played', 'plays'], a: 0, e: 'After did: infinitive.', c: 'question', d: 3 },
  { q: 'They ___ late last week.', o: ['work', 'worked', 'workked'], a: 1, e: 'Regular -ed: worked.', c: 'form' },
  { q: 'She ___ a lot in 2018.', o: ['travels', 'travel', 'travelled'], a: 2, e: 'Past: travelled.', c: 'form' },
  { q: 'We ___ in France ten years ago.', o: ['didn’t live', 'didn’t lived', 'don’t lived'], a: 0, e: 'didn’t + infinitive.', c: 'negative' },
  { q: 'Anna ___ a lot of questions at the meeting.', o: ['ask', 'asked', 'askked'], a: 1, e: 'Regular past: asked.', c: 'form' },
  { q: 'The film was very sad. Did you ___?', o: ['cried', 'cryed', 'cry'], a: 2, e: 'Did + infinitive: Did you cry?', c: 'question' },
  { q: 'My brother ___ video games all day yesterday.', o: ['played', 'plaied', 'playd'], a: 0, e: 'Vowel + y just adds -ed: played.', c: 'spelling' },
  { q: 'A: Did you call your mother? B: No, I ___.', o: ['don’t', 'didn’t', 'wasn’t'], a: 1, e: 'Short answer: No, I didn’t.', c: 'short-answer' },
  { q: 'I ___ my mother on her birthday. I forgot!', o: ['didn’t called', 'not called', 'didn’t call'], a: 2, e: 'didn’t + infinitive.', c: 'negative' },
];

/** Grammar Bank 7C — past simple: irregular verbs (SB p.136). */
const pastIrregular: Draft[] = [
  { q: 'I ___ to Iceland in December.', o: ['went', 'goed', 'gone'], a: 0, e: 'go → went.', c: 'form', d: 1 },
  { q: 'Did you ___ to a party?', o: ['went', 'go', 'goes'], a: 1, e: 'After did: infinitive: Did you go? NOT Did you went?', c: 'question', d: 3 },
  { q: 'I ___ a bag last night.', o: ['buyed', 'buy', 'bought'], a: 2, e: 'buy → bought.', c: 'form' },
  { q: 'She ___ a red dress.', o: ['wore', 'weared', 'wear'], a: 0, e: 'wear → wore.', c: 'form' },
  { q: 'He ___ hello.', o: ['sayed', 'said', 'says'], a: 1, e: 'say → said /sed/.', c: 'form' },
  { q: 'We ___ a taxi to Trafalgar Square.', o: ['taked', 'take', 'took'], a: 2, e: 'take → took.', c: 'form' },
  { q: 'We ___ home at 4.00 a.m.', o: ['got', 'getted', 'get'], a: 0, e: 'get → got.', c: 'form' },
  { q: 'We ___ tired, but we were very happy!', o: ['feeled', 'felt', 'feel'], a: 1, e: 'feel → felt.', c: 'form' },
  { q: 'We ___ see the whole city from the plane.', o: ['can', 'could', 'canned'], a: 1, e: 'The past of can is could.', c: 'could' },
  { q: 'I ___ see him.', o: ['didn’t can', 'couldn’t', 'can’t not'], a: 1, e: 'Negative: couldn’t NOT didn’t can.', c: 'could', d: 3 },
  { q: 'He didn’t ___ her surname.', o: ['knew', 'knowed', 'know'], a: 2, e: 'didn’t + infinitive: didn’t know.', c: 'negative' },
  { q: 'Where ___ her shoes? — She bought them in Paris.', o: ['did she buy', 'did she bought', 'she bought'], a: 0, e: 'QuASI: Where did she buy…?', c: 'question' },
  { q: 'What time ___ home? — We got home late.', o: ['you got', 'did you get', 'did you got'], a: 1, e: 'What time did you get home?', c: 'question' },
  { q: 'I ___ my phone in my car.', o: ['finded', 'find', 'found'], a: 2, e: 'find → found.', c: 'form' },
  { q: 'People ___ out again and danced.', o: ['came', 'comed', 'come'], a: 0, e: 'come → came.', c: 'form' },
];

export const gramFile7: Question[] = [
  ...grammarTopic('past-be', 'pb', 7, GB(136, '7A'), pastBe),
  ...grammarTopic('past-regular', 'pr', 7, GB(136, '7B'), pastRegular),
  ...grammarTopic('past-irregular', 'pi', 7, GB(136, '7C'), pastIrregular),
];
