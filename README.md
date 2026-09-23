# English File Trainer — Beginner

A personal trainer for the **English File 4th edition Beginner** course. Every
question comes from the course books, is tagged with its source page, and is
checked by an automated content gate before it can be used in a test.

No backend. Everything is stored in the browser.

## Quick start

```bash
npm install
npm run dev
```

## What is inside

- **778 verified questions** across 49 topics and 192 distinct constructs.
- Quick Test (50), Official Test (100), Full Test, Custom Test, Weak Areas,
  My Mistakes and Quick Practice.
- The real paper Quick Test result (38/50) imported as the starting history,
  with all 12 mistakes classified.
- Adaptive selection that favours unseen questions on weak topics, brings old
  mistakes back after a sensible interval, and refuses to call a topic weak
  before there is enough evidence.
- Progress split by level, section, topic, and — importantly — by whether the
  questions were new or already seen.
- **A Vocabulary tab**: 777 words from the Student's Book with their Russian
  translation, IPA, and Sound Bank group; grouped by unit, topic or sound;
  spoken aloud one at a time or as a group to compare; and a flashcard mode
  with spaced repetition that tracks both words and phonetic groups, so the
  "which word has a different sound?" questions can be prepared for directly.
- **A Spelling drill**: the translation is shown and the word is typed. Wrong
  answers are marked letter by letter, hints reveal the word one letter at a
  time, and capitals count where the book insists on them (*Brazil*, *Monday*).
  Spelling keeps its own spaced-repetition boxes, separate from recognition.
- **A Vowel sounds trainer** built from the Sound Bank page (SB p.134): all 22
  vowels, their spelling rules and all 147 words the page prints. Questions are
  ordered by how much the spelling gives away — first letters that only ever
  make one sound, then letters that make several, then the book’s "! but also"
  exceptions — and every answer is followed by *why* that sound, which other
  sounds those letters can make, and the words that behave the same way.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build into `dist/` |
| `npm run typecheck` | TypeScript project check |
| `npm run lint:size` | Enforces the 250-line file limit |
| `npm run lint:content` | Validates every question, word and vowel against the lexicon and rules |
| `npm run test` | Unit tests |
| `npm run verify` | All of the above, in order |

## Project documents

| File | Purpose |
| --- | --- |
| `AGENTS.md` | Engineering rules — the primary rulebook |
| `Performance.md` | Performance rules and acceptance criteria |
| `PROJECT_SPEC.md` | Product specification |
| `CLAUDE.md` / `GEMINI.md` | Short entry points for AI agents |
| `docs/decisions.md` | Decisions taken and limits found |

## Content

Educational content lives in `content/<levelId>/`, separate from the app code and
free of framework imports. Adding **Elementary** means adding a folder and one
line in `content/registry.ts` — no business logic changes.

The content gate (`npm run lint:content`) checks that:

- the prompt and correct answer use only vocabulary from the book;
- distractors only use listed, deliberately wrong forms;
- a deliberately wrong form is never the correct answer;
- "different sound" items really have one odd word and two matching ones;
- word-stress syllables agree with the marked answer;
- no question is a duplicate, and none is merely a reordering of another;
- every vocabulary word is in the lexicon, is listed once, and has a translation,
  a transcription and a Sound Bank group whose symbol appears in that
  transcription;
- every word of the Vowel sounds page is in the lexicon, every vowel is a real
  Sound Bank sound, and its IPA agrees with the Sound Bank entry of the same key.

## Deployment

Static output, works unchanged on both targets:

- **GitHub Pages** — `.github/workflows/deploy.yml` runs `npm run verify` and
  publishes `dist/`. Hash routing and a relative base make sub-path hosting work.
- **Vercel** — `vercel.json`; build `npm run build`, output `dist`.

## Source material

`books/` (course PDFs), `vocabulary/` (an old hand-made word list, treated as
unverified) and `test/` (photographs of the completed paper test) are inputs used
when authoring content. They are never loaded by the app, the build or the tests.

They are **kept locally and git-ignored** — the books are copyrighted Oxford
University Press material and the test photos are personal, so neither belongs in
a repository that gets pushed and published. A fresh clone will not have them and
does not need them: everything derived from them is committed, in `content/`,
`content/beginner/imported-quick-test.ts` and `docs/decisions.md`.
