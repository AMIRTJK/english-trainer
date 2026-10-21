/**
 * Word -> [Sound Bank key, IPA]. Every word of the Vowel sounds page, SB p.166,
 * under the row the book prints it on.
 *
 * The IPA is British, as the Vocabulary Bank prints it where the word appears
 * there (pp.148-165); the remaining words use the standard dictionary
 * transcription. A word may have more vowels than its row's: `teacher` is on
 * the /ə/ row but its stressed vowel is /iː/ — the question rows are built so
 * that this never makes a second answer defensible (`docs/decisions.md` §22).
 */
export const SOUND_TABLE: Record<string, [string, string]> = {
  // fish /ɪ/
  his: ['fish', '/hɪz/'], this: ['fish', '/ðɪs/'], film: ['fish', '/fɪlm/'], six: ['fish', '/sɪks/'],
  big: ['fish', '/bɪg/'], swim: ['fish', '/swɪm/'], english: ['fish', '/ˈɪŋglɪʃ/'],
  women: ['fish', '/ˈwɪmɪn/'], busy: ['fish', '/ˈbɪzi/'],
  // tree /iː/
  meet: ['tree', '/miːt/'], three: ['tree', '/θriː/'], eat: ['tree', '/iːt/'], speak: ['tree', '/spiːk/'],
  me: ['tree', '/miː/'], we: ['tree', '/wiː/'], people: ['tree', '/ˈpiːpl/'], police: ['tree', '/pəˈliːs/'],
  key: ['tree', '/kiː/'], niece: ['tree', '/niːs/'],
  // cat /æ/
  thanks: ['cat', '/θæŋks/'], flat: ['cat', '/flæt/'], black: ['cat', '/blæk/'], japan: ['cat', '/dʒəˈpæn/'],
  have: ['cat', '/hæv/'], tablet: ['cat', '/ˈtæblət/'],
  // car /ɑː/
  charger: ['car', '/ˈtʃɑːdʒə/'], party: ['car', '/ˈpɑːti/'], start: ['car', '/stɑːt/'],
  father: ['car', '/ˈfɑːðə/'], glasses: ['car', '/ˈglɑːsɪz/'], dance: ['car', '/dɑːns/'], aunt: ['car', '/ɑːnt/'],
  // clock /ɒ/
  hot: ['clock', '/hɒt/'], stop: ['clock', '/stɒp/'], coffee: ['clock', '/ˈkɒfi/'], long: ['clock', '/lɒŋ/'],
  not: ['clock', '/nɒt/'], box: ['clock', '/bɒks/'], what: ['clock', '/wɒt/'], watch: ['clock', '/wɒtʃ/'],
  want: ['clock', '/wɒnt/'],
  // horse /ɔː/
  sport: ['horse', '/spɔːt/'], door: ['horse', '/dɔː/'], talk: ['horse', '/tɔːk/'], small: ['horse', '/smɔːl/'],
  saw: ['horse', '/sɔː/'], draw: ['horse', '/drɔː/'], water: ['horse', '/ˈwɔːtə/'], four: ['horse', '/fɔː/'],
  bought: ['horse', '/bɔːt/'], thought: ['horse', '/θɔːt/'],
  // bull /ʊ/
  full: ['bull', '/fʊl/'], put: ['bull', '/pʊt/'], good: ['bull', '/gʊd/'], book: ['bull', '/bʊk/'],
  look: ['bull', '/lʊk/'], cook: ['bull', '/kʊk/'], could: ['bull', '/kʊd/'], would: ['bull', '/wʊd/'],
  woman: ['bull', '/ˈwʊmən/'],
  // boot /uː/
  school: ['boot', '/skuːl/'], food: ['boot', '/fuːd/'], june: ['boot', '/dʒuːn/'], blue: ['boot', '/bluː/'],
  new: ['boot', '/njuː/'], flew: ['boot', '/fluː/'], do: ['boot', '/duː/'], fruit: ['boot', '/fruːt/'],
  juice: ['boot', '/dʒuːs/'], shoe: ['boot', '/ʃuː/'],
  // computer /ə/ — the whole row of the page
  teacher: ['computer', '/ˈtiːtʃə/'], umbrella: ['computer', '/ʌmˈbrelə/'], america: ['computer', '/əˈmerɪkə/'],
  famous: ['computer', '/ˈfeɪməs/'], second: ['computer', '/ˈsekənd/'], ago: ['computer', '/əˈgəʊ/'],
  // bird /ɜː/
  her: ['bird', '/hɜː/'], verb: ['bird', '/vɜːb/'], first: ['bird', '/fɜːst/'], third: ['bird', '/θɜːd/'],
  nurse: ['bird', '/nɜːs/'], turn: ['bird', '/tɜːn/'], learn: ['bird', '/lɜːn/'], work: ['bird', '/wɜːk/'],
  world: ['bird', '/wɜːld/'], word: ['bird', '/wɜːd/'],
  // egg /e/
  yes: ['egg', '/jes/'], help: ['egg', '/help/'], ten: ['egg', '/ten/'], pet: ['egg', '/pet/'],
  very: ['egg', '/ˈveri/'], red: ['egg', '/red/'], friend: ['egg', '/frend/'], weather: ['egg', '/ˈweðə/'],
  breakfast: ['egg', '/ˈbrekfəst/'], any: ['egg', '/ˈeni/'], said: ['egg', '/sed/'],
  // up /ʌ/
  bus: ['up', '/bʌs/'], lunch: ['up', '/lʌntʃ/'], ugly: ['up', '/ˈʌgli/'], run: ['up', '/rʌn/'],
  lucky: ['up', '/ˈlʌki/'], cut: ['up', '/kʌt/'], come: ['up', '/kʌm/'], brother: ['up', '/ˈbrʌðə/'],
  son: ['up', '/sʌn/'], does: ['up', '/dʌz/'], young: ['up', '/jʌŋ/'],
  // train /eɪ/
  name: ['train', '/neɪm/'], make: ['train', '/meɪk/'], rain: ['train', '/reɪn/'], paint: ['train', '/peɪnt/'],
  play: ['train', '/pleɪ/'], day: ['train', '/deɪ/'], break: ['train', '/breɪk/'], steak: ['train', '/steɪk/'],
  great: ['train', '/greɪt/'], eight: ['train', '/eɪt/'], they: ['train', '/ðeɪ/'], grey: ['train', '/greɪ/'],
  // phone /əʊ/
  old: ['phone', '/əʊld/'], home: ['phone', '/həʊm/'], close: ['phone', '/kləʊz/'], "don't": ['phone', '/dəʊnt/'],
  road: ['phone', '/rəʊd/'], toast: ['phone', '/təʊst/'], slow: ['phone', '/sləʊ/'], low: ['phone', '/ləʊ/'],
  // bike /aɪ/
  nine: ['bike', '/naɪn/'], twice: ['bike', '/twaɪs/'], my: ['bike', '/maɪ/'], why: ['bike', '/waɪ/'],
  high: ['bike', '/haɪ/'], night: ['bike', '/naɪt/'], buy: ['bike', '/baɪ/'],
  // owl /aʊ/
  out: ['owl', '/aʊt/'], thousand: ['owl', '/ˈθaʊznd/'], cloudy: ['owl', '/ˈklaʊdi/'], count: ['owl', '/kaʊnt/'],
  how: ['owl', '/haʊ/'], down: ['owl', '/daʊn/'],
  // boy /ɔɪ/
  coin: ['boy', '/kɔɪn/'], noise: ['boy', '/nɔɪz/'], toilet: ['boy', '/ˈtɔɪlət/'],
  unemployed: ['boy', '/ˌʌnɪmˈplɔɪd/'], enjoy: ['boy', '/ɪnˈdʒɔɪ/'],
  // ear /ɪə/
  beer: ['ear', '/bɪə/'], engineer: ['ear', '/ˌendʒɪˈnɪə/'], here: ['ear', '/hɪə/'], "we're": ['ear', '/wɪə/'],
  dear: ['ear', '/dɪə/'], hear: ['ear', '/hɪə/'], really: ['ear', '/ˈrɪəli/'], idea: ['ear', '/aɪˈdɪə/'],
  // chair /eə/
  airport: ['chair', '/ˈeəpɔːt/'], stairs: ['chair', '/steəz/'], pair: ['chair', '/peə/'], hair: ['chair', '/heə/'],
  square: ['chair', '/skweə/'], careful: ['chair', '/ˈkeəfl/'], their: ['chair', '/ðeə/'], there: ['chair', '/ðeə/'],
  wear: ['chair', '/weə/'],
  // tourist /ʊə/ — the whole row of the page
  euro: ['tourist', '/ˈjʊərəʊ/'], europe: ['tourist', '/ˈjʊərəp/'], plural: ['tourist', '/ˈplʊərəl/'],
  sure: ['tourist', '/ʃʊə/'],
  // the two weak vowels the book prints without a key word
  happy: ['weak-i', '/ˈhæpi/'], angry: ['weak-i', '/ˈæŋgri/'], thirsty: ['weak-i', '/ˈθɜːsti/'],
  education: ['weak-u', '/ˌedʒuˈkeɪʃn/'], usually: ['weak-u', '/ˈjuːʒuəli/'], situation: ['weak-u', '/ˌsɪtʃuˈeɪʃn/'],
};
