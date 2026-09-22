import { useState } from 'react';
import type { SoundType, VowelSound } from '@content/types';
import { SoundSequenceButton, SpeakButton, isVowelAudioAvailable } from '@/features/pronounce';
import { SoundCell } from './SoundCell';

const TYPE_LABEL: Record<SoundType, string> = {
  'short-vowel': 'Short vowels',
  'long-vowel': 'Long vowels',
  diphthong: 'Diphthongs',
  'weak-vowel': 'Weak vowels',
  consonant: 'Consonants',
};

const TYPE_ORDER: SoundType[] = ['short-vowel', 'long-vowel', 'diphthong', 'weak-vowel'];

interface Props {
  sounds: readonly VowelSound[];
}

/**
 * The sounds themselves, without any word around them.
 *
 * Every other screen plays a vowel inside a word, which is how it is used but
 * not how it is *heard*: the consonants colour it. Here each sound is played on
 * its own, and a whole group can be played in a row so neighbours like /ɪ/ and
 * /iː/ can be compared directly. The key word stays one tap away, in a real
 * voice, because the synthesised tone is a reference and not a model to copy.
 */
export function VowelSoundChart({ sounds }: Props): JSX.Element | null {
  const [playingIn, setPlayingIn] = useState<{ type: string; index: number }>({
    type: '', index: -1,
  });

  if (!isVowelAudioAvailable()) return null;

  return (
    <div className="stack gap-16">
      {TYPE_ORDER.map((type) => {
        const group = sounds.filter((sound) => sound.type === type);
        if (group.length === 0) return null;
        return (
          <section key={type} className="card stack gap-12">
            <div className="between">
              <h2 className="small">{TYPE_LABEL[type]}</h2>
              <SoundSequenceButton
                ipas={group.map((sound) => sound.ipa)}
                onIndex={(index) => setPlayingIn({ type, index })}
              />
            </div>

            <div className="sound-chart">
              {group.map((sound, index) => (
                <SoundCell
                  key={sound.key}
                  sound={sound}
                  active={playingIn.type === type && playingIn.index === index}
                />
              ))}
            </div>
          </section>
        );
      })}

      <p className="tiny faint">
        Сам звук синтезирован по его формантам — он ровный и всегда одинаковый,
        удобно сравнивать. Живой голос — это кнопка со словом рядом:{' '}
        <SpeakButton text="fish" compact /> произносит слово целиком.
      </p>
    </div>
  );
}
