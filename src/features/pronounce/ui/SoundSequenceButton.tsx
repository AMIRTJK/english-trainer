import { useEffect, useRef, useState } from 'react';
import { canPlayAlone } from '../model/formants';
import {
  isVowelAudioAvailable, playVowelSequence, type VowelSequenceHandle,
} from '../model/vowel-audio';

interface Props {
  /** Bare IPA symbols to play one after another. */
  ipas: readonly string[];
  label?: string;
  /** Called with the index currently sounding, or -1 when idle. */
  onIndex?: (index: number) => void;
}

/** Plays a whole group of vowels in a row, so they can be heard as a set. */
export function SoundSequenceButton({
  ipas, label = 'Play all sounds', onIndex,
}: Props): JSX.Element | null {
  const [playing, setPlaying] = useState(false);
  const handle = useRef<VowelSequenceHandle | null>(null);

  useEffect(() => () => handle.current?.cancel(), []);

  const playable = ipas.filter(canPlayAlone);
  if (!isVowelAudioAvailable() || playable.length === 0) return null;

  const onClick = (): void => {
    if (playing) {
      handle.current?.cancel();
      handle.current = null;
      setPlaying(false);
      return;
    }
    setPlaying(true);
    handle.current = playVowelSequence(playable, (index) => {
      onIndex?.(index);
      if (index === -1) {
        handle.current = null;
        setPlaying(false);
      }
    });
  };

  return (
    <button type="button" className="btn btn-sm" onClick={onClick}>
      <span aria-hidden="true">{playing ? '⏹' : '🔉'}</span>
      <span>{playing ? 'Stop' : label}</span>
    </button>
  );
}
