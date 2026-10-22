---
layout: page
title: Interaction Cases
titleTemplate: AI Interaction & Boundary Cases
---

<script setup>
import { data } from '../.vitepress/loaders/content.data.ts'
import CardGrid from '../.vitepress/theme/components/CardGrid.vue'

const cases = data.filter((entry) => entry.kind === 'case' && entry.lang === 'en')
</script>

<div class="section-page">

<p class="section-kicker">Interaction lab</p>

# Interaction Cases

<p class="section-intro">
  Multi-turn dialogues rarely fail at the first answer. They fail when context
  drifts, a branch is silently dropped, or one side assumes information the
  other never received. These case studies document those failure points and
  the checks that made them visible.
</p>

## What these cases test

- **Branch integrity** — does every conditional path stay reachable and recoverable?
- **Information asymmetry** — what happens when the human and the AI hold different assumptions?
- **State retention** — which facts survive a topic switch, a correction, or a long context?
- **Boundary recovery** — can the interaction return to a safe state after a bad turn?

<CardGrid :items="cases" />

<p class="section-footer">
  Looking for model-level test results instead? Read the
  <a href="/evals/">evaluation reports</a>.
</p>

</div>
