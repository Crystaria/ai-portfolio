---
layout: page
title: "Path Audit: The Missing work/ Directory"
titleTemplate: Evaluation · Hallucination Audit
tldr: "The spec asked the loader to read work/*.md, but no work/ directory exists. Instead of inventing one, the audit mapped Work to the existing projects/ URLs and recorded the deviation as a conditional pass."
date: '2026-10-22'
capabilities:
  - hallucination-audit
  - path-validation
  - information-gap
metrics:
  - label: Declared globs
    value: '3'
  - label: Existing globs
    value: '2'
  - label: Mapped collections
    value: '1'
  - label: Broken links
    value: '0'
verdict: conditional
---

<script setup>
import EvalVerdict from '../.vitepress/theme/components/EvalVerdict.vue'
</script>

<div class="section-page section-page--narrow">

<p class="section-kicker">Evaluation report · Hallucination audit</p>

# Path Audit: The Missing `work/` Directory

<div class="report-meta">
  <EvalVerdict verdict="conditional" />
  <time datetime="2026-10-22">22 Oct 2026</time>
  <span>·</span>
  <span>Repository audit</span>
</div>

## TL;DR

The Phase 2 brief said the content loader should read `work/*.md`,
`cases/*.md` and `evals/*.md`. Two of those paths existed after scaffolding;
`work/` never did. A model that "helpfully" creates the directory would fork
the source of truth. This audit checked the filesystem first, mapped `Work` to
the existing `projects/` collection, and kept every published URL intact.

## Claim under test

> The loader can read `work/*.md`.

## Method

1. List tracked files and directories under the project root.
2. Check whether `work/`, `cases/` and `evals/` exist.
3. Compare the declared globs with the actual paths.
4. Inspect how Work URLs are published today.
5. Choose the smallest change that satisfies the intent without creating a
   second copy of the content.

```bash
find . -maxdepth 2 -type d \
  -not -path './node_modules*' \
  -not -path './.git*' \
  -not -path './.vitepress/dist*'
```

## Finding

| Declared path | Exists? | Actual path | Decision |
|---|---|---|---|
| `work/*.md` | No | `projects/*.md` | Map to `kind: 'work'` |
| `cases/*.md` | Yes (created) | `cases/*.md` | Use as-is |
| `evals/*.md` | Yes (created) | `evals/*.md` | Use as-is |

There was no hidden `work/` directory, no symlink and no previous rename in
git history. The `Work` label in the navigation refers to `/projects/`, which
already serves the eight published project pages in both languages.

## Decision

The loader owns the mapping:

```ts
const SOURCES = [
  'projects/*.md', // exposed as kind: 'work'
  'cases/*.md',
  'evals/*.md',
  // zh/ mirrors...
]
```

This keeps:

- existing `/projects/...` URLs and inbound links stable;
- one copy of every project page;
- a single card schema across Work, Cases and Evals.

It does **not** satisfy the literal `work/*.md` path from the brief.

## Verdict

**Conditional.** The intent — one loader spanning work, cases and evals — is
met, and no hallucinated directory was created. The literal path requirement is
not met.

A future rename is possible, but it must be a deliberate migration:
create `work/`, move the files, add redirects from `/projects/*`, update the
sidebar and nav, then delete the old directory. Doing that silently inside a
loader would break links and split the source of truth.

## Evidence

| Check | Result |
|---|---|
| Declared collections | 3 |
| Existing collections | 2 |
| Mapped collections | 1 |
| Invented directories | 0 |
| Broken Work links | 0 |
| Duplicate project pages | 0 |

## Related

- [Content loader contract](/evals/content-loader-contract)
- [Three themeConfigs, One Source of Truth](/cases/three-themeconfigs)

</div>
