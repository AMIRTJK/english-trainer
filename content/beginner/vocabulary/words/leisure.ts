import { makeWords, type WordGroup } from '../build';
import type { VocabWord } from '../../../types';

/** Free time, films and -ing activities — Vocabulary Bank SB pp.126-127. */
const groups: WordGroup[] = [
  {
    topicId: 'beg-v-free-time',
    unit: 7,
    rows: [
      ['tennis', 'теннис', 'egg', '/ˈtenɪs/'],
      ['sport', 'спорт', 'horse', '/spɔːt/'],
      ['swim', 'плавать', 'fish', '/swɪm/'],
      ['piano', 'пианино', 'cat', '/piˈænəʊ/'],
      ['music', 'музыка', 'boot', '/ˈmjuːzɪk/'],
      ['party', 'вечеринка', 'car', '/ˈpɑːti/'],
      ['concert', 'концерт', 'clock', '/ˈkɒnsət/'],
      ['magazine', 'журнал', 'tree', '/ˌmægəˈziːn/'],
      ['news', 'новости', 'boot', '/njuːz/'],
      ['games', 'игры', 'train', '/geɪmz/'],
      ['museum', 'музей', 'tree', '/mjuˈziːəm/'],
      ['park', 'парк'],
      ['mountains', 'горы', 'owl', '/ˈmaʊntɪnz/'],
      ['sea', 'море', 'tree', '/siː/'],
      ['sun', 'солнце', 'up', '/sʌn/'],
      ['holiday', 'отпуск, каникулы', 'clock'],
    ],
  },
  {
    topicId: 'beg-v-films',
    unit: 7,
    rows: [
      ['film', 'фильм'],
      ['action', 'боевик', 'cat', '/ˈækʃn/'],
      ['comedy', 'комедия', 'clock', '/ˈkɒmədi/'],
      ['drama', 'драма', 'car', '/ˈdrɑːmə/'],
      ['horror', 'ужасы', 'clock', '/ˈhɒrə/'],
      ['musical', 'мюзикл', 'boot', '/ˈmjuːzɪkl/'],
      ['romantic', 'романтический', 'cat', '/rəʊˈmæntɪk/'],
      ['western', 'вестерн', 'egg', '/ˈwestən/'],
      ['science', 'наука', 'bike', '/ˈsaɪəns/'],
      ['fiction', 'фантастика, вымысел', 'fish', '/ˈfɪkʃn/'],
      ['picture', 'картина, кадр', 'fish', '/ˈpɪktʃə/'],
      ['story', 'история', 'horse', '/ˈstɔːri/'],
    ],
  },
  {
    topicId: 'beg-v-activities',
    unit: 8,
    rows: [
      ['cooking', 'готовка', 'bull', '/ˈkʊkɪŋ/'],
      ['cycling', 'езда на велосипеде', 'bike', '/ˈsaɪklɪŋ/'],
      ['running', 'бег', 'up', '/ˈrʌnɪŋ/'],
      ['swimming', 'плавание', 'fish', '/ˈswɪmɪŋ/'],
      ['reading', 'чтение', 'tree', '/ˈriːdɪŋ/'],
      ['singing', 'пение', 'fish', '/ˈsɪŋɪŋ/'],
      ['painting', 'рисование', 'train', '/ˈpeɪntɪŋ/'],
      ['camping', 'поход с палаткой', 'cat', '/ˈkæmpɪŋ/'],
      ['flying', 'полёты', 'bike', '/ˈflaɪɪŋ/'],
      ['travelling', 'путешествия', 'cat', '/ˈtrævlɪŋ/'],
      ['watching', 'просмотр', 'clock', '/ˈwɒtʃɪŋ/'],
      ['eating', 'еда (процесс)', 'tree', '/ˈiːtɪŋ/'],
      ['sleeping', 'сон', 'tree', '/ˈsliːpɪŋ/'],
      ['buying', 'покупка', 'bike', '/ˈbaɪɪŋ/'],
      ['doing', 'выполнение', 'boot'],
      ['going', 'хождение, поездки', 'phone'],
      ['yoga', 'йога', 'phone', '/ˈjəʊgə/'],
      ['series', 'сериал', 'ear', '/ˈsɪəriːz/'],
    ],
  },
];

export const leisureWords: VocabWord[] = makeWords(groups);
