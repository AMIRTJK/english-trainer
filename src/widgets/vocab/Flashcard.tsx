import type { SoundGroup, VocabWord } from '@content/types';
import { CompareButton, SpeakButton } from '@/features/pronounce';
import { IpaText } from './IpaText';

interface Props {
  word: VocabWord;
  sound: SoundGroup | undefined;
  /** Words with the same key sound. */
  similar: VocabWord[];
  /** Words whose key sound is the one this sound is confused with. */
  contrast: VocabWord[];
  contrastSound: SoundGroup | undefined;
  revealed: boolean;
  onReveal: () => void;
  onAnswer: (knew: boolean) => void;
}

function WordChip({ word, sound }: { word: VocabWord; sound?: SoundGroup }): JSX.Element {
  return (
    <li className="word-chip">
      <SpeakButton text={word.word} compact />
      <span className="word-en small">{word.word}</span>
      <IpaText ipa={word.ipa} soundIpa={sound?.ipa} />
    </li>
  );
}

/** One learning card: the word, its sound, and the two answer buttons. */
export function Flashcard({
  word, sound, similar, contrast, contrastSound, revealed, onReveal, onAnswer,
}: Props): JSX.Element {
  return (
    <article className="card flashcard stack gap-16" aria-live="polite">
      <div className="flashcard-head stack gap-8">
        <h2 className="flashcard-word">{word.word}</h2>
        <IpaText ipa={word.ipa} soundIpa={sound?.ipa} />
        {word.syllables && word.stressed !== undefined ? (
          <p className="tiny faint">
            {word.syllables.map((syllable, index) => (
              <span key={`${syllable}-${index}`} className={index === word.stressed ? 'syl-stress' : ''}>
                {index > 0 ? '·' : ''}{syllable}
              </span>
            ))}
          </p>
        ) : null}
        <SpeakButton text={word.word} />
      </div>

      {sound ? (
        <p className="small">
          Key sound <strong>/{sound.ipa}/</strong> <span className="dim">({sound.key})</span>
          <span className="dim"> — {sound.ru}</span>
        </p>
      ) : null}

      <div className="flashcard-answer">
        {revealed ? (
          <p className="flashcard-ru">«{word.ru}»</p>
        ) : (
          <button type="button" className="btn btn-block" onClick={onReveal}>
            Show translation
          </button>
        )}
      </div>

      {similar.length > 0 ? (
        <section className="stack gap-8">
          <div className="between">
            <h3 className="small">Same sound {sound ? `/${sound.ipa}/` : ''}</h3>
            <CompareButton words={[word.word, ...similar.map((w) => w.word)]} label="Compare" />
          </div>
          <ul className="word-chips">
            {similar.map((item) => <WordChip key={item.id} word={item} sound={sound} />)}
          </ul>
        </section>
      ) : null}

      {contrast.length > 0 ? (
        <section className="stack gap-8">
          <h3 className="small">
            Different sound {contrastSound ? `/${contrastSound.ipa}/` : ''}
            <span className="dim"> — the contrast the test asks about</span>
          </h3>
          <ul className="word-chips">
            {contrast.map((item) => (
              <WordChip key={item.id} word={item} sound={contrastSound} />
            ))}
          </ul>
        </section>
      ) : null}

      <div className="flashcard-actions">
        <button type="button" className="btn btn-danger btn-block" onClick={() => onAnswer(false)}>
          Don’t know
        </button>
        <button type="button" className="btn btn-primary btn-block" onClick={() => onAnswer(true)}>
          I know it
        </button>
      </div>
    </article>
  );
}
