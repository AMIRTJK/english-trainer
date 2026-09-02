# CLAUDE.md

Entry point for Claude Code. This file is navigation only — the rules themselves
live in the documents it points to.

## Read first, in this order

1. **`AGENTS.md`** — the primary engineering rulebook. Follow it.
2. **`Performance.md`** — read before writing or changing performance-sensitive code.
3. **`PROJECT_SPEC.md`** — the primary product specification.

## Working rules

- Treat `AGENTS.md` as the authority on engineering decisions and `PROJECT_SPEC.md`
  as the authority on product decisions.
- Before implementing, inspect the repository. Do not start writing test content
  blindly.
- `books/`, `vocabulary/` and `test/` are local-only source material and are
  **git-ignored**, so a fresh clone will not have them. What was derived from
  them is committed: the question bank in `content/`, the verified paper-test
  analysis in `content/beginner/imported-quick-test.ts`, and the reasoning in
  `docs/decisions.md`. Read those first; if you need the originals to author new
  content, ask for them rather than inventing material.
- `vocabulary/*.json` was made by hand and is **not** trusted. Verify against the
  book before relying on it.
- Do not invent educational content outside the verified project materials.
  Only questions with `status: 'verified'` may enter the active pool.
- Respect the limits: FSD layering, 250 lines per file, the performance rules and
  the content-quality rules.
- Do not ask for confirmation on ordinary engineering decisions when the
  requirements are clear. Decide, implement, and document.
- Document ambiguous decisions and discovered limitations in `docs/decisions.md`.

## Before calling a significant task complete

```bash
npm run verify
```

(type check → content validation → unit tests → production build)
