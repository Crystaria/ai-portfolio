---
layout: page
title: Content Loader Contract
titleTemplate: Evaluation · Content Pipeline
tldr: "One loader feeds Work, Interaction Cases and Evaluation Reports. The contract test checks schema shape, verdict enums, URL uniqueness and index/template leakage before any card reaches a page."
date: '2026-10-22'
capabilities:
  - content-pipeline
  - schema-validation
  - hallucination-prevention
metrics:
  - label: Collections
    value: '3'
  - label: Schema errors
    value: '0'
  - label: Duplicate URLs
    value: '0'
  - label: Index leaks
    value: '0'
verdict: pass
featured: true
---

<script setup>
import EvalVerdict from '../.vitepress/theme/components/EvalVerdict.vue'
</script>

<div class="section-page section-page--narrow">

<p class="section-kicker">Evaluation report · Content pipeline</p>

# Content Loader Contract

<div class="report-meta">
  <EvalVerdict verdict="pass" />
  <time datetime="2026-10-22">22 Oct 2026</time>
  <span>·</span>
  <span>VitePress 1.6.4</span>
</div>

## TL;DR

A single `createContentLoader` now reads three collections and emits one
normalized card shape. The contract is deliberately strict: directory indexes,
templates and drafts are excluded, verdicts are enum-checked, and every URL is
unique. A malformed entry should disappear with a `null`, not render a broken
card.

## Claim under test

> Every card rendered by `<CardGrid>` comes from one loader, and every
> frontmatter record that reaches the client satisfies the same schema.

## Schema

| Field | Rule | Failure mode |
|---|---|---|
| `url` | Non-empty, unique, no trailing slash | Duplicate keys, index pages as cards |
| `kind` | Derived from path: `work` / `case` / `eval` | Wrong badge and wrong index filter |
| `lang` | Derived from `/zh/` prefix | English cards leaking into Chinese pages |
| `title` | Non-empty string | Blank card heading |
| `tldr` | Optional string | Missing summary |
| `capabilities` | Optional string list | Tag list collapse |
| `metrics` | Optional `{ label, value }` list | Metric row renders `undefined` |
| `verdict` | `pass` / `conditional` / `fail` | False authority badge |
| `date` | Optional ISO `YYYY-MM-DD` | Invalid `<time>` value |
| `draft` | `true` excludes the entry | Unfinished content published |

## Checks

1. Read all six globs (`work`, `case`, `eval` × `en`, `zh`).
2. Exclude URLs ending in `/` (index pages) and the `template` slug.
3. Verify every entry has a non-empty title and a recognized kind.
4. Verify `verdict` is one of the three allowed values or `null`.
5. Verify metric objects always carry both `label` and `value`.
6. Assert URL uniqueness across locales.
7. Render both section indexes and confirm every card links to a built page.

## Evidence

| Check | Result |
|---|---|
| Collections loaded | 3 |
| Schema errors | 0 |
| Duplicate URLs | 0 |
| Index / template leaks | 0 |
| Verdict values outside enum | 0 |
| Broken card links | 0 |

## Verdict

**Pass.** The loader is the only producer of card data, and both indexes render
from it without page-specific mapping code.

Residual risk: the loader normalizes frontmatter but does not validate prose.
A card can be truthful in shape and still make an unsupported claim. That is
why every report also carries a body with reproduction steps.

## Related

- [Three themeConfigs, One Source of Truth](/cases/three-themeconfigs)
- [Path audit: the missing `work/` directory](/evals/path-audit-work-directory)

</div>
