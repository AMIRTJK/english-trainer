/**
 * Vocabulary quality gate (AGENTS.md §3).
 *
 * The word list must stay a view over material the book already gives us, so:
 *  - every headword exists in the level's allowed lexicon;
 *  - no word appears twice, and no id is reused;
 *  - every word has a Russian gloss, an IPA transcription and a Sound Bank group;
 *  - every group referenced by a word or a contrast is a real Sound Bank sound;
 *  - every topic a word claims exists in the level's topic list;
 *  - the key sound is actually visible in the word's transcription, so the UI
 *    can highlight it.
 *
 * Called from `validate-content.ts`.
 */
import { getLevelIndex, getVocabularyIndex } from '../content/registry';
import { unknownWords } from '../content/beginner/lexicon';
import type { SoundGroup, VocabWord } from '../content/types';

export interface VocabReport {
  errors: string[];
  warnings: string[];
  summary: string;
}

function checkWord(
  word: VocabWord,
  soundByKey: Map<string, SoundGroup>,
  topicIds: Set<string>,
  errors: string[],
  warnings: string[],
): void {
  const at = `[${word.id}]`;
  if (!word.ru.trim()) errors.push(`${at} missing Russian translation`);
  if (!word.ipa.trim()) errors.push(`${at} missing IPA`);
  if (!word.sound) errors.push(`${at} no Sound Bank group`);
  if (!topicIds.has(word.topicId)) errors.push(`${at} unknown topicId ${word.topicId}`);

  for (const key of [word.sound, ...word.also]) {
    if (key && !soundByKey.has(key)) errors.push(`${at} unknown sound "${key}"`);
  }

  const group = soundByKey.get(word.sound);
  if (group && word.ipa && !word.ipa.includes(group.ipa)) {
    errors.push(`${at} IPA ${word.ipa} does not contain /${group.ipa}/ of group "${word.sound}"`);
  }

  const unknown = unknownWords(word.word);
  if (unknown.length > 0) {
    errors.push(`${at} "${word.word}" is not in the level lexicon`);
  }

  if (word.syllables && word.stressed !== undefined) {
    if (word.stressed < 0 || word.stressed >= word.syllables.length) {
      errors.push(`${at} stressed index out of range`);
    }
  }

  if (!word.inSoundTask && word.also.length === 0 && !group) warnings.push(`${at} has no group`);
}

export function validateVocabulary(levelId: string): VocabReport {
  const errors: string[] = [];
  const warnings: string[] = [];
  const vocab = getVocabularyIndex(levelId);
  const level = getLevelIndex(levelId);
  if (!vocab || !level) return { errors, warnings, summary: `${levelId}: no vocabulary yet` };

  const topicIds = new Set(level.content.topics.map((t) => t.id));
  const seenWords = new Map<string, string>();
  const seenIds = new Set<string>();

  for (const word of vocab.bank.words) {
    if (seenIds.has(word.id)) errors.push(`duplicate word id: ${word.id}`);
    seenIds.add(word.id);

    const key = word.word.toLowerCase();
    const previous = seenWords.get(key);
    if (previous) errors.push(`"${word.word}" appears twice: ${previous} and ${word.id}`);
    else seenWords.set(key, word.id);

    checkWord(word, vocab.soundByKey, topicIds, errors, warnings);
  }

  for (const [a, b] of vocab.bank.contrasts) {
    if (!vocab.soundByKey.has(a) || !vocab.soundByKey.has(b)) {
      errors.push(`contrast ${a}/${b} names a sound outside the Sound Bank`);
    }
    if (!vocab.bySound.get(a)?.length || !vocab.bySound.get(b)?.length) {
      warnings.push(`contrast ${a}/${b} has no words on one side`);
    }
  }

  const covered = new Set(vocab.bySound.keys());
  const emptySounds = vocab.bank.sounds.filter((s) => !covered.has(s.key));
  for (const sound of emptySounds) {
    warnings.push(`sound "${sound.key}" /${sound.ipa}/ has no word of its own`);
  }

  const summary =
    `${levelId}: ${vocab.bank.words.length} words, ${vocab.bank.sounds.length} sounds, ` +
    `${vocab.bank.contrasts.length} contrasts, ${vocab.soundTaskWords.length} used in sound tasks`;

  return { errors, warnings, summary };
}
