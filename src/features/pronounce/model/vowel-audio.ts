import { shapeFor, type Formants, type VowelShape } from './formants';

/**
 * Playing a vowel on its own.
 *
 * Source-filter synthesis: a buzzing glottal source (a sawtooth, which has the
 * harmonic stack a voice has) is passed through three band-pass resonators set
 * to the vowel's formants. That is the textbook model of how a vowel is made,
 * and it is the only way to produce the sound in isolation — the Speech
 * Synthesis API can only pronounce words.
 *
 * It costs nothing in the bundle: the Web Audio API is part of the browser, so
 * no audio files ship and nothing is fetched (`Performance.md` §6). The result
 * is a clear, synthetic vowel — recognisable and consistent, but not a human
 * voice, which is why every screen keeps the spoken key word next to it.
 *
 * Nothing is created until the learner presses play, and every node is stopped
 * and disconnected when the sound ends or is cancelled (`Performance.md` §2).
 */

/** Pitch of the synthetic voice, falling slightly the way a real one does. */
const F0_START = 128;
const F0_END = 104;

/**
 * Resonance of each formant filter.
 *
 * A fixed Q rather than a fixed bandwidth, which is the less obvious choice:
 * with a fixed bandwidth the high-formant vowels let through far fewer of the
 * source's harmonics, and the chart came out with a 9 dB loudness spread —
 * /iː/ loud, /ʌ/ quiet. Since the whole point of the chart is comparing vowels
 * one after another, that difference reads as a property of the sound, which it
 * is not. A fixed Q of 6 measures at about 4 dB spread while keeping the
 * formant peaks far enough apart to tell the vowels apart.
 */
const FORMANT_Q = 6;
/** Higher formants carry less energy, as in a real voice. */
const FORMANT_GAINS = [1, 0.7, 0.35];

const ATTACK_S = 0.035;
const RELEASE_S = 0.09;
/** Measured: this keeps the loudest vowel peaking near 0.35, well clear of 1. */
const PEAK_GAIN = 0.85;

/** The glide of a diphthong happens in the middle, not at the very edges. */
const GLIDE_START = 0.3;
const GLIDE_END = 0.85;

type AudioContextCtor = typeof AudioContext;

function contextCtor(): AudioContextCtor | null {
  if (typeof window === 'undefined') return null;
  const w = window as Window & { webkitAudioContext?: AudioContextCtor };
  return window.AudioContext ?? w.webkitAudioContext ?? null;
}

export function isVowelAudioAvailable(): boolean {
  return contextCtor() !== null;
}

let context: AudioContext | null = null;
let stopCurrent: (() => void) | null = null;

/** Created on the first press, so no audio graph exists until it is wanted. */
function audioContext(): AudioContext | null {
  if (context) return context;
  const Ctor = contextCtor();
  if (!Ctor) return null;
  context = new Ctor();
  return context;
}

function formantAt(shape: VowelShape, at: 'from' | 'to'): Formants {
  if (shape.kind === 'pure') return shape.at;
  return at === 'from' ? shape.from : shape.to;
}

export interface PlayVowelOptions {
  /** Hold the vowel longer, for listening rather than comparing. */
  long?: boolean;
}

/**
 * Play one vowel by its bare IPA symbol, e.g. `iː`.
 *
 * Resolves when the sound has finished. Playing a second vowel stops the first,
 * so a learner tapping through the chart never stacks sounds on top of
 * each other.
 */
export function playVowel(ipa: string, options: PlayVowelOptions = {}): Promise<void> {
  const shape = shapeFor(ipa);
  const ctx = audioContext();
  if (!shape || !ctx) return Promise.resolve();

  stopVowel();
  // Browsers start the context suspended until a user gesture; this call is
  // always made from a click, so resuming here is enough.
  if (ctx.state === 'suspended') void ctx.resume();

  const now = ctx.currentTime;
  const seconds = (shape.ms / 1000) * (options.long ? 1.8 : 1);
  const end = now + seconds;

  const source = ctx.createOscillator();
  source.type = 'sawtooth';
  source.frequency.setValueAtTime(F0_START, now);
  source.frequency.linearRampToValueAtTime(F0_END, end);

  const output = ctx.createGain();
  output.gain.setValueAtTime(0, now);
  output.gain.linearRampToValueAtTime(PEAK_GAIN, now + ATTACK_S);
  output.gain.setValueAtTime(PEAK_GAIN, Math.max(now + ATTACK_S, end - RELEASE_S));
  output.gain.linearRampToValueAtTime(0, end);

  // Takes the edge off the sawtooth so the vowel does not sound like a buzzer.
  const tilt = ctx.createBiquadFilter();
  tilt.type = 'lowpass';
  tilt.frequency.setValueAtTime(4200, now);
  tilt.Q.setValueAtTime(0.7, now);

  const from = formantAt(shape, 'from');
  const to = formantAt(shape, 'to');
  const starts = [from.f1, from.f2, from.f3];
  const ends = [to.f1, to.f2, to.f3];

  const filters: BiquadFilterNode[] = [];
  const gains: GainNode[] = [];

  for (let i = 0; i < 3; i += 1) {
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    const startHz = starts[i] as number;
    const endHz = ends[i] as number;
    filter.frequency.setValueAtTime(startHz, now);
    if (shape.kind === 'glide') {
      filter.frequency.setValueAtTime(startHz, now + seconds * GLIDE_START);
      filter.frequency.linearRampToValueAtTime(endHz, now + seconds * GLIDE_END);
    }
    filter.Q.setValueAtTime(FORMANT_Q, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(FORMANT_GAINS[i] as number, now);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(tilt);
    filters.push(filter);
    gains.push(gain);
  }

  tilt.connect(output);
  output.connect(ctx.destination);
  source.start(now);
  source.stop(end);

  return new Promise<void>((resolve) => {
    let done = false;
    const teardown = (): void => {
      if (done) return;
      done = true;
      try {
        source.stop();
      } catch {
        // Already stopped; the graph still has to be released.
      }
      source.disconnect();
      for (const filter of filters) filter.disconnect();
      for (const gain of gains) gain.disconnect();
      tilt.disconnect();
      output.disconnect();
      if (stopCurrent === teardown) stopCurrent = null;
      resolve();
    };
    source.onended = teardown;
    stopCurrent = teardown;
  });
}

/** Stop whatever is sounding. Safe to call when nothing is. */
export function stopVowel(): void {
  stopCurrent?.();
}

export interface VowelSequenceHandle {
  cancel: () => void;
}

/**
 * Play several vowels in order, so a group can be heard as a set — the short
 * vowels one after another, for instance. `onIndex` reports the sound being
 * played, or -1 when the sequence ends.
 */
export function playVowelSequence(
  ipas: readonly string[],
  onIndex: (index: number) => void,
  gapMs = 320,
): VowelSequenceHandle {
  let stopped = false;
  let timer: ReturnType<typeof setTimeout> | null = null;

  const run = async (): Promise<void> => {
    for (let i = 0; i < ipas.length; i += 1) {
      if (stopped) break;
      onIndex(i);
      await playVowel(ipas[i] ?? '');
      if (stopped) break;
      await new Promise<void>((resolve) => {
        timer = setTimeout(resolve, gapMs);
      });
    }
    if (!stopped) onIndex(-1);
  };

  void run();

  return {
    cancel: () => {
      stopped = true;
      if (timer !== null) clearTimeout(timer);
      stopVowel();
      onIndex(-1);
    },
  };
}
