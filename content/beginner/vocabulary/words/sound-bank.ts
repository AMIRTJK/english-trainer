import { makeWords, type WordGroup } from '../build';
import type { VocabWord } from '../../../types';

/**
 * The Sound Bank key words themselves (SB pp.134-135).
 *
 * These are the words the book prints next to each phonetic symbol, so they are
 * the anchor for every "different sound" question. Key words that already
 * appear in a Vocabulary Bank topic (car, train, phone, chair, bag, key, girl,
 * shower, mother, boy, fish, park…) are listed there instead, never twice.
 */
const groups: WordGroup[] = [
  {
    topicId: 'beg-p-sound-vowels',
    unit: 3,
    rows: [
      ['cat', 'кошка', 'cat', '/kæt/'],
      ['tree', 'дерево', 'tree', '/triː/'],
      ['clock', 'часы (настенные)', 'clock'],
      ['horse', 'лошадь', 'horse', '/hɔːs/'],
      ['bull', 'бык', 'bull', '/bʊl/'],
      ['boot', 'ботинок', 'boot', '/buːt/'],
      ['bird', 'птица', 'bird', '/bɜːd/'],
      ['egg', 'яйцо', 'egg', '/eg/'],
      ['up', 'вверх', 'up', '/ʌp/'],
      ['computer', 'компьютер', 'computer'],
      ['bike', 'велосипед', 'bike', '/baɪk/'],
      ['owl', 'сова', 'owl', '/aʊl/'],
      ['tourist', 'турист', 'tourist', '/ˈtʊərɪst/'],
    ],
  },
  {
    topicId: 'beg-p-sound-ear-chair',
    unit: 10,
    rows: [
      ['ear', 'ухо', 'ear'],
      ['hair', 'волосы', 'chair'],
      ['there', 'там', 'chair'],
      ['where', 'где', 'chair'],
      ['here', 'здесь', 'ear'],
      ['idea', 'идея', 'ear'],
      ['repair', 'чинить', 'chair'],
      ['careful', 'осторожный', 'chair'],
      ['really', 'действительно', 'ear'],
    ],
  },
  {
    topicId: 'beg-p-sound-consonants',
    unit: 1,
    rows: [
      ['parrot', 'попугай', 'parrot', '/ˈpærət/'],
      ['flower', 'цветок', 'flower', '/ˈflaʊə/'],
      ['vase', 'ваза', 'vase', '/vɑːz/'],
      ['tie', 'галстук', 'tie', '/taɪ/'],
      ['dog', 'собака', 'dog', '/dɒg/'],
      ['snake', 'змея', 'snake', '/sneɪk/'],
      ['zebra', 'зебра', 'zebra', '/ˈzebrə/'],
      ['television', 'телевизор', 'television', '/ˈtelɪvɪʒn/'],
      ['thumb', 'большой палец', 'thumb', '/θʌm/'],
      ['chess', 'шахматы', 'chess'],
      ['jazz', 'джаз', 'jazz'],
      ['leg', 'нога', 'leg', '/leg/'],
      ['right', 'правый', 'right'],
      ['witch', 'ведьма', 'witch', '/wɪtʃ/'],
      ['yacht', 'яхта', 'yacht', '/jɒt/'],
      ['monkey', 'обезьяна', 'monkey', '/ˈmʌŋki/'],
      ['nose', 'нос', 'nose', '/nəʊz/'],
      ['singer', 'певец', 'singer', '/ˈsɪŋə/'],
      ['house', 'дом', 'house'],
      ['bridge', 'мост', 'jazz'],
      ['match', 'матч, спичка', 'chess'],
    ],
  },
];

export const soundBankWords: VocabWord[] = makeWords(groups);
