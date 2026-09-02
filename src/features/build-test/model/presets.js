/**
 * Share of each section in a test.
 *
 * These are not guesses: they are measured from the real English File Beginner
 * "10 Quick Test" paper in `test/`, which has 20 Grammar, 20 Vocabulary,
 * 5 "different sound" and 5 "word stress" questions out of 50.
 * Change the numbers here rather than in the generator.
 */
export const OFFICIAL_MIX = {
    grammar: 0.4,
    vocabulary: 0.4,
    pronunciation: 0.1,
    'word-stress': 0.1,
};
/** A mix that leans into the sections the learner loses marks in. */
export const PRACTICE_MIX = {
    grammar: 0.25,
    vocabulary: 0.25,
    pronunciation: 0.25,
    'word-stress': 0.25,
};
export const PRESETS = [
    {
        kind: 'quick',
        title: 'Quick Test',
        description: '50 questions in the exact shape of the school Quick Test.',
        count: 50,
        mix: OFFICIAL_MIX,
        adaptive: false,
        mistakesOnly: false,
        timed: true,
    },
    {
        kind: 'official',
        title: 'Official Test',
        description: '100 questions, the full exam format.',
        count: 100,
        mix: OFFICIAL_MIX,
        adaptive: false,
        mistakesOnly: false,
        timed: true,
    },
    {
        kind: 'full',
        title: 'Full Beginner Test',
        description: 'A long test covering every topic you have studied.',
        count: 150,
        mix: OFFICIAL_MIX,
        adaptive: false,
        mistakesOnly: false,
        timed: false,
    },
    {
        kind: 'weak-areas',
        title: 'Practice Weak Areas',
        description: 'Built from the topics where you lose the most marks.',
        count: 30,
        mix: null,
        adaptive: true,
        mistakesOnly: false,
        timed: false,
    },
    {
        kind: 'mistakes',
        title: 'My Mistakes',
        description: 'Questions you have answered wrongly before.',
        count: 25,
        mix: null,
        adaptive: true,
        mistakesOnly: true,
        timed: false,
    },
    {
        kind: 'quick-practice',
        title: 'Quick Practice',
        description: '10 questions for a short session.',
        count: 10,
        mix: PRACTICE_MIX,
        adaptive: true,
        mistakesOnly: false,
        timed: false,
    },
];
export function findPreset(kind) {
    return PRESETS.find((p) => p.kind === kind);
}
/** Split a total into whole numbers per category, preserving the total. */
export function splitByMix(total, mix) {
    const entries = Object.entries(mix);
    const raw = entries.map(([id, share]) => [id, total * share]);
    const out = raw.map(([id, value]) => [id, Math.floor(value)]);
    let remainder = total - out.reduce((sum, [, n]) => sum + n, 0);
    const order = [...raw]
        .sort((a, b) => (b[1] % 1) - (a[1] % 1))
        .map(([id]) => id);
    for (const id of order) {
        if (remainder <= 0)
            break;
        const row = out.find(([rowId]) => rowId === id);
        if (row) {
            row[1] += 1;
            remainder -= 1;
        }
    }
    return out;
}
