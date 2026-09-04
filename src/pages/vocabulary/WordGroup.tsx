import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { SoundGroup } from '@content/types';
import { CompareButton } from '@/features/pronounce';
import type { VocabLevelProgress, WordGroupView } from '@/features/vocab-learning';
import { WordRow } from '@/widgets/vocab';
import { scopeToParams } from './scope-params';

const COMPARE_LIMIT = 6;

interface Props {
  group: WordGroupView;
  soundByKey: ReadonlyMap<string, SoundGroup>;
  progress: VocabLevelProgress;
}

/**
 * One section of the word list. It shows all of its words: the page itself is
 * paginated, so a section is never long enough to need a second control.
 */
export function WordGroup({ group, soundByKey, progress }: Props): JSX.Element {
  const [playing, setPlaying] = useState(-1);
  const compareWords = group.words.slice(0, COMPARE_LIMIT).map((w) => w.word);

  return (
    <section className="card stack gap-8">
      <div className="group-head">
        <h2 className="group-title">
          {group.title}
          <span className="small dim mono-num"> · {group.words.length}</span>
        </h2>
        <div className="row">
          <CompareButton words={compareWords} label="Play" onIndex={setPlaying} />
          <Link className="btn btn-sm" to={`/vocabulary/learn?${scopeToParams(group.scope)}`}>
            Learn
          </Link>
        </div>
      </div>

      <div>
        {group.words.map((word, index) => (
          <WordRow
            key={word.id}
            word={word}
            sound={soundByKey.get(word.sound)}
            status={progress.words[word.id]?.status ?? 'new'}
            active={playing === index && index < COMPARE_LIMIT}
          />
        ))}
      </div>
    </section>
  );
}
