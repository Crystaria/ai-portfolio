---
layout: page
title: Scoped CSS Without the Scope
titleTemplate: Interaction Case · Style Boundaries
tldr: "Moving 16 scoped style blocks into a global layer is only safe if element selectors are re-scoped. A rule-level diff proved parity: 108 rules in, 108 rules out, zero leaks."
date: '2026-10-22'
capabilities:
  - css-architecture
  - boundary-control
  - visual-parity
metrics:
  - label: Pages migrated
    value: '16'
  - label: Rules preserved
    value: 108/108
  - label: Style blocks removed
    value: '18'
  - label: Leaks
    value: '0'
verdict: pass
---

<script setup>
import EvalVerdict from '../.vitepress/theme/components/EvalVerdict.vue'
</script>

<div class="section-page section-page--narrow">

<p class="section-kicker">Interaction case · Phase 1 refactor</p>

# Scoped CSS Without the Scope

<div class="report-meta">
  <EvalVerdict verdict="pass" />
  <time datetime="2026-10-22">22 Oct 2026</time>
  <span>·</span>
  <span>VitePress 1.6.4</span>
</div>

## TL;DR

Sixteen project pages each carried a 70-line `<style scoped>` block, and both
home pages carried 246 lines of inline CSS. The obvious move — paste everything
into one stylesheet — would have removed the scope and let selectors such as
`pre`, `details` and `table` leak across the site. The safe move was to keep the
selectors and move the boundary into the CSS itself.

## Context

The duplicated block covered:

- `.project-detail` layout and typography
- `.stats-box` tables
- `details` / `summary` disclosure widgets
- `pre` / `code` blocks
- `.status-published` badges

Vue's `scoped` attribute had been doing the isolation work. A global
stylesheet has no such attribute, so the isolation has to be expressed in the
selectors.

## The boundary risk

| Selector | Reach if left global | Mitigation |
|---|---|---|
| `pre` | Every code block on the site | `.project-detail pre` |
| `details` | Home page and future docs | `.project-detail details` |
| `summary` | Every disclosure widget | `.project-detail summary` |
| `table` | All tables, including new eval reports | Keep table styling in shared `base.css` |
| `.stats-box` | Low collision risk, but still owned by one page type | Kept as a shared primitive |

## Test design

1. Extract the 16 project blocks and the two home blocks without rewriting
   declarations.
2. Split the result by responsibility: `tokens`, `base`, `cards`, `home`,
   `projects`.
3. Scope element selectors under `.project-detail`.
4. Diff the old and new rule sets with PostCSS:
   - selectors in old but not new
   - selectors in new but not old
5. Rebuild and check that every project page still renders its tables,
   disclosures and code blocks.

## Evidence

| Check | Result |
|---|---|
| Pages migrated | 16 |
| Inline `<style>` blocks removed | 18 |
| Old CSS rules | 108 |
| New CSS rules | 108 |
| Missing selectors | 0 |
| Added selectors | 0 |
| Build | Passed, 21 pages |

## Verdict

**Pass.** Rule parity was checked at the selector level, not by eyeballing the
page. The only intentional behavioural change was a responsive breakpoint
unification (640px → 768px), recorded as a residual risk.

Residual risk: a selector-level diff cannot detect a changed declaration
inside an unchanged selector. Visual spot checks covered both locales and a
sample project page, but not every project at every viewport.

## Reusable rule

Do not "globalize" scoped CSS by deleting the scope. Move the scope into the
selector, then prove parity with a rule-level diff.

</div>
