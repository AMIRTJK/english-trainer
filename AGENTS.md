# AGENTS.md — Engineering rulebook

This file is the **primary source of engineering rules** for this repository.
Product requirements live in `PROJECT_SPEC.md`. Performance rules live in `Performance.md`.

Every AI agent and human contributor must read this file before changing code.

---

## 1. Stack and architecture

- **React 18 + TypeScript**, built with **Vite**. No backend.
- Architecture is **Feature-Sliced Design (FSD)**.
- Layer order (a layer may only import from layers *below* it):

  ```
  app  →  pages  →  widgets  →  features  →  entities  →  shared
  ```

- `content/` is a **separate, framework-free data layer**. It may be imported by
  `entities` and above, and it must never import from `src/`.
- Cross-imports inside the same layer are forbidden. Go through a lower layer.
- Every slice exposes a public API through its own `index.ts`. Do not deep-import
  another slice's internals.

### Directory structure

```
/
├── AGENTS.md            engineering rules (this file)
├── Performance.md       performance rules
├── CLAUDE.md            entry point for Claude Code
├── GEMINI.md            entry point for Gemini and other agents
├── PROJECT_SPEC.md      product specification
├── books/               source PDFs (scans) — local only, git-ignored
├── vocabulary/          legacy hand-made JSON — local only, git-ignored, not trusted
├── test/                photos of the completed Quick Test — local only, git-ignored
├── content/             the verified educational content layer
│   └── beginner/        one folder per level
├── scripts/             build-time tooling (content validation)
├── src/
│   ├── app/             providers, router, global styles
│   ├── pages/           route-level screens
│   ├── widgets/         composite blocks assembled from features/entities
│   ├── features/        user scenarios (build a test, run a test, manage data)
│   ├── entities/        business entities (level, topic, question, attempt, user)
│   └── shared/          ui kit, lib helpers, config, storage
└── tests/               unit tests
```

## 2. Code rules

- **A source file must not exceed 250 lines.** The only accepted exceptions are
  content data files whose length is a direct function of the data they carry;
  even then, prefer splitting by topic.
- Split large components into small, reusable ones. A component that both fetches
  or derives data *and* renders complex markup must be split.
- **Business logic must not live in components.** Put it in `features/*/model`,
  `entities/*/model`, or `shared/lib`, and keep it pure and unit-testable.
- Keep responsibilities separate: educational **content**, generated **questions**,
  computed **statistics**, and persisted **user state** are four different concerns
  and must not be merged into one module or one storage key.
- Types are mandatory. No `any`. Prefer discriminated unions over booleans.
- `strict`, `noUnusedLocals`, `noUnusedParameters` and `noUncheckedIndexedAccess`
  are on and must stay on.

### Naming

- Files and folders: `kebab-case`. React components: `PascalCase.tsx`.
- Hooks: `use-*.ts`. Pure helpers: `*.ts`, named exports only.
- Identifiers in content are stable, human-readable and prefixed:
  `beg` (level), `beg-u10` (unit), `beg-g-there-is-are` (topic),
  `beg-g-there-is-are-0007` (question).
- **Never renumber or reuse a `questionId`.** User history references it.

### Source material is local, not committed

`books/`, `vocabulary/` and `test/` are authoring inputs only. Nothing in `src/`,
`content/`, `scripts/` or the build reads them, and they are git-ignored — the
books are copyrighted and the test photos are personal. A fresh clone will not
have them, and that is expected: everything derived from them is committed
(`content/`, `content/beginner/imported-quick-test.ts`, `docs/decisions.md`).

If you need to author new content and the folders are missing, ask for them
rather than inventing material.

## 3. Content rules

- All educational content lives under `content/<levelId>/` and is tagged with its
  `levelId`. **Content from different levels must never be mixed** — not in a
  question pool, not in statistics, not in storage.
- Only material that comes from *English File 4th edition Beginner* may be used.
  Do not invent vocabulary, structures or difficulty beyond the book.
- Every question must declare a `source` pointing at the book and page
  (e.g. `{ book: 'SB', page: 110, ref: 'Grammar Bank 10A' }`).
- Every question carries a `status`: `draft | needs_review | verified | rejected | archived`.
  **Only `verified` questions may be served in normal tests.**
- Every question declares `allowedLexiconOk: true` only after it passes the
  automated lexicon check in `scripts/validate-content.ts`.
- Questions that test the same underlying rule share a `constructId`. A question
  that is a controlled variation of another sets `variantOf`.
- Reordering the options of an existing question is **not** a new question.
- Adding content is a two-step process: author it as `draft`/`needs_review`, then
  promote to `verified` only after `npm run lint:content` passes and the item has
  been checked against the book.

## 4. Storage rules

- Persistence is **browser-only** (`localStorage`). Adding a backend requires an
  explicit, documented decision.
- All keys are namespaced `eft:v1:*`. The stored payload carries a `schemaVersion`;
  migrations live in `src/shared/storage/migrations.ts`.
- Results are always stored **with their `levelId`**.
- Writes are batched/debounced — see `Performance.md`.
- The user must be able to export and import the whole profile as JSON, and to
  clear all data behind a confirmation.

## 5. Testing and definition of done

Before considering any significant task finished, run:

```bash
npm run verify
```

which runs, in order: **type check → content validation → unit tests → production build**.

A task is done when:

1. `npm run verify` passes.
2. New logic has unit tests (test generation, scoring, statistics, storage).
3. New content passes `scripts/validate-content.ts` with zero errors.
4. No file exceeds 250 lines.
5. The change is minimal and does not break the layer boundaries above.
6. Any ambiguous decision is documented in `docs/decisions.md`.

## 6. Accessibility and responsiveness

- The app must be usable on a phone and on a desktop. Test at 360px and 1280px.
- Interactive elements are real buttons/inputs, reachable by keyboard, with visible
  focus. Answer options are a radio group; the test runner supports keys `1/2/3`
  or `A/B/C` and `Enter`.
- Colour is never the only carrier of meaning (correct/incorrect also use text and icons).
- Respect `prefers-reduced-motion` and `prefers-color-scheme`.

## 7. Deployment

- The build must stay a **static bundle** that works both at a domain root (Vercel)
  and in a sub-path (GitHub Pages). `base: './'` plus **hash routing** are required.
- No server-side routing may be assumed. No runtime OCR, no runtime PDF parsing.

## 8. Adding a new level (Elementary and beyond)

Adding a level must be **content-only work**:

1. Create `content/<newLevel>/` with the same module shape as `content/beginner/`.
2. Register it in `content/registry.ts`.
3. Do not copy or fork business logic. If logic needs a change, generalise it.

If a level has no content yet, the UI must show
"Content for this level is not available yet." rather than an empty screen.

## 9. Conflict resolution

Priority: explicit user requirement → `PROJECT_SPEC.md` → `AGENTS.md` →
`Performance.md` → agent-specific file → general engineering practice.
When requirements cannot be reconciled, choose the option that protects content
quality, performance and extensibility, and document the decision.
