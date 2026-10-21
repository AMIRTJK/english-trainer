import { makeWords, type WordGroup } from '../build';
import type { VocabWord } from '../../../types';

/** Things (SB p.151), adjectives and colours (p.152, 2B), feelings (2C), jobs (p.154), family (p.155). */
const groups: WordGroup[] = [
  {
    topicId: 'ele-v-things',
    unit: 2,
    rows: [
      ['bag', 'сумка', undefined, '/bæg/'], ['charger', 'зарядное устройство'], ['coin', 'монета'],
      ['credit card', 'кредитная карта', undefined, '/ˈkredɪt kɑːd/'], ['diary', 'ежедневник', undefined, '/ˈdaɪəri/'],
      ['dictionary', 'словарь'], ['file', 'папка', undefined, '/faɪl/'], ['glasses', 'очки'],
      ['headphones', 'наушники', undefined, '/ˈhedfəʊnz/'], ['identity card', 'удостоверение личности', undefined, '/aɪˈdentəti kɑːd/'],
      ['key', 'ключ'], ['lamp', 'лампа', undefined, '/læmp/'], ['laptop', 'ноутбук', undefined, '/ˈlæptɒp/'],
      ['magazine', 'журнал'], ['newspaper', 'газета'], ['notebook', 'тетрадь, блокнот', undefined, '/ˈnəʊtbʊk/'],
      ['pen', 'ручка', undefined, '/pen/'], ['pencil', 'карандаш', undefined, '/ˈpensl/'],
      ['phone', 'телефон', undefined, '/fəʊn/'], ['photo', 'фотография'],
      ['a piece of paper', 'листок бумаги', undefined, '/ə piːs əv ˈpeɪpə/'], ['purse', 'кошелёк', undefined, '/pɜːs/'],
      ['scissors', 'ножницы', undefined, '/ˈsɪzəz/'], ['sunglasses', 'солнцезащитные очки'],
      ['tablet', 'планшет'], ['ticket', 'билет', undefined, '/ˈtɪkɪt/'], ['tissue', 'бумажная салфетка', undefined, '/ˈtɪʃuː/'],
      ['umbrella', 'зонт'], ['wallet', 'бумажник', undefined, '/ˈwɒlɪt/'], ['watch', 'наручные часы'],
    ],
  },
  {
    topicId: 'ele-v-adjectives-colours',
    unit: 2,
    rows: [
      ['beautiful', 'красивый'], ['ugly', 'некрасивый'], ['big', 'большой'], ['small', 'маленький'],
      ['cheap', 'дешёвый'], ['expensive', 'дорогой'], ['clean', 'чистый', undefined, '/kliːn/'],
      ['dirty', 'грязный', undefined, '/ˈdɜːti/'], ['easy', 'лёгкий, простой', undefined, '/ˈiːzi/'],
      ['difficult', 'трудный'], ['fast', 'быстрый', undefined, '/fɑːst/'], ['slow', 'медленный'],
      ['full', 'полный'], ['empty', 'пустой', undefined, '/ˈempti/'], ['bad', 'плохой'],
      ['high', 'высокий'], ['low', 'низкий'], ['hot', 'горячий, жаркий'], ['cold', 'холодный', undefined, '/kəʊld/'],
      ['light', 'светлый', undefined, '/laɪt/'], ['dark', 'тёмный', undefined, '/dɑːk/'], ['long', 'длинный'],
      ['short', 'короткий; невысокий', undefined, '/ʃɔːt/'], ['old', 'старый'], ['new', 'новый'], ['young', 'молодой'],
      ['rich', 'богатый'], ['poor', 'бедный', undefined, '/pɔː/'], ['right', 'правый; правильный', undefined, '/raɪt/'],
      ['left', 'левый', undefined, '/left/'], ['wrong', 'неправильный'], ['safe', 'безопасный', undefined, '/seɪf/'],
      ['dangerous', 'опасный'], ['same', 'одинаковый', undefined, '/seɪm/'], ['different', 'разный, другой', undefined, '/ˈdɪfrənt/'],
      ['strong', 'сильный', undefined, '/strɒŋ/'], ['weak', 'слабый', undefined, '/wiːk/'], ['tall', 'высокий (о людях)', undefined, '/tɔːl/'],
      ['nice', 'приятный'], ['great', 'отличный'], ['fantastic', 'фантастический'], ['awful', 'ужасный', undefined, '/ˈɔːfl/'],
      ['terrible', 'ужасный'], ['white', 'белый', undefined, '/waɪt/'], ['yellow', 'жёлтый'], ['grey', 'серый'],
      ['orange', 'оранжевый', undefined, '/ˈɒrɪndʒ/'], ['brown', 'коричневый', undefined, '/braʊn/'],
      ['pink', 'розовый', undefined, '/pɪŋk/'], ['green', 'зелёный'], ['purple', 'фиолетовый', undefined, '/ˈpɜːpl/'],
      ['silver', 'серебряный', undefined, '/ˈsɪlvə/'], ['gold', 'золотой', undefined, '/gəʊld/'],
    ],
  },
  {
    topicId: 'ele-v-feelings',
    unit: 2,
    rows: [
      ['angry', 'сердитый', 'cat'], ['bored', 'скучающий', undefined, '/bɔːd/'],
      ['frightened', 'испуганный', undefined, '/ˈfraɪtnd/'], ['happy', 'счастливый', 'cat'], ['hungry', 'голодный'],
      ['sad', 'грустный', undefined, '/sæd/'], ['stressed', 'в стрессе', undefined, '/strest/'],
      ['thirsty', 'испытывающий жажду', 'bird'], ['tired', 'уставший', undefined, '/ˈtaɪəd/'], ['worried', 'обеспокоенный', undefined, '/ˈwʌrid/'],
    ],
  },
  {
    topicId: 'ele-v-jobs',
    unit: 3,
    rows: [
      ['accountant', 'бухгалтер'], ['actor', 'актёр', undefined, '/ˈæktə/'], ['administrator', 'администратор'],
      ['architect', 'архитектор'], ['builder', 'строитель', undefined, '/ˈbɪldə/'], ['chef', 'шеф-повар', undefined, '/ʃef/'],
      ['cleaner', 'уборщик', undefined, '/ˈkliːnə/'], ['dentist', 'стоматолог', undefined, '/ˈdentɪst/'],
      ['doctor', 'врач', undefined, '/ˈdɒktə/'], ['engineer', 'инженер'], ['factory worker', 'рабочий на заводе', undefined, '/ˈfæktəri wɜːkə/'],
      ['flight attendant', 'бортпроводник', undefined, '/ˈflaɪt ətendənt/'], ['footballer', 'футболист', undefined, '/ˈfʊtbɔːlə/'],
      ['guide', 'гид', undefined, '/gaɪd/'], ['hairdresser', 'парикмахер'], ['journalist', 'журналист'],
      ['lawyer', 'юрист', undefined, '/ˈlɔːjə/'], ['manager', 'менеджер, управляющий'], ['model', 'модель', undefined, '/ˈmɒdl/'],
      ['musician', 'музыкант'], ['nurse', 'медсестра'], ['pilot', 'пилот'],
      ['police officer', 'полицейский', undefined, '/pəˈliːs ɒfɪsə/'], ['receptionist', 'администратор на ресепшене'],
      ['shop assistant', 'продавец', undefined, '/ˈʃɒp əsɪstənt/'], ['soldier', 'солдат', undefined, '/ˈsəʊldʒə/'],
      ['taxi driver', 'таксист', undefined, '/ˈtæksi draɪvə/'], ['teacher', 'учитель'], ['vet', 'ветеринар', undefined, '/vet/'],
      ['waiter', 'официант', undefined, '/ˈweɪtə/'], ['waitress', 'официантка', undefined, '/ˈweɪtrəs/'],
      ['unemployed', 'безработный', 'boy'], ['retired', 'на пенсии', undefined, '/rɪˈtaɪəd/'],
    ],
  },
  {
    topicId: 'ele-v-family',
    unit: 4,
    rows: [
      ['father', 'отец'], ['mother', 'мать', undefined, '/ˈmʌðə/'], ['brother', 'брат'], ['sister', 'сестра'],
      ['daughter', 'дочь', undefined, '/ˈdɔːtə/'], ['son', 'сын'], ['grandfather', 'дедушка', undefined, '/ˈgrænfɑːðə/'],
      ['grandmother', 'бабушка'], ['aunt', 'тётя'], ['uncle', 'дядя', undefined, '/ˈʌŋkl/'], ['nephew', 'племянник', undefined, '/ˈnefjuː/'],
      ['niece', 'племянница'], ['cousin', 'двоюродный брат / сестра', undefined, '/ˈkʌzn/'], ['wife', 'жена'],
      ['husband', 'муж', undefined, '/ˈhʌzbənd/'], ['parents', 'родители', undefined, '/ˈpeərənts/'],
      ['grandparents', 'бабушка и дедушка'], ['children', 'дети'], ['couple', 'пара (супруги)', undefined, '/ˈkʌpl/'],
      ['parents-in-law', 'родители жены / мужа', undefined, '/ˈpeərənts ɪn lɔː/'], ['mother-in-law', 'свекровь, тёща', undefined, '/ˈmʌðər ɪn lɔː/'],
      ['sister-in-law', 'невестка, золовка', undefined, '/ˈsɪstər ɪn lɔː/'], ['stepfather', 'отчим', undefined, '/ˈstepfɑːðə/'],
      ['stepmother', 'мачеха', undefined, '/ˈstepmʌðə/'], ['partner', 'партнёр', undefined, '/ˈpɑːtnə/'],
    ],
  },
];

export const peopleWords: VocabWord[] = makeWords(groups);
