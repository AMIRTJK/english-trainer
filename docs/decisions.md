# Decisions and known limits

Recorded as required by `AGENTS.md` §5 and `CLAUDE.md`.

---

## 1. The books are scanned PDFs, not photographs

`PROJECT_SPEC.md` §12 assumes `Books/` holds photographs. It actually holds two
image-only PDFs (Student's Book, 139 page images; Workbook, 75). `pdftotext`
returns 135 bytes for the whole Student's Book, so the pages carry no text layer.

**Decision.** The page images were extracted once at authoring time and read
directly. No OCR library was added, and nothing about this pipeline runs in the
app: `content/` holds the finished data (`Performance.md` §1).

## 2. The paper test is the **File 10 Quick Test**, not a whole-course test

The test in `test/` is headed "English File Beginner — **10** Quick Test". It is
the per-file test for File 10, so its content is File 10 material: *there is /
there are* with *some / any*, *past simple: be*, hotel vocabulary, prepositions,
and the /ɪə/–/eə/ sound contrast.

Its shape is: **Grammar 20 + Vocabulary 20 + Pronunciation 10 = 50**, and the
pronunciation half splits 5 "different sound" and 5 "word stress".

**Decision.** That measured 40 / 40 / 10 / 10 split is used as the default test
mix in `src/features/build-test/model/presets.ts` rather than an invented one.
It is a named constant so it can be changed in one place.

## 3. The 38/50 result was verified independently, not assumed

Every one of the 50 items was read from the photographs, together with the ticks
and the teacher's margin marks. The correct answer to each item was then worked
out independently and compared with the marking.

Both agree exactly: **38/50, 12 mistakes, 76%** —
Grammar 17/20, Vocabulary 15/20, Pronunciation 6/10 (sounds 2/5, stress 4/5).

The 12 mistakes are: Grammar 10, 12, 17; Vocabulary 4, 5, 16, 17, 20;
Pronunciation 1, 2, 4, 8.

Because it is the File 10 paper, the topic of each item is known from the paper's
own structure, so all 50 items are seeded with their real topic and result. This
is why the app's opening statistics match the real test rather than showing zeroes.

There is a circled "13" on the pronunciation page next to the total. It does not
match the 12 mistakes counted from the marks or from the independent analysis,
and the printed total box is overwritten. It has been treated as a stray note.

### 3a. Vocabulary 4 is deliberately left unclassified

> Which word is different? **a supermarket** — A a spa, B a hospital, C a street

The chosen answer (A) is marked wrong, so the key is B or C. "a street" is the
better reading — a supermarket, a spa and a hospital are all places you go
inside — but the official answer key was not available. `PROJECT_SPEC.md` §13
says to mark such an item `unknown` rather than guess a topic, so it is recorded
with `topicId: null` and carries an explanatory note. It still counts in the totals.

## 4. Distractors may use forms that are wrong on purpose

English File teaches with negative examples ("NOT *I didn't arrived*"), so good
distractors are often incorrect forms of correct words. A blanket
"every word must be in the book" rule would forbid them.

**Decision.** `content/beginner/lexicon/deliberate-errors.ts` lists these forms
explicitly. `scripts/validate-content.ts` then enforces something stronger than
the original rule:

- the prompt **and the correct answer** must use only allowed vocabulary;
- a distractor may additionally use a **listed** wrong form, nothing else;
- a listed wrong form may **never** appear in a correct answer.

## 5. Word-stress options are encoded, not free text

A word-stress option is stored as `"'won|der|ful"` — syllables split on `|`, an
apostrophe before the stressed one. This keeps options self-describing so they
can be shuffled safely, and lets the validator check that the marked syllable
agrees with the stress metadata. The UI renders them as `won·der·**ful**`.

Two-syllable stress contrasts (thirteen / thirty) cannot fill three options, so
they are asked as "Which word has a different stress pattern?" instead — still
the word-stress category, a different question type.

## 6. Statistics are incremental, and "weak" is not claimed too early

Aggregates are folded in when an attempt is saved; the history is never rescanned
(`Performance.md` §4). Unique question and construct ids are kept as lists on each
topic stat so the counts stay correct across attempts without a rescan.

A topic needs at least 6 answers **and** 4 distinct questions before it can be
called weak. Below that it reports **Not enough data**, and the adaptive engine
samples it to find out rather than labelling it (`PROJECT_SPEC.md` §16).

## 7. Full per-answer detail is kept for the last 40 attempts

Older attempts keep their totals but drop their answer list, and the history is
capped at 300 attempts. The aggregates are already folded in, so no statistic is
lost — only the ability to re-open a very old result screen.

## 8. Bank size is reported honestly

640 verified questions across 46 topics and 124 constructs. A Quick Test (50) and
an Official Test (100) fill completely. A narrow custom selection may not: the app
then says how many unique questions exist and runs a shorter test rather than
repeating items to pad it out (`PROJECT_SPEC.md` §10).

## 9. Hash routing

`HashRouter` plus `base: './'` keeps the same build working at a domain root
(Vercel) and in a repository sub-path (GitHub Pages) with no server rewrites.
