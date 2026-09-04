import type { SoundGroup, VocabWord } from '@content/types';
import { SpeakButton } from '@/features/pronounce';
import type { WordStatus } from '@/features/vocab-learning';
import { IpaText } from './IpaText';

const STATUS_LABEL: Record<WordStatus, string> = {
  new: 'Not studied yet',
  learning: 'Learning',
  known: 'Known',
};

export function SoundTag({ sound }: { sound: SoundGroup | undefined }): JSX.Element | null {
  if (!sound) return null;
  return (
    <span className="sound-tag" title={sound.ru}>
      /{sound.ipa}/
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

/**
 * One row of the word list.
 *
 * Deliberately spare: the learning status is a dot rather than a word, and the
 * "used in a sound question" flag lives in the filter bar instead of repeating
 * on hundreds of rows.
 */
export function WordRow({ word, sound, status, active = false }: Props): JSX.Element {
  return (
    <div className={`word-row${active ? ' is-active' : ''}`}>
      {/* A dot only once the word has been studied: 553 grey dots say nothing. */}
      {status === 'new' ? (
        <span className="status-dot is-empty" aria-hidden="true" />
      ) : (
        <span className={`status-dot status-${status}`} role="img" aria-label={STATUS_LABEL[status]} />
      )}
      <SpeakButton text={word.word} compact />
      <div className="word-row-main">
        <div className="word-row-head">
          <span className="word-en">{word.word}</span>
          <IpaText ipa={word.ipa} soundIpa={sound?.ipa} />
        </div>
        <div className="word-ru small dim">{word.ru}</div>
      </div>
      <SoundTag sound={sound} />
    </div>
  );
}
