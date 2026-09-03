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

## 10. The Vocabulary word list is derived, not re-typed

`vocabulary/*.json` is git-ignored, untrusted and not present in a clean clone,
so the Vocabulary tab was built out of the material the repository already
holds — a view over it, never a second dictionary:

| Source already in the repo | What it gives |
| --- | --- |
| `questions/sound-table.ts` | vowel Sound Bank group + IPA for ~130 words |
| `questions/pron-consonants.ts` | consonant group + IPA for ~78 words |
| `questions/pron-ear-chair.ts` | /ɪə/–/eə/ group + IPA for 19 words |
| `questions/stress-words.ts` | syllables and stressed syllable for 40 words |
| `lexicon/vocabulary-bank.ts` etc. | the allowed headwords of the level |
| `topics.ts`, `meta.ts` | the unit and topic a word belongs to |

`content/beginner/vocabulary/derived.ts` joins those tables once at module init,
so a word file usually carries **only the translation**: `['coffee', 'кофе']`.
The Sound Bank group and the transcription are spelled out only where the
existing tables do not cover the word.

**Result: 553 words, 44 Sound Bank sounds, 26 sound contrasts.**

### 10a. Russian translations and the missing transcriptions were written by hand

This is the one thing the repository did not already contain. `AGENTS.md` §3
forbids inventing *educational material* beyond the book; a gloss and an IPA
transcription of a word that is already in the book are descriptions of that
word, not new material, so they were added. The guard is mechanical: every
headword must be in the level lexicon, so the word list cannot drift outside the
book. `scripts/validate-vocabulary.ts` enforces that, plus a translation, an
IPA, a real Sound Bank group, a real topic, no duplicate word, and that the
group's symbol is actually visible in the transcription (otherwise the UI could
not highlight it).

### 10b. Sound contrasts are locked to the question bank

`sounds.ts` lists the 26 pairs the "different sound" questions contrast.
`tests/vocabulary-content.test.ts` walks every `different-sound` question and
fails if a pair is missing, so the Vocabulary screen can never advertise a
contrast the tests do not actually ask about. The same test asserts that every
word those questions use is in the list; the two exceptions are `bags` and
`cars`, deliberately left out as plural forms of `bag` and `car` rather than
listed twice.

## 11. Pronunciation uses the browser's Speech Synthesis API

An external TTS service would add a network request per word and a dependency on
a third party for a personal, offline-capable app. The Web Speech API costs
nothing in the bundle (`Performance.md` §6), can repeat a word as often as
wanted, and supports the sequential "compare these words" playback the sound
groups need.

**Known limit.** Voice quality is the browser's, not ours. A British voice is
preferred (`en-GB`, then `en-AU`, `en-US`, any `en`), but on a machine with no
English voice installed the buttons hide themselves rather than mispronounce.

## 12. Vocabulary progress is stored under its own key

Word learning is a different concern from test history, so it lives at
`eft:v1:vocab` with its own schema version and its own debounced writer
(`AGENTS.md` §4, `Performance.md` §5) — answering a card never rewrites the test
profile. Both are included in the same export bundle; a backup made before this
feature simply has no `vocab` field and imports fine.

Repetition is a small Leitner scheme: boxes with 0/1/3/7/21-day intervals,
"Не знаю" drops a word to box 0 (due immediately, so it returns this session and
the next), and a word counts as learned from box 2. Per-sound counters are kept
alongside the per-word ones, which is what lets the app say *"/æ/ needs work"*
and offer the whole group for revision.

## 13. The vocabulary data ships in the eagerly-loaded content chunk

Measured: the content chunk grows from 104.50 kB to 127.62 kB raw
(32.23 kB → 42.46 kB gzip), so the initial payload is about 105 kB gzip in
total — comfortably inside the ~200 kB budget in `Performance.md` §6. Making the
word list a lazily-imported chunk would turn `getVocabularyIndex` into an async
call and force Suspense into the vocabulary screens; that complexity is not
justified by 10 kB. Revisit if a second level's vocabulary is added.
