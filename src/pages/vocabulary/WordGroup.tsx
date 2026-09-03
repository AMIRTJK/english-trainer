import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { SoundGroup } from '@content/types';
import { CompareButton } from '@/features/pronounce';
import type { VocabLevelProgress, WordGroupView } from '@/features/vocab-learning';
import { WordRow } from '@/widgets/vocab';
import { scopeToParams } from './scope-params';

const PREVIEW = 12;
const COMPARE_LIMIT = 6;

interface Props {
  group: WordGroupView;
  soundByKey: ReadonlyMap<string, SoundGroup>;
  progress: VocabLevelProgress;
}

/** One section of the word list, with its own compare and learn actions. */
export function WordGroup({ group, soundByKey, progress }: Props): JSX.Element {
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(-1);
  const shown = expanded ? group.words : group.words.slice(0, PREVIEW);
  const compareWords = group.words.slice(0, COMPARE_LIMIT).map((w) => w.word);

  return (
    <section className="card stack gap-12">
      <div className="group-head">
        <div>
          <h2>{group.title}</h2>
          <p className="tiny faint">{group.subtitle}</p>
        </div>
        <div className="row">
          <span className="small dim mono-num">{group.words.length}</span>
          <CompareButton words={compareWords} label="Play group" onIndex={setPlaying} />
          <Link className="btn btn-sm" to={`/vocabulary/learn?${scopeToParams(group.scope)}`}>
            Learn
          </Link>
        </div>
      </div>

      <div>
        {shown.map((word, index) => (
          <WordRow
            key={word.id}
            word={word}
            sound={soundByKey.get(word.sound)}
            status={progress.words[word.id]?.status ?? 'new'}
            active={playing === index && index < COMPARE_LIMIT}
          />
        ))}
      </div>

      {group.words.length > PREVIEW ? (
        <button type="button" className="link-btn" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Show less' : `Show all ${group.words.length} words`}
        </button>
      ) : null}
    </section>
  );
}
