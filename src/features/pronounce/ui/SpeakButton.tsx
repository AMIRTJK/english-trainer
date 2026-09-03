import { useEffect, useRef, useState } from 'react';
import { isSpeechAvailable, primeVoices, speak, stopSpeaking } from '../model/speech';

interface Props {
  /** The English word to pronounce. */
  text: string;
  /** Smaller button for dense lists. */
  compact?: boolean;
  /** Speak slowly so a beginner can hear the vowel. */
  slow?: boolean;
}

/** 🔊 button. Pressing it again repeats the word. */
export function SpeakButton({ text, compact = false, slow = false }: Props): JSX.Element | null {
  const [speaking, setSpeaking] = useState(false);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    const stopPriming = primeVoices();
    return () => {
      alive.current = false;
      stopPriming();
    };
  }, []);

  if (!isSpeechAvailable()) return null;

  const onClick = (): void => {
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      return;
    }
    setSpeaking(true);
    void speak(text, { rate: slow ? 0.7 : 0.9 }).then(() => {
      if (alive.current) setSpeaking(false);
    });
  };

  return (
    <button
      type="button"
      className={`btn speak-btn${compact ? ' btn-sm' : ''}${speaking ? ' is-speaking' : ''}`}
      onClick={onClick}
      aria-label={`Listen to ${text}`}
    >
      <span aria-hidden="true">🔊</span>
      {compact ? null : <span className="small">Listen</span>}
    </button>
  );
}
