---
layout: page
title: About
titleTemplate: Crystaria · AI Evaluation & Logic Boundaries
---

<div class="section-page section-page--narrow">

<p class="section-kicker">About</p>

# About

<p class="section-intro">
  I test where AI systems break — before users do.
</p>

I'm **Crystaria**. I work with two AI partners — **Paw** (validation) and
**Kyle** (implementation) — to ship MCP tools and run evaluation work that
produces evidence, not just demos.

## What I evaluate

- **Multi-turn logic** — state retention, branch integrity and recovery after a bad turn.
- **Information asymmetry** — failures caused by assumptions one side never stated.
- **Prompt robustness** — instruction conflicts, injection attempts and scope creep.
- **Hallucination and tool boundaries** — invented files, paths, APIs and capabilities.
- **Build-level regressions** — i18n, routing, styling and content-pipeline contracts.

## Verdicts, not vibes

| Verdict | When I use it |
|---|---|
| **Pass** | Every stated check passed and the residual risks are written down. |
| **Conditional** | The intent is met, but a literal requirement, environment or scope condition is still open. |
| **Fail** | At least one check failed; the artifact is not ready to reuse. |

A verdict without the test path is just an opinion. Every report links the
claim, the method, the evidence and the remaining risk.

## Evidence

- **Upstream contribution:** SillyTavern Message Collapser was merged into
  [SillyTavern-Content PR #43](https://github.com/SillyTavern/SillyTavern-Content/pull/43).
- **Published work:** six MCP skills on ClawHub and eight project pages in total,
  spanning builder, contributor and optimizer roles.
- **This site:** a bilingual VitePress portfolio whose cards, cases and reports
  are generated from one content loader.

## How I work

Crystaria decides and communicates. Paw verifies claims against the web and the
repository. Kyle implements and handles code and git. The collaboration is
deliberately explicit: a claim is only accepted when a check can reproduce it,
and a limitation is recorded instead of hidden.

## Start here

- [Evaluation reports](/evals/) — claims, checks and verdicts
- [Interaction cases](/cases/) — multi-turn failures and boundary recovery
- [Work](/projects/) — shipped tools and upstream contributions
- [GitHub](https://github.com/Crystaria) — source and issues

</div>
