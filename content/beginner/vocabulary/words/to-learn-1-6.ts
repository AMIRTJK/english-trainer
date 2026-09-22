import { makeWords, type WordGroup } from '../build';
import type { VocabWord } from '../../../types';

/**
 * "Words and phrases to learn", SB p.131 — lessons 1A to 6B.
 *
 * The book prints a word list for every lesson. The Vocabulary Bank sections
 * (pp.116-130) already gave us most of them; these are the ones that appear
 * only here, kept in the book's lesson order with the unit they belong to.
 */
const groups: WordGroup[] = [
  {
    topicId: 'beg-v-words-to-learn',
    unit: 1,
    rows: [
      ['cappuccino', 'капучино', 'tree', '/ˌkæpuˈtʃiːnəʊ/'],
      ['OK', 'хорошо, ладно', 'train', '/ˌəʊˈkeɪ/'],
      ['minute', 'минута', 'fish', '/ˈmɪnɪt/'],
      ['wow', 'вот это да', 'owl', '/waʊ/'],
    ],
  },
  {
    topicId: 'beg-v-words-to-learn',
    unit: 2,
    rows: [
      ['excuse', 'извинить; извинение', 'boot', '/ɪkˈskjuːz/'],
      ['free', 'свободный; бесплатный', 'tree', '/friː/'],
      ['business', 'дело, бизнес', 'fish', '/ˈbɪznəs/'],
      ['bedroom', 'спальня', 'egg', '/ˈbedruːm/'],
      ['kitchen', 'кухня', 'fish', '/ˈkɪtʃɪn/'],
      ['later', 'позже', 'train', '/ˈleɪtə/'],
      ['south', 'юг', 'owl', '/saʊθ/'],
    ],
  },
  {
    topicId: 'beg-v-words-to-learn',
    unit: 3,
    rows: [
      ['oh', 'ой, о', 'phone', '/əʊ/'],
      ['what', 'что, какой', 'clock', '/wɒt/'],
      ['mug', 'кружка', 'up', '/mʌg/'],
      ['ring', 'кольцо; звонить', 'fish', '/rɪŋ/'],
      ['welcome', 'добро пожаловать', 'egg', '/ˈwelkəm/'],
      ['souvenir', 'сувенир', 'ear', '/ˌsuːvəˈnɪə/'],
    ],
  },
  {
    topicId: 'beg-v-words-to-learn',
    unit: 4,
    rows: [
      ['come', 'приходить', 'up', '/kʌm/'],
      ['order', 'заказывать; заказ', 'horse', '/ˈɔːdə/'],
      ['pizza', 'пицца', 'tree', '/ˈpiːtsə/'],
      ['Mum', 'мама', 'up', '/mʌm/'],
      ['Dad', 'папа', 'cat', '/dæd/'],
      ['babysitter', 'няня', 'train', '/ˈbeɪbisɪtə/'],
      ['lovely', 'прекрасный, милый', 'up', '/ˈlʌvli/'],
      ['remember', 'помнить', 'egg', '/rɪˈmembə/'],
      ['perhaps', 'возможно', 'cat', '/pəˈhæps/'],
      ['sir', 'сэр', 'bird', '/sɜː/'],
      ['madam', 'мадам', 'cat', '/ˈmædəm/'],
      ['electric', 'электрический', 'egg', '/ɪˈlektrɪk/'],
      ['opinion', 'мнение', 'fish', '/əˈpɪnjən/'],
      ['prefer', 'предпочитать', 'bird', '/prɪˈfɜː/'],
      ['village', 'деревня', 'fish', '/ˈvɪlɪdʒ/'],
      ['motorbike', 'мотоцикл', 'phone', '/ˈməʊtəbaɪk/'],
    ],
  },
  {
    topicId: 'beg-v-words-to-learn',
    unit: 5,
    rows: [
      ['scientist', 'учёный', 'bike', '/ˈsaɪəntɪst/'],
      ['healthy', 'здоровый, полезный', 'egg', '/ˈhelθi/'],
      ['traditional', 'традиционный', 'fish', '/trəˈdɪʃənl/'],
      ['favourite', 'любимый', 'train', '/ˈfeɪvərɪt/'],
      ['café', 'кафе', 'cat', '/ˈkæfeɪ/'],
      ['soup', 'суп', 'boot', '/suːp/'],
      ['toast', 'тост, поджаренный хлеб', 'phone', '/təʊst/'],
      ['writer', 'писатель', 'bike', '/ˈraɪtə/'],
      ['traffic', 'движение, пробки', 'cat', '/ˈtræfɪk/'],
      ['gate', 'выход на посадку; ворота', 'train', '/geɪt/'],
      ['change', 'менять; сдача', 'train', '/tʃeɪndʒ/'],
      ['pass', 'сдать (экзамен); пропуск', 'car', '/pɑːs/'],
      ['surprise', 'сюрприз; удивлять', 'bike', '/səˈpraɪz/'],
    ],
  },
  {
    topicId: 'beg-v-words-to-learn',
    unit: 6,
    rows: [
      ['blonde', 'светлые (волосы)', 'clock', '/blɒnd/'],
      ['married', 'женатый, замужем', 'cat', '/ˈmærid/'],
      ['intelligent', 'умный', 'egg', '/ɪnˈtelɪdʒənt/'],
      ['barman', 'бармен', 'car', '/ˈbɑːmən/'],
      ['banker', 'банкир', 'cat', '/ˈbæŋkə/'],
      ['customer', 'клиент, покупатель', 'up', '/ˈkʌstəmə/'],
      ['dish', 'блюдо; тарелка', 'fish', '/dɪʃ/'],
      ['multinational', 'международный', 'cat', '/ˌmʌltiˈnæʃnəl/'],
      ['meeting', 'встреча, совещание', 'tree', '/ˈmiːtɪŋ/'],
      ['why', 'почему', 'bike', '/waɪ/'],
      ['because', 'потому что', 'clock', '/bɪˈkɒz/'],
      ['feel', 'чувствовать', 'tree', '/fiːl/'],
      ['way', 'путь, дорога; способ', 'train', '/weɪ/'],
      ['after', 'после', 'car', '/ˈɑːftə/'],
      ['every', 'каждый', 'egg', '/ˈevri/'],
      ['then', 'потом, затем', 'egg', '/ðen/'],
      ['tour', 'тур, экскурсия', 'tourist', '/tʊə/'],
      ['guide', 'гид; путеводитель', 'bike', '/gaɪd/'],
      ['apartment', 'квартира', 'car', '/əˈpɑːtmənt/'],
      ['subway', 'метро (амер.)', 'up', '/ˈsʌbweɪ/'],
      ['omelette', 'омлет', 'clock', '/ˈɒmlət/'],
      ['delicious', 'очень вкусный', 'fish', '/dɪˈlɪʃəs/'],
    ],
  },
];

export const toLearn1to6: VocabWord[] = makeWords(groups);
