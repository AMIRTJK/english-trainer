import { describe, expect, it } from 'vitest';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { SpellingCard } from '@/widgets/vocab/SpellingCard';
import { checkSpelling } from '@/features/vocab-learning';
import type { VocabWord } from '@content/types';

declare global {
  // eslint-disable-next-line no-var
  var IS_REACT_ACT_ENVIRONMENT: boolean;
}

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const testWord: VocabWord = {
  id: 'beg-w-toilet',
  levelId: 'beg',
  word: 'toilet',
  ru: 'туалет',
  ipa: '/ˈtɔɪlət/',
  unitId: 'beg-u10',
  topicId: 'beg-v-hotel',
  sound: 'oi',
  also: [],
  inSoundTask: false,
};

function renderCard(result = checkSpelling('bathroom', 'toilet')): string {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(
      <SpellingCard
        word={testWord}
        sound={undefined}
        value="bathroom"
        onChange={() => {}}
        onSubmit={() => {}}
        result={result}
        hint={null}
        hintsLeft={3}
        hinted={false}
        onHint={() => {}}
        onNext={() => {}}
      />,
    );
  });
  const html = container.innerHTML;
  act(() => root.unmount());
  container.remove();
  return html;
}

describe('SpellingCard error feedback', () => {
  it('renders two distinct rows without letter scrambling for different words', () => {
    const html = renderCard(checkSpelling('bathroom', 'toilet'));
    expect(html).toContain('Your answer:');
    expect(html).toContain('Correct:');
    expect(html).toContain('bathroom');
    expect(html).toContain('toilet');
    // Ensure the old mashed Frankenstein word is not present
    expect(html).not.toContain('bathroomilet');
  });

  it('highlights missing letter cleanly for a minor typo', () => {
    const html = renderCard(checkSpelling('tolet', 'toilet'));
    expect(html).toContain('Your answer:');
    expect(html).toContain('Correct:');
    expect(html).toContain('is-missing');
    expect(html).toContain('Almost');
  });

  it('does not display comparison box for correct answer', () => {
    const html = renderCard(checkSpelling('toilet', 'toilet'));
    expect(html).not.toContain('Your answer:');
    expect(html).toContain('Correct');
  });
});
