# Performance.md — Performance rules

Read together with `AGENTS.md`. These rules are functional requirements, not
nice-to-haves. A change that breaks them is not done.

---

## 1. Content preparation happens offline

- **Never run OCR, PDF parsing or bulk content processing at application start-up
  or at runtime.** The books in `books/` are build-time *sources*, not runtime assets.
- Content is pre-structured into typed modules under `content/`. The app only
  imports ready data.
- Book scans are never shipped to the client and never rendered in the UI.
- Derived lookups (`byId`, `byTopic`, `byCategory`, per-topic counts) are built
  **once** at module init in `content/beginner/index.ts` and reused, never rebuilt
  per render.

## 2. Rendering

- No heavy computation inside a render body. Derive with `useMemo` **only** when the
  computation is genuinely expensive or feeds a memoised child; do not sprinkle
  `useMemo`/`useCallback` on trivial values.
- No cascading `setState` chains, no `useEffect` that only mirrors props into state.
- Effects must have honest dependency arrays. Every subscription, timer, listener
  and `requestAnimationFrame` is cleaned up in the effect's teardown.
- Do not put large arrays or the whole question bank in React state. Keep the active
  test as a list of question **ids** plus an answers map; resolve objects on demand.
- Keep test state, transient UI state and persisted profile data in three separate
  stores. Answering a question must not re-render the dashboard.

## 3. Test generation

- Generating a 100-question test must not block the UI. The generator is a pure,
  synchronous function that must stay **O(n)** over the candidate pool with
  index-based lookups — no nested scans of the whole bank per selected question.
- Selection uses pre-built `Map` indexes keyed by `topicId`, `category`, `constructId`
  and `questionId`. Never `Array.prototype.find` over the full bank inside a loop.
- Shuffling uses a seeded Fisher–Yates pass over an already-filtered array.
  Never copy the whole bank to shuffle it.
- If generation for a future, much larger bank ever exceeds ~50 ms, move it to a
  Web Worker or chunk it with `scheduler.postTask`/`setTimeout` — measure first.

## 4. Statistics

- Statistics are computed **incrementally**. When an attempt is saved, update the
  stored per-topic aggregates; do not recompute the whole history.
- The dashboard reads pre-aggregated numbers. It must not iterate every answer of
  every past attempt on each mount.
- Never recompute statistics while the user is answering a question. Scoring happens
  once, on submit.

## 5. Storage

- Batch and debounce writes to `localStorage`. Target: **at most one write per
  answered question**, and never a write per keystroke or per hover.
- Serialise only what changed; keep separate keys for profile, attempts, aggregates
  and the in-progress test so one small update does not rewrite everything.
- Reads happen once at start-up, then the in-memory copy is the source of truth.
- Guard every `localStorage` access with `try/catch` (private mode, quota, disabled
  storage) and degrade to in-memory operation instead of crashing.
- Cap stored history growth: keep full per-answer detail for recent attempts and
  aggregates for the rest.

## 6. Bundle and loading

- Route-level code splitting with `React.lazy` for screens that are not the entry
  point. The content bundle is a separate chunk.
- No UI or utility dependency may be added without a written justification. The
  current runtime dependency set is React, React DOM and React Router — keep it small.
- Images: none are required by the UI. If any are added they must be optimised and
  lazily loaded; book scans are forbidden in the client bundle.
- Watch the production bundle size on every `npm run build`.

## 7. Long lists

- Topic lists, question lists and result breakdowns must stay smooth. If any list
  exceeds a few hundred rows, paginate, virtualise or load progressively.

## 8. Acceptance criteria

The build is not acceptable unless all of the following hold:

- Creating a Quick Test (50 q) or Official Test (100 q) is visually instantaneous
  and never freezes the interface.
- Moving between questions is smooth; selecting an answer causes no perceptible delay.
- The dashboard does not recompute the whole history on mount.
- Export and import work with a large profile without freezing the page.
- No memory leaks: no timer, listener or subscription survives unmount.
- The production bundle stays modest (initial JS gzip well under ~200 kB).
- The app remains usable on a mid-range mobile device.
- Optimisations are justified by a measurement taken before and after.
