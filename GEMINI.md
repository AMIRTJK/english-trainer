# GEMINI.md

Entry point for Gemini and other AI agents. Navigation only — the rules live in
the documents referenced below.

## Read first, in this order

1. **`AGENTS.md`** — primary engineering rulebook.
2. **`Performance.md`** — performance rules.
3. **`PROJECT_SPEC.md`** — primary product specification.

## Requirements for any change

- Analyse the repository before modifying code.
- `books/`, `vocabulary/` and `test/` are local-only source material and are
  **git-ignored**, so a fresh clone will not have them. Everything derived from
  them is committed: `content/`, `content/beginner/imported-quick-test.ts` and
  `docs/decisions.md`. Read those; ask for the originals if you need to author
  new content, and never invent material to fill the gap.
  `vocabulary/*.json` is hand-made and unverified — check it against the book.
- Never add unverified content to the active question pool. Only
  `status: 'verified'` questions are served in normal tests.
- Follow React + TypeScript, Feature-Sliced Design, and the **250-line limit per file**.
- Keep levels extensible and isolated: a new level is a new folder under `content/`,
  never a fork of the business logic, and never mixed with another level's data.
- Run type checking, content validation, unit tests and the production build:

  ```bash
  npm run verify
  ```

- Document important or ambiguous decisions in `docs/decisions.md`.
