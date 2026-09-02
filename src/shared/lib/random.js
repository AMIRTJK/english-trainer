/** mulberry32 — small, fast, good enough for shuffling questions. */
export function createRng(seed) {
    let state = seed >>> 0;
    const next = () => {
        state = (state + 0x6d2b79f5) >>> 0;
        let t = state;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    return { next, int: (maxExclusive) => Math.floor(next() * maxExclusive) };
}
/** In-place Fisher-Yates. The caller owns the array (Performance.md §3). */
export function shuffleInPlace(items, rng) {
    for (let i = items.length - 1; i > 0; i -= 1) {
        const j = rng.int(i + 1);
        const a = items[i];
        const b = items[j];
        items[i] = b;
        items[j] = a;
    }
    return items;
}
export function randomSeed() {
    return Math.floor(Math.random() * 0xffffffff);
}
