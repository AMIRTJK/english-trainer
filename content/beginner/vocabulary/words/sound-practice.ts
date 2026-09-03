import { makeWords, type WordGroup } from '../build';
import type { VocabWord } from '../../../types';

/**
 * The remaining words the "different sound" questions use.
 *
 * Everything here already appears as an option in `pron-vowels`,
 * `pron-consonants` or `pron-ear-chair`, so the Vocabulary screen can cover
 * every word the pronunciation tests can ask about. Their IPA and sound group
 * come from the same tables the questions use.
 */
const groups: WordGroup[] = [
  {
    topicId: 'beg-p-sound-vowels',
    unit: 3,
    rows: [
      ['is', 'форма глагола be: он, она, оно'],
      ['it', 'это, оно'],
      ['she', 'она'],
      ['we', 'мы'],
      ['are', 'форма глагола be: мы, вы, они'],
      ['that', 'тот, что'],
      ['not', 'не'],
      ['from', 'из, от'],
      ['important', 'важный'],
      ['draw', 'рисовать'],
      ['football', 'футбол'],
      ['full', 'полный'],
      ['look', 'смотреть'],
      ['cook', 'готовить'],
      ['could', 'мог, мог бы'],
      ['too', 'тоже, слишком'],
      ['you', 'ты, вы'],
      ['verb', 'глагол'],
      ['world', 'мир'],
      ['brush', 'щётка'],
      ['name', 'имя'],
      ['email', 'электронная почта'],
      ['no', 'нет'],
      ['hi', 'привет'],
      ['bye', 'пока'],
      ['my', 'мой'],
      ['out', 'наружу'],
      ['down', 'вниз'],
      ['town', 'город'],
      ['pound', 'фунт'],
      ['sound', 'звук'],
      ['noise', 'шум'],
      ['enjoy', 'получать удовольствие'],
    ],
  },
  {
    topicId: 'beg-p-sound-ear-chair',
    unit: 10,
    rows: [
      ['hear', 'слышать'],
      ['we’re', 'мы (we are)'],
      ['their', 'их'],
    ],
  },
  {
    topicId: 'beg-p-sound-consonants',
    unit: 1,
    rows: [
      ['the', 'определённый артикль', 'mother'],
      ['this', 'этот', 'mother'],
      ['with', 'с', 'mother'],
      ['thing', 'вещь', 'thumb'],
      ['very', 'очень', 'vase'],
      ['different', 'другой, разный', 'flower'],
      ['back', 'назад, спина', 'key'],
      ['coke', 'кола', 'key'],
      ['blog', 'блог', 'girl'],
      ['did', 'делал (прошедшее время)', 'dog'],
      ['sure', 'конечно', 'shower'],
      ['Swiss', 'швейцарский', 'snake'],
      ['who', 'кто', 'house'],
      ['yes', 'да', 'yacht'],
      ['wrong', 'неправильный', 'singer'],
    ],
  },
];

export const soundPracticeWords: VocabWord[] = makeWords(groups);
