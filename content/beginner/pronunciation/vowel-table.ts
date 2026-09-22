import type { SoundType } from '../../types';

/**
 * The Vowel sounds page of the Sound Bank, SB p.134, transcribed in full.
 *
 * Nothing here is invented: the letters, the example words and the "! but also"
 * lists are the book's own, in the book's order. Only the Russian explanations
 * were written for this app — they describe the rule the page already shows
 * (see `docs/decisions.md` §14).
 *
 * The book's `*` footnote — "especially before consonant + e" — is carried as
 * `magicE` rather than a star inside the letters, so the UI can spell it out.
 */
export type PatternRow = [letters: string, ru: string, examples: string, magicE?: 1];

export type VowelRow = [
  key: string,
  ipa: string,
  type: SoundType,
  ru: string,
  hint: string,
  patterns: PatternRow[],
  /** The book's "! but also" column. */
  exceptions: string,
];

export const vowelTable: VowelRow[] = [
  // ---- Short vowels ------------------------------------------------
  ['fish', 'ɪ', 'short-vowel', 'краткий и — язык ниже и расслабленнее, чем в русском «и»',
    'Одна i между согласными почти всегда даёт краткий /ɪ/.',
    [['i', 'Одна i в закрытом слоге (между согласными) — краткий /ɪ/.', 'Italy six is it film window']],
    'English women gym'],

  ['cat', 'æ', 'short-vowel', 'краткий открытый а/э, рот широко открыт',
    'Одна a между согласными — почти всегда /æ/.',
    [['a', 'Одна a в закрытом слоге — /æ/. Сравните с car: там после a идёт r.', 'bag thanks man black bad that']],
    ''],

  ['clock', 'ɒ', 'short-vowel', 'краткий о с округлёнными губами',
    'Одна o между согласными — краткий /ɒ/.',
    [['o', 'Одна o в закрытом слоге — /ɒ/. Если дальше «согласная + e» (close), звук становится /əʊ/.', 'not from sorry stop coffee']],
    'what watch want'],

  ['bull', 'ʊ', 'short-vowel', 'краткий у, губы почти не вытянуты',
    'oo перед k, и u в нескольких частых словах.',
    [['u', 'u в нескольких частых словах — краткий /ʊ/, а не /ʌ/.', 'full sugar'],
      ['oo', 'oo перед k — почти всегда краткий /ʊ/ (book, look, cook).', 'good book look cook']],
    'woman could'],

  ['egg', 'e', 'short-vowel', 'краткий э',
    'Одна e между согласными — краткий /e/.',
    [['e', 'Одна e в закрытом слоге — /e/.', 'spell ten seven twenty Mexico']],
    'friend breakfast bread'],

  ['up', 'ʌ', 'short-vowel', 'краткий а, как в русском «пара» под ударением',
    'Одна u между согласными — обычно /ʌ/.',
    [['u', 'Одна u в закрытом слоге — /ʌ/. Исключения (full, sugar) дают /ʊ/.', 'umbrella number brush husband but']],
    'son brother young'],

  ['computer', 'ə', 'weak-vowel', 'нейтральный безударный «шва»',
    'Любая гласная без ударения превращается в /ə/.',
    [['—', 'Пишется по-разному, но всегда без ударения: решает ударение, а не буква.', 'sister actor famous about policeman']],
    ''],

  // ---- Long vowels -------------------------------------------------
  ['tree', 'iː', 'long-vowel', 'долгий и',
    'ee — всегда /iː/; ea и открытая e — обычно тоже.',
    [['ee', 'Две ee — всегда долгий /iː/. Самый надёжный признак на странице.', 'three meet'],
      ['ea', 'ea обычно даёт /iː/. Несколько слов — исключения с /e/: bread, breakfast.', 'please read'],
      ['e', 'Одна e в конце короткого слова (she, we) — долгий /iː/.', 'she we']],
    'people key'],

  ['car', 'ɑː', 'long-vowel', 'долгий задний а',
    'a + r — /ɑː/; ещё a перед s, st, th, f в британском произношении.',
    [['ar', 'a перед r — долгий /ɑː/. Сама r в британском варианте не произносится.', 'are park'],
      ['a', 'a перед s, st, th, f в британском произношении тоже даёт /ɑː/.', 'fast father afternoon']],
    ''],

  ['horse', 'ɔː', 'long-vowel', 'долгий о',
    'o + r, a + l и aw — всё это /ɔː/.',
    [['or', 'o перед r — долгий /ɔː/.', 'short important'],
      ['al', 'a перед l — /ɔː/, и сама l часто не произносится (tall, football).', 'tall football'],
      ['aw', 'aw — всегда /ɔː/.', 'draw']],
    'water four'],

  ['boot', 'uː', 'long-vowel', 'долгий у',
    'oo (кроме позиции перед k), u перед «согласная + e», ew.',
    [['oo', 'oo обычно даёт долгий /uː/; краткий /ʊ/ — в основном перед k.', 'too food'],
      ['u', 'u перед «согласная + e» — долгий /uː/.', 'excuse blue', 1],
      ['ew', 'ew — /uː/ (после n звучит как /juː/: new).', 'new']],
    'two you juice beautiful'],

  ['bird', 'ɜː', 'long-vowel', 'долгий ё-образный звук',
    'er, ir, ur под ударением — один и тот же звук /ɜː/.',
    [['er', 'er под ударением — /ɜː/. Без ударения те же буквы дают /ə/ (sister).', 'person verb'],
      ['ir', 'ir — /ɜː/.', 'thirsty girl'],
      ['ur', 'ur — /ɜː/.', 'nurse Turkey']],
    'work word world'],

  // ---- Diphthongs --------------------------------------------------
  ['train', 'eɪ', 'diphthong', 'дифтонг эй',
    'a перед «согласная + e», ai и ay.',
    [['a', 'a перед «согласная + e»: немая e удлиняет a до /eɪ/ (name, late).', 'name late', 1],
      ['ai', 'ai в середине слова — /eɪ/.', 'email Spain'],
      ['ay', 'ay в конце слова — /eɪ/.', 'day say']],
    'eight they great'],

  ['phone', 'əʊ', 'diphthong', 'дифтонг оу',
    'o перед «согласная + e», o в конце слова и oa.',
    [['o', 'o перед «согласная + e» и o в конце слова — /əʊ/ (close, no, hello).', 'open close no hello', 1],
      ['oa', 'oa — /əʊ/.', 'coat']],
    'window'],

  ['bike', 'aɪ', 'diphthong', 'дифтонг ай',
    'i перед «согласная + e», y в конце коротких слов и igh.',
    [['i', 'i перед «согласная + e» — /aɪ/ (nice). Так же читается само I.', 'I Hi nice', 1],
      ['y', 'y в конце короткого слова — /aɪ/ (my, bye). В длинных словах — /i/ (happy).', 'bye my'],
      ['igh', 'igh — всегда /aɪ/, gh не произносится.', 'night right']],
    'buy'],

  ['owl', 'aʊ', 'diphthong', 'дифтонг ау',
    'ou и ow.',
    [['ou', 'ou — обычно /aʊ/.', 'out house pound sound'],
      ['ow', 'ow — /aʊ/ (town). Но в словах группы phone те же буквы дают /əʊ/ (window).', 'town down']],
    ''],

  ['boy', 'ɔɪ', 'diphthong', 'дифтонг ой',
    'oi в середине слова, oy в конце.',
    [['oi', 'oi в середине слова — /ɔɪ/.', 'toilet noise'],
      ['oy', 'oy в конце слова или слога — /ɔɪ/.', 'boyfriend enjoy']],
    ''],

  ['ear', 'ɪə', 'diphthong', 'дифтонг иэ',
    'eer, ere и ear — «и» с призвуком.',
    [['eer', 'eer — /ɪə/.', 'beer'],
      ['ere', 'ere в here и we’re — /ɪə/. В where и there те же буквы дают /eə/.', 'here we’re'],
      ['ear', 'ear — обычно /ɪə/ (near, year).', 'near year']],
    'really idea cereal'],

  ['chair', 'eə', 'diphthong', 'дифтонг эа',
    'air, и ere в where / there.',
    [['air', 'air — /eə/.', 'airport repair'],
      ['ere', 'ere в where и there — /eə/. Сравните с here /ɪə/: это надо просто запомнить.', 'where there']],
    'their careful'],

  ['tourist', 'ʊə', 'diphthong', 'дифтонг уэ',
    'Очень редкий звук — проще выучить сам список слов.',
    [['—', 'Правила по буквам нет: книга называет этот звук очень необычным.', 'euro Europe sure plural']],
    ''],

  // ---- The two weak vowels the book prints without a key word -------
  ['weak-i', 'i', 'weak-vowel', 'звук между /ɪ/ и /iː/',
    '«Согласная + y» в конце слова читается как /i/.',
    [['y', '«Согласная + y» в конце слова — /i/ (happy). В коротких словах y даёт /aɪ/ (my).', 'happy angry hungry']],
    ''],

  ['weak-u', 'u', 'weak-vowel', 'короткий безударный у',
    'Необычный звук: запомнить по словам.',
    [['u', 'Безударная u перед другой гласной (usually, situation) — короткий /u/.', 'usually situation education']],
    ''],
];
