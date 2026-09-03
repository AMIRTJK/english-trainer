import type { SoundGroup, Topic, Unit, VocabWord } from '@content/types';
import type { SessionScope, VocabLevelProgress, WordStatus } from '@/entities/vocab';

export type GroupBy = 'unit' | 'topic' | 'sound';

export interface WordFilter {
  /** Free text over the English word and the Russian translation. */
  query: string;
  /** Only words in this Sound Bank group, `null` for all. */
  soundKey: string | null;
  /** Only words the "different sound" questions use. */
  soundTaskOnly: boolean;
  /** Only words with this learning status, `null` for all. */
  status: WordStatus | null;
}

export const EMPTY_FILTER: WordFilter = {
  query: '',
  soundKey: null,
  soundTaskOnly: false,
  status: null,
};

export function filterWords(
  words: readonly VocabWord[],
  filter: WordFilter,
  progress: VocabLevelProgress,
): VocabWord[] {
  const query = filter.query.trim().toLowerCase();
  return words.filter((word) => {
    if (filter.soundTaskOnly && !word.inSoundTask) return false;
    if (filter.soundKey && word.sound !== filter.soundKey && !word.also.includes(filter.soundKey)) {
      return false;
    }
    if (filter.status && (progress.words[word.id]?.status ?? 'new') !== filter.status) return false;
    if (query && !word.word.toLowerCase().includes(query) && !word.ru.toLowerCase().includes(query)) {
      return false;
    }
    return true;
  });
}

export interface WordGroupView {
  key: string;
  title: string;
  subtitle: string;
  words: VocabWord[];
  /** What "Learn this group" should study. */
  scope: SessionScope;
}

export interface GroupContext {
  units: readonly Unit[];
  topics: readonly Topic[];
  sounds: readonly SoundGroup[];
  contrastsFor: (sound: string) => string[];
}

function push(map: Map<string, VocabWord[]>, key: string, word: VocabWord): void {
  const list = map.get(key);
  if (list) list.push(word);
  else map.set(key, [word]);
}

/**
 * Split the filtered word list into the sections the screen shows.
 * Order follows the book: unit order, topic order, Sound Bank order.
 */
export function groupWords(
  words: readonly VocabWord[],
  groupBy: GroupBy,
  context: GroupContext,
): WordGroupView[] {
  const byKey = new Map<string, VocabWord[]>();
  for (const word of words) {
    if (groupBy === 'unit') push(byKey, word.unitId, word);
    else if (groupBy === 'topic') push(byKey, word.topicId, word);
    else push(byKey, word.sound, word);
  }

  if (groupBy === 'unit') {
    return context.units
      .filter((unit) => byKey.has(unit.id))
      .map((unit) => ({
        key: unit.id,
        title: `Unit ${unit.number}`,
        subtitle: unit.title,
        words: byKey.get(unit.id) ?? [],
        scope: { kind: 'unit', unitId: unit.id } as SessionScope,
      }));
  }

  if (groupBy === 'topic') {
    return context.topics
      .filter((topic) => byKey.has(topic.id))
      .map((topic) => ({
        key: topic.id,
        title: topic.title,
        subtitle: topic.summary,
        words: byKey.get(topic.id) ?? [],
        scope: { kind: 'topic', topicId: topic.id } as SessionScope,
      }));
  }

  return context.sounds
    .filter((sound) => byKey.has(sound.key))
    .map((sound) => {
      const others = context.contrastsFor(sound.key);
      const contrast = others.length
        ? `Contrasted in the test with ${others.map((o) => `/${soundIpa(context, o)}/`).join(', ')}`
        : sound.ru;
      return {
        key: sound.key,
        title: `/${sound.ipa}/ — ${sound.key}`,
        subtitle: contrast,
        words: byKey.get(sound.key) ?? [],
        scope: { kind: 'sound', sound: sound.key } as SessionScope,
      };
    });
}

function soundIpa(context: GroupContext, key: string): string {
  return context.sounds.find((s) => s.key === key)?.ipa ?? key;
}
