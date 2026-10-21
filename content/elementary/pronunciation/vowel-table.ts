import type { VowelRow } from '../../common/vowel-bank';

/**
 * The Vowel sounds page of the Elementary Sound Bank, SB p.166, transcribed in
 * full.
 *
 * The letters, the example words and the "! but also" lists are the book's
 * own, in the book's order. Only the Russian explanations were written for this
 * app — they describe the rule the page shows (see `docs/decisions.md` §14,
 * §22). The page differs from Beginner's p.134: it adds `ea` and `e` for /iː/,
 * `ew` for /uː/, `ay`/`oy` and a second spelling for /eə/ (`are`), and it moves
 * `there` and `where` into the /eə/ exceptions.
 *
 * The book's `*` footnote — "especially before consonant + e" — is `magicE`.
 */
export const vowelTable: VowelRow[] = [
  // ---- Short vowels ------------------------------------------------
  ['fish', 'ɪ', 'short-vowel', 'краткий и — язык ниже и расслабленнее, чем в русском «и»',
    'Одна i между согласными почти всегда даёт краткий /ɪ/.',
    [['i', 'Одна i в закрытом слоге (между согласными) — краткий /ɪ/. Перед «согласная + e» та же i даёт /aɪ/ (nine).', 'his this film six big swim']],
    'English women busy'],

  ['cat', 'æ', 'short-vowel', 'краткий открытый а/э, рот широко открыт',
    'Одна a между согласными — почти всегда /æ/.',
    [['a', 'Одна a в закрытом слоге — /æ/. Сравните: car (a + r) — /ɑː/, name (a + согласная + e) — /eɪ/.', 'thanks flat black Japan have tablet']],
    ''],

  ['clock', 'ɒ', 'short-vowel', 'краткий о с округлёнными губами',
    'Одна o между согласными — краткий /ɒ/.',
    [['o', 'Одна o в закрытом слоге — /ɒ/. Перед «согласная + e» (home, close) она становится /əʊ/.', 'hot stop coffee long not box']],
    'what watch want'],

  ['bull', 'ʊ', 'short-vowel', 'краткий у, губы почти не вытянуты',
    'oo перед k и u в нескольких частых словах.',
    [['u', 'u в нескольких частых словах (full, put) — краткий /ʊ/, а не /ʌ/.', 'full put'],
      ['oo', 'oo перед k (book, look, cook) и в good — краткий /ʊ/.', 'good book look cook']],
    'could would woman'],

  ['computer', 'ə', 'weak-vowel', 'нейтральный безударный «шва»',
    'Любая гласная без ударения может стать /ə/.',
    [['—', 'Пишется по-разному, но всегда без ударения: решает ударение, а не буква.', 'teacher umbrella America famous second ago']],
    ''],

  ['egg', 'e', 'short-vowel', 'краткий э',
    'Одна e между согласными — краткий /e/.',
    [['e', 'Одна e в закрытом слоге — /e/. В конце короткого слова (me, we) e даёт /iː/.', 'yes help ten pet very red']],
    'friend weather breakfast any said'],

  ['up', 'ʌ', 'short-vowel', 'краткий а, как в русском «пара» под ударением',
    'Одна u между согласными — обычно /ʌ/.',
    [['u', 'Одна u в закрытом слоге — /ʌ/. Исключения full, put дают /ʊ/.', 'bus lunch ugly run lucky cut']],
    'come brother son does young'],

  // ---- Long vowels -------------------------------------------------
  ['tree', 'iː', 'long-vowel', 'долгий и',
    'ee — всегда /iː/; ea и e в конце короткого слова — обычно тоже.',
    [['ee', 'Две ee — всегда долгий /iː/.', 'meet three'],
      ['ea', 'ea обычно даёт /iː/. Исключения: /e/ в weather, breakfast и /eɪ/ в break, steak, great.', 'eat speak'],
      ['e', 'Одна e в конце короткого слова (me, we) — долгий /iː/.', 'me we']],
    'people police key niece'],

  ['car', 'ɑː', 'long-vowel', 'долгий задний а',
    'a + r — /ɑː/; ещё a перед s, th, nce в британском произношении.',
    [['ar', 'a перед r — долгий /ɑː/. Сама r в британском варианте не произносится.', 'charger party start'],
      ['a', 'a перед s, th, nce в британском произношении тоже даёт /ɑː/ (father, glasses, dance).', 'father glasses dance']],
    'aunt'],

  ['horse', 'ɔː', 'long-vowel', 'долгий о',
    'or, al и aw — всё это /ɔː/.',
    [['or', 'o перед r — долгий /ɔː/ (sport, door).', 'sport door'],
      ['al', 'a перед l — /ɔː/, и сама l часто не произносится (talk).', 'talk small'],
      ['aw', 'aw — всегда /ɔː/.', 'saw draw']],
    'water four bought thought'],

  ['boot', 'uː', 'long-vowel', 'долгий у',
    'oo (кроме позиции перед k), u перед «согласная + e», ew.',
    [['oo', 'oo обычно даёт долгий /uː/ (school, food); краткий /ʊ/ — в основном перед k.', 'school food'],
      ['u', 'u перед «согласная + e» — долгий /uː/ (June).', 'June blue', 1],
      ['ew', 'ew — /uː/ (после n звучит как /juː/: new).', 'new flew']],
    'do fruit juice shoe'],

  ['bird', 'ɜː', 'long-vowel', 'долгий ё-образный звук',
    'er, ir, ur под ударением — один и тот же звук /ɜː/.',
    [['er', 'er под ударением — /ɜː/. Без ударения те же буквы дают /ə/ (teacher).', 'her verb'],
      ['ir', 'ir — /ɜː/.', 'first third'],
      ['ur', 'ur — /ɜː/.', 'nurse turn']],
    'learn work world word'],

  // ---- Diphthongs --------------------------------------------------
  ['train', 'eɪ', 'diphthong', 'дифтонг эй',
    'a перед «согласная + e», ai и ay.',
    [['a', 'a перед «согласная + e»: немая e удлиняет a до /eɪ/ (name, make).', 'name make', 1],
      ['ai', 'ai в середине слова — /eɪ/.', 'rain paint'],
      ['ay', 'ay в конце слова — /eɪ/.', 'play day']],
    'break steak great eight they grey'],

  ['phone', 'əʊ', 'diphthong', 'дифтонг оу',
    'o перед «согласная + e», o перед ld/n’t и oa.',
    [['o', 'o перед «согласная + e» (home, close) и в old, don’t — /əʊ/.', 'old home close don’t', 1],
      ['oa', 'oa — /əʊ/.', 'road toast']],
    'slow low'],

  ['bike', 'aɪ', 'diphthong', 'дифтонг ай',
    'i перед «согласная + e», y в конце коротких слов и igh.',
    [['i', 'i перед «согласная + e» — /aɪ/ (nine, twice).', 'nine twice', 1],
      ['y', 'y в конце короткого слова — /aɪ/ (my, why). В длинных словах — /i/ (happy).', 'my why'],
      ['igh', 'igh — всегда /aɪ/, gh не произносится.', 'high night']],
    'buy'],

  ['owl', 'aʊ', 'diphthong', 'дифтонг ау',
    'ou и ow.',
    [['ou', 'ou — обычно /aʊ/.', 'out thousand cloudy count'],
      ['ow', 'ow — /aʊ/ (how, down). Но в slow и low те же буквы дают /əʊ/.', 'how down']],
    ''],

  ['boy', 'ɔɪ', 'diphthong', 'дифтонг ой',
    'oi в середине слова, oy в конце.',
    [['oi', 'oi в середине слова — /ɔɪ/.', 'coin noise toilet'],
      ['oy', 'oy в конце слова или слога — /ɔɪ/.', 'unemployed enjoy']],
    ''],

  ['ear', 'ɪə', 'diphthong', 'дифтонг иэ',
    'eer, ere и ear — «и» с призвуком.',
    [['eer', 'eer — /ɪə/.', 'beer engineer'],
      ['ere', 'ere в here и we’re — /ɪə/. В there и where те же буквы дают /eə/ — их книга выносит в «! but also».', 'here we’re'],
      ['ear', 'ear — обычно /ɪə/ (dear, hear). Но wear — /eə/, learn — /ɜː/.', 'dear hear']],
    'really idea'],

  ['chair', 'eə', 'diphthong', 'дифтонг эа',
    'air и are.',
    [['air', 'air — /eə/.', 'airport stairs pair hair'],
      ['are', 'are в конце слога — /eə/ (square, careful).', 'square careful']],
    'their there wear'],

  ['tourist', 'ʊə', 'diphthong', 'дифтонг уэ',
    'Очень редкий звук — проще выучить сам список слов.',
    [['—', 'Правила по буквам нет: книга называет этот звук необычным.', 'euro Europe plural sure']],
    ''],

  // ---- The two weak vowels the book prints without a key word -------
  ['weak-i', 'i', 'weak-vowel', 'звук между /ɪ/ и /iː/',
    '«Согласная + y» в конце слова читается как /i/.',
    [['y', '«Согласная + y» в конце слова — /i/ (happy). В коротких словах y даёт /aɪ/ (my).', 'happy angry thirsty']],
    ''],

  ['weak-u', 'u', 'weak-vowel', 'короткий безударный у',
    'Необычный звук: запомнить по словам.',
    [['u', 'Безударная u перед другой гласной (usually, situation) — короткий /u/.', 'education usually situation']],
    ''],
];
