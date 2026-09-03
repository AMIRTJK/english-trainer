import type { SoundGroup, VocabWord } from '@content/types';
import { SpeakButton } from '@/features/pronounce';
import type { WordStatus } from '@/features/vocab-learning';
import { Pill } from '@/shared/ui/primitives';
import { IpaText } from './IpaText';

const STATUS_LABEL: Record<WordStatus, string> = {
  new: 'New',
  learning: 'Learning',
  known: 'Known',
};

export function SoundTag({ sound }: { sound: SoundGroup | undefined }): JSX.Element | null {
  if (!sound) return null;
  return (
    <span className="sound-tag" title={sound.ru}>
      <span className="sound-tag-ipa">/{sound.ipa}/</span>
      <span className="sound-tag-key">{sound.key}</span>
    </span>
  );
}

interface Props {
  word: VocabWord;
  sound: SoundGroup | undefined;
  status: WordStatus;
  /** Highlighted while a compare sequence is reading this word out. */
  active?: boolean;
}

/** One row of the word list: word, transcription, translation and its sound. */
export function WordRow({ word, sound, status, active = false }: Props): JSX.Element {
  return (
    <div className={`word-row${active ? ' is-active' : ''}`}>
      <SpeakButton text={word.word} compact />
      <div className="word-row-main">
        <div className="word-row-head">
          <span className="word-en">{word.word}</span>
          <IpaText ipa={word.ipa} soundIpa={sound?.ipa} />
        </div>
        <div className="word-ru small dim">{word.ru}</div>
      </div>
      <div className="word-row-side">
        <SoundTag sound={sound} />
        {word.inSoundTask ? <Pill tone="accent">sound test</Pill> : null}
        <span className={`tiny status-${status}`}>{STATUS_LABEL[status]}</span>
      </div>
    </div>
  );
}
