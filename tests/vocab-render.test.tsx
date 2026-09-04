import { describe, expect, it } from 'vitest';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AppProvider } from '@/app/store/app-store';
import VocabularyPage from '@/pages/vocabulary/VocabularyPage';
import LearnPage from '@/pages/vocabulary/LearnPage';

declare global {
  // eslint-disable-next-line no-var
  var IS_REACT_ACT_ENVIRONMENT: boolean;
}

// Tells React that updates inside `act` are being driven by a test.
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

/**
 * A render smoke test. It drives React with `react-dom/client` in jsdom, both
 * of which the project already has, rather than pulling in a testing library
 * (Performance.md §6).
 */
function render(node: JSX.Element, path = '/vocabulary'): string {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(
      <MemoryRouter initialEntries={[path]}>
        <AppProvider>{node}</AppProvider>
      </MemoryRouter>,
    );
  });
  const html = container.innerHTML;
  act(() => root.unmount());
  container.remove();
  return html;
}

describe('the Vocabulary screens', () => {
  it('lists words with their transcription and translation', () => {
    const html = render(<VocabularyPage />);
    expect(html).toContain('Vocabulary');
    expect(html).toContain('Sound Bank');
    // The first page is the /ɪ/ group, in book order.
    expect(html).toContain('six');
    expect(html).toContain('шесть');
    expect(html).toContain('ɪ');
    expect(html).toContain('page 1 of');
  });

  it('opens a learning session for a sound', () => {
    const html = render(<LearnPage />, '/vocabulary/learn?scope=sound&value=cat');
    expect(html).toContain('words');
    expect(html).toContain('I know it');
    expect(html).toContain('Don’t know');
  });

  it('says so when a scope has nothing left to study', () => {
    const html = render(<LearnPage />, '/vocabulary/learn?scope=review');
    expect(html).toContain('Nothing to study here right now');
  });
});
