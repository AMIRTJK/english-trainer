import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { VocabWord } from '@content/types';
import { answerWord, flushVocab, selectWords, useVocabulary } from '@/features/vocab-learning';
import { stopSpeaking } from '@/features/pronounce';
import { Bar, Empty } from '@/shared/ui/primitives';
import { Flashcard } from '@/widgets/vocab';
import { randomSeed } from '@/shared/lib/random';
import { scopeFromParams, scopeTitle } from './scope-params';
import { SessionSummary } from './SessionSummary';

const SIMILAR_LIMIT = 3;

export default function LearnPage(): JSX.Element {
  const [params] = useSearchParams();
  const data = useVocabulary();
  const scope = useMemo(() => scopeFromParams(params), [params]);
  const [seed, setSeed] = useState(randomSeed);
  const [includeKnown, setIncludeKnown] = useState(false);
  const [position, setPosition] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [result, setResult] = useState({ known: 0, unknown: 0 });

  const index = data.index;
  // The keyboard handler must always see the current card (Performance.md §2:
  // one listener, honest teardown, no re-subscription per render).
  const answerRef = useRef<(knew: boolean) => void>(() => undefined);
  const revealRef = useRef<() => void>(() => undefined);

  useEffect(() => {
    const onKey = (event: KeyboardEvent): void => {
      if (event.target instanceof HTMLInputElement) return;
      if (event.key === '1' || event.key === 'ArrowLeft') answerRef.current(false);
      else if (event.key === '2' || event.key === 'ArrowRight') answerRef.current(true);
      else if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        revealRef.current();
      } else return;
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Reset every render: the screens below (empty state, summary) must not let a
  // key press answer the card that was on screen before them.
  answerRef.current = () => undefined;
  revealRef.current = () => undefined;

  // The queue is built once per session: answering a card must not reshuffle it
  // under the learner's feet (Performance.md §2).
  const queue = useMemo<VocabWord[]>(() => {
    if (!index) return [];
    return selectWords(index.bank.words, data.progress, {
      scope,
      seed,
      includeKnown,
      contrastsFor: index.contrastsFor,
    });
    // `data.progress` is read once, at session start: answering a card must not
    // reshuffle the queue underneath the learner.
  }, [index, scope, seed, includeKnown]);

  const names = useMemo(() => {
    const map = new Map<string, string>();
    for (const unit of data.units) map.set(unit.id, `Unit ${unit.number}`);
    for (const topic of data.topics) map.set(topic.id, topic.title);
    for (const sound of index?.bank.sounds ?? []) map.set(sound.key, `/${sound.ipa}/ ${sound.key}`);
    return map;
  }, [data.units, data.topics, index]);

  if (!index) {
    return (
      <div className="page">
        <Empty title="Vocabulary for this level is not available yet" />
      </div>
    );
  }

  const restart = (again = includeKnown): void => {
    setIncludeKnown(again);
    setSeed(randomSeed());
    setPosition(0);
    setRevealed(false);
    setResult({ known: 0, unknown: 0 });
  };

  if (queue.length === 0) {
    return (
      <div className="page stack gap-16">
        <Empty title="Nothing to study here right now">
          Every word in this selection is learned and not due yet. Come back later, or
          pick another group from the word list.
        </Empty>
        <div className="row">
          <button type="button" className="btn btn-primary" onClick={() => restart(true)}>
            Revise words I already know
          </button>
          <Link className="btn" to="/vocabulary">Back to Vocabulary</Link>
        </div>
      </div>
    );
  }

  if (position >= queue.length) {
    return (
      <SessionSummary
        title={scopeTitle(scope, names)}
        known={result.known}
        unknown={result.unknown}
        total={queue.length}
        onRestart={() => restart()}
      />
    );
  }

  const word = queue[position] as VocabWord;
  const sound = index.soundByKey.get(word.sound);
  const similar = (index.bySound.get(word.sound) ?? [])
    .filter((w) => w.id !== word.id)
    .slice(0, SIMILAR_LIMIT);
  const contrastKey = index.contrastsFor(word.sound)[0];
  const contrast = contrastKey
    ? (index.bySound.get(contrastKey) ?? []).slice(0, SIMILAR_LIMIT)
    : [];

  const onAnswer = (knew: boolean): void => {
    stopSpeaking();
    answerWord(data.levelId, word.id, [word.sound, ...word.also], knew);
    setResult((current) => ({
      known: current.known + (knew ? 1 : 0),
      unknown: current.unknown + (knew ? 0 : 1),
    }));
    setRevealed(false);
    setPosition((current) => {
      if (current + 1 >= queue.length) flushVocab();
      return current + 1;
    });
  };

  answerRef.current = onAnswer;
  revealRef.current = () => setRevealed(true);

  return (
    <div className="page stack gap-16">
      <header className="stack gap-8">
        <div className="between">
          <Link className="link-btn" to="/vocabulary">← Vocabulary</Link>
          <span className="small dim mono-num">{position + 1} / {queue.length} words</span>
        </div>
        <h1 className="small dim">{scopeTitle(scope, names)}</h1>
        <Bar percent={(position / queue.length) * 100} />
        <p className="tiny faint">
          Keys: <kbd>Space</kbd> shows the translation, <kbd>1</kbd> don’t know,
          {' '}<kbd>2</kbd> I know it.
        </p>
      </header>

      <div key={word.id} className="card-anim">
        <Flashcard
          word={word}
          sound={sound}
          similar={similar}
          contrast={contrast}
          contrastSound={contrastKey ? index.soundByKey.get(contrastKey) : undefined}
          revealed={revealed}
          onReveal={() => setRevealed(true)}
          onAnswer={onAnswer}
        />
      </div>
    </div>
  );
}
