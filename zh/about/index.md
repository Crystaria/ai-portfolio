---
layout: page
title: 关于
titleTemplate: Crystaria · AI 评测与逻辑边界
---

<div class="section-page section-page--narrow">

<p class="section-kicker">About</p>

# 关于

<p class="section-intro">
  在用户遇到之前，先找到 AI 系统会坏在哪里。
</p>

我是 **Crystaria**。我与两个 AI 伙伴——**Paw**（验证）和 **Kyle**（实现）
——一起发布 MCP 工具，并开展以证据为目标的评测工作，而不是只做演示。

## 我评什么

- **多轮逻辑** — 状态保持、分支完整性，以及错误回合后的恢复能力。
- **信息差** — 由一方从未说明的假设所导致的失效。
- **Prompt 鲁棒性** — 指令冲突、注入尝试与范围蔓延。
- **幻觉与工具边界** — 凭空出现的文件、路径、API 与能力。
- **构建级回归** — 国际化、路由、样式与内容管线契约。

## 结论，而不是感觉

| 结论 | 使用场景 |
|---|---|
| **通过** | 所有既定检查通过，且残留风险已写明。 |
| **有条件通过** | 意图已满足，但字面要求、环境或范围条件仍未闭合。 |
| **未通过** | 至少一项检查失败；产物尚不可复用。 |

没有测试路径的结论只是观点。每份报告都会给出命题、方法、证据与剩余风险。

## 证据

- **上游贡献：** SillyTavern Message Collapser 已合并进
  [SillyTavern-Content PR #43](https://github.com/SillyTavern/SillyTavern-Content/pull/43)。
- **已发布工作：** ClawHub 上 6 个 MCP 技能，项目页共 8 个，覆盖开发者、
  贡献者与体验优化三种角色。
- **本站：** 一个双语 VitePress 作品集，卡片、案例与报告都由同一个内容
  loader 生成。

## 我如何工作

Crystaria 负责决策与沟通，Paw 负责对照网络与仓库验证主张，Kyle 负责实现、
代码与 git。协作方式是刻意显式的：只有检查能够复现的主张才会被接受；局限
会被记录，而不是被隐藏。

## 从这里开始

- [评测报告](/zh/evals/) — 命题、检查与结论
- [交互案例](/zh/cases/) — 多轮失效与边界恢复
- [作品](/zh/projects/) — 已发布的工具与上游贡献
- [GitHub](https://github.com/Crystaria) — 源码与 issue

</div>
