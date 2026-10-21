import type { Question } from '../../types';
import { soundRuleDrafts } from '../../common/sound-rules';
import { confusableSounds, vowelSounds } from '../pronunciation';
import { makeQuestions, type Draft } from './build';

const S_RULE = 'Final -s / -es: /s/ after the sounds /p/ /t/ /k/ /f/, /z/ after other sounds, /ɪz/ after ce, ch, ge, se, sh, ss, x.';
const ED_RULE = '-ed is /t/ or /d/; it is /ɪd/ only after the sounds /t/ and /d/ (wanted, decided).';

/** Endings: final -s / -es (lessons 2A, 3A) and -ed (lesson 7B). */
const endings: Draft[] = [
  { q: 'Which word has a different -s ending?', o: ['books', 'lamps', 'keys'], a: 2, e: `keys /z/; books and lamps /s/. ${S_RULE}`, c: 's-z' },
  { q: 'Which word has a different -s ending?', o: ['tickets', 'pens', 'photos'], a: 0, e: `tickets /s/; pens and photos /z/. ${S_RULE}`, c: 's-z' },
  { q: 'Which word has a different -s ending?', o: ['glasses', 'phones', 'purses'], a: 1, e: `phones /z/; glasses and purses /ɪz/. ${S_RULE}`, c: 'iz' },
  { q: 'Which word has a different -s ending?', o: ['boxes', 'pieces', 'files'], a: 2, e: `files /z/; boxes and pieces /ɪz/. ${S_RULE}`, c: 'iz' },
  { q: 'Which word has a different -s ending?', o: ['headphones', 'classes', 'pages'], a: 0, e: `headphones /z/; classes and pages /ɪz/. ${S_RULE}`, c: 'iz' },
  { q: 'Which word has a different -s ending?', o: ['watches', 'tissues', 'boxes'], a: 1, e: `tissues /z/; watches and boxes /ɪz/. ${S_RULE}`, c: 'iz' },
  { q: 'Which verb has a different -s ending?', o: ['speaks', 'drinks', 'rains'], a: 2, e: `rains /z/; speaks and drinks /s/. ${S_RULE}`, c: 's-z' },
  { q: 'Which verb has a different -s ending?', o: ['cooks', 'goes', 'does'], a: 0, e: `cooks /s/; goes and does /z/. ${S_RULE}`, c: 's-z' },
  { q: 'Which verb has a different -s ending?', o: ['watches', 'plays', 'finishes'], a: 1, e: `plays /z/; watches and finishes /ɪz/. ${S_RULE}`, c: 'iz' },
  { q: 'Which verb has a different -s ending?', o: ['stops', 'likes', 'closes'], a: 2, e: `closes /ɪz/; stops and likes /s/. ${S_RULE}`, c: 'iz' },
  { q: 'Which verb has a different -ed ending?', o: ['talked', 'called', 'used'], a: 0, e: `talked /t/; called and used /d/. ${ED_RULE}`, c: 't-d' },
  { q: 'Which verb has a different -ed ending?', o: ['looked', 'needed', 'booked'], a: 1, e: `needed /ɪd/; looked and booked /t/. ${ED_RULE}`, c: 'id' },
  { q: 'Which verb has a different -ed ending?', o: ['wanted', 'waited', 'arrived'], a: 2, e: `arrived /d/; wanted and waited /ɪd/. ${ED_RULE}`, c: 'id' },
  { q: 'Which verb has a different -ed ending?', o: ['asked', 'ended', 'painted'], a: 0, e: `asked /t/; ended and painted /ɪd/. ${ED_RULE}`, c: 'id' },
  { q: 'Which verb has a different -ed ending?', o: ['cooked', 'lived', 'finished'], a: 1, e: `lived /d/; cooked and finished /t/. ${ED_RULE}`, c: 't-d' },
  { q: 'Which verb has a different -ed ending?', o: ['stopped', 'watched', 'started'], a: 2, e: `started /ɪd/; stopped and watched /t/. ${ED_RULE}`, c: 'id' },
  { q: 'Which verb has a different -ed ending?', o: ['worked', 'played', 'travelled'], a: 0, e: `worked /t/; played and travelled /d/. ${ED_RULE}`, c: 't-d' },
  { q: 'Which verb has a different -ed ending?', o: ['liked', 'decided', 'stopped'], a: 1, e: `decided /ɪd/; liked and stopped /t/. ${ED_RULE}`, c: 'id' },
  { q: 'Which verb has a different -ed ending?', o: ['arrived', 'played', 'stopped'], a: 2, e: `stopped /t/; arrived and played /d/. ${ED_RULE}`, c: 't-d' },
  { q: 'Which verb has a different -ed ending?', o: ['danced', 'cried', 'studied'], a: 0, e: `danced /t/; cried and studied /d/. ${ED_RULE}`, c: 't-d' },
  { q: 'In which verb is the e of -ed pronounced?', o: ['closed', 'stopped', 'decided'], a: 2,
    e: `The e of -ed is pronounced only in /ɪd/: decided. ${ED_RULE}`, c: 'id', d: 3 },
];

/** Letters and sounds: o (4A), h (4C), silent letters (8C), ea (9A), /ɜː/ vs /ə/ (3B), the (11C). */
const letters: Draft[] = [
  { q: 'Which word has a different sound for the letter o?', o: ['doctor', 'home', 'job'], a: 1, e: 'home /əʊ/; doctor and job /ɒ/.', c: 'letter-o' },
  { q: 'Which word has a different sound for the letter o?', o: ['money', 'one', 'strong'], a: 2, e: 'strong /ɒ/; money and one /ʌ/.', c: 'letter-o' },
  { q: 'Which word has a different sound for the letter o?', o: ['model', 'go', 'no'], a: 0, e: 'model /ɒ/; go and no /əʊ/.', c: 'letter-o' },
  { q: 'Which word has a different sound for the letter o?', o: ['do', 'son', 'who'], a: 1, e: 'son /ʌ/; do and who /uː/.', c: 'letter-o' },
  { q: 'Which word has a different sound for the letter o?', o: ['mother', 'brother', 'don’t'], a: 2, e: 'don’t /əʊ/; mother and brother /ʌ/.', c: 'letter-o' },
  { q: 'Which word has a different sound for the letters ea?', o: ['bread', 'eat', 'meat'], a: 0, e: 'bread /e/; eat and meat /iː/. The most common sound of ea is /iː/.', c: 'letters-ea' },
  { q: 'Which word has a different sound for the letters ea?', o: ['tea', 'steak', 'peas'], a: 1, e: 'steak /eɪ/; tea and peas /iː/.', c: 'letters-ea' },
  { q: 'Which word has a different sound for the letters ea?', o: ['breakfast', 'healthy', 'eat'], a: 2, e: 'eat /iː/; breakfast and healthy /e/.', c: 'letters-ea' },
  { q: 'In which word is the h not pronounced?', o: ['hour', 'happy', 'hotel'], a: 0, e: 'The h in hour is silent: /ˈaʊə/.', c: 'silent-h' },
  { q: 'In which word is the h not pronounced?', o: ['hall', 'what', 'head'], a: 1, e: 'The h in what is silent: /wɒt/.', c: 'silent-h' },
  { q: 'In which word is the k not pronounced?', o: ['kitchen', 'key', 'know'], a: 2, e: 'The k in know is silent: /nəʊ/.', c: 'silent' },
  { q: 'In which word is the l not pronounced?', o: ['half', 'little', 'plane'], a: 0, e: 'The l in half is silent: /hɑːf/.', c: 'silent' },
  { q: 'In which word is the l not pronounced?', o: ['like', 'talk', 'leg'], a: 1, e: 'The l in talk is silent: /tɔːk/.', c: 'silent' },
  { q: 'In which word is the w not pronounced?', o: ['window', 'wait', 'write'], a: 2, e: 'The w in write is silent: /raɪt/.', c: 'silent' },
  { q: 'In which word is the s not pronounced?', o: ['island', 'sister', 'stops'], a: 0, e: 'The s in island is silent: /ˈaɪlənd/.', c: 'silent' },
  { q: 'In which word is the p not pronounced?', o: ['paper', 'cupboard', 'apple'], a: 1, e: 'The p in cupboard is silent: /ˈkʌbəd/.', c: 'silent' },
  { q: 'In which word is the t not pronounced?', o: ['letter', 'tea', 'listen'], a: 2, e: 'The t in listen is silent: /ˈlɪsn/.', c: 'silent' },
  { q: 'In which word is the u not pronounced?', o: ['guest', 'bus', 'lunch'], a: 0, e: 'The u in guest is silent: /gest/.', c: 'silent' },
  { q: 'In which word is the l not pronounced?', o: ['small', 'could', 'girl'], a: 1, e: 'The l in could is silent: /kʊd/.', c: 'silent' },
  { q: 'Which word has the sound /ɜː/ (bird)?', o: ['nurse', 'doctor', 'driver'], a: 0, e: 'ur, ir, er are /ɜː/ when stressed: nurse. Unstressed er / or are /ə/: doctor, driver.', c: 'er-or' },
  { q: 'Which word has the sound /ɜː/ (bird)?', o: ['lawyer', 'journalist', 'actor'], a: 1, e: 'journalist /ˈdʒɜːnəlɪst/. Lawyer and actor end with /ə/.', c: 'er-or' },
  { q: 'Which word has the sound /ɜː/ (bird)?', o: ['builder', 'teacher', 'work'], a: 2, e: 'or after w is usually /ɜː/: work. Builder and teacher end with /ə/.', c: 'er-or' },
  { q: 'Which word has the sound /ɜː/ (bird)?', o: ['thirty', 'doctor', 'teacher'], a: 0, e: 'thirty /ˈθɜːti/ — ir is stressed.', c: 'er-or' },
  { q: 'In which phrase is the pronounced /ðiː/?', o: ['the centre', 'the end', 'the world'], a: 1,
    e: 'Before a vowel sound the is /ðiː/ (or /ði/): the end. Before a consonant sound it is /ðə/.', c: 'the', d: 3 },
  { q: 'In which phrase is the pronounced /ðiː/?', o: ['the sun', 'the centre', 'the internet'], a: 2, e: 'the internet — a vowel sound follows.', c: 'the', d: 3 },
  { q: 'In which phrase is the pronounced /ðə/?', o: ['the world', 'the alphabet', 'the end'], a: 0, e: 'the world — a consonant sound follows.', c: 'the', d: 3 },
];

export const pronEndings: Question[] = makeQuestions(
  { topicId: 'ele-p-endings', categoryId: 'pronunciation', unit: 2, type: 'odd-one-out',
    source: { book: 'SB', page: 57, ref: 'Lessons 2A, 3A, 7B — final -s and -ed' }, slug: 'en' },
  endings,
);

export const pronLetters: Question[] = makeQuestions(
  { topicId: 'ele-p-letters', categoryId: 'pronunciation', unit: 4, type: 'choose-word',
    source: { book: 'SB', page: 31, ref: 'Lessons 3B, 4A, 4C, 8C, 9A, 11C — letters and sounds' }, slug: 'lt' },
  letters,
);

/** The Sound Bank rules test (SB p.166), derived from the page by the shared builder. */
export const pronRules: Question[] = makeQuestions(
  { topicId: 'ele-p-sound-rules', categoryId: 'pronunciation', unit: 1, type: 'choose-word',
    source: { book: 'SB', page: 166, ref: 'Sound Bank — vowel sounds, spelling rules' }, slug: 'rl' },
  soundRuleDrafts(vowelSounds, confusableSounds),
);
