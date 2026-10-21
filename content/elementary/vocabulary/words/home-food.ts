import { makeWords, type WordGroup } from '../build';
import type { VocabWord } from '../../../types';

/**
 * Word formation (7A), past time (7B), go / have / get (p.160), the house
 * (p.161), prepositions (p.162), food and drink (p.163, 9B containers).
 */
const groups: WordGroup[] = [
  {
    topicId: 'ele-v-word-formation',
    unit: 7,
    rows: [
      ['writer', 'писатель', undefined, '/ˈraɪtə/'], ['painter', 'художник', undefined, '/ˈpeɪntə/'],
      ['singer', 'певец', undefined, '/ˈsɪŋə/'], ['artist', 'художник, артист', undefined, '/ˈɑːtɪst/'],
      ['scientist', 'учёный'], ['politician', 'политик', undefined, '/ˌpɒləˈtɪʃn/'],
      ['composer', 'композитор', undefined, '/kəmˈpəʊzə/'], ['dancer', 'танцор', undefined, '/ˈdɑːnsə/'],
      ['director', 'режиссёр', undefined, '/dəˈrektə/'], ['inventor', 'изобретатель', undefined, '/ɪnˈventə/'],
      ['novelist', 'романист', undefined, '/ˈnɒvəlɪst/'],
    ],
  },
  {
    topicId: 'ele-v-past-time',
    unit: 7,
    rows: [
      ['ago', 'назад'], ['yesterday', 'вчера'], ['last night', 'вчера вечером', undefined, '/lɑːst naɪt/'],
      ['last week', 'на прошлой неделе', undefined, '/lɑːst wiːk/'], ['the day before yesterday', 'позавчера', undefined, '/ðə deɪ bɪˌfɔː ˈjestədeɪ/'],
    ],
  },
  {
    topicId: 'ele-v-go-have-get',
    unit: 7,
    rows: [
      ['go out', 'выходить (развлекаться)', undefined, '/gəʊ aʊt/'], ['go for a walk', 'идти на прогулку', undefined, '/gəʊ fər ə wɔːk/'],
      ['go on holiday', 'ехать в отпуск', undefined, '/gəʊ ɒn ˈhɒlədeɪ/'], ['go back', 'возвращаться', undefined, '/gəʊ bæk/'],
      ['have a good time', 'хорошо проводить время', undefined, '/hæv ə gʊd taɪm/'], ['have a drink', 'выпить', undefined, '/hæv ə drɪŋk/'],
      ['get a taxi', 'взять такси', undefined, '/get ə ˈtæksi/'], ['get an email', 'получить письмо', undefined, '/get ən ˈiːmeɪl/'],
      ['get to the airport', 'добраться до аэропорта', undefined, '/get tə ði ˈeəpɔːt/'], ['beach', 'пляж', undefined, '/biːtʃ/'],
      ['church', 'церковь'], ['mosque', 'мечеть', undefined, '/mɒsk/'], ['holiday', 'отпуск, каникулы'],
    ],
  },
  {
    topicId: 'ele-v-house',
    unit: 8,
    rows: [
      ['bathroom', 'ванная'], ['bedroom', 'спальня', undefined, '/ˈbedruːm/'], ['dining room', 'столовая', undefined, '/ˈdaɪnɪŋ ruːm/'],
      ['garage', 'гараж'], ['garden', 'сад', undefined, '/ˈgɑːdn/'], ['hall', 'прихожая, холл'], ['kitchen', 'кухня'],
      ['living room', 'гостиная', undefined, '/ˈlɪvɪŋ ruːm/'], ['a study', 'кабинет', undefined, '/ə ˈstʌdi/'], ['toilet', 'туалет'],
      ['balcony', 'балкон'], ['ceiling', 'потолок', undefined, '/ˈsiːlɪŋ/'], ['floor', 'пол; этаж', undefined, '/flɔː/'],
      ['stairs', 'лестница'], ['armchair', 'кресло', undefined, '/ˈɑːmtʃeə/'], ['bath', 'ванна', undefined, '/bɑːθ/'],
      ['bed', 'кровать', undefined, '/bed/'], ['carpet', 'ковёр', undefined, '/ˈkɑːpɪt/'], ['cooker', 'плита', undefined, '/ˈkʊkə/'],
      ['cupboard', 'шкаф (кухонный)', undefined, '/ˈkʌbəd/'], ['dishwasher', 'посудомоечная машина'],
      ['fireplace', 'камин', undefined, '/ˈfaɪəpleɪs/'], ['fridge', 'холодильник'], ['microwave', 'микроволновка'],
      ['mirror', 'зеркало', undefined, '/ˈmɪrə/'], ['plant', 'растение', undefined, '/plɑːnt/'], ['shelf', 'полка', undefined, '/ʃelf/'],
      ['shower', 'душ', undefined, '/ˈʃaʊə/'], ['sofa', 'диван', undefined, '/ˈsəʊfə/'], ['wardrobe', 'шкаф (платяной)', undefined, '/ˈwɔːdrəʊb/'],
      ['washing machine', 'стиральная машина', undefined, '/ˈwɒʃɪŋ məʃiːn/'], ['upstairs', 'наверху', undefined, '/ˌʌpˈsteəz/'],
      ['downstairs', 'внизу', undefined, '/ˌdaʊnˈsteəz/'], ['central heating', 'центральное отопление', undefined, '/ˈsentrəl ˈhiːtɪŋ/'],
      ['air conditioning', 'кондиционер', undefined, '/ˈeə kəndɪʃənɪŋ/'],
    ],
  },
  {
    topicId: 'ele-v-prepositions',
    unit: 8,
    rows: [
      ['in front of', 'перед', undefined, '/ɪn frʌnt əv/'], ['under', 'под', undefined, '/ˈʌndə/'], ['behind', 'позади', undefined, '/bɪˈhaɪnd/'],
      ['between', 'между', undefined, '/bɪˈtwiːn/'], ['opposite', 'напротив', undefined, '/ˈɒpəzɪt/'], ['next to', 'рядом с', undefined, '/nekst tuː/'],
      ['over', 'над', undefined, '/ˈəʊvə/'], ['above', 'выше, над', undefined, '/əˈbʌv/'], ['below', 'ниже, под', undefined, '/bɪˈləʊ/'],
      ['into', 'в (внутрь)', undefined, '/ˈɪntu/'], ['out of', 'из (наружу)', undefined, '/aʊt əv/'], ['through', 'через, сквозь', undefined, '/θruː/'],
      ['up', 'вверх', undefined, '/ʌp/'], ['down', 'вниз'],
    ],
  },
  {
    topicId: 'ele-v-food-drink',
    unit: 9,
    rows: [
      ['breakfast', 'завтрак'], ['lunch', 'обед'], ['dinner', 'ужин'], ['bread', 'хлеб', undefined, '/bred/'],
      ['butter', 'сливочное масло', undefined, '/ˈbʌtə/'], ['cereal', 'хлопья', undefined, '/ˈsɪəriəl/'], ['cheese', 'сыр', undefined, '/tʃiːz/'],
      ['coffee', 'кофе'], ['eggs', 'яйца'], ['jam', 'варенье, джем', undefined, '/dʒæm/'], ['juice', 'сок'], ['milk', 'молоко', undefined, '/mɪlk/'],
      ['sugar', 'сахар'], ['tea', 'чай'], ['toast', 'тост'], ['fish', 'рыба', undefined, '/fɪʃ/'], ['salmon', 'лосось', undefined, '/ˈsæmən/'],
      ['tuna', 'тунец', undefined, '/ˈtjuːnə/'], ['herbs', 'травы, зелень', undefined, '/hɜːbz/'], ['meat', 'мясо', undefined, '/miːt/'],
      ['chicken', 'курица', undefined, '/ˈtʃɪkɪn/'], ['sausages', 'сосиски', undefined, '/ˈsɒsɪdʒɪz/'], ['steak', 'стейк'],
      ['ham', 'ветчина', undefined, '/hæm/'], ['olive oil', 'оливковое масло', undefined, '/ˈɒlɪv ɔɪl/'], ['pasta', 'макароны', undefined, '/ˈpæstə/'],
      ['rice', 'рис'], ['salad', 'салат', undefined, '/ˈsæləd/'], ['seafood', 'морепродукты', undefined, '/ˈsiːfuːd/'],
      ['spices', 'специи', undefined, '/ˈspaɪsɪz/'], ['vegetables', 'овощи'], ['carrots', 'морковь', undefined, '/ˈkærəts/'],
      ['chips', 'картофель фри', undefined, '/tʃɪps/'], ['lettuce', 'салат-латук', undefined, '/ˈletɪs/'],
      ['mushrooms', 'грибы', undefined, '/ˈmʌʃrʊmz/'], ['onions', 'лук', undefined, '/ˈʌnjənz/'], ['peas', 'горох', undefined, '/piːz/'],
      ['peppers', 'перцы', undefined, '/ˈpepəz/'], ['potatoes', 'картофель'], ['tomatoes', 'помидоры'], ['fruit', 'фрукты'],
      ['apples', 'яблоки', undefined, '/ˈæplz/'], ['bananas', 'бананы', undefined, '/bəˈnɑːnəz/'], ['oranges', 'апельсины', undefined, '/ˈɒrɪndʒɪz/'],
      ['pineapple', 'ананас'], ['strawberries', 'клубника'], ['dessert', 'десерт', undefined, '/dɪˈzɜːt/'], ['cake', 'торт', undefined, '/keɪk/'],
      ['ice cream', 'мороженое', undefined, '/aɪs ˈkriːm/'], ['biscuits', 'печенье', undefined, '/ˈbɪskɪts/'], ['chocolate', 'шоколад'],
      ['crisps', 'чипсы', undefined, '/krɪsps/'], ['nuts', 'орехи', undefined, '/nʌts/'], ['sweets', 'конфеты', undefined, '/swiːts/'],
      ['bottle', 'бутылка'], ['can', 'жестяная банка', undefined, '/kæn/'], ['carton', 'пакет (молока, сока)', undefined, '/ˈkɑːtn/'],
      ['jar', 'банка (стеклянная)', undefined, '/dʒɑː/'], ['packet', 'пачка, упаковка', undefined, '/ˈpækɪt/'], ['tin', 'консервная банка', undefined, '/tɪn/'],
    ],
  },
];

export const homeFoodWords: VocabWord[] = makeWords(groups);
