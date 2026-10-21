import { makeWords, type WordGroup } from '../build';
import type { VocabWord } from '../../../types';

/**
 * Verb phrases (SB p.153), daily routine (p.156), time (p.157, 4C), more verb
 * phrases (p.158), weather and dates (p.159), music and noise (5B, 6C).
 */
const groups: WordGroup[] = [
  {
    topicId: 'ele-v-verb-phrases',
    unit: 3,
    rows: [
      ['cook', 'готовить'], ['do', 'делать'], ['drink', 'пить', undefined, '/drɪŋk/'], ['drive', 'водить (машину)', undefined, '/draɪv/'],
      ['eat', 'есть'], ['go', 'идти, ехать', undefined, '/gəʊ/'], ['have', 'иметь'], ['like', 'нравиться', undefined, '/laɪk/'],
      ['listen', 'слушать', undefined, '/ˈlɪsn/'], ['live', 'жить'], ['need', 'нуждаться', undefined, '/niːd/'],
      ['play', 'играть'], ['read', 'читать', undefined, '/riːd/'], ['say', 'сказать', undefined, '/seɪ/'], ['speak', 'говорить'],
      ['study', 'учиться, изучать', undefined, '/ˈstʌdi/'], ['take', 'брать'], ['want', 'хотеть'], ['wear', 'носить (одежду)'],
      ['work', 'работать'], ['do housework', 'заниматься домашними делами', undefined, '/duː ˈhaʊswɜːk/'],
      ['do exercise', 'заниматься спортом', undefined, '/duː ˈeksəsaɪz/'], ['play the guitar', 'играть на гитаре', undefined, '/pleɪ ðə gɪˈtɑː/'],
      ['watch TV', 'смотреть телевизор', undefined, '/wɒtʃ ˌtiː ˈviː/'], ['mineral water', 'минеральная вода', undefined, '/ˈmɪnərəl wɔːtə/'],
    ],
  },
  {
    topicId: 'ele-v-daily-routine',
    unit: 4,
    rows: [
      ['wake up', 'просыпаться', undefined, '/weɪk ʌp/'], ['get up', 'вставать', undefined, '/get ʌp/'],
      ['have a shower', 'принимать душ', undefined, '/hæv ə ˈʃaʊə/'], ['get dressed', 'одеваться', undefined, '/get drest/'],
      ['put on make-up', 'краситься', undefined, '/pʊt ɒn ˈmeɪk ʌp/'], ['have breakfast', 'завтракать', undefined, '/hæv ˈbrekfəst/'],
      ['check emails', 'проверять почту', undefined, '/tʃek ˈiːmeɪlz/'], ['have lunch', 'обедать', undefined, '/hæv lʌntʃ/'],
      ['finish work', 'заканчивать работу', undefined, '/ˈfɪnɪʃ wɜːk/'], ['go shopping', 'ходить по магазинам', undefined, '/gəʊ ˈʃɒpɪŋ/'],
      ['get home', 'добираться домой', undefined, '/get həʊm/'], ['go to bed', 'ложиться спать', undefined, '/gəʊ tə bed/'],
      ['have a shave', 'бриться', undefined, '/hæv ə ʃeɪv/'], ['walk to work', 'ходить на работу пешком', undefined, '/wɔːk tə wɜːk/'],
      ['make dinner', 'готовить ужин', undefined, '/meɪk ˈdɪnə/'], ['relax', 'отдыхать, расслабляться', undefined, '/rɪˈlæks/'],
      ['have a bath', 'принимать ванну', undefined, '/hæv ə bɑːθ/'], ['see friends', 'встречаться с друзьями', undefined, '/siː frendz/'],
    ],
  },
  {
    topicId: 'ele-v-time-frequency',
    unit: 4,
    rows: [
      ['quarter', 'четверть', undefined, '/ˈkwɔːtə/'], ['half', 'половина', undefined, '/hɑːf/'], ['minute', 'минута', undefined, '/ˈmɪnɪt/'],
      ['o’clock', 'ровно (о времени)', undefined, '/əˈklɒk/'], ['every', 'каждый', undefined, '/ˈevri/'], ['once', 'один раз'], ['twice', 'дважды'],
      ['always', 'всегда', undefined, '/ˈɔːlweɪz/'], ['often', 'часто', undefined, '/ˈɒfn/'], ['usually', 'обычно', 'boot'],
      ['sometimes', 'иногда', undefined, '/ˈsʌmtaɪmz/'], ['hardly ever', 'почти никогда', undefined, '/ˌhɑːdli ˈevə/'],
      ['never', 'никогда', undefined, '/ˈnevə/'], ['normally', 'обычно', undefined, '/ˈnɔːməli/'],
      ['January', 'январь'], ['February', 'февраль'], ['March', 'март', undefined, '/mɑːtʃ/'], ['April', 'апрель', undefined, '/ˈeɪprəl/'],
      ['May', 'май', undefined, '/meɪ/'], ['June', 'июнь'], ['July', 'июль'], ['August', 'август', undefined, '/ˈɔːgəst/'],
      ['September', 'сентябрь'], ['October', 'октябрь'], ['November', 'ноябрь'], ['December', 'декабрь'],
    ],
  },
  {
    topicId: 'ele-v-more-verb-phrases',
    unit: 5,
    rows: [
      ['buy', 'покупать'], ['call', 'звонить', undefined, '/kɔːl/'], ['dance', 'танцевать'], ['draw', 'рисовать (карандашом)'],
      ['find', 'находить', undefined, '/faɪnd/'], ['forget', 'забывать', undefined, '/fəˈget/'], ['give', 'давать', undefined, '/gɪv/'],
      ['hear', 'слышать'], ['help', 'помогать'], ['leave', 'оставлять; уходить', undefined, '/liːv/'], ['look for', 'искать', undefined, '/lʊk fɔː/'],
      ['meet', 'встречать'], ['paint', 'рисовать (красками)'], ['remember', 'помнить'], ['run', 'бегать'],
      ['see', 'видеть', undefined, '/siː/'], ['send', 'отправлять', undefined, '/send/'], ['sing', 'петь', undefined, '/sɪŋ/'],
      ['swim', 'плавать'], ['talk', 'разговаривать'], ['tell', 'рассказывать', undefined, '/tel/'], ['try', 'пытаться, пробовать'],
      ['use', 'использовать'], ['wait for', 'ждать', undefined, '/weɪt fɔː/'],
    ],
  },
  {
    topicId: 'ele-v-weather-dates',
    unit: 5,
    rows: [
      ['cloudy', 'облачно'], ['foggy', 'туманно', undefined, '/ˈfɒgi/'], ['raining', 'идёт дождь', undefined, '/ˈreɪnɪŋ/'],
      ['snowing', 'идёт снег', undefined, '/ˈsnəʊɪŋ/'], ['sunny', 'солнечно', undefined, '/ˈsʌni/'], ['windy', 'ветрено', undefined, '/ˈwɪndi/'],
      ['warm', 'тёплый', undefined, '/wɔːm/'], ['cool', 'прохладный', undefined, '/kuːl/'], ['wet', 'мокрый, дождливый', undefined, '/wet/'],
      ['dry', 'сухой', undefined, '/draɪ/'], ['weather', 'погода'], ['spring', 'весна', undefined, '/sprɪŋ/'], ['summer', 'лето'],
      ['autumn', 'осень', undefined, '/ˈɔːtəm/'], ['winter', 'зима', undefined, '/ˈwɪntə/'],
      ['first', 'первый'], ['second', 'второй'], ['third', 'третий'], ['fourth', 'четвёртый'], ['fifth', 'пятый', undefined, '/fɪfθ/'],
      ['sixth', 'шестой', undefined, '/sɪksθ/'], ['eighth', 'восьмой', undefined, '/eɪtθ/'], ['ninth', 'девятый', undefined, '/naɪnθ/'],
      ['tenth', 'десятый'], ['twelfth', 'двенадцатый', undefined, '/twelfθ/'], ['twentieth', 'двадцатый', undefined, '/ˈtwentiəθ/'],
      ['thirtieth', 'тридцатый', undefined, '/ˈθɜːtiəθ/'], ['twenty-first', 'двадцать первый', undefined, '/ˌtwenti ˈfɜːst/'],
    ],
  },
  {
    topicId: 'ele-v-music-noise',
    unit: 6,
    rows: [
      ['accordion', 'аккордеон'], ['drums', 'барабаны', undefined, '/drʌmz/'], ['guitar', 'гитара', undefined, '/gɪˈtɑː/'],
      ['keyboard', 'клавишные', undefined, '/ˈkiːbɔːd/'], ['piano', 'фортепиано', undefined, '/piˈænəʊ/'], ['saxophone', 'саксофон'],
      ['trumpet', 'труба', undefined, '/ˈtrʌmpɪt/'], ['violin', 'скрипка'], ['drummer', 'барабанщик', undefined, '/ˈdrʌmə/'],
      ['guitarist', 'гитарист'], ['pianist', 'пианист'], ['violinist', 'скрипач', undefined, '/vaɪəˈlɪnɪst/'],
      ['busker', 'уличный музыкант', undefined, '/ˈbʌskə/'], ['concert', 'концерт', undefined, '/ˈkɒnsət/'],
      ['classical music', 'классическая музыка', undefined, '/ˈklæsɪkl ˈmjuːzɪk/'], ['jazz', 'джаз', undefined, '/dʒæz/'],
      ['song', 'песня'], ['noise', 'шум'], ['noisy', 'шумный', undefined, '/ˈnɔɪzi/'], ['quiet', 'тихий', undefined, '/ˈkwaɪət/'],
      ['neighbour', 'сосед', undefined, '/ˈneɪbə/'], ['argue', 'ссориться', undefined, '/ˈɑːgjuː/'], ['bark', 'лаять', undefined, '/bɑːk/'],
      ['cry', 'плакать', undefined, '/kraɪ/'], ['practise', 'упражняться', undefined, '/ˈpræktɪs/'],
    ],
  },
];

export const routineWords: VocabWord[] = makeWords(groups);
