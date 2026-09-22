import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { VocabWord } from '@content/types';
import {
  answerSpelling, checkSpelling, flushVocab, hintFor, hintsLeft, selectWords, summariseRound,
  useVocabulary, type SpellingAnswer, type SpellingResult,
} from '@/features/vocab-learning';
import { Bar, Empty } from '@/shared/ui/primitives';
import { SpellingCard } from '@/widgets/vocab';
import { randomSeed } from '@/shared/lib/random';
import { scopeFromParams, scopeTitle } from './scope-params';
import { SessionSummary } from './SessionSummary';

export default function SpellingPage(): JSX.Element {
  const [params] = useSearchParams();
  const data = useVocabulary();
  const scope = useMemo(() => scopeFromParams(params), [params]);
  const [seed, setSeed] = useState(randomSeed);
  const [includeKnown, setIncludeKnown] = useState(false);
  const [position, setPosition] = useState(0);
  const [value, setValue] = useState('');
  const [hints, setHints] = useState(0);
  const [result, setResult] = useState<SpellingResult | null>(null);
  const [log, setLog] = useState<SpellingAnswer[]>([]);

  const index = data.index;

  // Built once per session: answering must not reshuffle the queue underneath
  // the learner (Performance.md §2).
  const queue = useMemo<VocabWord[]>(() => {
    if (!index) return [];
    return selectWords(index.bank.words, data.progress, {
      scope,
      track: 'spelling',
      seed,
      includeKnown,
      contrastsFor: index.contrastsFor,
    });
  }, [index, scope, seed, includeKnown]);

  // A new queue is a new session. Following a link to another group while a
  // session is open changes the scope without remounting the page, so without
  // this the next word would still be showing the previous card’s result.
  useEffect(() => {
    setPosition(0);
    setValue('');
    setHints(0);
    setResult(null);
    setLog([]);
  }, [queue]);

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

  // The new seed rebuilds the queue, and the effect above clears the round.
  const restart = (again = includeKnown): void => {
    setIncludeKnown(again);
    setSeed(randomSeed());
  };

  if (queue.length === 0) {
    return (
      <div className="page stack gap-16">
        <Empty title="No word is waiting to be spelled">
          Every word in this selection has been spelled correctly and is not due yet.
        </Empty>
        <div className="row">
          <button type="button" className="btn btn-primary" onClick={() => restart(true)}>
            Practise words I can already spell
          </button>
          <Link className="btn" to="/vocabulary">Back to Vocabulary</Link>
        </div>
      </div>
    );
  }

  if (position >= queue.length) {
    const score = summariseRound(log);
    return (
      <SessionSummary
        title={`Spelling — ${scopeTitle(scope, names)}`}
        known={score.known}
        unknown={score.unknown}
        total={queue.length}
        onRestart={() => restart()}
        mistakes={score.review}
        repeatPath="/vocabulary/spelling"
      />
    );
  }

  const word = queue[position] as VocabWord;
  const sound = index.soundByKey.get(word.sound);

  const submit = (): void => {
    const checked = checkSpelling(value, word.word);
    const hinted = hints > 0;
    setResult(checked);
    // A word that had to be spelled out by hints was not produced unaided, so it
    // comes back — but it was not *misspelled*, and the summary must not say so.
    answerSpelling(data.levelId, word.id, checked.correct && !hinted);
    setLog((current) => [...current, {
      word: word.word, ru: word.ru, typed: checked.typed, correct: checked.correct, hinted,
    }]);
  };

  const next = (): void => {
    setResult(null);
    setValue('');
    setHints(0);
    setPosition((current) => {
      if (current + 1 >= queue.length) flushVocab();
      return current + 1;
    });
  };

  return (
    <div className="page stack gap-16">
      <header className="stack gap-8">
        <div className="between">
          <Link className="link-btn" to="/vocabulary">← Vocabulary</Link>
          <span className="small dim mono-num">{position + 1} / {queue.length} words</span>
        </div>
        <h1 className="small dim">Spelling — {scopeTitle(scope, names)}</h1>
        <Bar percent={(position / queue.length) * 100} />
        <p className="tiny faint">
          <kbd>Enter</kbd> checks the answer, then moves on. A word you needed a hint for
          comes back later.
        </p>
      </header>

      <div key={word.id} className="card-anim">
        <SpellingCard
          word={word}
          sound={sound}
          value={value}
          onChange={setValue}
          onSubmit={submit}
          result={result}
          hint={hints > 0 ? hintFor(word.word, hints) : null}
          hintsLeft={hintsLeft(word.word, hints)}
          hinted={hints > 0}
          onHint={() => setHints((current) => current + 1)}
          onNext={next}
        />
      </div>
    </div>
  );
}
