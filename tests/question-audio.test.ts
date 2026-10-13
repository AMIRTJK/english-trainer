import { describe, expect, it } from 'vitest';
import type { Question } from '@content/types';
import { extractQuestionAudio } from '@/features/pronounce';

function dummyQuestion(partial: Partial<Question>): Question {
  return {
    id: 'test-q-1',
    levelId: 'beg',
    unitId: 'beg-u1',
    categoryId: 'pronunciation',
    topicId: 'beg-p-sound-rules',
    type: 'choose-word',
    prompt: 'Dummy prompt',
    options: ['opt1', 'opt2', 'opt3'],
    answer: 0,
    explanation: 'explanation',
    source: { book: 'SB', page: 134, ref: 'Sound Bank' },
    constructId: 'c-1',
    difficulty: 1,
    status: 'verified',
    ...partial,
  };
}

describe('extractQuestionAudio', () => {
  it('extracts /eə/ sound and key word "chair" from the Sound Bank rule prompt', () => {
    const q = dummyQuestion({
      prompt: 'Which letters usually spell /eə/ chair?',
      options: ['ew', 'air', 'oo'],
    });

    const model = extractQuestionAudio(q, ['ew', 'air', 'oo']);
    expect(model.sound).toBeDefined();
    expect(model.sound?.ipa).toBe('eə');
    expect(model.sound?.word).toBe('chair');
    expect(model.sound?.canSynthesize).toBe(true);
    expect(model.targetWord).toBe('chair');
    expect(model.promptSpeech).toBe('Which letters usually spell /eə/ chair?');
    expect(model.isPronunciation).toBe(true);
    expect(model.options).toHaveLength(3);
    expect(model.options[1]?.cleanText).toBe('air');
  });

  it('extracts sound and anchor word for "! but also" questions and pairs comparison words', () => {
    const q = dummyQuestion({
      prompt: 'Which word is a "! but also" word for /e/ egg?',
      options: ['breakfast', 'friend', 'world'],
    });

    const model = extractQuestionAudio(q, ['breakfast', 'friend', 'world']);
    expect(model.sound?.ipa).toBe('e');
    expect(model.sound?.word).toBe('egg');
    expect(model.sound?.canSynthesize).toBe(true);
    expect(model.targetWord).toBe('egg');
    expect(model.compareWords).toEqual(['breakfast', 'friend', 'world']);
  });

  it('extracts sounds and keywords from options formatted as "/sound/ keyword"', () => {
    const q = dummyQuestion({
      prompt: 'Which sound do the letters "igh" usually spell?',
      options: ['/aɪ/ bike', '/eɪ/ train', '/iː/ tree'],
    });

    const model = extractQuestionAudio(q, ['/aɪ/ bike', '/eɪ/ train', '/iː/ tree']);
    expect(model.options[0]?.ipa).toBe('aɪ');
    expect(model.options[0]?.word).toBe('bike');
    expect(model.options[0]?.canSynthesizeIpa).toBe(true);

    expect(model.options[1]?.ipa).toBe('eɪ');
    expect(model.options[1]?.word).toBe('train');

    expect(model.options[2]?.ipa).toBe('iː');
    expect(model.options[2]?.word).toBe('tree');
  });

  it('provides comparison list for different-sound questions', () => {
    const q = dummyQuestion({
      type: 'different-sound',
      prompt: 'Which word has a different sound?',
      options: ['six', 'three', 'film'],
    });

    const model = extractQuestionAudio(q, ['six', 'three', 'film']);
    expect(model.isPronunciation).toBe(true);
    expect(model.compareWords).toEqual(['six', 'three', 'film']);
  });

  it('extracts stress target word from stress metadata and syllable-marked options', () => {
    const q = dummyQuestion({
      categoryId: 'word-stress',
      type: 'word-stress',
      prompt: 'Which is the stressed syllable?',
      options: ["'air|port", "air|'port", "air|port'"],
      stress: {
        word: 'airport',
        syllables: ['air', 'port'],
        stressed: 0,
        ipa: '/ˈeəpɔːt/',
      },
    });

    const model = extractQuestionAudio(q, ["'air|port", "air|'port", "air|port'"]);
    expect(model.targetWord).toBe('airport');
    expect(model.options[0]?.cleanText).toBe('airport');
  });

  it('cleans gaps in prompt for speech synthesis', () => {
    const q = dummyQuestion({
      prompt: 'Where ___ you from?',
      options: ['are', 'is', 'am'],
    });

    const model = extractQuestionAudio(q, ['are', 'is', 'am']);
    expect(model.promptSpeech).toBe('Where blank you from?');
    expect(model.compareWords).toEqual(['are', 'is', 'am']);
  });
});
