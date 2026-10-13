import { useEffect, useMemo } from 'react';
import type { Question } from '@content/types';
import {
  CompareButton,
  SoundButton,
  SpeakButton,
  extractQuestionAudio,
  isSpeechAvailable,
  isVowelAudioAvailable,
  stopSpeaking,
  stopVowel,
} from '@/features/pronounce';
import './runner-audio.css';

interface Props {
  question: Question;
  options: readonly string[];
  /** Compact padding for dense mistake lists */
  compact?: boolean;
}

/**
 * Question Audio Player for tests and practice sessions.
 * Allows learners to hear the target sound, example words, prompt text,
 * and option pronunciations right during the test to support active learning.
 */
export function QuestionAudioPlayer({ question, options, compact = false }: Props): JSX.Element | null {
  const audio = useMemo(() => extractQuestionAudio(question, options), [question, options]);
  const hasAudioApi = isSpeechAvailable() || isVowelAudioAvailable();

  // Stop any lingering audio when advancing to another question (Performance.md §2).
  useEffect(() => {
    return () => {
      stopSpeaking();
      stopVowel();
    };
  }, [question.id]);

  if (!hasAudioApi) return null;

  const showCompare = audio.compareWords.length >= 2;
  const hasDistinctOptionWords = new Set(audio.options.map((o) => o.cleanText)).size > 1;
  const showOptionList =
    audio.options.length > 0 &&
    (audio.options.some((o) => o.ipa) || (hasDistinctOptionWords && audio.isPronunciation));

  return (
    <section
      className={`runner-audio-player card${compact ? ' is-compact' : ''}`}
      aria-label="Audio player for question"
    >
      <div className="runner-audio-header">
        <span className="runner-audio-title">
          <span aria-hidden="true">🎧</span> Sound player
        </span>
        {audio.sound ? (
          <span className="runner-audio-chip mono-num">/{audio.sound.ipa}/</span>
        ) : null}
      </div>

      <div className="runner-audio-controls">
        {audio.sound && audio.sound.canSynthesize ? (
          <SoundButton
            ipa={audio.sound.ipa}
            showIpa
            label="sound"
            long
          />
        ) : null}

        {audio.targetWord ? (
          <SpeakButton
            text={audio.targetWord}
            label={`"${audio.targetWord}"`}
            slow
          />
        ) : null}

        {audio.promptSpeech ? (
          <SpeakButton
            text={audio.promptSpeech}
            label="Read prompt"
          />
        ) : null}

        {showCompare ? (
          <CompareButton
            words={audio.compareWords}
            label="Play all options"
          />
        ) : null}
      </div>

      {showOptionList ? (
        <div className="runner-audio-options-row" aria-label="Listen to options">
          <span className="runner-audio-options-label">Options:</span>
          {audio.options.map((opt) => (
            <div key={`${opt.letter}-${opt.index}`} className="runner-audio-option-item">
              <span className="runner-audio-option-letter" aria-hidden="true">{opt.letter}</span>
              {opt.ipa && opt.canSynthesizeIpa ? (
                <SoundButton ipa={opt.ipa} showIpa compact />
              ) : null}
              {opt.cleanText ? (
                <SpeakButton text={opt.cleanText} label={opt.cleanText} />
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
