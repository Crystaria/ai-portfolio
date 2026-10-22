---
layout: page
title: "Hallucination Audit: The “No Known Issues” Release"
titleTemplate: Evaluation · Hallucination & Logic Gaps
tldr: "The v2.0.0 release note said there were no known issues. Six claims later, five were contradicted by the project’s own rulebook, engine copy, regression scope or inline UI duplicate — including the +500 line that survived in the player-facing modal."
date: '2026-10-22'
capabilities:
  - hallucination-audit
  - claim-verification
  - logic-gap
  - release-gating
metrics:
  - label: Claims audited
    value: '6'
  - label: Contradicted
    value: '5'
  - label: Release blockers
    value: '2'
  - label: Unsupported numbers
    value: '0'
verdict: fail
---

<script setup>
import EvalVerdict from '../.vitepress/theme/components/EvalVerdict.vue'
</script>

<div class="section-page section-page--narrow">

<p class="section-kicker">Evaluation report · Hallucination & logic gaps</p>

# Hallucination Audit: The “No Known Issues” Release

<div class="report-meta">
  <EvalVerdict verdict="fail" />
  <time datetime="2026-10-22">22 Oct 2026</time>
  <span>·</span>
  <span>Evidence cutoff 2026-10-21</span>
</div>

## TL;DR

The v2.0.0 release note has a section called “Known issues” and one word under
it: “None.” That is a factual claim, not a formatting choice. I treated it as
one and checked it against the rulebook, the engine implementation, the
regression record and the inline UI source. Five of six release claims were
contradicted; the sixth was genuinely unresolved. Two contradictions were
player-visible blockers. The most persistent one is not in the engine at all:
`src/App.jsx` carries a second copy of the role copy, and its Nun hidden
condition still says `+500`.

## Claim under test

> v2.0.0 has no known issues; the 11/11 engine regression and the release note
> support shipping to TapTap.

This is a compound claim. It can fail at any of four layers:

1. the player-facing copy is wrong;
2. the engine implements something different;
3. the regression does not cover the layer where the difference lives;
4. the release note asserts closure that the other three layers contradict.

## Method

1. Freeze the evidence cutoff at 2026-10-21 and record the four attached
   documents plus the two source files (`src/gameEngine.js`, `src/App.jsx`).
2. Extract every release claim that could be true or false. Exclude marketing
   adjectives; keep numbers, controls, coverage statements and closure claims.
3. Cross-check each claim against at least two independent layers where possible.
4. Re-run the engine regression: `npm run sim`.
5. Classify each claim as supported, contradicted, unresolved or unsupported.
6. Do not accept “the test passed” as evidence for a layer the test explicitly
   excludes.

## Six claims, five contradictions

| # | Claim | Evidence | Result |
|---|---|---|---|
| 1 | “Known issues: none.” | Rulebook and engine disagree on the Nun bonus; disguise control is not wired; Regent wording is unresolved; Duke cap is off by 10 at diff 10 | **Contradicted** |
| 2 | “The Nun assassination bonus is fixed at +50.” | Engine constant and regression assert 50; player-facing role copy and `App.jsx` hidden-condition string still say `+500` | **Contradicted at the player layer** (true in engine) |
| 3 | “The Duke disguise is an optional, once-per-game checkbox.” | UI renders the checkbox; `useDisguise` is local state and is never passed to `processTurn`; the engine auto-disguises on the first `EXECUTE_BLACK` | **Contradicted** |
| 4 | “11/11 regression proves the release is ready.” | Regression explicitly excludes player copy, UI-to-engine input and dual-engine consistency | **Contradicted** |
| 5 | “The Regent’s betrayal action gains +75%.” | Term table defines “betrayal” as `SABOTAGE_BOTH`; implementation binds +75% to `EXECUTE_BLACK`; `SABOTAGE_BOTH` has zero credit to amplify | **Unresolved** — needs a design decision |
| 6 | “There is one engine source of truth.” (implicit) | `App.jsx` contains an inline copy of `processTurn`, role data and hidden-win copy; no diff test exists | **Contradicted** |

The count is intentionally strict. Claim 2 is “true” in the engine and “false”
in the product. A release claim is about the product, so it is contradicted.
Claim 5 is not counted as a contradiction because the source does not settle
which reading is intended; calling it “wrong” would be a different kind of
hallucination.

## Six hallucination patterns

This is an audit of an artifact, not a model transcript. The same six shortcuts
show up in LLM-generated release summaries, which is why the report is useful
beyond this game.

| Pattern | How it appears here | Why it is persuasive |
|---|---|---|
| Stale-copy repetition | `+500` survives in the rulebook and in `App.jsx` after the engine moved to 50 | The number is specific, formatted like a rule, and repeated in two places |
| Control hallucination | A checkbox exists, so the engine must read it | The UI is visible and interactive; the missing wiring is invisible |
| Coverage hallucination | 11/11 green, so the product is green | The test report is accurate about what it covers; the inference is what fails |
| Term drift | “Betrayal” is defined as `SABOTAGE_BOTH`, but +75% is bound to `EXECUTE_BLACK` | Both statements are locally coherent; only the mapping is wrong |
| Duplicate-source omission | `App.jsx` reimplements the engine and copy; no diff test | The duplicate compiles and behaves plausibly, so it looks like the source of truth |
| Closure hallucination | “Known issues: none” | A release note is expected to summarize; “none” reads as a conclusion, not a claim to verify |

The common thread: every pattern is a **plausible completion**. None produces a
stack trace. That is exactly why the audit must compare layers rather than read
each layer on its own.

## Evidence

| Check | Result |
|---|---|
| Claims audited | 6 |
| Contradicted | 5 |
| Unresolved | 1 |
| Player-visible blockers | 2 |
| Non-blocking precision defects | 1 |
| Pending contract / snapshot / diff tests | 1 group |
| Engine regression re-run | 11/11 PASS |
| Player-visible sources with `+500` | 2 |
| Engine copies in the repository | 2 |
| Contract tests for the disguise checkbox | 0 |
| Findings with an unsupported number | 0 |

The source-level check is what turns claim 6 from suspicion into evidence:

```js
// src/App.jsx — the inline UI copy
const HIDDEN_WIN_CONDITIONS = {
  NUN: '... +500 刺杀得分。',
};

// src/App.jsx — local state, never passed to processTurn
const [useDisguise, setUseDisguise] = useState(false);

// src/gameEngine.js — the engine copy
passive: { assassinationBonus: 50 }
```

`+500` and `50` can both be “correct” in their own file. The release claim is
false because the player sees the first one and the score uses the second.

## Remediation

| Priority | Action | Owner | Close evidence |
|---|---|---|---|
| P0 | Change the Nun hidden-condition copy to `+50` in both the rule doc and `App.jsx` | Gameplay engineer + client | Role-modal screenshot; copy snapshot test |
| P0 | Pass the checkbox state into `context.disguiseRequests`; engine disguises only on request | Client + gameplay engineer | Checked / unchecked / repeat-request contract tests |
| P1 | Decide whether Regent +75% belongs to `EXECUTE_BLACK` or `SABOTAGE_BOTH`; rewrite the term or the binding | Design + gameplay engineer | Signed design note; final copy |
| P1 | Fix the Duke cap copy: `diff 0 → +50`, decreasing by 1 per point | Gameplay engineer | Copy snapshot |
| P1 | Delete the inline engine or make it import the tested engine; add a diff gate if duplication is unavoidable | Client + QA | CI diff job |
| P2 | Add copy snapshots and UI-to-engine contract tests to the release gate | QA | New tests fail on reintroduction |

## Verdict

**Fail.** The release note’s closure claim is false at the player-visible layer.
The engine regression is real and useful, but it is evidence for a narrower
claim than the one the release note makes. Two blockers remain: the Nun payoff
copy and the Duke disguise control. The Regent wording and the Duke cap are
lower-severity, but they still need owners and closure evidence.

A release note should say what was verified, on which layer, and what remains
unverified. “No known issues” is only true after the unknowns have been looked
for.

## Limitations

- The audit uses a frozen snapshot dated 2026-10-21; later edits may close or
  change findings.
- It does not include player telemetry, so it cannot estimate how many players
  actually planned around `+500`.
- It treats the four documents as the release contract. A product with a
  different contract may classify the same mismatch differently.
- It does not claim that the engine’s `50` is the “correct” balance value; it
  only claims that the player-facing number and the paid number disagree.

## Related

- [When the Rulebook and the Engine Disagree](/cases/sins-pendulum-rule-asymmetry)
  — the player-experience replay of the same findings.
- [Prompt Boundary Test: Can a Green Regression Prove a Release?](/evals/prompt-boundary-green-tests)
  — why the four-document prompt cannot see the inline duplicate.
- [Path Audit: The Missing work/ Directory](/evals/path-audit-work-directory)
  — a smaller example of the same rule: verify the artifact, not the label.

</div>
