---
layout: page
title: Three themeConfigs, One Source of Truth
titleTemplate: Interaction Case · Locale Merge
tldr: "A multi-turn refactor exposed an information gap: the AI assumed the root locale inherited shared theme options, but VitePress resolves nav and sidebar per locale. Three config copies were consolidated without changing a rendered page."
date: '2026-10-22'
capabilities:
  - multi-turn
  - information-gap
  - i18n
metrics:
  - label: Config blocks
    value: 3 → 2
  - label: Pages verified
    value: '21'
  - label: Locale regressions
    value: '0'
verdict: pass
featured: true
---

<script setup>
import EvalVerdict from '../.vitepress/theme/components/EvalVerdict.vue'
</script>

<div class="section-page section-page--narrow">

<p class="section-kicker">Interaction case · Phase 1 refactor</p>

# Three themeConfigs, One Source of Truth

<div class="report-meta">
  <EvalVerdict verdict="pass" />
  <time datetime="2026-10-22">22 Oct 2026</time>
  <span>·</span>
  <span>VitePress 1.6.4</span>
</div>

## TL;DR

The site carried the same navigation in three places: the top-level
`themeConfig`, the `root` locale and the `zh` locale. The AI partner assumed
the root locale would inherit the top-level defaults, so editing the shared
block would update English pages. It did not: the root locale had its own copy,
which shadowed the defaults. The fix was not "copy the values again" but
"remove the duplicate and make the merge order explicit".

## Context

Phase 1 consolidated scattered configuration in a bilingual VitePress site.
The relevant shape before the change was:

```js
themeConfig: {
  logo, socialLinks, footer, editLink,
  nav: [...], sidebar: {...}          // English defaults
},
locales: {
  root: { themeConfig: { nav, sidebar } }, // duplicate of the defaults
  zh:    { themeConfig: { nav, sidebar, editLink } }
}
```

VitePress resolves a page's theme config as a shallow merge:

```js
themeConfig: {
  ...siteData.themeConfig,
  ...siteData.locales[localeIndex]?.themeConfig
}
```

That behaviour is correct, but it means a locale block is not "only overrides"
unless it is written that way. The root block was a full copy, so the top-level
block was dead weight for English pages.

## The information gap

| Assumption | Actual behaviour | Consequence |
|---|---|---|
| Root inherits top-level nav | Root has its own nav and wins the merge | Edits to the shared block never reach `/` |
| One source of truth exists | Three copies can drift independently | Silent EN/ZH divergence |
| Removing the root block is safe | Only if English defaults live at the top level | Requires moving the defaults first |

This is the kind of gap that does not produce an error message. Both copies
were valid; the site simply ignored one of them.

## Test design

1. Move the English nav and sidebar to the top-level `themeConfig`.
2. Delete the `root.themeConfig` block entirely.
3. Keep only true overrides in `zh.themeConfig` (`nav`, `sidebar`, `editLink`).
4. Build and inspect rendered navigation and sidebar on four routes:
   `/`, `/projects/`, `/zh/`, `/zh/projects/`.
5. Confirm shared chrome (logo, footer, social link) still renders on both locales.

## Evidence

| Check | Result |
|---|---|
| Production build | Passed, 21 HTML pages |
| English nav | `Home` / `Projects` |
| Chinese nav | `首页` / `项目` |
| English sidebar | `Projects by Role` / `Individual Projects` |
| Chinese sidebar | `按角色分类` / `个人项目` |
| Logo, footer, social link | Present on both locales |
| Locale regressions | 0 |

## Verdict

**Pass.** The consolidation removed a shadowing block instead of adding a
fourth copy, and every rendered locale route was checked after the build.

The reusable rule: a locale `themeConfig` should contain only the keys that
actually differ. Everything else belongs in the shared default, and the merge
order should be documented next to it.

## Next boundary to test

The next risk is not configuration but content: a single loader now feeds
multiple card surfaces. That contract is covered in
[the content loader evaluation](/evals/content-loader-contract).

</div>
