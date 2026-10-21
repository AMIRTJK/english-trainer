import type { Question } from '../../types';
import { VB, vocabTopic, type Draft } from './build';

/** Days and numbers, SB p.148. */
const daysNumbers: Draft[] = [
  { q: 'Saturday and Sunday are ___.', o: ['the weekend', 'a weekday', 'the week'], a: 0, e: 'The weekend = Saturday and Sunday.', c: 'days', d: 1 },
  { q: 'Monday, Tuesday, ___, Thursday', o: ['Friday', 'Wednesday', 'Sunday'], a: 1, e: 'Monday, Tuesday, Wednesday, Thursday.', c: 'days', d: 1 },
  { q: 'The day after Friday is ___.', o: ['Saturday', 'Thursday', 'Sunday'], a: 0, e: 'Friday, Saturday, Sunday.', c: 'days' },
  { q: 'Have a good weekend. — ___', o: ['You too.', 'See you.', 'Thank.'], a: 0, e: 'Have a good weekend. — You too.', c: 'phrases' },
  { q: 'Which day is a weekday?', o: ['Saturday', 'Wednesday', 'Sunday'], a: 1, e: 'A weekday = Monday–Friday.', c: 'days' },
  { q: '7 + 6 = ___', o: ['thirty', 'fourteen', 'thirteen'], a: 2, e: 'Seven plus six is thirteen.', c: 'numbers' },
  { q: '40 = ___', o: ['forty', 'fourty', 'fourteen'], a: 0, e: '40 is spelled forty — no u.', c: 'spelling', d: 3 },
  { q: '90 = ___', o: ['nineteen', 'ninety', 'ninty'], a: 1, e: '90 = ninety.', c: 'numbers' },
  { q: '100 = ___', o: ['a thousand', 'one hundreds', 'a hundred'], a: 2, e: '100 = a hundred.', c: 'high-numbers' },
  { q: '350 = three hundred ___ fifty', o: ['and', 'a', 'of'], a: 0, e: 'We say and after hundred: three hundred and fifty.', c: 'high-numbers', d: 3 },
  { q: '1,000,000 = a ___', o: ['thousand', 'million', 'hundred'], a: 1, e: '1,000,000 = a million.', c: 'high-numbers' },
  { q: '2,300,000 = two ___ three hundred thousand', o: ['millions', 'thousand', 'million'], a: 2,
    e: 'No -s on million after a number: two million.', c: 'high-numbers', d: 3 },
  { q: 'In a phone number, 44 is “four four” or “___ four”.', o: ['double', 'two', 'twice'], a: 0, e: '44 = double four.', c: 'phone', d: 3 },
  { q: 'In a phone number we can say 0 as “zero” or “___”.', o: ['nothing', 'oh', 'no'], a: 1, e: '0 = zero or oh /əʊ/.', c: 'phone' },
  { q: '25,000 = twenty-five ___', o: ['thousands', 'hundred', 'thousand'], a: 2, e: '25,000 = twenty-five thousand.', c: 'high-numbers' },
];

/** Countries and nationalities, SB p.149. */
const countries: Draft[] = [
  { q: 'Spain is in ___.', o: ['Europe', 'Asia', 'Africa'], a: 0, e: 'Spain is in Europe.', c: 'continents', d: 1 },
  { q: 'Japan is in ___.', o: ['Europe', 'Asia', 'South America'], a: 1, e: 'Japan is in Asia.', c: 'continents', d: 1 },
  { q: 'Argentina is in ___.', o: ['North America', 'Africa', 'South America'], a: 2, e: 'Argentina is in South America.', c: 'continents' },
  { q: 'I’m from Poland. I’m ___.', o: ['Polish', 'Polland', 'Polian'], a: 0, e: 'Poland → Polish.', c: 'nationality' },
  { q: 'They’re from Brazil. They’re ___.', o: ['Brazilish', 'Brazilian', 'Brazilese'], a: 1, e: 'Brazil → Brazilian.', c: 'nationality' },
  { q: 'He’s from China. He’s ___.', o: ['Chinian', 'Chinish', 'Chinese'], a: 2, e: 'China → Chinese.', c: 'nationality' },
  { q: 'She’s from Switzerland. She’s ___.', o: ['Swiss', 'Switz', 'Switzish'], a: 0, e: 'Switzerland → Swiss.', c: 'nationality', d: 3 },
  { q: 'We’re from the USA. We’re ___.', o: ['English', 'American', 'USA'], a: 1, e: 'The USA → American.', c: 'nationality' },
  { q: 'England, Scotland, Wales and Northern Ireland = ___.', o: ['Britain Ireland', 'Europe', 'the United Kingdom'], a: 2,
    e: 'The United Kingdom (the UK) = England, Scotland, Wales and Northern Ireland.', c: 'uk', d: 3 },
  { q: 'People from the UK are ___.', o: ['British', 'English', 'Scottish'], a: 0,
    e: 'The nationality of the UK is British. English and Scottish are only part of it.', c: 'uk', d: 3 },
  { q: 'She’s from Hungary. She’s ___.', o: ['Hungarish', 'Hungarian', 'Hungary'], a: 1, e: 'Hungary → Hungarian.', c: 'nationality' },
  { q: 'He’s from Egypt. He’s ___.', o: ['Egyptish', 'Egypt', 'Egyptian'], a: 2, e: 'Egypt → Egyptian.', c: 'nationality' },
  { q: 'Which word is different?', o: ['Chinese', 'Brazil', 'Hungary'], a: 0, e: 'Chinese is a nationality. Brazil and Hungary are countries.', c: 'odd-one-out', d: 3 },
  { q: 'Which word is different?', o: ['Italian', 'France', 'Japanese'], a: 1, e: 'France is a country. Italian and Japanese are nationalities.', c: 'odd-one-out', d: 3 },
  { q: 'Which word is different?', o: ['Africa', 'Asia', 'Ireland'], a: 2, e: 'Ireland is a country. Africa and Asia are continents.', c: 'odd-one-out', d: 3 },
  { q: 'They’re from the Czech Republic. They’re ___.', o: ['Czech', 'Czechish', 'Czechian'], a: 0, e: 'The Czech Republic → Czech.', c: 'nationality' },
];

/** Classroom language, SB p.150 and lesson 1C. */
const classroom: Draft[] = [
  { q: 'Open your books, please. Go ___ page 84.', o: ['to', 'at', 'on'], a: 0, e: 'Go to page 84.', c: 'teacher' },
  { q: 'Look ___ the board.', o: ['to', 'at', 'in'], a: 1, e: 'Look at the board.', c: 'teacher' },
  { q: 'Work ___ pairs.', o: ['on', 'at', 'in'], a: 2, e: 'Work in pairs (or groups).', c: 'teacher' },
  { q: 'Please turn ___ your phone.', o: ['off', 'out', 'down'], a: 0, e: 'Turn off your phone.', c: 'teacher' },
  { q: 'Listen and ___.', o: ['answer', 'repeat', 'talk'], a: 1, e: 'Listen and repeat.', c: 'teacher' },
  { q: 'Sorry, can you ___ that, please?', o: ['answer', 'say again it', 'repeat'], a: 2, e: 'Sorry, can you repeat that, please?', c: 'student' },
  { q: 'How do you ___ it? — C-A-T.', o: ['spell', 'say', 'read'], a: 0, e: 'How do you spell it?', c: 'student' },
  { q: 'How do you ___ gato in English? — It’s ‘cat’.', o: ['spell', 'say', 'repeat'], a: 1, e: 'How do you say … in English?', c: 'student' },
  { q: 'I ___ understand.', o: ['not', 'no', 'don’t'], a: 2, e: 'I don’t understand.', c: 'student' },
  { q: 'Can I have a copy, please? — ___', o: ['Here you are.', 'You too.', 'Fine, thanks.'], a: 0, e: 'Here you are = when you give something.', c: 'student' },
  { q: 'Which is NOT in a classroom?', o: ['a board', 'a beach', 'a desk'], a: 1, e: 'A beach is not in a classroom.', c: 'objects' },
  { q: 'Sorry I’m ___.', o: ['early', 'tired', 'late'], a: 2, e: 'Sorry I’m late.', c: 'student' },
  { q: 'Stand ___. Sit ___.', o: ['up / down', 'down / up', 'on / in'], a: 0, e: 'Stand up. Sit down.', c: 'teacher' },
];

/** Things, SB p.151. */
const things: Draft[] = [
  { q: 'You keep money and credit cards in it.', o: ['a wallet', 'a diary', 'a file'], a: 0, e: 'A wallet holds money and cards.', c: 'definition', d: 1 },
  { q: 'My phone is not working. I need my ___.', o: ['coin', 'charger', 'tissue'], a: 1, e: 'A charger.', c: 'definition' },
  { q: 'You wear them when it is sunny.', o: ['headphones', 'scissors', 'sunglasses'], a: 2, e: 'Sunglasses.', c: 'definition' },
  { q: 'You take it when it is raining.', o: ['an umbrella', 'a laptop', 'a lamp'], a: 0, e: 'An umbrella.', c: 'definition' },
  { q: 'You listen to music with them.', o: ['glasses', 'headphones', 'keys'], a: 1, e: 'Headphones.', c: 'definition' },
  { q: 'You open a door with it.', o: ['a pen', 'a pencil', 'a key'], a: 2, e: 'A key.', c: 'definition' },
  { q: 'You find the meaning of a word in it.', o: ['a dictionary', 'a magazine', 'a purse'], a: 0, e: 'A dictionary.', c: 'definition' },
  { q: 'What are they? — They’re ___.', o: ['purse', 'glasses', 'tablet'], a: 1, e: 'Glasses is a plural noun: They’re glasses.', c: 'plural', d: 3 },
  { q: 'Which is always plural?', o: ['watch', 'wallet', 'scissors'], a: 2, e: 'Scissors, glasses and headphones are always plural.', c: 'plural', d: 3 },
  { q: 'Which word is different?', o: ['purse', 'glasses', 'headphones'], a: 0, e: 'Purse is singular. Glasses and headphones are always plural.', c: 'odd-one-out', d: 3 },
  { q: 'Which word is different?', o: ['magazine', 'wallet', 'newspaper'], a: 1, e: 'You read a magazine and a newspaper, not a wallet.', c: 'odd-one-out' },
  { q: 'You write in it.', o: ['a coin', 'a ticket', 'a notebook'], a: 2, e: 'A notebook.', c: 'definition' },
  { q: 'You need it to travel by train.', o: ['a ticket', 'a tissue', 'a charger'], a: 0, e: 'A ticket.', c: 'definition' },
];

export const vocabFiles1to2: Question[] = [
  ...vocabTopic('days-numbers', 'dn', 1, VB(148, 'Days and numbers'), daysNumbers),
  ...vocabTopic('countries', 'ct', 1, VB(149, 'Countries'), countries),
  ...vocabTopic('classroom', 'cl', 1, VB(150, 'Classroom language'), classroom),
  ...vocabTopic('things', 'tg', 2, VB(151, 'Things'), things),
];
