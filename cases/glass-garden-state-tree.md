---
layout: page
title: The Branch That Can Never Open
titleTemplate: Interaction Case · State Tree
tldr: "A 22-scene, 44-choice psychological thriller reaches all seven endings, but one conditional choice can never appear: the only item that satisfies its flag is granted in a scene with no path back to it."
date: '2026-10-22'
capabilities:
  - state-tree
  - boundary-conditions
  - graph-validation
  - information-asymmetry
metrics:
  - label: Scenes
    value: '22'
  - label: Choices
    value: '44'
  - label: Endings reached
    value: 7/7
  - label: Dead conditional choices
    value: '1'
verdict: conditional
---

<script setup>
import EvalVerdict from '../.vitepress/theme/components/EvalVerdict.vue'
</script>

<div class="section-page section-page--narrow">

<p class="section-kicker">Interaction case · State-tree audit</p>

# The Branch That Can Never Open

<div class="report-meta">
  <EvalVerdict verdict="conditional" />
  <time datetime="2026-10-22">22 Oct 2026</time>
  <span>·</span>
  <span>《玻璃花园》 · React + Zustand</span>
</div>

## TL;DR

《玻璃花园》 looks like a conventional branching visual novel: 22 scenes,
44 choices, 9 of them conditional, and 7 endings. A static graph check found no
dangling targets and no orphan scenes. A state-space search found that all seven
endings are reachable, but one conditional choice is not. The only scene that
grants the black-gold comb is `scene_2_05N`; the choice that requires the comb
lives in `scene_2_03A`, and there is no path from the grant scene back to it.
The story still completes. The branch is simply invisible — the most expensive
kind of content bug, because no player can report it.

## Context

The source package contains Ren'Py-style scripts (`label`, `jump`, `menu`) under
`scripts_src/`, and a runtime story graph under `src/data/story.js`. The runtime
is React + Zustand rather than Ren'Py itself, but the shape is the same: a scene
map, choices with optional conditions, and effects that mutate persistent state.

The state that matters to the graph:

| State | Role in the graph |
|---|---|
| `san_value` | Gates hidden options; clamped to `[0, 100]` |
| `player_belief` | `unaware` / `amelia_lover` / `natalie_father`; unlocks identity lines |
| `identity_flag` | Derived from belief + comb, not directly selected by the player |
| `has_comb` | Grants the true-ending route; set only in `scene_2_05N` |
| `inventory` | Holds `天平宝剑`, `破损的钢斧`, `烂苹果金属罐`, `黑金双色梳` |
| `flags` | Records route choices; used for diagnostics and future conditions |

The player never sees most of these values directly. They see a line of prose, a
disabled-looking option, or no option at all. That is the information asymmetry:
the graph knows why a branch is missing; the player only knows that it is.

## The graph, measured

I ran two checks against the story data:

1. **Static graph lint** — every `next` target exists; no scene is unreachable
   from `scene_1_01` when conditions are ignored.
2. **State-space search** — apply choice effects, then the destination scene's
   `onEnter` effects, and explore every state reachable under the actual
   conditions. This is the same order used by the store's `selectChoice`.

| Metric | Result |
|---|---:|
| Scenes | 22 |
| Choices | 44 |
| Conditional choices | 9 |
| Endings | 7 |
| Dangling `next` targets | 0 |
| Orphan scenes | 0 |
| Unique states explored | 168 |
| Transitions explored | 179 |
| Endings reached | 7/7 |
| Non-restart choices reached | 36/37 |
| Dead conditional choices | 1 |

The one dead choice is `scene_2_03A:use_comb_confrontation`:

```js
// story.js — the only grant of has_comb
scene_2_05N: {
  onEnter: {
    set: { san_value: 50, truth_key: true, has_comb: true },
    addItems: ['黑金双色梳'],
  },
  // ...
}

// story.js — the choice that asks for it
scene_2_03A: {
  choices: [
    {
      id: 'use_comb_confrontation',
      condition: (state) => state.has_comb,
      next: 'scene_3_00_TE',
    },
  ],
}
```

`scene_2_03A` is reached from `scene_2_02A` (the sword route). `scene_2_05N`
is reached from the altar, the safe-room exit or the gold-portrait branch — and
its outgoing edges go to `scene_3_00_TE` or `scene_hiddenB → scene_2_04A1`.
There is no edge back to `scene_2_03A`. The condition is valid JavaScript, the
target exists, and the choice is still unreachable.

## Boundary constraints

The interesting conditions are not the obvious `has_item` checks. They are the
ones whose truth value is created by an earlier choice, often one scene before
the player sees the consequence.

| Gate | Condition | Reachable values at the gate | Status |
|---|---|---|---|
| Gold portrait | `san_value < 100` | `1_02A`: 95 only | Latent — always true on the only route |
| Believe Amelia | `san_value > 60` | `2_03A`: 93–95 | Latent — always true in the current graph |
| Hidden ending | `san_value <= 40 && inventory.includes('天平宝剑')` | `2_04A1`: 30–90 | Active — depends on prior SAN loss |
| True-ending comb | `has_comb` | `2_03A`: never true; `2_04A1`: true on comb routes | Dead at `2_03A`, active at `2_04A1` |

The SAN gates are instructive. `san_value < 100` and `san_value > 60` look like
dynamic difficulty checks, but the only reachable values at their gates are 95
and 93–95. They are latent conditions: correct code that never changes the
visible route in the current graph. The hidden ending is genuinely active: the
mirror subtracts 55, so starting from 100 gives 45, while a prior 5-point loss
gives 40 and opens the option. The comb gate is the opposite: it is true in
`2_04A1`, but false at `2_03A`, where it is also evaluated.

This is where a state-tree test earns its keep. Testing each condition in
isolation proves that the predicate works. It does not prove that the predicate
is ever evaluated in a state where it can be true — or that it can ever be
false. The dead comb choice is exactly that gap: `state.has_comb` can be true,
just never at that scene.

## Logic-consistency tests

1. **Reference integrity** — every choice target resolves to a scene; no
   `MISSING_SCENE` fallback is reachable in normal play.
2. **Reachability** — BFS from the start, ignoring conditions, catches orphan
   scenes and typo edges.
3. **State reachability** — BFS over `(scene, san, inventory, has_comb, belief,
   flags)` catches conditions that are structurally valid but semantically dead.
4. **Ending coverage** — assert that every ending scene is reached at least once,
   and that no non-ending scene is a dead end.
5. **Effect order** — apply choice effects before `onEnter`, matching the store.
   Reversing the order changes which gates are visible at the destination.
6. **Clamp behaviour** — SAN stays inside `[0, 100]`; inventory is deduplicated;
   flags merge rather than replace.
7. **Player/debug separation** — dev-mode metadata is not rendered until the
   storybook icon is triple-clicked; the graph audit must not depend on it.

## Evidence

| Check | Result |
|---|---|
| Non-restart targets resolved | 37/37 |
| Dangling targets | 0 |
| Orphan scenes | 0 |
| Endings reached | 7/7 |
| Non-restart choices reached | 36/37 |
| Dead conditional choices | 1 (`scene_2_03A:use_comb_confrontation`) |
| Dead ends without an ending | 0 |
| Unique states explored | 168 |
| Transitions explored | 179 |

The fix is small, but the choice of fix is a design decision:

- remove the dead choice if it is leftover content; or
- add a route from `scene_2_05N` back to `scene_2_03A` if the confrontation was
  meant to be replayable with the comb; or
- move the choice to `scene_2_04A1`, where the comb is actually available.

## Verdict

**Conditional.** The playable story is coherent: all seven endings are reachable,
no scene dead-ends, and no link is broken. One conditional choice can never be
seen. That is not a release blocker for the narrative, but it is a real content
defect and a warning sign for future branches: a graph can be structurally valid
and still contain options that no state can open.

The reusable rule: **test reachability in state space, not only in the scene
map.** A `condition` that compiles is not the same as a branch that can fire.

## Related

- [When the Rulebook and the Engine Disagree](/cases/sins-pendulum-rule-asymmetry)
  — the opposite failure: a branch that fires, but pays a number the player was
  never shown.
- [Prompt Boundary Test: Can a Green Regression Prove a Release?](/evals/prompt-boundary-green-tests)
  — why “all tests pass” needs a reachability argument.
- [Content Loader Contract](/evals/content-loader-contract) — the same
  “validate the shape, then validate the meaning” pattern applied to cards.

</div>
