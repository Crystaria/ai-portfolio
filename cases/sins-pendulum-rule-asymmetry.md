---
layout: page
title: When the Rulebook and the Engine Disagree
titleTemplate: Interaction Case · Information Asymmetry
tldr: "A four-role social deduction game shipped with a green 11/11 regression suite and four rule-level mismatches: a +500 payoff that paid +50, a disguise checkbox the engine never read, a +75% term bound to the wrong action, and a +50 cap that was really +40."
date: '2026-10-22'
capabilities:
  - information-asymmetry
  - multi-round-validation
  - ui-engine-contract
  - rule-audit
metrics:
  - label: Contract checks
    value: '20'
  - label: Player-visible blockers
    value: '2'
  - label: Engine regressions
    value: 11/11
  - label: Unsupported findings
    value: '0'
verdict: fail
---

<script setup>
import EvalVerdict from '../.vitepress/theme/components/EvalVerdict.vue'
</script>

<div class="section-page section-page--narrow">

<p class="section-kicker">Interaction case · Rule-level replay</p>

# When the Rulebook and the Engine Disagree

<div class="report-meta">
  <EvalVerdict verdict="fail" />
  <time datetime="2026-10-22">22 Oct 2026</time>
  <span>·</span>
  <span>《罪恶摇摆：白垩与黑铁》v2.0.0</span>
  <span>·</span>
  <span>Evidence cutoff 2026-10-21</span>
</div>

## TL;DR

A four-player social deduction game can be internally consistent at the engine
layer and still be unshippable. In this v2.0.0 audit, the engine regression was
green — 11/11 assertions passed — but the player-facing rulebook, the action
controls and the engine described three different games. Two mismatches were
player-visible blockers; one was a precision defect; one was an unresolved
wording problem. The interesting failure is not a crash. It is a **silent
information gap**: every layer is individually plausible, so no exception is
thrown when the player plans around a number the engine will never pay.

## Context

《罪恶摇摆：白垩与黑铁》 is an H5 social deduction game: one human and three
AI players, four masks dealt without replacement, five rounds of public
statements followed by secret actions, and a black/white pendulum that moves
with every choice. Suspicion is clamped to `[0, 100]`; a player at 100 is
executed; only survivors are ranked.

The release package contains four documents:

| Document | Source of truth for |
|---|---|
| `01_角色与规则设定.md` | What the player reads in the role reveal, tutorial and store page |
| `02_核心数值与结算引擎.md` | What the engine actually computes |
| `03_三剧本回归测试记录.md` | What the automated regression covers — and what it does not |
| `04_发行说明.md` | What changed in v2.0.0 and what is declared ready |

There is also an inline copy of the engine and player-facing role copy inside
`src/App.jsx`. The regression record explicitly says the inline copy is not
compared with `src/gameEngine.js`. That omission matters later.

## The information gap

The player and the engine hold different models of the same four rules. None
of the differences produces an error message.

| Rule | Player-facing copy | Engine / source | Consequence |
|---|---|---|---|
| Whisper Nun hidden victory | `+500` assassination score | `assassinationBonus = 50`; regression asserts 50 | The player values one execution 10× too highly |
| Faceless Duke disguise | Optional checkbox; unchecked means no disguise | First `EXECUTE_BLACK` auto-disguises; `context.disguiseRequests` is never read | The player cannot choose “do not disguise” |
| Regent betrayal bonus | “Betrayal action +75%” | `+75%` is bound to `EXECUTE_BLACK`, not `SABOTAGE_BOTH`; the term table defines “betrayal” as `SABOTAGE_BOTH` | The literal reading gives `0 × 1.75 = 0`; intent needs design confirmation |
| Duke balance bonus | “Difference ≤10 reaches the +50 cap” | `max(0, round(50 − diff))`; diff 10 → `40` | A 10-point expectation gap at the advertised cap boundary |

The first two are blockers because the player can see or operate the wrong
thing. The third is unresolved because two readings are possible and the
material does not say which one is intended. The fourth is a precision defect:
it changes the displayed payoff, but not the “perfect balance” rating or the
winner in the audited scenarios.

## Multi-round replay

This is a rule-level replay, not a recorded player session. Every number below
is reproducible from the cited documents; the point is to show how the gaps
compound across rounds.

| Round | What the player plans | What the engine does | What the player observes |
|---|---|---|---|
| 1 | Draws the Whisper Nun; forces an execution because the hidden condition says `+500` | Awards `+50` | A plausible but wrong score breakdown; no warning |
| 2 | Draws the Faceless Duke; selects `EXECUTE_BLACK` and leaves the disguise box unchecked | Auto-disguises on the first black action, marks `dukeDisguiseUsed = true` | The table is told the action was white; the player’s “no disguise” plan is silently overridden |
| 3 | Draws the Regent; chooses “betrayal” expecting `+75%` | Applies the bonus only to `EXECUTE_BLACK`; `SABOTAGE_BOTH` has zero credit to amplify | Either no bonus or an unexpected bonus, depending on which action was chosen |
| 4 | Plays the Duke at a credit difference of 10, expecting the `+50` cap | Computes `max(0, round(50 − 10)) = 40` | A 10-point gap at the exact boundary the copy advertises |
| 5 | Reconstructs the final ranking from the rulebook | Ranks only survivors using engine values | The story and the scoreboard disagree, but both are “valid” outputs |

The compounding effect is the real interaction failure. A single mismatch can
be dismissed as a display bug. Four mismatches across five rounds produce a
player who cannot build a reliable mental model of the game — while every
individual subsystem reports success.

## Why 11/11 did not catch it

The regression suite is honest about its own boundary:

> This regression covers only `src/gameEngine.js` engine values and dialogue
> generation. It does **not** cover player-facing copy, UI-to-engine parameter
> passing, or consistency between the two engine copies.

That is exactly where the release failures live. Assertion #5 checks
`assassinationBonus = 50` — the engine constant — and therefore passes while
the player-facing hidden condition still says `+500`. The suite never opens the
role modal, never clicks the disguise checkbox, and never diffs the inline
`App.jsx` copy against `gameEngine.js`.

A rule-by-rule audit of the release package produced 20 checks:

| Disposition | Count | Examples |
|---|---:|---|
| Pass | 15 | Four action tables, clamp range, tide threshold, execution order, survivor ranking |
| Blocker | 2 | Nun `+500` vs `+50`; disguise checkbox not wired |
| Non-blocking | 1 | Duke `+50` cap vs `+40` at diff 10 |
| Unresolved | 1 | Regent “betrayal” wording vs implementation |
| Pending | 1 | Contract tests, copy snapshots and dual-copy diff not written |

## Test design

1. Freeze an evidence cutoff and list every source by audience: player-visible,
   engine, test evidence, release note, UI source.
2. Build a rule-by-rule matrix before reading any conclusion. For each row,
   record the copy value, the implementation value, the test evidence and the
   player-visible consequence.
3. Recompute boundary values independently. Do not trust a green assertion to
   validate the copy that the player reads.
4. Classify each mismatch by reachability and exposure:
   - player can see or operate it → blocker;
   - unreachable in the current build → pending;
   - wording ambiguity → unresolved, not silently “passed”.
5. Add the three missing contract tests:
   - disguise checked → disguise;
   - disguise unchecked → no disguise;
   - second request in the same game → no effect.
6. Add a player-copy snapshot test for every role reveal and rule line.
7. Diff the inline `App.jsx` engine against `src/gameEngine.js` in CI. A duplicated
   engine is a second source of truth until it is proven identical.

## Evidence

| Check | Result |
|---|---|
| `npm run sim` re-run on 2026-10-22 | 11/11 PASS |
| Release-package checks | 20 |
| Player-visible blockers | 2 |
| Non-blocking precision defects | 1 |
| Unresolved wording issues | 1 |
| Contract tests for the disguise checkbox | 0 |
| Copy snapshot tests | 0 |
| Dual-engine diff tests | 0 |
| Findings unsupported by the source package | 0 |

The inline UI copy is not a hypothetical: `App.jsx` contains its own
`HIDDEN_WIN_CONDITIONS.NUN` string with `+500`, and its `processTurn` auto-sets
`dukeDisguiseUsed` without reading the `useDisguise` state. The engine file and
the UI file can both be “correct” relative to their own tests and still disagree
with each other.

## Verdict

**Fail.** The engine is healthy enough for its own regression, but the release
is not. Two player-visible blockers remain open: the Nun hidden-condition copy
pays the wrong number, and the Duke disguise control does not control anything.
The Regent wording still needs a design decision, and the Duke cap needs a copy
fix.

A green regression is evidence about the layer it covers, not a release
certificate. The reusable rule is: **test the contract between layers, not only
the layer that happens to have tests.**

## Remediation

| Item | Owner | Close when |
|---|---|---|
| Nun hidden condition `+500` → `+50` (or engine to 500 with rebalance) | Gameplay/logic engineer | Role-modal screenshot shows `+50`; regression still passes |
| Wire checkbox state into `context.disguiseRequests`; engine only disguises on request | Client + gameplay engineer | Checked / unchecked / repeat-request contract tests pass |
| Clarify Regent “betrayal” or rebind the bonus | Design + gameplay engineer | Signed design note and final copy |
| Fix Duke cap copy (`diff 0 → +50`, decreasing by 1 per point) | Gameplay engineer | Copy snapshot passes |
| Add copy snapshots and dual-engine diff | QA | CI job fails on any future drift |

## Related

- [The Branch That Can Never Open](/cases/glass-garden-state-tree) — a state-tree
  audit with the opposite failure pattern: all endings reachable, one conditional
  choice unreachable.
- [Hallucination Audit: The “No Known Issues” Release](/evals/hallucination-release-claims)
  — the same evidence package examined as a claim-verification problem.
- [Prompt Boundary Test: Can a Green Regression Prove a Release?](/evals/prompt-boundary-green-tests)
  — the prompt-level guardrails that should stop “11/11 means ship”.

</div>
