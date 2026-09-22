import { beforeEach, describe, expect, it } from 'vitest';
import {
  VOCAB_SCHEMA_VERSION, answerSpelling, answerVowel, clearVocab, levelProgress, replaceVocab,
  type VocabData,
} from '@/entities/vocab';

/** A profile saved by v1, which knew only the recognition track. */
const v1: VocabData = {
  schemaVersion: 1,
  levels: {
    beginner: {
      levelId: 'beginner',
      words: { 'beg-w-cat': {
        wordId: 'beg-w-cat', box: 3, status: 'known', seen: 4, known: 4, unknown: 0,
        lastSeenAt: '2026-01-01T00:00:00.000Z', dueAt: '2026-01-08T00:00:00.000Z',
      } },
      sounds: { cat: { sound: 'cat', known: 4, unknown: 0 } },
    } as never,
  },
};

describe('vocabulary storage v1 → v2', () => {
  beforeEach(() => clearVocab());

  it('keeps the old recognition progress', () => {
    replaceVocab(structuredClone(v1));
    const progress = levelProgress('beginner');
    expect(progress.words['beg-w-cat']?.box).toBe(3);
    expect(progress.sounds['cat']?.known).toBe(4);
  });

  it('starts the new skills at zero rather than inventing progress', () => {
    replaceVocab(structuredClone(v1));
    const progress = levelProgress('beginner');
    expect(progress.spelling).toEqual({});
    expect(progress.vowels).toEqual({});
    expect(progress.vowelSounds).toEqual({});
  });

  it('bumps the stored schema version', () => {
    replaceVocab(structuredClone(v1));
    expect(levelProgress('beginner').levelId).toBe('beginner');
    expect(VOCAB_SCHEMA_VERSION).toBe(2);
  });

  it('keeps the three skills apart', () => {
    const now = new Date('2026-02-01T10:00:00.000Z');
    answerSpelling('beginner', 'beg-w-coffee', true, now);
    answerVowel('beginner', 'beg-vs-book-bull', 'bull', false, now);

    const progress = levelProgress('beginner');
    expect(progress.spelling['beg-w-coffee']?.box).toBe(1);
    expect(progress.words['beg-w-coffee']).toBeUndefined();
    expect(progress.vowels['beg-vs-book-bull']?.status).toBe('learning');
    expect(progress.vowelSounds['bull']).toEqual({ sound: 'bull', known: 0, unknown: 1 });
  });
});
