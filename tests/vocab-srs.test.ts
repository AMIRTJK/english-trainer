import { describe, expect, it } from 'vitest';
import {
  BOX_INTERVAL_DAYS, createLevelProgress, isDue, needsRepeat, recordAnswer, weakSounds,
} from '@/entities/vocab';

const NOW = new Date('2026-09-03T09:00:00.000Z');
const plusDays = (days: number): Date => new Date(NOW.getTime() + days * 86400000);

describe('recordAnswer', () => {
  it('promotes a word through the boxes and marks it known', () => {
    const progress = createLevelProgress('beginner');
    recordAnswer(progress, 'beg-w-cat', ['cat'], true, NOW);
    expect(progress.words['beg-w-cat']?.box).toBe(1);
    expect(progress.words['beg-w-cat']?.status).toBe('learning');

    recordAnswer(progress, 'beg-w-cat', ['cat'], true, NOW);
    expect(progress.words['beg-w-cat']?.box).toBe(2);
    expect(progress.words['beg-w-cat']?.status).toBe('known');
  });

  it('never promotes past the last box', () => {
    const progress = createLevelProgress('beginner');
    for (let i = 0; i < 10; i += 1) recordAnswer(progress, 'w', ['cat'], true, NOW);
    expect(progress.words['w']?.box).toBe(BOX_INTERVAL_DAYS.length - 1);
  });

  it('sends a missed word back to box 0 and schedules it immediately', () => {
    const progress = createLevelProgress('beginner');
    recordAnswer(progress, 'w', ['cat'], true, NOW);
    recordAnswer(progress, 'w', ['cat'], true, NOW);
    recordAnswer(progress, 'w', ['cat'], false, NOW);

    const word = progress.words['w'];
    expect(word?.box).toBe(0);
    expect(word?.status).toBe('learning');
    expect(word?.unknown).toBe(1);
    expect(isDue(word, NOW)).toBe(true);
    expect(needsRepeat(word)).toBe(true);
  });

  it('counts each sound the word belongs to', () => {
    const progress = createLevelProgress('beginner');
    recordAnswer(progress, 'beg-w-thanks', ['cat', 'thumb'], false, NOW);
    expect(progress.sounds['cat']).toEqual({ sound: 'cat', known: 0, unknown: 1 });
    expect(progress.sounds['thumb']?.unknown).toBe(1);
  });
});

describe('isDue', () => {
  it('treats a word never studied as due', () => {
    expect(isDue(undefined, NOW)).toBe(true);
  });

  it('waits for the box interval before asking again', () => {
    const progress = createLevelProgress('beginner');
    recordAnswer(progress, 'w', ['cat'], true, NOW);
    const word = progress.words['w'];

    expect(isDue(word, NOW)).toBe(false);
    expect(isDue(word, plusDays(2))).toBe(true);
  });
});

describe('needsRepeat', () => {
  it('stops asking once the word is known again', () => {
    const progress = createLevelProgress('beginner');
    recordAnswer(progress, 'w', ['cat'], false, NOW);
    expect(needsRepeat(progress.words['w'])).toBe(true);

    recordAnswer(progress, 'w', ['cat'], true, NOW);
    recordAnswer(progress, 'w', ['cat'], true, NOW);
    expect(progress.words['w']?.status).toBe('known');
    expect(needsRepeat(progress.words['w'])).toBe(false);
  });
});

describe('weakSounds', () => {
  it('ranks the sound with the worst ratio first', () => {
    const progress = createLevelProgress('beginner');
    for (let i = 0; i < 3; i += 1) recordAnswer(progress, `a${i}`, ['cat'], false, NOW);
    recordAnswer(progress, 'b0', ['tree'], false, NOW);
    recordAnswer(progress, 'b1', ['tree'], true, NOW);
    recordAnswer(progress, 'b2', ['tree'], true, NOW);
    for (let i = 0; i < 4; i += 1) recordAnswer(progress, `c${i}`, ['egg'], true, NOW);

    const weak = weakSounds(progress);
    expect(weak.map((s) => s.sound)).toEqual(['cat', 'tree']);
  });
});
