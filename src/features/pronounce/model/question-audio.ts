import type { Question } from '@content/types';
import { canPlayAlone } from './formants';

export interface SoundItem {
  ipa: string;
  word?: string;
  canSynthesize: boolean;
}

export interface OptionAudioItem {
  index: number;
  letter: string;
  rawText: string;
  cleanText: string;
  ipa?: string;
  word?: string;
  canSynthesizeIpa: boolean;
}

export interface QuestionAudioModel {
  /** Target sound from prompt (e.g. /eə/ chair) */
  sound?: SoundItem;
  /** Primary target word to speak (e.g. chair, egg, airport) */
  targetWord?: string;
  /** Clean prompt text to speak with Speech Synthesis */
  promptSpeech: string;
  /** Whether the question tests pronunciation specifically */
  isPronunciation: boolean;
  /** Audio representations for each displayed option */
  options: OptionAudioItem[];
  /** Words suitable for sequential comparison */
  compareWords: string[];
}

const SOUND_REGEX = /\/([^\/\s]+)\/(?:\s+([a-zA-Z'’-]+))?/;

function cleanWord(str: string): string {
  return str
    .replace(/['|]/g, '') // remove syllable marks in word-stress: 'won|der|ful -> wonderful
    .replace(/^["'«]/, '')
    .replace(/["'»]$/, '')
    .trim();
}

function cleanPrompt(prompt: string): string {
  return prompt
    .replace(/___/g, ' blank ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extract phonetic and spoken audio cues from a question and its current options.
 * Pure and deterministic, suitable for unit testing.
 */
export function extractQuestionAudio(
  question: Question,
  displayedOptions: readonly string[],
): QuestionAudioModel {
  let sound: SoundItem | undefined;
  let targetWord: string | undefined;

  // 1. Check prompt for /ipa/ and keyword (e.g. "Which letters usually spell /eə/ chair?")
  const promptMatch = SOUND_REGEX.exec(question.prompt);
  if (promptMatch) {
    const rawIpa = promptMatch[1]?.trim() ?? '';
    const rawWord = promptMatch[2]?.trim();
    if (rawIpa) {
      sound = {
        ipa: rawIpa,
        word: rawWord,
        canSynthesize: canPlayAlone(rawIpa),
      };
      if (rawWord) targetWord = cleanWord(rawWord);
    }
  }

  // 2. Check question metadata: word-stress or sound
  if (question.stress?.word) {
    targetWord = question.stress.word;
  }
  if (!sound && question.sound?.target) {
    targetWord ??= question.sound.target;
  }

  // 3. Process options
  const optionAudios: OptionAudioItem[] = displayedOptions.map((opt, i) => {
    const letter = ['A', 'B', 'C'][i] ?? '';
    const match = SOUND_REGEX.exec(opt);
    let ipa: string | undefined;
    let word: string | undefined;

    if (match) {
      ipa = match[1]?.trim();
      word = match[2]?.trim();
    } else {
      word = cleanWord(opt);
    }

    return {
      index: i,
      letter,
      rawText: opt,
      cleanText: word ?? opt,
      ipa,
      word,
      canSynthesizeIpa: ipa ? canPlayAlone(ipa) : false,
    };
  });

  // 4. Sequential comparison words (when all options are clean words/phrases)
  const compareWords = optionAudios
    .map((o) => o.word || o.cleanText)
    .filter((w): w is string => Boolean(w && !w.startsWith('/') && w.length > 0 && w !== '—'));

  const isPronunciation =
    question.categoryId === 'pronunciation' ||
    question.type === 'different-sound' ||
    question.type === 'word-stress' ||
    Boolean(sound || question.sound || question.stress);

  return {
    sound,
    targetWord,
    promptSpeech: cleanPrompt(question.prompt),
    isPronunciation,
    options: optionAudios,
    compareWords: compareWords.length === displayedOptions.length ? compareWords : [],
  };
}
