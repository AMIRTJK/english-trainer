import { makeWords, type WordGroup } from '../build';
import type { VocabWord } from '../../../types';

/**
 * The Sound Bank key words themselves (SB pp.166-167), the picture the book
 * prints next to each symbol. Key words that already appear in a Vocabulary
 * Bank topic (fish, train, phone, chair, bag, key, shower, mother, singer…)
 * are listed there instead, never twice. A consonant key word is filed under
 * its consonant, so every one of the 44 sounds has a word of its own.
 */
const groups: WordGroup[] = [
  {
    topicId: 'ele-p-sound-vowels',
    unit: 1,
    rows: [
      ['tree', 'дерево', 'tree', '/triː/'], ['cat', 'кошка', 'cat', '/kæt/'], ['car', 'машина', 'car', '/kɑː/'],
      ['clock', 'часы (настенные)', 'clock', '/klɒk/'], ['horse', 'лошадь', 'horse', '/hɔːs/'], ['bull', 'бык', 'bull', '/bʊl/'],
      ['boot', 'ботинок', 'boot', '/buːt/'], ['computer', 'компьютер', 'computer'], ['bird', 'птица', 'bird', '/bɜːd/'],
      ['egg', 'яйцо', 'egg', '/eg/'], ['bike', 'велосипед', 'bike', '/baɪk/'], ['owl', 'сова', 'owl', '/aʊl/'],
      ['boy', 'мальчик', 'boy', '/bɔɪ/'], ['ear', 'ухо', 'ear', '/ɪə/'], ['tourist', 'турист', 'tourist', '/ˈtʊərɪst/'],
    ],
  },
  {
    topicId: 'ele-p-sound-consonants',
    unit: 1,
    rows: [
      ['parrot', 'попугай', 'parrot', '/ˈpærət/'], ['girl', 'девочка', 'girl', '/gɜːl/'], ['flower', 'цветок', 'flower', '/ˈflaʊə/'],
      ['vase', 'ваза', 'vase', '/vɑːz/'], ['tie', 'галстук', 'tie', '/taɪ/'], ['dog', 'собака', 'dog', '/dɒg/'],
      ['snake', 'змея', 'snake', '/sneɪk/'], ['zebra', 'зебра', 'zebra', '/ˈzebrə/'], ['television', 'телевизор', 'television', '/ˈtelɪvɪʒn/'],
      ['thumb', 'большой палец', 'thumb', '/θʌm/'], ['these', 'эти', 'mother', '/ðiːz/'], ['other', 'другой', 'mother', '/ˈʌðə/'],
      ['with', 'с', 'mother', '/wɪð/'], ['chess', 'шахматы', 'chess', '/tʃes/'], ['leg', 'нога', 'leg', '/leg/'],
      ['witch', 'ведьма', 'witch', '/wɪtʃ/'], ['yacht', 'яхта', 'yacht', '/jɒt/'], ['monkey', 'обезьяна', 'monkey', '/ˈmʌŋki/'],
      ['nose', 'нос', 'nose', '/nəʊz/'], ['house', 'дом', 'house', '/haʊs/'],
    ],
  },
];

export const soundBankWords: VocabWord[] = makeWords(groups);
