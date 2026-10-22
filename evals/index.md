---
layout: page
title: Evaluation Reports
titleTemplate: AI Evaluation & Logic Boundary Reports
---

<script setup>
import { data } from '../.vitepress/loaders/content.data.ts'
import CardGrid from '../.vitepress/theme/components/CardGrid.vue'

const reports = data.filter((entry) => entry.kind === 'eval' && entry.lang === 'en')
</script>

<div class="section-page">

<p class="section-kicker">Evidence log</p>

# Evaluation Reports

<p class="section-intro">
  Each report records a claim, the checks used to falsify it, and a verdict
  that separates "it works" from "it works under these conditions". Reports
  cover prompt robustness, hallucination audits, multi-turn state, and
  build-level regressions.
</p>

## How to read a verdict

| Verdict | Meaning |
|---|---|
| **Pass** | Every stated check passed; residual risks are listed. |
| **Conditional** | The intent was met, but a literal requirement, environment or scope condition remains unresolved. |
| **Fail** | At least one stated check failed; remediation is required before reuse. |

<CardGrid :items="reports" />

<p class="section-footer">
  Verdicts are only useful with the path that produced them. The
  <a href="/cases/">interaction cases</a> show the dialogue-level failures
  behind these checks.
</p>

</div>
