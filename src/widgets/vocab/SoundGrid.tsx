import type { SoundType } from '@content/types';
import type { SoundSummary } from '@/features/vocab-learning';

export const SOUND_TYPE_LABEL: Record<SoundType, string> = {
  'short-vowel': 'Short vowels',
  'long-vowel': 'Long vowels',
  diphthong: 'Diphthongs',
  'weak-vowel': 'Weak vowel',
  consonant: 'Consonants',
};

export const SOUND_TYPE_ORDER: SoundType[] = [
  'short-vowel', 'long-vowel', 'diphthong', 'weak-vowel', 'consonant',
];

interface Props {
  sounds: SoundSummary[];
  selected: string | null;
  onSelect: (key: string | null) => void;
}

/**
 * The Sound Bank as a pickable grid.
 *
 * Each cell carries only the symbol and the score — a progress bar on 44 cells
 * was more noise than information. A sound the learner keeps missing is marked
 * with a dot as well as a border, so colour is never the only signal.
 */
export function SoundGrid({ sounds, selected, onSelect }: Props): JSX.Element {
  return (
    <div className="stack gap-12">
      {SOUND_TYPE_ORDER.map((type) => {
        const rows = sounds.filter((s) => s.sound.type === type && s.total > 0);
        if (rows.length === 0) return null;
        return (
          <div key={type} className="stack gap-8">
            <h3 className="tiny dim">{SOUND_TYPE_LABEL[type]}</h3>
            <div className="sound-row">
              {rows.map((row) => (
                <button
                  key={row.sound.key}
                  type="button"
                  className={`sound-cell${row.weak ? ' is-weak' : ''}${selected === row.sound.key ? ' is-on' : ''}`}
                  aria-pressed={selected === row.sound.key}
                  title={`${row.sound.key} — ${row.sound.ru}${row.weak ? ' · needs work' : ''}`}
                  onClick={() => onSelect(selected === row.sound.key ? null : row.sound.key)}
                >
                  <span className="sound-cell-ipa">/{row.sound.ipa}/</span>
                  <span className="tiny dim mono-num">{row.known}/{row.total}</span>
                  {row.weak ? <span className="weak-dot" aria-hidden="true" /> : null}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
