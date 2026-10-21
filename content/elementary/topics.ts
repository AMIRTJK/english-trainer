import type { Topic } from '../types';
import { ELEMENTARY_LEVEL_ID as L } from './meta';

type Row = [id: string, unit: number, title: string, summary: string];

/** One topic per Grammar Bank section, SB pp.124-147, plus the 12C revision lesson. */
const grammar: Row[] = [
  ['be-positive', 1, 'present simple be +; subject pronouns', 'I’m, you’re, he’s, it’s, we’re, they’re'],
  ['be-negative-questions', 1, 'verb be − and ?', 'isn’t, aren’t, Are you…? Yes, I am.'],
  ['possessive-adjectives', 1, 'possessive adjectives', 'my, your, his, her, its, our, their; it’s or its?'],
  ['nouns-plural', 2, 'singular and plural nouns; a / an; the', 'a / an, -s, -es, -ies, men, women, children, people'],
  ['adjectives', 2, 'adjectives; very, really, quite', 'position of adjectives, no plural -s'],
  ['imperatives-lets', 2, 'imperatives, let’s', 'Open the door. Don’t worry. Let’s go. Let’s not stop.'],
  ['present-simple-pos-neg', 3, 'present simple + and −', 'work / works, don’t / doesn’t, has, goes, does'],
  ['present-simple-questions', 3, 'present simple ?', 'Do you…? Does he…? Yes, he does.'],
  ['question-word-order', 3, 'word order in questions', 'ASI and QuASI, What colour…? What kind of…?'],
  ['possessive-s', 4, 'possessive ’s, Whose…?', 'Jack’s, my parents’, Whose…? Who’s or whose?'],
  ['prepositions-time-place', 4, 'prepositions of time and place', 'in, on, at, to; go home'],
  ['adverbs-frequency', 4, 'position of adverbs, expressions of frequency', 'always, hardly ever, never; twice a week'],
  ['can-cant', 5, 'can / can’t', 'ability, possibility, permission, requests'],
  ['present-continuous', 5, 'present continuous', 'be + verb + -ing for now'],
  ['simple-or-continuous', 5, 'present simple or present continuous?', 'usually vs at the moment'],
  ['object-pronouns', 6, 'object pronouns', 'me, you, him, her, it, us, them'],
  ['like-verb-ing', 6, 'like + (verb + -ing)', 'love, like, don’t mind, don’t like, hate + -ing'],
  ['be-or-do', 6, 'revision: be or do?', 'Are you…? or Do you…?'],
  ['past-be', 7, 'past simple of be', 'was / were, wasn’t / weren’t, born'],
  ['past-regular', 7, 'past simple: regular verbs', '-ed, -d, -ied, double consonant; didn’t; Did you…?'],
  ['past-irregular', 7, 'past simple: irregular verbs', 'went, had, got, bought, could…'],
  ['past-mixed', 8, 'past simple: regular and irregular', 'was / could, regular and irregular verbs'],
  ['there-is-are', 8, 'there is / there are, some / any', 'There’s a…, There are some…, any in − and ?'],
  ['there-was-were', 8, 'there was / there were', 'There was a…, There weren’t any…'],
  ['countable-uncountable', 9, 'countable / uncountable nouns; a / an, some / any', 'an apple, some rice, any sugar'],
  ['quantifiers', 9, 'quantifiers', 'How much / How many, a lot of, a little, a few, not much'],
  ['comparatives', 9, 'comparative adjectives', 'bigger, easier, more famous, better than'],
  ['superlatives', 10, 'superlative adjectives', 'the biggest, the most dangerous, the best in'],
  ['going-to-plans', 10, 'be going to (plans)', 'I’m going to…, future time expressions'],
  ['going-to-predictions', 10, 'be going to (predictions)', 'It’s going to rain.'],
  ['adverbs-manner', 11, 'adverbs (manner and modifiers)', 'slowly, well, hard, fast; incredibly, really'],
  ['verb-to-infinitive', 11, 'verb + to + infinitive', 'want, need, decide, would like + to'],
  ['definite-article', 11, 'definite article: the or no the', 'the internet / have lunch / go by train'],
  ['present-perfect', 12, 'present perfect', 'I’ve seen, she hasn’t read, Have you ever…?'],
  ['perfect-or-past', 12, 'present perfect or past simple?', 'Have you been…? When did you go? been or gone?'],
  ['question-formation', 12, 'revision: question formation', 'do, does, did, are, can, have in questions'],
];

/** The Vocabulary Bank pages (SB pp.148-165) and the lessons' own vocabulary. */
const vocabulary: Row[] = [
  ['days-numbers', 1, 'Days and numbers', 'days of the week, 0–100, high numbers'],
  ['countries', 1, 'Countries and nationalities', 'continents, countries, nationalities'],
  ['classroom', 1, 'Classroom language', 'the classroom and what teachers and students say'],
  ['things', 2, 'Things', 'everyday things you carry'],
  ['adjectives-colours', 2, 'Adjectives and colours', 'opposite adjectives, colours, very / quite'],
  ['feelings', 2, 'Feelings', 'angry, bored, hungry, tired…'],
  ['verb-phrases', 3, 'Verb phrases', 'cook dinner, play the guitar, wear glasses…'],
  ['jobs', 3, 'Jobs', 'jobs and where people work'],
  ['family', 4, 'The family', 'family members'],
  ['daily-routine', 4, 'Daily routine', 'get up, have a shower, go to bed…'],
  ['time-frequency', 4, 'Time and frequency', 'telling the time, months, every day, twice a week'],
  ['more-verb-phrases', 5, 'More verb phrases', 'buy a newspaper, call a taxi, wait for a bus…'],
  ['weather-dates', 5, 'The weather, seasons and dates', 'sunny, windy, spring, ordinal numbers'],
  ['music-noise', 6, 'Music and noise', 'instruments, musicians, noisy neighbours'],
  ['word-formation', 7, 'Word formation', 'write → writer, art → artist'],
  ['past-time', 7, 'Past time expressions', 'ago, last night, yesterday morning'],
  ['go-have-get', 7, 'go, have, get', 'go out, have a good time, get home'],
  ['house', 8, 'The house', 'rooms, parts of a house, furniture'],
  ['prepositions', 8, 'Prepositions of place and movement', 'behind, opposite, into, through…'],
  ['food-drink', 9, 'Food and drink', 'food, meals, containers'],
  ['places-holidays', 10, 'Places, buildings and holidays', 'places in a town, city holidays, verb phrases'],
  ['phones-internet', 11, 'Phones and the internet; adverbs', 'download an app, log in; common adverbs'],
  ['irregular-verbs', 12, 'Irregular verbs', 'past simple and past participles, SB p.165'],
  ['practical-english', 1, 'Practical English', 'hotel, coffee, clothes, directions, menu, transport'],
];

const pronunciation: Row[] = [
  ['sound-vowels', 1, 'Vowel sounds', 'short vowels, long vowels and diphthongs, SB p.166'],
  ['sound-consonants', 1, 'Consonant sounds', 'consonant sounds, SB p.167'],
  ['sound-rules', 1, 'Sound Bank rules', 'which letters spell which sound, and the "! but also" words'],
  ['endings', 2, 'Endings: -s, -es and -ed', '/s/ /z/ /ɪz/ and /t/ /d/ /ɪd/'],
  ['letters', 4, 'Letters and sounds', 'the letter o, h, ea, silent letters, the'],
];

const stress: Row[] = [
  ['stress-words', 1, 'Word stress', 'which syllable is stressed'],
  ['stress-patterns', 1, 'Word stress: patterns', 'thirteen vs thirty, two-syllable words'],
];

const build = (rows: Row[], categoryId: Topic['categoryId'], prefix: string): Topic[] =>
  rows.map(([id, unit, title, summary]) => ({
    id: `ele-${prefix}-${id}`,
    levelId: L,
    categoryId,
    unitId: `ele-u${unit}`,
    title,
    summary,
  }));

export const topics: Topic[] = [
  ...build(grammar, 'grammar', 'g'),
  ...build(vocabulary, 'vocabulary', 'v'),
  ...build(pronunciation, 'pronunciation', 'p'),
  ...build(stress, 'word-stress', 's'),
];
