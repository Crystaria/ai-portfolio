---
layout: page
title: 没有作用域的 Scoped CSS
titleTemplate: 交互案例 · 样式边界
tldr: "把 16 份 scoped 样式块搬进全局层，只有重新限定元素选择器才安全。规则级 diff 证明了一致性：进来 108 条规则，出去 108 条，零泄漏。"
date: '2026-10-22'
capabilities:
  - CSS 架构
  - 边界控制
  - 视觉一致性
metrics:
  - label: 迁移页面
    value: '16'
  - label: 保留规则
    value: 108/108
  - label: 移除样式块
    value: '18'
  - label: 泄漏
    value: '0'
verdict: pass
---

<script setup>
import EvalVerdict from '../../.vitepress/theme/components/EvalVerdict.vue'
</script>

<div class="section-page section-page--narrow">

<p class="section-kicker">交互案例 · Phase 1 重构</p>

# 没有作用域的 Scoped CSS

<div class="report-meta">
  <EvalVerdict verdict="pass" />
  <time datetime="2026-10-22">2026 年 10 月 22 日</time>
  <span>·</span>
  <span>VitePress 1.6.4</span>
</div>

## TL;DR

16 个项目页各自带一份 70 行的 `<style scoped>`，两个首页则各有 246 行内联
CSS。最直接的做法是把它们全部粘进一个样式表，但那样会失去作用域，让
`pre`、`details`、`table` 这类选择器泄漏到全站。安全的做法是保留选择器，
把边界写进 CSS 本身。

## 背景

重复的样式块覆盖了：

- `.project-detail` 的布局与排版
- `.stats-box` 表格
- `details` / `summary` 折叠组件
- `pre` / `code` 代码块
- `.status-published` 状态徽章

Vue 的 `scoped` 属性一直在承担隔离工作。全局样式表没有这个属性，因此隔离
必须由选择器表达。

## 边界风险

| 选择器 | 若保持全局的影响范围 | 处理方式 |
|---|---|---|
| `pre` | 全站所有代码块 | `.project-detail pre` |
| `details` | 首页与未来的文档页 | `.project-detail details` |
| `summary` | 所有折叠组件 | `.project-detail summary` |
| `table` | 所有表格，包括新的评测报告 | 表格基础样式留在 `base.css` |
| `.stats-box` | 碰撞风险较低，但仍只属于一种页面 | 保留为共享原语 |

## 测试设计

1. 抽取 16 份项目样式块和 2 份首页样式块，不改写声明。
2. 按职责拆分：`tokens`、`base`、`cards`、`home`、`projects`。
3. 把元素选择器限定在 `.project-detail` 下。
4. 用 PostCSS 对比新旧规则集：
   - 旧有新无的选择器
   - 新有旧无的选择器
5. 重新构建，确认每个项目页的表格、折叠组件和代码块仍然正常。

## 证据

| 检查项 | 结果 |
|---|---|
| 迁移页面 | 16 |
| 移除内联 `<style>` 块 | 18 |
| 旧 CSS 规则 | 108 |
| 新 CSS 规则 | 108 |
| 缺失选择器 | 0 |
| 新增选择器 | 0 |
| 构建 | 通过，21 页 |

## 结论

**通过。** 一致性是在选择器层面验证的，不是靠肉眼看页面。唯一有意的行为
变化是响应式断点统一（640px → 768px），已作为残留风险记录。

残留风险：选择器级 diff 无法发现“选择器没变但声明被改”的情况。视觉抽查
覆盖了两种语言与一个样例项目页，但没有覆盖所有项目、所有视口。

## 可复用的规则

不要用“删除作用域”的方式把 scoped CSS 全局化。把作用域写进选择器，然后用
规则级 diff 证明一致性。

</div>
