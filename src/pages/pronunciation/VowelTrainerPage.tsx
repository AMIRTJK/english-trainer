import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { VowelLevel, VowelWord } from '@content/types';
import { confusableSounds } from '@content/beginner/pronunciation';
import {
  answerVowel, buildQuestion, flushVocab, requeue, selectRound, useVowels,
} from '@/features/vowel-sounds';
import { stopSpeaking } from '@/features/pronounce';
import { Bar, Empty } from '@/shared/ui/primitives';
import { VowelQuestionCard } from '@/widgets/vowels';
import { randomSeed } from '@/shared/lib/random';
import { VowelRoundSummary } from './VowelRoundSummary';

function levelParam(raw: string | null): VowelLevel | null {
  return raw === '1' || raw === '2' || raw === '3' ? (Number(raw) as VowelLevel) : null;
}

export default function VowelTrainerPage(): JSX.Element {
  const [params] = useSearchParams();
  const data = useVowels();
  const level = levelParam(params.get('level'));

  const [seed, setSeed] = useState(randomSeed);
  const [position, setPosition] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [queue, setQueue] = useState<VowelWord[] | null>(null);
  const [log, setLog] = useState<Array<{ word: string; ipa: string; right: boolean }>>([]);

  const index = data.index;

  // The round is chosen once; a wrong answer re-inserts that word a few cards
  // later rather than rebuilding the queue (Performance.md §2).
  const initial = useMemo<VowelWord[]>(() => {
    if (!index) return [];
    return selectRound(index.byLevel, data.progress.vowels, { level, seed });
  }, [index, level, seed]);

  // A new round is a new session: switching level from a link changes the
  // query without remounting the page.
  useEffect(() => {
    setQueue(initial);
    setPosition(0);
    setPicked(null);
    setLog([]);
  }, [initial]);

  const pickRef = useRef<(index: number) => void>(() => undefined);
  const nextRef = useRef<() => void>(() => undefined);

  useEffect(() => {
    const onKey = (event: KeyboardEvent): void => {
      if (event.target instanceof HTMLInputElement) return;
      if (event.key === '1' || event.key === '2' || event.key === '3') {
        pickRef.current(Number(event.key) - 1);
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        nextRef.current();
      } else return;
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  pickRef.current = () => undefined;
  nextRef.current = () => undefined;

  const cards = queue ?? initial;

  if (!index) {
    return (
      <div className="page">
        <Empty title="Pronunciation for this level is not available yet" />
      </div>
    );
  }

  // The new seed rebuilds the round, and the effect above clears it.
  const restart = (): void => setSeed(randomSeed());

  if (cards.length === 0) {
    return (
      <div className="page stack gap-16">
        <Empty title="Nothing to practise here right now">
          Every word at this level is learned and not due yet. Try another level, or come
          back later.
        </Empty>
        <Link className="btn btn-primary" to="/pronunciation">Back to Vowel sounds</Link>
      </div>
    );
  }

  if (position >= cards.length) {
    const right = log.filter((item) => item.right).length;
    return (
      <VowelRoundSummary
        level={level}
        right={right}
        total={log.length}
        mistakes={log.filter((item) => !item.right)}
        onRestart={restart}
      />
    );
  }

  const word = cards[position] as VowelWord;
  const question = buildQuestion(
    word,
    index.bank.sounds,
    index.bySound,
    confusableSounds(word.sound, word.letters),
    seed + position,
  );

  if (!question) {
    return (
      <div className="page">
        <Empty title="This word has no sound data" />
      </div>
    );
  }

  const onPick = (choice: number): void => {
    if (picked !== null) return;
    stopSpeaking();
    const right = choice === question.answer;
    setPicked(choice);
    answerVowel(data.levelId, word.id, word.sound, right);
    setLog((current) => [...current, { word: word.word, ipa: question.sound.ipa, right }]);
    // Requirement: a missed word comes back in this same session.
    if (!right) setQueue(requeue(cards, position));
  };

  const onNext = (): void => {
    if (picked === null) return;
    setPicked(null);
    setPosition((current) => {
      if (current + 1 >= cards.length) flushVocab();
      return current + 1;
    });
  };

  pickRef.current = onPick;
  nextRef.current = onNext;

  return (
    <div className="page stack gap-16">
      <header className="stack gap-8">
        <div className="between">
          <Link className="link-btn" to="/pronunciation">← Vowel sounds</Link>
          <span className="small dim mono-num">{position + 1} / {cards.length}</span>
        </div>
        <h1 className="small dim">
          {level ? `Level ${level} — ${data.bands[level - 1]?.title ?? ''}` : 'Mixed practice'}
        </h1>
        <Bar percent={(position / cards.length) * 100} />
      </header>

      <div key={`${word.id}-${position}`} className="card-anim">
        <VowelQuestionCard
          question={question}
          picked={picked}
          onPick={onPick}
          onNext={onNext}
        />
      </div>
    </div>
  );
}
