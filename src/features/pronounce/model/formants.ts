/**
 * What each vowel of the Sound Bank sounds like, as formant frequencies.
 *
 * A vowel's identity is carried almost entirely by its first three formants —
 * the resonances of the vocal tract — so a vowel can be rendered from those
 * numbers alone. This is what lets the app play the bare sound: the browser's
 * speech synthesiser can only say *words*, and handing it `/ɪ/` reads out the
 * characters, not the sound.
 *
 * The values are the standard reference figures for Standard Southern British
 * English (the accent of the book's Sound Bank), male voice. They are acoustic
 * measurements, not educational content — see `docs/decisions.md` §17.
 */

export interface Formants {
  /** First formant, Hz. Roughly: how open the mouth is. */
  f1: number;
  /** Second formant, Hz. Roughly: how far forward the tongue is. */
  f2: number;
  f3: number;
}

export type VowelShape =
  /** A vowel held steady: one target. */
  | { kind: 'pure'; ms: number; at: Formants }
  /** A diphthong: the mouth moves from one vowel towards another. */
  | { kind: 'glide'; ms: number; from: Formants; to: Formants };

const f = (f1: number, f2: number, f3: number): Formants => ({ f1, f2, f3 });

/** The steady targets the diphthongs glide between, so they stay consistent. */
const TARGET = {
  fleece: f(280, 2250, 2890),
  kit: f(360, 2100, 2700),
  dress: f(560, 1900, 2500),
  trap: f(730, 1600, 2500),
  start: f(680, 1100, 2540),
  lot: f(600, 900, 2600),
  thought: f(450, 740, 2500),
  foot: f(380, 950, 2400),
  goose: f(320, 900, 2200),
  strut: f(720, 1240, 2500),
  nurse: f(580, 1380, 2500),
  schwa: f(500, 1500, 2500),
  /** The open starting point of /aɪ/ and /aʊ/, between TRAP and START. */
  open: f(730, 1300, 2500),
};

const SHORT = 400;
const LONG = 700;
const DIPHTHONG = 650;
const WEAK = 320;

const pure = (ms: number, at: Formants): VowelShape => ({ kind: 'pure', ms, at });
const glide = (from: Formants, to: Formants): VowelShape =>
  ({ kind: 'glide', ms: DIPHTHONG, from, to });

/**
 * Keyed by the bare IPA symbol, exactly as the Sound Bank writes it, so the
 * caller never has to know about Sound Bank key words.
 */
export const VOWEL_SHAPES: Readonly<Record<string, VowelShape>> = {
  // Short vowels
  'ɪ': pure(SHORT, TARGET.kit),
  'æ': pure(SHORT, TARGET.trap),
  'ɒ': pure(SHORT, TARGET.lot),
  'ʊ': pure(SHORT, TARGET.foot),
  'e': pure(SHORT, TARGET.dress),
  'ʌ': pure(SHORT, TARGET.strut),
  // Long vowels
  'iː': pure(LONG, TARGET.fleece),
  'ɑː': pure(LONG, TARGET.start),
  'ɔː': pure(LONG, TARGET.thought),
  'uː': pure(LONG, TARGET.goose),
  'ɜː': pure(LONG, TARGET.nurse),
  // Diphthongs
  'eɪ': glide(TARGET.dress, TARGET.kit),
  'əʊ': glide(TARGET.schwa, TARGET.foot),
  'aɪ': glide(TARGET.open, TARGET.kit),
  'aʊ': glide(TARGET.open, TARGET.foot),
  'ɔɪ': glide(TARGET.thought, TARGET.kit),
  'ɪə': glide(TARGET.kit, TARGET.schwa),
  'eə': glide(TARGET.dress, TARGET.schwa),
  'ʊə': glide(TARGET.foot, TARGET.schwa),
  // Weak vowels: always unstressed, so they are short and quiet in speech.
  'ə': pure(WEAK, TARGET.schwa),
  'i': pure(WEAK, f(320, 2200, 2800)),
  'u': pure(WEAK, f(350, 1000, 2300)),
};

export function shapeFor(ipa: string): VowelShape | undefined {
  return VOWEL_SHAPES[ipa];
}

/** True when the app can play this sound on its own, without a word around it. */
export function canPlayAlone(ipa: string): boolean {
  return VOWEL_SHAPES[ipa] !== undefined;
}
