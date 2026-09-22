import { useState } from 'react';
import type { SoundType } from '@content/types';
import { CompareButton } from '@/features/pronounce';
import type { VowelSoundRow } from '@/features/vowel-sounds';
import { Bar } from '@/shared/ui/primitives';

const TYPE_LABEL: Record<SoundType, string> = {
  'short-vowel': 'Short vowels',
  'long-vowel': 'Long vowels',
  diphthong: 'Diphthongs',
  'weak-vowel': 'Weak vowels',
  consonant: 'Consonants',
};

const TYPE_ORDER: SoundType[] = ['short-vowel', 'long-vowel', 'diphthong', 'weak-vowel'];

interface Props {
  rows: VowelSoundRow[];
  /** Key of the row that should start open, e.g. after a mistake. */
  openKey?: string | null;
}

/**
 * SB p.134 as a reference list: every vowel, its spelling rules and every word
 * the page prints under it.
 *
 * One row expands at a time. Rendering all 22 rows with their 147 words at once
 * would be a wall of text and a long list for nothing (Performance.md §7).
 */
export function VowelSoundTable({ rows, openKey = null }: Props): JSX.Element {
  const [open, setOpen] = useState<string | null>(openKey);

  return (
    <div className="stack gap-16">
      {TYPE_ORDER.map((type) => {
        const group = rows.filter((row) => row.sound.type === type);
        if (group.length === 0) return null;
        return (
          <section key={type} className="card stack gap-8">
            <h2 className="small">{TYPE_LABEL[type]}</h2>
            {group.map((row) => {
              const isOpen = open === row.sound.key;
              return (
                <div key={row.sound.key} className={`vowel-row${row.weak ? ' is-weak' : ''}`}>
                  <button
                    type="button"
                    className="vowel-row-head"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : row.sound.key)}
                  >
                    <span className="vowel-row-ipa">/{row.sound.ipa}/</span>
                    <span className="vowel-row-key">
                      {row.sound.key.startsWith('weak-') ? '—' : row.sound.key}
                    </span>
                    <span className="small dim vowel-row-hint">{row.sound.hint}</span>
                    <span className="tiny dim mono-num">{row.known}/{row.total}</span>
                    <span aria-hidden="true">{isOpen ? '▴' : '▾'}</span>
                  </button>

                  {isOpen ? (
                    <div className="vowel-row-body stack gap-12">
                      <Bar percent={row.percent} tone={row.percent >= 70 ? 'good' : 'accent'} />
                      <p className="small dim">{row.sound.ru}</p>

                      {row.sound.patterns.map((pattern) => (
                        <div key={pattern.letters} className="vowel-pattern stack gap-8">
                          <div className="between">
                            <h3 className="small">
                              <code className="vowel-letters">{pattern.letters}</code>
                              {pattern.magicE ? <span className="tiny faint"> + согласная + e</span> : null}
                            </h3>
                            <CompareButton words={pattern.examples} label="Play" />
                          </div>
                          <p className="small">{pattern.ru}</p>
                          <p className="word-chips-plain">{pattern.examples.join(' · ')}</p>
                        </div>
                      ))}

                      {row.sound.exceptions.length > 0 ? (
                        <div className="vowel-pattern is-exception stack gap-8">
                          <div className="between">
                            <h3 className="small">! but also — написание обманывает</h3>
                            <CompareButton words={row.sound.exceptions} label="Play" />
                          </div>
                          <p className="word-chips-plain">{row.sound.exceptions.join(' · ')}</p>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </section>
        );
      })}
    </div>
  );
}
