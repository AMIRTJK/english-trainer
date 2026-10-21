import { makeWords, type WordGroup } from '../build';
import type { VocabWord } from '../../../types';

/**
 * Places and buildings (SB p.164) with city holidays (10B, 10C), phones and the
 * internet with common adverbs (11A, 11C), irregular verbs (p.165) and the
 * Practical English episodes (pp.12, 28, 44, 60, 76, 92).
 */
const groups: WordGroup[] = [
  {
    topicId: 'ele-v-places-holidays',
    unit: 10,
    rows: [
      ['chemist’s', 'аптека', undefined, '/ˈkemɪsts/'], ['pharmacy', 'аптека'], ['department store', 'универмаг', undefined, '/dɪˈpɑːtmənt stɔː/'],
      ['hospital', 'больница'], ['market', 'рынок', undefined, '/ˈmɑːkɪt/'], ['park', 'парк', undefined, '/pɑːk/'],
      ['police station', 'полицейский участок', undefined, '/pəˈliːs steɪʃn/'], ['post office', 'почта', undefined, '/ˈpəʊst ɒfɪs/'],
      ['shopping centre', 'торговый центр', undefined, '/ˈʃɒpɪŋ sentə/'], ['supermarket', 'супермаркет'],
      ['town hall', 'ратуша', undefined, '/taʊn hɔːl/'], ['art gallery', 'художественная галерея', undefined, '/ˈɑːt gæləri/'],
      ['castle', 'замок', undefined, '/ˈkɑːsl/'], ['museum', 'музей'], ['theatre', 'театр'], ['zoo', 'зоопарк'],
      ['bridge', 'мост'], ['river', 'река'], ['road', 'дорога'], ['square', 'площадь'], ['street', 'улица', undefined, '/striːt/'],
      ['bus station', 'автовокзал', undefined, '/ˈbʌs steɪʃn/'], ['car park', 'парковка', undefined, '/ˈkɑː pɑːk/'],
      ['railway station', 'железнодорожный вокзал', undefined, '/ˈreɪlweɪ ˈsteɪʃn/'], ['cathedral', 'собор'],
      ['synagogue', 'синагога'], ['temple', 'храм', undefined, '/ˈtempl/'],
      ['book a flight', 'забронировать билет на самолёт', undefined, '/bʊk ə flaɪt/'], ['rent a car', 'арендовать машину', undefined, '/rent ə kɑː/'],
      ['stay in a hotel', 'остановиться в гостинице', undefined, '/steɪ ɪn ə həʊˈtel/'], ['eat out', 'есть вне дома', undefined, '/iːt aʊt/'],
      ['buy souvenirs', 'покупать сувениры', undefined, '/baɪ ˌsuːvəˈnɪəz/'], ['meet new people', 'знакомиться с людьми', undefined, '/miːt njuː ˈpiːpl/'],
      ['become famous', 'стать знаменитым', undefined, '/bɪˈkʌm ˈfeɪməs/'], ['get married', 'пожениться', undefined, '/get ˈmærid/'],
      ['fall in love', 'влюбиться', undefined, '/fɔːl ɪn lʌv/'], ['move house', 'переехать', undefined, '/muːv haʊs/'],
      ['be lucky', 'везти, быть удачливым', undefined, '/bi ˈlʌki/'],
    ],
  },
  {
    topicId: 'ele-v-phones-internet',
    unit: 11,
    rows: [
      ['download', 'скачивать', undefined, '/ˌdaʊnˈləʊd/'], ['upload', 'загружать (в сеть)', undefined, '/ˌʌpˈləʊd/'],
      ['app', 'приложение', undefined, '/æp/'], ['attachment', 'вложение (в письме)'], ['broadband', 'широкополосный интернет', undefined, '/ˈbrɔːdbænd/'],
      ['log in', 'войти (в систему)', undefined, '/lɒg ɪn/'], ['search', 'искать (в интернете)', undefined, '/sɜːtʃ/'],
      ['wi-fi', 'вай-фай', undefined, '/ˈwaɪ faɪ/'], ['website', 'сайт', undefined, '/ˈwebsaɪt/'], ['online', 'онлайн', undefined, '/ˌɒnˈlaɪn/'],
      ['password', 'пароль', undefined, '/ˈpɑːswɜːd/'], ['subtitles', 'субтитры', undefined, '/ˈsʌbtaɪtlz/'],
      ['quickly', 'быстро', undefined, '/ˈkwɪkli/'], ['slowly', 'медленно', undefined, '/ˈsləʊli/'], ['badly', 'плохо', undefined, '/ˈbædli/'],
      ['carefully', 'осторожно', undefined, '/ˈkeəfəli/'], ['politely', 'вежливо'], ['dangerously', 'опасно'],
      ['loudly', 'громко', undefined, '/ˈlaʊdli/'], ['quietly', 'тихо', undefined, '/ˈkwaɪətli/'], ['hard', 'усердно', undefined, '/hɑːd/'],
      ['well', 'хорошо', undefined, '/wel/'], ['easily', 'легко', undefined, '/ˈiːzəli/'], ['healthily', 'здорово (о питании)', undefined, '/ˈhelθɪli/'],
      ['perfectly', 'идеально', undefined, '/ˈpɜːfɪktli/'], ['incredibly', 'невероятно', undefined, '/ɪnˈkredəbli/'],
      ['salary', 'зарплата', undefined, '/ˈsæləri/'], ['insurance', 'страховка', undefined, '/ɪnˈʃʊərəns/'], ['tip', 'чаевые', undefined, '/tɪp/'],
    ],
  },
  {
    topicId: 'ele-v-irregular-verbs',
    unit: 12,
    rows: [
      ['be', 'быть (was / were, been)', undefined, '/biː/'], ['become', 'становиться (became, become)', undefined, '/bɪˈkʌm/'],
      ['begin', 'начинать (began, begun)', undefined, '/bɪˈgɪn/'], ['break', 'ломать (broke, broken)'],
      ['bring', 'приносить (brought, brought)', undefined, '/brɪŋ/'], ['build', 'строить (built, built)', undefined, '/bɪld/'],
      ['catch', 'ловить (caught, caught)', undefined, '/kætʃ/'], ['come', 'приходить (came, come)'],
      ['cost', 'стоить (cost, cost)', undefined, '/kɒst/'], ['fall', 'падать (fell, fallen)', undefined, '/fɔːl/'],
      ['feel', 'чувствовать (felt, felt)', undefined, '/fiːl/'], ['fly', 'летать (flew, flown)', undefined, '/flaɪ/'],
      ['get', 'получать (got, got)', undefined, '/get/'], ['know', 'знать (knew, known)'], ['lose', 'терять (lost, lost)', undefined, '/luːz/'],
      ['make', 'делать (made, made)'], ['pay', 'платить (paid, paid)', undefined, '/peɪ/'], ['put', 'класть (put, put)'],
      ['sit', 'сидеть (sat, sat)'], ['sleep', 'спать (slept, slept)'], ['spend', 'тратить (spent, spent)', undefined, '/spend/'],
      ['stand', 'стоять (stood, stood)', undefined, '/stænd/'], ['teach', 'учить, преподавать (taught, taught)', undefined, '/tiːtʃ/'],
      ['think', 'думать (thought, thought)'], ['wake', 'будить (woke, woken)', undefined, '/weɪk/'], ['win', 'выигрывать (won, won)', undefined, '/wɪn/'],
      ['write', 'писать (wrote, written)'], ['went', 'пошёл (go, gone)', undefined, '/went/'], ['bought', 'купил (buy, bought)'],
      ['thought', 'думал (think, thought)'], ['taught', 'учил (teach, taught)', undefined, '/tɔːt/'], ['said', 'сказал (say, said)'],
      ['seen', 'увиденный (see, saw, seen)', undefined, '/siːn/'], ['given', 'данный (give, gave, given)', undefined, '/ˈgɪvn/'],
      ['eaten', 'съеденный (eat, ate, eaten)', undefined, '/ˈiːtn/'], ['spoken', 'сказанный (speak, spoke, spoken)', undefined, '/ˈspəʊkən/'],
      ['written', 'написанный (write, wrote, written)', undefined, '/ˈrɪtn/'], ['gone', 'ушедший (go, went, gone)', undefined, '/gɒn/'],
    ],
  },
  {
    topicId: 'ele-v-practical-english',
    unit: 1,
    rows: [
      ['reception', 'стойка регистрации', undefined, '/rɪˈsepʃn/'], ['lift', 'лифт', undefined, '/lɪft/'],
      ['single room', 'одноместный номер', undefined, '/ˈsɪŋgl ruːm/'], ['double room', 'двухместный номер', undefined, '/ˈdʌbl ruːm/'],
      ['bar', 'бар', undefined, '/bɑː/'], ['ground floor', 'первый этаж', undefined, '/graʊnd flɔː/'], ['passport', 'паспорт', undefined, '/ˈpɑːspɔːt/'],
      ['jacket', 'куртка, пиджак'], ['jeans', 'джинсы', undefined, '/dʒiːnz/'], ['shirt', 'рубашка', undefined, '/ʃɜːt/'],
      ['T-shirt', 'футболка', undefined, '/ˈtiː ʃɜːt/'], ['skirt', 'юбка', undefined, '/skɜːt/'], ['shoes', 'туфли, обувь'],
      ['sweater', 'свитер', undefined, '/ˈswetə/'], ['trousers', 'брюки', undefined, '/ˈtraʊzəz/'],
      ['corner', 'угол', undefined, '/ˈkɔːnə/'], ['traffic lights', 'светофор', undefined, '/ˈtræfɪk laɪts/'],
      ['turn left', 'повернуть налево', undefined, '/tɜːn left/'], ['turn right', 'повернуть направо', undefined, '/tɜːn raɪt/'],
      ['go straight on', 'идти прямо', undefined, '/gəʊ streɪt ɒn/'], ['starter', 'закуска', undefined, '/ˈstɑːtə/'],
      ['main course', 'основное блюдо', undefined, '/meɪn kɔːs/'], ['bus', 'автобус'], ['plane', 'самолёт'], ['taxi', 'такси', undefined, '/ˈtæksi/'],
      ['train', 'поезд', undefined, '/treɪn/'], ['coach', 'междугородний автобус', undefined, '/kəʊtʃ/'], ['tram', 'трамвай', undefined, '/træm/'],
      ['Congratulations!', 'Поздравляю!', undefined, '/kənˌgrætʃuˈleɪʃnz/'], ['Good luck!', 'Удачи!', undefined, '/gʊd ˈlʌk/'],
      ['Well done!', 'Молодец!', undefined, '/wel ˈdʌn/'], ['Never mind.', 'Ничего страшного.', undefined, '/ˌnevə ˈmaɪnd/'],
    ],
  },
];

export const cityVerbWords: VocabWord[] = makeWords(groups);
