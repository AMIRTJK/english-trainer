/** Word -> [Sound Bank key, IPA of the word]. Source: SB pp.134-135. */
export const SOUND_TABLE = {
    // fish /ɪ/
    italy: ['fish', '/ˈɪtəli/'], six: ['fish', '/sɪks/'], film: ['fish', '/fɪlm/'],
    window: ['fish', '/ˈwɪndəʊ/'], english: ['fish', '/ˈɪŋglɪʃ/'], women: ['fish', '/ˈwɪmɪn/'],
    gym: ['fish', '/dʒɪm/'], is: ['fish', '/ɪz/'], it: ['fish', '/ɪt/'],
    // tree /iː/
    three: ['tree', '/θriː/'], meet: ['tree', '/miːt/'], please: ['tree', '/pliːz/'],
    read: ['tree', '/riːd/'], she: ['tree', '/ʃiː/'], we: ['tree', '/wiː/'],
    people: ['tree', '/ˈpiːpl/'], key: ['tree', '/kiː/'], cheese: ['tree', '/tʃiːz/'],
    // cat /æ/
    bag: ['cat', '/bæg/'], thanks: ['cat', '/θæŋks/'], man: ['cat', '/mæn/'],
    black: ['cat', '/blæk/'], bad: ['cat', '/bæd/'], that: ['cat', '/ðæt/'],
    cap: ['cat', '/kæp/'], hat: ['cat', '/hæt/'],
    // car /ɑː/
    are: ['car', '/ɑː/'], park: ['car', '/pɑːk/'], fast: ['car', '/fɑːst/'],
    father: ['car', '/ˈfɑːðə/'], afternoon: ['car', '/ˌɑːftəˈnuːn/'], bar: ['car', '/bɑː/'], car: ['car', '/kɑː/'],
    // clock /ɒ/
    not: ['clock', '/nɒt/'], from: ['clock', '/frɒm/'], sorry: ['clock', '/ˈsɒri/'],
    stop: ['clock', '/stɒp/'], coffee: ['clock', '/ˈkɒfi/'], what: ['clock', '/wɒt/'],
    watch: ['clock', '/wɒtʃ/'], want: ['clock', '/wɒnt/'], job: ['clock', '/dʒɒb/'],
    // horse /ɔː/
    short: ['horse', '/ʃɔːt/'], important: ['horse', '/ɪmˈpɔːtnt/'], tall: ['horse', '/tɔːl/'],
    football: ['horse', '/ˈfʊtbɔːl/'], draw: ['horse', '/drɔː/'], water: ['horse', '/ˈwɔːtə/'],
    four: ['horse', '/fɔː/'], door: ['horse', '/dɔː/'],
    // bull /ʊ/
    full: ['bull', '/fʊl/'], sugar: ['bull', '/ˈʃʊgə/'], good: ['bull', '/gʊd/'],
    book: ['bull', '/bʊk/'], look: ['bull', '/lʊk/'], cook: ['bull', '/kʊk/'],
    woman: ['bull', '/ˈwʊmən/'], could: ['bull', '/kʊd/'],
    // boot /uː/
    too: ['boot', '/tuː/'], food: ['boot', '/fuːd/'], blue: ['boot', '/bluː/'],
    new: ['boot', '/njuː/'], two: ['boot', '/tuː/'], you: ['boot', '/juː/'],
    juice: ['boot', '/dʒuːs/'], beautiful: ['boot', '/ˈbjuːtɪfl/'], shoes: ['boot', '/ʃuːz/'],
    // bird /ɜː/
    person: ['bird', '/ˈpɜːsn/'], verb: ['bird', '/vɜːb/'], thirsty: ['bird', '/ˈθɜːsti/'],
    girl: ['bird', '/gɜːl/'], nurse: ['bird', '/nɜːs/'], turkey: ['bird', '/ˈtɜːki/'],
    work: ['bird', '/wɜːk/'], word: ['bird', '/wɜːd/'], world: ['bird', '/wɜːld/'],
    shirt: ['bird', '/ʃɜːt/'], skirt: ['bird', '/skɜːt/'],
    // egg /e/
    spell: ['egg', '/spel/'], ten: ['egg', '/ten/'], seven: ['egg', '/ˈsevn/'],
    twenty: ['egg', '/ˈtwenti/'], mexico: ['egg', '/ˈmeksɪkəʊ/'], friend: ['egg', '/frend/'],
    breakfast: ['egg', '/ˈbrekfəst/'], bread: ['egg', '/bred/'], red: ['egg', '/red/'],
    // up /ʌ/
    umbrella: ['up', '/ʌmˈbrelə/'], number: ['up', '/ˈnʌmbə/'], brush: ['up', '/brʌʃ/'],
    husband: ['up', '/ˈhʌzbənd/'], but: ['up', '/bʌt/'], son: ['up', '/sʌn/'],
    brother: ['up', '/ˈbrʌðə/'], young: ['up', '/jʌŋ/'], mother: ['up', '/ˈmʌðə/'],
    // train /eɪ/
    name: ['train', '/neɪm/'], late: ['train', '/leɪt/'], email: ['train', '/ˈiːmeɪl/'],
    spain: ['train', '/speɪn/'], day: ['train', '/deɪ/'], say: ['train', '/seɪ/'],
    eight: ['train', '/eɪt/'], they: ['train', '/ðeɪ/'], great: ['train', '/greɪt/'],
    grey: ['train', '/greɪ/'],
    // phone /əʊ/
    open: ['phone', '/ˈəʊpən/'], close: ['phone', '/kləʊz/'], no: ['phone', '/nəʊ/'],
    hello: ['phone', '/həˈləʊ/'], coat: ['phone', '/kəʊt/'], go: ['phone', '/gəʊ/'],
    photo: ['phone', '/ˈfəʊtəʊ/'], old: ['phone', '/əʊld/'],
    // bike /aɪ/
    hi: ['bike', '/haɪ/'], nice: ['bike', '/naɪs/'], bye: ['bike', '/baɪ/'],
    my: ['bike', '/maɪ/'], night: ['bike', '/naɪt/'], right: ['bike', '/raɪt/'],
    buy: ['bike', '/baɪ/'], white: ['bike', '/waɪt/'], wife: ['bike', '/waɪf/'],
    // owl /aʊ/
    out: ['owl', '/aʊt/'], house: ['owl', '/haʊs/'], pound: ['owl', '/paʊnd/'],
    sound: ['owl', '/saʊnd/'], town: ['owl', '/taʊn/'], down: ['owl', '/daʊn/'],
    brown: ['owl', '/braʊn/'], shower: ['owl', '/ˈʃaʊə/'],
    // boy /ɔɪ/
    toilet: ['boy', '/ˈtɔɪlət/'], noise: ['boy', '/nɔɪz/'], boyfriend: ['boy', '/ˈbɔɪfrend/'],
    enjoy: ['boy', '/ɪnˈdʒɔɪ/'],
};
