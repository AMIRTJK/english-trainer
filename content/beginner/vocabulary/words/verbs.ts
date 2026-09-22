import { makeWords, type WordGroup } from '../build';
import type { VocabWord } from '../../../types';

/**
 * Regular and irregular verbs, SB p.133.
 *
 * The book prints the whole list with transcriptions; these are the entries the
 * other Vocabulary Bank sections did not already cover. The past forms are part
 * of that list — the exam asks for them, and they are spelled nothing like the
 * base form, which is exactly what the spelling drill is for.
 */
const groups: WordGroup[] = [
  {
    topicId: 'beg-v-verbs',
    unit: 11,
    rows: [
      ['be', 'быть', 'tree', '/biː/'],
      ['am', 'форма глагола be: я', 'cat', '/æm/'],
      ['do', 'делать', 'boot', '/duː/'],
      ['send', 'отправлять', 'egg', '/send/'],
      ['learn', 'учить, узнавать', 'bird', '/lɜːn/'],
      ['paint', 'рисовать, красить', 'train', '/peɪnt/'],
      ['rain', 'идти (о дожде); дождь', 'train', '/reɪn/'],
      ['snow', 'идти (о снеге); снег', 'phone', '/snəʊ/'],
      ['talk', 'разговаривать', 'horse', '/tɔːk/'],
      ['turn', 'поворачивать; включать', 'bird', '/tɜːn/'],
      ['decide', 'решать', 'bike', '/dɪˈsaɪd/'],
      ['invite', 'приглашать', 'bike', '/ɪnˈvaɪt/'],
      ['offer', 'предлагать', 'clock', '/ˈɒfə/'],
      ['miss', 'скучать; пропустить', 'fish', '/mɪs/'],
    ],
  },
  {
    topicId: 'beg-v-verbs',
    unit: 11,
    rows: [
      ['was', 'был (I, he, she, it)', 'clock', '/wɒz/'],
      ['were', 'были (we, you, they)', 'bird', '/wɜː/'],
      ['bought', 'купил (buy)', 'horse', '/bɔːt/'],
      ['got', 'получил (get)', 'clock', '/gɒt/'],
      ['went', 'пошёл, поехал (go)', 'egg', '/went/'],
      ['had', 'имел (have)', 'cat', '/hæd/'],
      ['left', 'уехал, оставил (leave)', 'egg', '/left/'],
      ['said', 'сказал (say)', 'egg', '/sed/'],
      ['saw', 'увидел (see)', 'horse', '/sɔː/'],
      ['sent', 'отправил (send)', 'egg', '/sent/'],
      ['sat', 'сидел (sit)', 'cat', '/sæt/'],
      ['told', 'рассказал (tell)', 'phone', '/təʊld/'],
      ['wrote', 'написал (write)', 'phone', '/rəʊt/'],
    ],
  },
];

export const verbWords: VocabWord[] = makeWords(groups);
