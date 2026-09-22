import { useEffect, useRef, useState } from 'react';
import { canPlayAlone } from '../model/formants';
import { isVowelAudioAvailable, playVowel, stopVowel } from '../model/vowel-audio';

interface Props {
  /** Bare IPA symbol of the vowel, e.g. `iː`. */
  ipa: string;
  /** Show the symbol on the button rather than just a speaker icon. */
  showIpa?: boolean;
  /** Hold the vowel nearly twice as long, for a first listen. */
  long?: boolean;
  label?: string;
  compact?: boolean;
}

/**
 * Plays the vowel on its own.
 *
 * Hidden rather than disabled when the sound cannot be synthesised (no Web
 * Audio, or a consonant), so a dead control is never shown.
 */
export function SoundButton({
  ipa, showIpa = false, long = false, label, compact = false,
}: Props): JSX.Element | null {
  const [playing, setPlaying] = useState(false);
  const alive = useRef(true);

  // A sound must never outlive the screen that started it (Performance.md §2).
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      stopVowel();
    };
  }, []);

  if (!isVowelAudioAvailable() || !canPlayAlone(ipa)) return null;

  const onClick = (): void => {
    if (playing) {
      stopVowel();
      setPlaying(false);
      return;
    }
    setPlaying(true);
    void playVowel(ipa, { long }).then(() => {
      if (alive.current) setPlaying(false);
    });
  };

  return (
    <button
      type="button"
      className={`btn sound-btn${compact ? ' btn-sm' : ''}${playing ? ' is-playing' : ''}`}
      onClick={onClick}
      aria-label={`Play the sound ${ipa} on its own`}
    >
      <span aria-hidden="true">🔉</span>
      {showIpa ? <span className="sound-btn-ipa">/{ipa}/</span> : null}
      {label ? <span className="small">{label}</span> : null}
    </button>
  );
}
