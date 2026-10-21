import type {
  CategoryId, LevelContent, LevelMeta, Question, SoundGroup, Topic, VocabWord, VocabularyBank,
  VowelBank, VowelSound, VowelWord,
} from './types';
import { LEVELS, loadedContent } from './levels';
import { createLexiconChecker, type LexiconChecker } from './common/lexicon';
import { soundsPerLetters } from './common/vowel-bank';

export {
  DEFAULT_LEVEL_ID, LEVELS, hasContent, isLevelLoaded, loadAllLevels, loadLevel,
} from './levels';

/*
 * Lookups over a level's content. They answer only for a level that has been
 * loaded (`loadLevel`); the app loads the active level before it renders.
 */

export interface LevelIndex {
  content: LevelContent;
  byId: Map<string, Question>;
  byTopic: Map<string, Question[]>;
  byCategory: Map<CategoryId, Question[]>;
  byConstruct: Map<string, Question[]>;
  topicById: Map<string, Topic>;
  topicsByCategory: Map<CategoryId, Topic[]>;
}

/** Indexes are built once per level and cached (Performance.md §1). */
const indexCache = new Map<string, LevelIndex>();

function buildIndex(content: LevelContent): LevelIndex {
  const byId = new Map<string, Question>();
  const byTopic = new Map<string, Question[]>();
  const byCategory = new Map<CategoryId, Question[]>();
  const byConstruct = new Map<string, Question[]>();

  for (const q of content.questions) {
    byId.set(q.id, q);
    push(byTopic, q.topicId, q);
    push(byCategory, q.categoryId, q);
    push(byConstruct, q.constructId, q);
  }

  const topicById = new Map(content.topics.map((t) => [t.id, t]));
  const topicsByCategory = new Map<CategoryId, Topic[]>();
  for (const t of content.topics) push(topicsByCategory, t.categoryId, t);

  return { content, byId, byTopic, byCategory, byConstruct, topicById, topicsByCategory };
}

function push<K, V>(map: Map<K, V[]>, key: K, value: V): void {
  const list = map.get(key);
  if (list) list.push(value);
  else map.set(key, [value]);
}

export function getLevelIndex(levelId: string): LevelIndex | null {
  const cached = indexCache.get(levelId);
  if (cached) return cached;
  const content = loadedContent(levelId);
  if (!content) return null;
  const index = buildIndex(content);
  indexCache.set(levelId, index);
  return index;
}

export function getLevelMeta(levelId: string): LevelMeta | undefined {
  return LEVELS.find((l) => l.id === levelId);
}

export interface VocabularyIndex {
  bank: VocabularyBank;
  byId: Map<string, VocabWord>;
  /** Words per Sound Bank key, including the sounds listed in `also`. */
  bySound: Map<string, VocabWord[]>;
  byTopic: Map<string, VocabWord[]>;
  byUnit: Map<string, VocabWord[]>;
  soundByKey: Map<string, SoundGroup>;
  /** Words that appear in a "different sound" question. */
  soundTaskWords: VocabWord[];
  /** Sounds this sound is contrasted with somewhere in the question bank. */
  contrastsFor: (sound: string) => string[];
}

const vocabCache = new Map<string, VocabularyIndex>();

function buildVocabularyIndex(bank: VocabularyBank): VocabularyIndex {
  const byId = new Map<string, VocabWord>();
  const bySound = new Map<string, VocabWord[]>();
  const byTopic = new Map<string, VocabWord[]>();
  const byUnit = new Map<string, VocabWord[]>();
  const soundTaskWords: VocabWord[] = [];

  for (const word of bank.words) {
    byId.set(word.id, word);
    push(byTopic, word.topicId, word);
    push(byUnit, word.unitId, word);
    for (const key of [word.sound, ...word.also]) if (key) push(bySound, key, word);
    if (word.inSoundTask) soundTaskWords.push(word);
  }

  const contrast = new Map<string, string[]>();
  for (const [a, b] of bank.contrasts) {
    push(contrast, a, b);
    push(contrast, b, a);
  }

  return {
    bank,
    byId,
    bySound,
    byTopic,
    byUnit,
    soundByKey: new Map(bank.sounds.map((s) => [s.key, s])),
    soundTaskWords,
    contrastsFor: (sound: string) => contrast.get(sound) ?? [],
  };
}

/** Built once per level and cached, like the question index (Performance.md §1). */
export function getVocabularyIndex(levelId: string): VocabularyIndex | null {
  const cached = vocabCache.get(levelId);
  if (cached) return cached;
  const bank = loadedContent(levelId)?.vocabulary;
  if (!bank) return null;
  const index = buildVocabularyIndex(bank);
  vocabCache.set(levelId, index);
  return index;
}

export function hasVocabulary(levelId: string): boolean {
  return loadedContent(levelId)?.vocabulary !== undefined;
}


export interface VowelIndex {
  bank: VowelBank;
  byId: Map<string, VowelWord>;
  /** Words per vowel, in book order. */
  bySound: Map<string, VowelWord[]>;
  /** Words per difficulty level: 1 regular spelling, 2 ambiguous, 3 exception. */
  byLevel: Map<number, VowelWord[]>;
  soundByKey: Map<string, VowelSound>;
  /** The words that make a fair question: listed under one sound only. */
  askable: VowelWord[];
  /** Sounds other than `key` that the same letters spell on this level's page. */
  confusableSounds: (key: string, letters: string | null) => string[];
}

const vowelCache = new Map<string, VowelIndex>();

function buildVowelIndex(bank: VowelBank): VowelIndex {
  const byId = new Map<string, VowelWord>();
  const bySound = new Map<string, VowelWord[]>();
  const byLevel = new Map<number, VowelWord[]>();
  const seen = new Map<string, number>();

  for (const word of bank.words) {
    byId.set(word.id, word);
    push(bySound, word.sound, word);
    push(byLevel, word.level, word);
    const key = word.word.toLowerCase();
    seen.set(key, (seen.get(key) ?? 0) + 1);
  }

  const askable = bank.words.filter((w) => seen.get(w.word.toLowerCase()) === 1);
  const perLetters = soundsPerLetters(bank.sounds);

  return {
    bank,
    byId,
    bySound,
    byLevel,
    soundByKey: new Map(bank.sounds.map((s) => [s.key, s])),
    askable,
    confusableSounds: (key, letters) =>
      letters === null ? [] : [...(perLetters.get(letters) ?? [])].filter((other) => other !== key),
  };
}

/** Built once per level and cached, like the other indexes (Performance.md §1). */
export function getVowelIndex(levelId: string): VowelIndex | null {
  const cached = vowelCache.get(levelId);
  if (cached) return cached;
  const bank = loadedContent(levelId)?.vowels;
  if (!bank) return null;
  const index = buildVowelIndex(bank);
  vowelCache.set(levelId, index);
  return index;
}

export function hasVowels(levelId: string): boolean {
  return loadedContent(levelId)?.vowels !== undefined;
}

const checkerCache = new Map<string, LexiconChecker>();

/** The lexicon gate of one level, built once (used by the content scripts). */
export function getLexiconChecker(levelId: string): LexiconChecker | null {
  const cached = checkerCache.get(levelId);
  if (cached) return cached;
  const content = loadedContent(levelId);
  if (!content) return null;
  const checker = createLexiconChecker(content.lexicon, content.wrongForms);
  checkerCache.set(levelId, checker);
  return checker;
}

export const CATEGORY_LABELS: Record<CategoryId, string> = {
  grammar: 'Grammar',
  vocabulary: 'Vocabulary',
  pronunciation: 'Pronunciation',
  'word-stress': 'Word Stress',
};
export const CATEGORY_ORDER: CategoryId[] = ['grammar', 'vocabulary', 'pronunciation', 'word-stress'];
