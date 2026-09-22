import { useEffect, useRef, useState } from 'react';
import type { VowelSound } from '@content/types';
import { SpeakButton, playVowel, stopVowel } from '@/features/pronounce';

interface Props {
  sound: VowelSound;
  /** True while a "play the whole group" sequence is on this sound. */
  active?: boolean;
}

/** The book prints the two weak vowels without a key word. */
function keyWordOf(sound: VowelSound): string | null {
  return sound.key.startsWith('weak-') ? null : sound.key;
}

/** One sound of the chart: the symbol plays it, the word speaks it. */
export function SoundCell({ sound, active = false }: Props): JSX.Element {
  const [playing, setPlaying] = useState(false);
  const alive = useRef(true);
  const word = keyWordOf(sound);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  const play = (): void => {
    if (playing) {
      stopVowel();
      setPlaying(false);
      return;
    }
    setPlaying(true);
    void playVowel(sound.ipa, { long: true }).then(() => {
      if (alive.current) setPlaying(false);
    });
  };

  return (
    <div className={`sound-chart-cell${playing || active ? ' is-playing' : ''}`}>
      <button
        type="button"
        className="sound-chart-play"
        onClick={play}
        aria-label={`Play the sound ${sound.ipa} on its own`}
        title={sound.ru}
      >
        <span className="sound-chart-ipa">/{sound.ipa}/</span>
        <span className="tiny dim">{sound.ru}</span>
      </button>

      <div className="sound-chart-word">
        {word ? (
          <>
            <SpeakButton text={word} compact />
            <span className="small">{word}</span>
          </>
        ) : (
          <span className="tiny faint">без ключевого слова</span>
        )}
      </div>
    </div>
  );
}
