import type { SoundType } from '@content/types';
import type { SoundSummary } from '@/features/vocab-learning';
import { Bar } from '@/shared/ui/primitives';

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

/** The Sound Bank as a pickable grid, grouped by kind of sound. */
export function SoundGrid({ sounds, selected, onSelect }: Props): JSX.Element {
  return (
    <div className="stack gap-16">
      {SOUND_TYPE_ORDER.map((type) => {
        const rows = sounds.filter((s) => s.sound.type === type && s.total > 0);
        if (rows.length === 0) return null;
        return (
          <div key={type} className="stack gap-8">
            <h3 className="small dim">{SOUND_TYPE_LABEL[type]}</h3>
            <div className="grid grid-4">
              {rows.map((row) => (
                <button
                  key={row.sound.key}
                  type="button"
                  className={`sound-cell${row.weak ? ' is-weak' : ''}`}
                  aria-pressed={selected === row.sound.key}
                  onClick={() => onSelect(selected === row.sound.key ? null : row.sound.key)}
                >
                  <span className="sound-cell-top">
                    <span className="sound-cell-ipa">/{row.sound.ipa}/</span>
                    <span className="tiny dim mono-num">{row.known}/{row.total}</span>
                  </span>
                  <span className="tiny dim">{row.sound.key}</span>
                  <Bar percent={row.percent} tone={row.weak ? 'bad' : 'accent'} />
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
