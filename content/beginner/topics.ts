import type { Topic } from '../types';
import { BEGINNER_LEVEL_ID as L } from './meta';

type Row = [id: string, unit: number, title: string, summary: string];

const grammar: Row[] = [
  ['be-sing-i-you', 1, 'verb be: I and you', 'I’m / you’re, negatives, questions and short answers'],
  ['be-sing-he-she-it', 1, 'verb be: he, she, it', 'he’s / she’s / it’s, isn’t, Is he…?'],
  ['be-plural', 2, 'verb be: we, you, they', 'we’re / they’re, aren’t, Are they…?'],
  ['wh-questions-be', 2, 'Wh- and How questions with be', 'Who, What, Where, When, How, How old'],
  ['nouns-a-an', 3, 'singular and plural nouns; a / an', 'a / an, plural -s, -es, -ies'],
  ['this-that-these-those', 3, 'this / that / these / those', 'near and far, singular and plural'],
  ['possessives', 4, 'possessive adjectives and ’s', 'my, your, his, her, its, our, their; Jack’s car'],
  ['adjectives', 4, 'adjectives', 'position of adjectives, same form for plural'],
  ['present-simple-pos-neg', 5, 'present simple + and −: I, you, we, they', 'I have / I don’t have'],
  ['present-simple-questions', 5, 'present simple ?: I, you, we, they', 'Do you…? Yes, I do. / No, I don’t.'],
  ['present-simple-he-she-it', 6, 'present simple: he, she, it', 'verb + s, doesn’t, Does he…?'],
  ['adverbs-frequency', 6, 'adverbs of frequency', 'always, usually, sometimes, never and their position'],
  ['word-order-questions', 7, 'word order in questions', 'ASI and QuASI'],
  ['imperatives-object-pronouns', 7, 'imperatives; object pronouns', 'Come here! Don’t talk. me, him, her, us, them'],
  ['can-cant', 8, 'can / can’t', 'permission, possibility and ability'],
  ['like-verb-ing', 8, 'like / love / hate + verb + -ing', 'I love cooking. I hate getting up early.'],
  ['present-continuous', 9, 'present continuous', 'be + verb + -ing for now'],
  ['pres-cont-or-simple', 9, 'present continuous or present simple?', 'usually vs at the moment'],
  ['there-is-are', 10, 'there is / there are; some / any', 'There’s a…, There are some…, any in − and ?'],
  ['past-simple-be', 10, 'past simple: be', 'was / were, wasn’t / weren’t, past time expressions'],
  ['past-simple-regular', 11, 'past simple: regular verbs', '-ed forms, didn’t + infinitive, Did you…?'],
  ['past-simple-irregular', 11, 'past simple: irregular verbs', 'got, went, had, did and other irregulars'],
];

const vocabulary: Row[] = [
  ['numbers', 1, 'Numbers', 'numbers 0–100'],
  ['days-months-dates', 1, 'Days, months and dates', 'days of the week, months, ordinal numbers'],
  ['countries-nationalities', 2, 'Countries and nationalities', 'country and nationality words'],
  ['classroom', 1, 'The classroom', 'things in the classroom and classroom language'],
  ['small-things', 3, 'Small things', 'everyday objects you carry'],
  ['people-family', 4, 'People and family', 'family members and irregular plurals'],
  ['colours-adjectives', 4, 'Colours and common adjectives', 'colours and opposite adjectives'],
  ['food-drink', 5, 'Food and drink', 'food, drinks and meals'],
  ['verb-phrases-1', 5, 'Common verb phrases 1', 'live in a flat, have breakfast, watch TV…'],
  ['jobs-work', 6, 'Jobs and places of work', 'jobs and where people work'],
  ['typical-day', 6, 'A typical day', 'daily routine, morning, afternoon, evening'],
  ['free-time', 7, 'Free time', 'go out, play tennis, meet friends…'],
  ['films', 7, 'Kinds of films', 'types of film'],
  ['activities', 8, 'Activities', '-ing activities: cooking, cycling, reading…'],
  ['travelling', 9, 'Travelling', 'book tickets, pack a suitcase, rent a car…'],
  ['clothes', 9, 'Clothes', 'clothes and shoes'],
  ['hotels', 10, 'Hotels', 'a hotel room and places in a hotel'],
  ['prepositions-place', 10, 'Prepositions: in, on, at, under', 'prepositions of place'],
  ['the-time', 5, 'The time', 'telling the time'],
];

const pronunciation: Row[] = [
  ['sound-ear-chair', 10, 'Sounds: /ɪə/ and /eə/', 'ear vs chair — here, near, where, there'],
  ['sound-vowels', 3, 'Vowel sounds', 'short vowels, long vowels and diphthongs'],
  ['sound-consonants', 1, 'Consonant sounds', 'consonant sounds from the Sound Bank'],
];

const stress: Row[] = [
  ['stress-words', 2, 'Word stress', 'which syllable is stressed'],
  ['stress-numbers-countries', 2, 'Word stress: numbers and countries', 'thirteen vs thirty, Japan vs Japanese'],
];

const build = (rows: Row[], categoryId: Topic['categoryId'], prefix: string): Topic[] =>
  rows.map(([id, unit, title, summary]) => ({
    id: `beg-${prefix}-${id}`,
    levelId: L,
    categoryId,
    unitId: `beg-u${unit}`,
    title,
    summary,
  }));

export const topics: Topic[] = [
  ...build(grammar, 'grammar', 'g'),
  ...build(vocabulary, 'vocabulary', 'v'),
  ...build(pronunciation, 'pronunciation', 'p'),
  ...build(stress, 'word-stress', 's'),
];
