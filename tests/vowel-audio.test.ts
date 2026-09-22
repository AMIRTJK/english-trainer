import { describe, expect, it } from 'vitest';
import { vowelSounds } from '@content/beginner/pronunciation';
import { VOWEL_SHAPES, canPlayAlone, shapeFor } from '@/features/pronounce';

describe('the vowel synthesiser', () => {
  it('can play every vowel of the Sound Bank page on its own', () => {
    for (const sound of vowelSounds) {
      expect(canPlayAlone(sound.ipa), `${sound.key} /${sound.ipa}/`).toBe(true);
    }
  });

  it('has no target the page does not name', () => {
    const onThePage = new Set(vowelSounds.map((s) => s.ipa));
    for (const ipa of Object.keys(VOWEL_SHAPES)) {
      expect(onThePage.has(ipa), ipa).toBe(true);
    }
  });

  it('refuses a consonant, which cannot be produced this way', () => {
    // Consonants are made by obstructing the airflow, not by resonance alone.
    expect(canPlayAlone('θ')).toBe(false);
    expect(canPlayAlone('ŋ')).toBe(false);
    expect(shapeFor('p')).toBeUndefined();
  });

  it('glides for every diphthong and holds still for every other vowel', () => {
    for (const sound of vowelSounds) {
      const shape = shapeFor(sound.ipa);
      const expected = sound.type === 'diphthong' ? 'glide' : 'pure';
      expect(shape?.kind, `${sound.key} /${sound.ipa}/`).toBe(expected);
    }
  });

  it('moves the mouth somewhere for a diphthong', () => {
    for (const shape of Object.values(VOWEL_SHAPES)) {
      if (shape.kind !== 'glide') continue;
      const moved = shape.from.f1 !== shape.to.f1 || shape.from.f2 !== shape.to.f2;
      expect(moved).toBe(true);
    }
  });

  it('keeps every formant inside the range a human voice uses', () => {
    for (const [ipa, shape] of Object.entries(VOWEL_SHAPES)) {
      const targets = shape.kind === 'pure' ? [shape.at] : [shape.from, shape.to];
      for (const t of targets) {
        expect(t.f1, ipa).toBeGreaterThanOrEqual(250);
        expect(t.f1, ipa).toBeLessThanOrEqual(900);
        expect(t.f2, ipa).toBeGreaterThan(t.f1);
        expect(t.f2, ipa).toBeLessThanOrEqual(2500);
        expect(t.f3, ipa).toBeGreaterThan(t.f2);
        expect(t.f3, ipa).toBeLessThanOrEqual(3200);
      }
    }
  });

  it('holds a long vowel longer than the short one it contrasts with', () => {
    // /ɪ/ vs /iː/ and /ʊ/ vs /uː/ are the pairs the book asks about.
    expect(shapeFor('iː')?.ms).toBeGreaterThan(shapeFor('ɪ')?.ms ?? 0);
    expect(shapeFor('uː')?.ms).toBeGreaterThan(shapeFor('ʊ')?.ms ?? 0);
    expect(shapeFor('ɜː')?.ms).toBeGreaterThan(shapeFor('e')?.ms ?? 0);
  });

  it('keeps the short/long pairs apart in the mouth, not only in length', () => {
    // If /ɪ/ and /iː/ had the same formants they would sound like one vowel
    // held for different times, which is exactly the mistake to avoid teaching.
    const kit = shapeFor('ɪ');
    const fleece = shapeFor('iː');
    expect(kit?.kind === 'pure' && fleece?.kind === 'pure').toBe(true);
    if (kit?.kind !== 'pure' || fleece?.kind !== 'pure') return;
    expect(kit.at.f1).not.toBe(fleece.at.f1);
    expect(kit.at.f2).not.toBe(fleece.at.f2);
  });
});
