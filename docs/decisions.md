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

773 verified questions across 49 topics and 195 constructs. A Quick Test (50) and
an Official Test (100) fill completely. A narrow custom selection may not: the app
then says how many unique questions exist. A preset runs a shorter test rather
than repeating items to pad it out (`PROJECT_SPEC.md` §10); a custom test repeats
instead, which §20 revises.

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

**Result at the time: 553 words, 44 Sound Bank sounds, 26 sound contrasts.**
The list was later re-checked against the whole book and grew to 777 — see §15.

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

`sounds.ts` lists the pairs the "different sound" questions contrast — 26 at the
time, 35 now (§18). `tests/vocabulary-content.test.ts` walks every
`different-sound` question and fails if a pair is missing, so the Vocabulary
screen can never advertise a contrast the tests do not actually ask about. The
only pairs it skips are those naming the two weak vowels of SB p.134, which are
not Sound Bank sounds at all (§14a). The same test asserts that every
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

## 14. The Vowel sounds page is content, not a hard-coded screen

`docs/English File 4th Edition Beginner Students Book.pdf` is an image-only scan
(§1). The page images were extracted once at authoring time and **SB p.134,
"Vowel sounds"**, was transcribed in full into
`content/beginner/pronunciation/vowel-table.ts`: 22 vowels, every "usual
spelling" row with the book's own example words, and every "! but also"
exception. Nothing is generated at runtime (`Performance.md` §1).

**What was written for this app, and what was not.** The letters, the example
words and the exception lists are the book's. The Russian explanation of each
rule is ours — as with the vocabulary glosses (§10a), describing a rule the page
already prints is not new educational material. The guard is the same and
mechanical: `scripts/validate-vowels.ts` fails if a word is outside the level
lexicon, if a vowel is not a Sound Bank key word, or if its IPA disagrees with
the Sound Bank entry of the same key.

### 14a. Two vowels have no key word

The page prints `/i/` (happy, angry, hungry) and `/u/` (usually, situation,
education) as bare symbols — they are not part of the 44-word Sound Bank. They
are carried in the vowel table under the keys `weak-i` and `weak-u`, and the
validator exempts exactly those two from the "must be a Sound Bank key word"
rule. `content/beginner/vocabulary/sounds.ts` is left untouched, so the
Vocabulary screen still speaks about the same 44 sounds as the question bank.

### 14b. Difficulty is derived from the page, not assigned by hand

A word's level is a function of its spelling:

| Level | Rule | Examples |
| --- | --- | --- |
| 1 | these letters spell one sound on the whole page | `ee`, `ar`, `igh`, `air` |
| 2 | the same letters spell other sounds too | `a`, `o`, `u`, `oo`, `ere` |
| 3 | the book's "! but also" column, or a sound it gives no rule for | women, two, buy, euro |

That is exactly the thing the learner asked to understand, so it drives both the
order of the questions and the explanation shown after each answer: at level 2
the card names the other sounds those letters make and gives the book's example
for each. Level 2 opens at 70% of level 1, level 3 at 70% of level 2.

**`window` is asked about in neither.** The book lists it twice — under `fish`
for its `i` and under `phone` as an exception for its `ow` — so "which vowel is
in *window*?" has two right answers. It stays in the reference list and is never
used as a question.

## 15. The word list was re-checked against the whole book, and grew

Every Vocabulary Bank page (SB pp.116–130), "Words and phrases to learn"
(pp.131–132), the verb list (p.133) and the Sound Bank (pp.134–135) were read
again from the page images and compared with the committed word list.

**What was already right.** Every transcription that could be checked against a
printed one matched, across all 18 Vocabulary Bank pages — numbers, countries,
the classroom, small things, family, adjectives, food, jobs, the daily routine,
clothes and hotels.

**What was wrong (2 items, both now corrected).**

| Word | Was | Book | Where |
| --- | --- | --- | --- |
| sandwich | /ˈsænwɪdʒ/ | /ˈsænwɪtʃ/ | SB p.122 |
| sure | /ʃɔː/ | /ʃʊə/ | SB p.134 lists it under /ʊə/ |

**What was missing (224 words, now added).** The gaps were systematic rather
than random: the list had been derived from the phonetic tables the repository
already held (§10), so it covered the Vocabulary Bank well and the book's own
per-lesson lists hardly at all.

- the ordinal numbers 6th–19th and 30th (SB p.127) — only 1st–5th, 12th and 20th were there;
- Switzerland, Swiss, the UK and the USA (SB p.117);
- ID, debit (p.119), gift (p.130), moment (p.124);
- the 11 words of SB p.134 that were not yet in the list, so the Vowel sounds
  trainer and the word list now agree completely;
- ~190 head words from "Words and phrases to learn" (pp.131–132) and the verb
  list (p.133), including the irregular past forms the exam asks for.

`content/beginner/lexicon/words-to-learn.ts` extends the allowed lexicon with
the same pages, so the new head words pass the lexicon gate for the reason they
should: the book prints them.

**Two new topics.** `beg-v-words-to-learn` and `beg-v-verbs` mirror book
sections that the topic list did not have. They group *words*, not questions, so
`validate-content.ts` no longer warns that a topic carrying vocabulary is empty.

**Left out on purpose.** `Izmir` and `Alex` are a city and a person in example
dialogues, not vocabulary to learn. "Common verb phrases 2" (p.126) did not need
a topic of its own: its words were already covered under *Free time* and
*Travelling*.

**Result: 777 words (was 553), 48 topics, 22 vowels with 147 page words.**

## 16. Spelling is a third Leitner track, not a flag on the word

The exam asks the learner to *write* the word, and someone can recognise
*beautiful* instantly, still misspell it, and still not hear its /uː/. Those are
three skills, so `VocabLevelProgress` keeps three independent sets of boxes —
`words`, `spelling`, `vowels` — plus per-sound counters for the vowel drill.
Schema version 2; a v1 profile simply starts the two new skills at zero
(`src/entities/vocab/model/repository.ts`, `tests/vocab-migration.test.ts`).

**Marking.** The answer is compared after straightening curly apostrophes and
collapsing spaces. A capital is part of the spelling only where the book says so
— it teaches "Brazil **NOT** brazil" (p.117) and "Months begin with a CAPITAL
letter" (p.127) — so `monday` is wrong but `Coffee` is not. A wrong answer is
aligned against the target with a longest-common-subsequence pass, so one
missing letter is reported as one missing letter instead of turning the whole
tail red. Hints reveal the word one letter from the front and never the last
letter.

### 16a. "Needed a hint" and "spelled it wrong" count alike and are reported apart

Both send the word back — neither was produced unaided, which is what the exam
asks for — so both leave the Leitner box at 0. But they are different things to
tell the learner, and the first version of the summary conflated them: a word
typed correctly after a hint was listed under "Look at these again" as
*monkey — you wrote: monkey*, which reads as a marking error.

The round log therefore carries `correct` (the letters were right) and `hinted`
separately. `summariseRound` counts `correct && !hinted` as known, and lists a
hinted word as *spelled right, but with a hint*, with no "you wrote" line. The
card says the same at the moment of the answer, so the reason a right answer is
coming back is never a surprise.

## 17. Progress orders the sound trainer; it never closes it

"Train this level" could answer *Nothing to practise here right now*, and two
of the three difficulty bands showed no button at all until the band below was
70% learned. Both were the same mistake: treating a teaching order as a lock.

`selectRound` still deals missed words first, then due words, then unseen ones.
What changed is the end of the queue: words that are learned and not yet due are
held back while there is other work and **used to fill the round when there is
not**, so a level that has words in it always yields a round. The three bands
now always link to their trainer; a band the ladder would not have suggested yet
says so in one line instead of hiding the button.

The unlock threshold itself is unchanged — `unlockedLevel` still decides how far
*mixed* practice reaches, which is where the "rule before the exception" order
actually matters.

## 18. The Vowel sounds test now covers the whole page, not most of it

SB p.134 prints 147 words. The test asked about 121 of them. Four rows were
missing outright — `computer /ə/` (sister, actor, famous, about, policeman),
`tourist /ʊə/` (euro, Europe, sure, plural) and the two weak vowels `/i/`
(happy, angry, hungry) and `/u/` (usually, situation, education) — plus stray
words on rows that were otherwise covered (English, women, what, but, excuse,
Turkey, Spain, they, I, right, umbrella).

They were not an oversight of authoring so much as a limit of the format. A
"which word has a different sound?" row normally works because the learner
compares the stressed vowel, and those words are taught for a vowel that is
**not** stressed: `sister` is on the /ə/ row but its stressed vowel is /ɪ/,
`euro` is on the /ʊə/ row but ends with /əʊ/, `happy` is on the /i/ row but
starts with /æ/. Pair `sister` with `actor` against `six` and the intended
answer is *six*, but *actor* is just as defensible — `six` and `sister` both
have /ɪ/. A question with two right answers teaches nothing.

The first attempt at this added a second question format — *which word has the
sound /ə/ (computer)?* — which sidesteps the ambiguity but is not the format of
the exam paper, and the exam format is the point. It was removed.

**The rule that makes those rows answerable instead:** the two matching words
share the taught sound, and the odd word shares **no vowel at all** with
either. Then there is exactly one pair with anything in common, so the answer
holds however the learner listens:

| Row | Shared | Odd |
| --- | --- | --- |
| sister · actor · book | /ə/ | book — /ʊ/, and neither /ɪ/ nor /æ/ |
| euro · plural · six | /ʊə/ | six — /ɪ/, and neither /əʊ/ nor /ə/ |
| happy · angry · book | /æ/ and /i/ | book — /ʊ/ |
| usually · situation · stop | /u/ | stop — /ɒ/ |

Twelve rows built that way cover all seventeen of the page's weak-vowel words,
in the one format the test uses. `tests/sound-rules.test.ts` holds the rule: it
checks that every one of the 147 words is asked about, that every question is a
`different-sound` item, and that in each of those twelve rows exactly one pair
of words shares a vowel.

The rule is deliberately applied to those rows only. An ordinary row compares
stressed vowels, which is what the exam means and what the earlier rows were
authored to; re-litigating fifty verified questions was not the ask.

Nine sound contrasts were added to `content/beginner/vocabulary/sounds.ts` to
match the new rows. The pairs involving the two weak vowels are deliberately
absent: that list backs the Vocabulary screen, which speaks about the 44 Sound
Bank sounds, and `weak-i`/`weak-u` are not among them (§14a). The test skips
them for the same reason.

Nothing was removed. The existing rows use book words from elsewhere in the
Sound Bank (car, chair, photo, shirt…) as partners, which is legitimate; the
requirement was coverage of the page, not exclusivity to it.

## 19. The Sound Bank rules are tested as rules, not only as words

Expanding a sound in the Sound Bank shows the rules behind it — *одна e в
закрытом слоге — /e/*, *oo перед k — /ʊ/*, the "! but also" column. Knowing
which sound a word has and being able to state the rules of a sound are
different skills, and only the first was being tested.

`content/beginner/questions/pron-rules.ts` adds a topic, **Sound Bank rules**
(`beg-p-sound-rules`, 115 questions), with four families, all derived from
`vowelTable` so the test cannot drift from the screen it is testing:

1. **letters → sound** — *which sound do the letters "igh" usually spell?*
   Only for letters that spell one sound on the whole page.
2. **sound → letters** — *which letters usually spell /ɔː/ horse?* One question
   per spelling rule the page prints, so all of a sound's rules get asked.
3. **the "! but also" column** — *which word is a "! but also" word for /e/
   egg?* The wrong answers are regular words of the same sound, so the question
   is about the exception, not about the sound.
4. **the three groups** — *which sound is a diphthong?*

The explanation of every answer is the Sound Bank's own rule text, so the test
also teaches the wording the learner has to reproduce.

**Two guards keep the wrong answers wrong.** A distractor sound is dropped when
the target letters appear in one of its exception words (`bread` is on the /e/
row, so `ea` → /e/ is never offered as wrong; `window` is on the /əʊ/ row, so
`ow` → /əʊ/ is not either). A distractor word is dropped when it is flagged
"! but also" anywhere on the page.

**Lexicon.** The test shows the page's letter strings (`ee`, `igh`, `ere`) and
its group headings, which are not words. `content/beginner/lexicon/sound-bank-terms.ts`
adds them, deriving the letters from the table rather than re-typing them, so
the gate cannot fall behind the content. It is a widening of the allowed list
and deliberately a narrow one: these are printed on p.134.

## 20. A practice test may repeat a question; an exam-shaped one may not

§8 said the app runs a shorter test rather than repeat items. The learner asked
for the opposite for exam preparation: with 73 vowel questions and a 100-question
test, stopping at 73 means some sounds get less practice than others, and a
repeat costs nothing.

The rule is now split by what the test is imitating:

- **Presets** (Quick, Official, Full) copy a real paper and keep unique
  questions, so the honest-bank-size reporting of §8 still applies to them.
- **A custom test** has a *Repeat questions to reach the full length* checkbox,
  **on by default**, and the deep links from the Sound Bank set it.

`padWithRepeats` deals the whole pool, reshuffled every pass, until the test is
full: **every question is asked once before any is asked twice**, so a repeat
never costs coverage, and the only place a duplicate could land next to itself —
a pass boundary — is swapped away. `TestPlan.repeats` reports how many extra
items that took, and the warning says so plainly rather than apologising for a
short test.

The runner was already index-based, so a repeated question needed no change
there; the results list was keyed by `questionId` and is now keyed by position.
