import { beforeEach, describe, expect, it, vi } from 'vitest';

/**
 * The synthesiser itself, driven by a stub Web Audio context.
 *
 * jsdom has no audio, so the graph is recorded rather than heard: what matters
 * here is that the right nodes are built, the formants are scheduled at the
 * right frequencies, a diphthong really moves, and everything is released when
 * the sound ends (Performance.md §2).
 */

interface ParamCall { value: number; time: number; ramp: boolean }

class FakeParam {
  calls: ParamCall[] = [];
  setValueAtTime(value: number, time: number): this {
    this.calls.push({ value, time, ramp: false });
    return this;
  }
  linearRampToValueAtTime(value: number, time: number): this {
    this.calls.push({ value, time, ramp: true });
    return this;
  }
  get values(): number[] {
    return this.calls.map((c) => c.value);
  }
}

class FakeNode {
  connected: FakeNode[] = [];
  disconnects = 0;
  connect(target: FakeNode): FakeNode {
    this.connected.push(target);
    return target;
  }
  disconnect(): void {
    this.disconnects += 1;
  }
}

class FakeOscillator extends FakeNode {
  type = '';
  frequency = new FakeParam();
  started: number | null = null;
  stopped: number | null = null;
  onended: (() => void) | null = null;
  start(t: number): void { this.started = t; }
  stop(t?: number): void { this.stopped = t ?? 0; }
}

class FakeFilter extends FakeNode {
  type = '';
  frequency = new FakeParam();
  Q = new FakeParam();
}

class FakeGain extends FakeNode {
  gain = new FakeParam();
}

class FakeContext {
  /** Forget the previous test’s graph without replacing the object. */
  reset(): void {
    this.oscillators = [];
    this.filters = [];
    this.gains = [];
    this.currentTime = 0;
  }
  currentTime = 0;
  state = 'running';
  destination = new FakeNode();
  oscillators: FakeOscillator[] = [];
  filters: FakeFilter[] = [];
  gains: FakeGain[] = [];
  resume = vi.fn();
  createOscillator(): FakeOscillator {
    const node = new FakeOscillator();
    this.oscillators.push(node);
    return node;
  }
  createBiquadFilter(): FakeFilter {
    const node = new FakeFilter();
    this.filters.push(node);
    return node;
  }
  createGain(): FakeGain {
    const node = new FakeGain();
    this.gains.push(node);
    return node;
  }
}

/**
 * One instance for the whole file: the module builds its context lazily and
 * then keeps it, exactly as a browser tab does, so the test resets the graph
 * it recorded rather than handing the module a second context it would ignore.
 */
const ctx = new FakeContext();

vi.stubGlobal('AudioContext', function FakeCtor(this: unknown) {
  return ctx;
} as unknown as typeof AudioContext);

const { playVowel, stopVowel, isVowelAudioAvailable } = await import(
  '@/features/pronounce/model/vowel-audio'
);

/** The three band-pass resonators, in F1/F2/F3 order. */
function formantFilters(): FakeFilter[] {
  return ctx.filters.filter((f) => f.type === 'bandpass');
}

describe('playVowel', () => {
  beforeEach(() => {
    stopVowel();
    ctx.reset();
  });

  it('is available when the browser has Web Audio', () => {
    expect(isVowelAudioAvailable()).toBe(true);
  });

  it('builds one source and three band-pass formants', () => {
    void playVowel('ɑː');
    expect(ctx.oscillators).toHaveLength(1);
    expect(ctx.oscillators[0]?.type).toBe('sawtooth');
    expect(formantFilters()).toHaveLength(3);
  });

  it('tunes the formants to the vowel', () => {
    void playVowel('iː');
    // /iː/: a low first formant and a very high second one.
    expect(formantFilters().map((f) => f.frequency.values[0])).toEqual([280, 2250, 2890]);
  });

  it('holds a pure vowel still', () => {
    void playVowel('ɪ');
    for (const filter of formantFilters()) {
      expect(filter.frequency.calls.some((c) => c.ramp)).toBe(false);
    }
  });

  it('moves the formants of a diphthong from one vowel to the other', () => {
    void playVowel('aɪ');
    const [f1, f2] = formantFilters();
    // /aɪ/ starts open and ends close to /ɪ/: F1 falls, F2 rises.
    expect(f1?.frequency.values[0]).toBe(730);
    expect(f1?.frequency.values.at(-1)).toBe(360);
    expect(f2?.frequency.values[0]).toBe(1300);
    expect(f2?.frequency.values.at(-1)).toBe(2100);
    expect(f1?.frequency.calls.at(-1)?.ramp).toBe(true);
  });

  it('holds the long option nearly twice as long', () => {
    void playVowel('e');
    const short = ctx.oscillators[0]?.stopped ?? 0;
    void playVowel('e', { long: true });
    expect(ctx.oscillators[1]?.stopped ?? 0).toBeGreaterThan(short);
  });

  it('fades in and out instead of clicking', () => {
    void playVowel('ɒ');
    // The output envelope is the first gain built; the rest are formant levels.
    const envelope = ctx.gains[0];
    expect(envelope?.gain.values[0]).toBe(0);
    expect(envelope?.gain.values.at(-1)).toBe(0);
    expect(Math.max(...(envelope?.gain.values ?? [0]))).toBeGreaterThan(0);
  });

  it('releases every node when the sound ends', async () => {
    const done = playVowel('ʌ');
    ctx.oscillators[0]?.onended?.();
    await done;
    expect(ctx.oscillators[0]?.disconnects).toBe(1);
    for (const filter of ctx.filters) expect(filter.disconnects).toBe(1);
    for (const gain of ctx.gains) expect(gain.disconnects).toBe(1);
  });

  it('stops the previous sound rather than stacking a second one on it', async () => {
    const first = playVowel('iː');
    void playVowel('ɑː');
    await first; // the first resolves because starting the second tore it down
    expect(ctx.oscillators[0]?.disconnects).toBe(1);
  });

  it('does nothing for a sound it cannot make', async () => {
    await playVowel('θ');
    expect(ctx.oscillators).toHaveLength(0);
  });

  it('survives being stopped when nothing is playing', () => {
    expect(() => stopVowel()).not.toThrow();
  });
});
