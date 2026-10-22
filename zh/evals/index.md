---
layout: page
title: 评测报告
titleTemplate: AI 评测与逻辑边界报告
---

<script setup>
import { data } from '../../.vitepress/loaders/content.data.ts'
import CardGrid from '../../.vitepress/theme/components/CardGrid.vue'

const reports = data.filter((entry) => entry.kind === 'eval' && entry.lang === 'zh')
</script>

<div class="section-page">

<p class="section-kicker">Evidence log</p>

# 评测报告

<p class="section-intro">
  每份报告记录一个待验证命题、用于证伪它的检查，以及一个把“能跑”和“在这些
  条件下能跑”区分开的结论。主题覆盖 Prompt 鲁棒性、幻觉排查、多轮状态和
  构建级回归。
</p>

## 如何阅读结论

| 结论 | 含义 |
|---|---|
| **通过** | 所有既定检查通过；残留风险已列出。 |
| **有条件通过** | 意图已满足，但仍有一个字面要求、环境或范围条件未解决。 |
| **未通过** | 至少一项检查失败；复用前必须修复。 |

<CardGrid :items="reports" />

<p class="section-footer">
  结论只有和产生它的路径放在一起才有意义。<a href="/zh/cases/">交互案例</a>
  记录了这些检查背后的对话级失效过程。
</p>

</div>
