/**
 * Pronunciation playback.
 *
 * The browser's Speech Synthesis API is used rather than an external TTS
 * service: it adds no runtime dependency and no network request
 * (Performance.md §6), and it can speak a word again as often as the learner
 * wants. A British English voice is preferred because the book's Sound Bank is
 * British; any English voice is accepted as a fallback.
 */
const PREFERRED_LANGS = ['en-GB', 'en-AU', 'en-US', 'en'];

let cachedVoice: SpeechSynthesisVoice | null = null;
let voicesRequested = false;

function synth(): SpeechSynthesis | null {
  if (typeof window === 'undefined') return null;
  return window.speechSynthesis ?? null;
}

export function isSpeechAvailable(): boolean {
  return synth() !== null && typeof window.SpeechSynthesisUtterance === 'function';
}

function pickVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  for (const lang of PREFERRED_LANGS) {
    const exact = voices.find((v) => v.lang.replace('_', '-') === lang);
    if (exact) return exact;
    const loose = voices.find((v) => v.lang.replace('_', '-').startsWith(lang));
    if (loose) return loose;
  }
  return null;
}

/** Voices load asynchronously in most browsers, so cache the first good one. */
function englishVoice(): SpeechSynthesisVoice | null {
  const speech = synth();
  if (!speech) return null;
  if (cachedVoice) return cachedVoice;
  cachedVoice = pickVoice(speech.getVoices());
  return cachedVoice;
}

/**
 * Ask the browser to load its voice list. Returns a teardown that removes the
 * listener, so a component can call it from an effect (Performance.md §2).
 */
export function primeVoices(): () => void {
  const speech = synth();
  if (!speech || voicesRequested) return () => undefined;
  voicesRequested = true;
  englishVoice();
  const onChange = (): void => {
    cachedVoice = null;
    englishVoice();
  };
  speech.addEventListener('voiceschanged', onChange);
  return () => {
    voicesRequested = false;
    speech.removeEventListener('voiceschanged', onChange);
  };
}

export interface SpeakOptions {
  /** 0.1 – 2. Slower than normal helps a beginner hear the vowel. */
  rate?: number;
}

/** Speak one word. Resolves when the browser finishes or fails. */
export function speak(text: string, options: SpeakOptions = {}): Promise<void> {
  const speech = synth();
  if (!speech || !isSpeechAvailable()) return Promise.resolve();
  speech.cancel();
  return new Promise<void>((resolve) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = englishVoice();
    if (voice) utterance.voice = voice;
    utterance.lang = voice?.lang ?? 'en-GB';
    utterance.rate = options.rate ?? 0.9;
    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    speech.speak(utterance);
  });
}

export interface SequenceHandle {
  /** Stop the sequence; safe to call after it has finished. */
  cancel: () => void;
}

/**
 * Speak several words in order so the learner can compare them.
 * `onWord` reports the index being spoken, or -1 when the sequence ends.
 */
export function speakSequence(
  words: readonly string[],
  onWord: (index: number) => void,
  options: SpeakOptions & { gapMs?: number } = {},
): SequenceHandle {
  let stopped = false;
  let timer: ReturnType<typeof setTimeout> | null = null;
  const gap = options.gapMs ?? 350;

  const run = async (): Promise<void> => {
    for (let i = 0; i < words.length; i += 1) {
      if (stopped) break;
      onWord(i);
      await speak(words[i] ?? '', options);
      if (stopped) break;
      await new Promise<void>((resolve) => {
        timer = setTimeout(resolve, gap);
      });
    }
    if (!stopped) onWord(-1);
  };

  void run();

  return {
    cancel: () => {
      stopped = true;
      if (timer !== null) clearTimeout(timer);
      synth()?.cancel();
      onWord(-1);
    },
  };
}

export function stopSpeaking(): void {
  synth()?.cancel();
}
