---
layout: page
title: 交互案例
titleTemplate: AI 交互与边界案例
---

<script setup>
import { data } from '../../.vitepress/loaders/content.data.ts'
import CardGrid from '../../.vitepress/theme/components/CardGrid.vue'

const cases = data.filter((entry) => entry.kind === 'case' && entry.lang === 'zh')
</script>

<div class="section-page">

<p class="section-kicker">Interaction lab</p>

# 交互案例

<p class="section-intro">
  多轮对话很少在第一个回答就失败。真正的问题出现在上下文漂移、分支被静默丢弃，
  或者一方默认另一方已经掌握了某个信息的时候。这里记录这些失效点，以及让它们
  显形的检查方法。
</p>

## 这些案例在测什么

- **分支完整性** — 每条条件路径是否仍然可达、可恢复？
- **信息差** — 当人和 AI 持有不同假设时，会发生什么？
- **状态保持** — 哪些事实能在话题切换、纠正或长上下文之后留下？
- **边界恢复** — 一次错误回合之后，交互能否回到安全状态？

<CardGrid :items="cases" />

<p class="section-footer">
  想看模型层面的测试结果？请阅读
  <a href="/zh/evals/">评测报告</a>。
</p>

</div>
