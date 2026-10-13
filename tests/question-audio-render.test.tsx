import { describe, expect, it, beforeEach } from 'vitest';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import type { Question } from '@content/types';
import { QuestionAudioPlayer } from '@/widgets/runner';

declare global {
  // eslint-disable-next-line no-var
  var IS_REACT_ACT_ENVIRONMENT: boolean;
}

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const testQuestion: Question = {
  id: 'beg-p-sound-rules-0001',
  levelId: 'beg',
  unitId: 'beg-u3',
  categoryId: 'pronunciation',
  topicId: 'beg-p-sound-rules',
  type: 'choose-word',
  prompt: 'Which letters usually spell /eə/ chair?',
  options: ['ew', 'air', 'oo'],
  answer: 1,
  explanation: 'air spells /eə/.',
  source: { book: 'SB', page: 134, ref: 'Sound Bank' },
  constructId: 'spelling-chair',
  difficulty: 2,
  status: 'verified',
};

function renderPlayer(question: Question, options: string[]): string {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(<QuestionAudioPlayer question={question} options={options} />);
  });
  const html = container.innerHTML;
  act(() => root.unmount());
  container.remove();
  return html;
}

describe('QuestionAudioPlayer render', () => {
  beforeEach(() => {
    // Stub browser speech & audio APIs for jsdom
    window.AudioContext = class {} as unknown as typeof AudioContext;
    window.speechSynthesis = {
      getVoices: () => [{ lang: 'en-GB', name: 'British', default: true } as SpeechSynthesisVoice],
      addEventListener: () => {},
      removeEventListener: () => {},
      speak: () => {},
      cancel: () => {},
    } as unknown as SpeechSynthesis;
    window.SpeechSynthesisUtterance = class {
      lang = 'en-GB';
      rate = 1;
    } as unknown as typeof SpeechSynthesisUtterance;
  });

  it('renders audio player controls for /eə/ chair question', () => {
    const html = renderPlayer(testQuestion, ['ew', 'air', 'oo']);
    expect(html).toContain('Sound player');
    expect(html).toContain('/eə/');
    expect(html).toContain('chair');
    expect(html).toContain('Read prompt');
    expect(html).toContain('air');
  });

  it('renders sequential compare button when question has word options', () => {
    const differentSoundQ: Question = {
      ...testQuestion,
      type: 'different-sound',
      prompt: 'Which word has a different sound?',
      options: ['six', 'three', 'film'],
    };
    const html = renderPlayer(differentSoundQ, ['six', 'three', 'film']);
    expect(html).toContain('Play all options');
    expect(html).toContain('six');
    expect(html).toContain('three');
    expect(html).toContain('film');
  });

  it('renders target word button for word stress questions such as afternoon', () => {
    const stressQ: Question = {
      ...testQuestion,
      type: 'word-stress',
      categoryId: 'word-stress',
      prompt: 'Which is the stressed syllable?',
      options: ['af·ter·noon', 'af·ter·noon', 'af·ter·noon'],
      stress: {
        word: 'afternoon',
        syllables: ['af', 'ter', 'noon'],
        stressed: 2,
        ipa: '/ˌɑːftəˈnuːn/',
      },
    };
    const html = renderPlayer(stressQ, ['af·ter·noon', 'af·ter·noon', 'af·ter·noon']);
    expect(html).toContain('"afternoon"');
    expect(html).toContain('Read prompt');
  });
});
