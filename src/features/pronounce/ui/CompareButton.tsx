import { useEffect, useRef, useState } from 'react';
import { isSpeechAvailable, speakSequence, type SequenceHandle } from '../model/speech';

interface Props {
  /** Words to read out one after another so their sounds can be compared. */
  words: readonly string[];
  label?: string;
  /** Called with the index currently being spoken, or -1 when idle. */
  onIndex?: (index: number) => void;
}

/** Plays several words in a row. Pressing it again stops the sequence. */
export function CompareButton({ words, label = 'Play all', onIndex }: Props): JSX.Element | null {
  const [playing, setPlaying] = useState(false);
  const handle = useRef<SequenceHandle | null>(null);

  // A sequence must never outlive the screen that started it (Performance.md §2).
  useEffect(() => () => handle.current?.cancel(), []);

  if (!isSpeechAvailable() || words.length === 0) return null;

  const stop = (): void => {
    handle.current?.cancel();
    handle.current = null;
    setPlaying(false);
  };

  const onClick = (): void => {
    if (playing) {
      stop();
      return;
    }
    setPlaying(true);
    handle.current = speakSequence(words, (index) => {
      onIndex?.(index);
      if (index === -1) {
        handle.current = null;
        setPlaying(false);
      }
    }, { rate: 0.85 });
  };

  return (
    <button type="button" className="btn btn-sm" onClick={onClick}>
      <span aria-hidden="true">{playing ? '⏹' : '🔊'}</span>
      <span>{playing ? 'Stop' : label}</span>
    </button>
  );
}
