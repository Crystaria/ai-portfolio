---
layout: page
title: 内容加载器契约
titleTemplate: 评测 · 内容管线
tldr: "一个 loader 同时供给 Work、交互案例和评测报告。契约测试在卡片进入页面之前检查 Schema 形状、结论枚举、URL 唯一性，以及索引页/模板泄漏。"
date: '2026-10-22'
capabilities:
  - 内容管线
  - Schema 校验
  - 防幻觉
metrics:
  - label: 集合
    value: '3'
  - label: Schema 错误
    value: '0'
  - label: 重复 URL
    value: '0'
  - label: 索引泄漏
    value: '0'
verdict: pass
featured: true
---

<script setup>
import EvalVerdict from '../../.vitepress/theme/components/EvalVerdict.vue'
</script>

<div class="section-page section-page--narrow">

<p class="section-kicker">评测报告 · 内容管线</p>

# 内容加载器契约

<div class="report-meta">
  <EvalVerdict verdict="pass" />
  <time datetime="2026-10-22">2026 年 10 月 22 日</time>
  <span>·</span>
  <span>VitePress 1.6.4</span>
</div>

## TL;DR

现在由一个 `createContentLoader` 读取三个集合，输出统一的卡片数据形状。契约
是刻意严格的：目录索引、模板与草稿会被排除，结论值必须落在枚举内，每个 URL
必须唯一。一条格式错误的数据应该被转成 `null` 后消失，而不是渲染成坏卡片。

## 待验证命题

> 所有由 `<CardGrid>` 渲染的卡片都来自同一个 loader，并且每一条到达客户端的
> frontmatter 记录都满足同一套 Schema。

## Schema

| 字段 | 规则 | 失效表现 |
|---|---|---|
| `url` | 非空、唯一、不以 `/` 结尾 | 重复 key、索引页被当成卡片 |
| `kind` | 从路径推导：`work` / `case` / `eval` | 徽章错误、索引筛选错误 |
| `lang` | 从 `/zh/` 前缀推导 | 英文卡片泄漏到中文页 |
| `title` | 非空字符串 | 卡片标题空白 |
| `tldr` | 可选字符串 | 摘要缺失 |
| `capabilities` | 可选字符串列表 | 标签列表塌陷 |
| `metrics` | 可选 `{ label, value }` 列表 | 指标行渲染出 `undefined` |
| `verdict` | `pass` / `conditional` / `fail` | 误导性的结论徽章 |
| `date` | 可选 ISO `YYYY-MM-DD` | 非法的 `<time>` 值 |
| `draft` | 为 `true` 时排除 | 未完成内容被发布 |

## 检查

1. 读取六个 glob（`work`、`case`、`eval` × `en`、`zh`）。
2. 排除以 `/` 结尾的 URL（索引页）和 `template` slug。
3. 确认每条记录都有非空 title 和可识别的 kind。
4. 确认 `verdict` 只取三个允许值之一，或为 `null`。
5. 确认每个指标对象都同时带有 `label` 和 `value`。
6. 断言跨语言 URL 唯一。
7. 渲染两个专区索引，确认每张卡片都指向已构建页面。

## 证据

| 检查项 | 结果 |
|---|---|
| 已加载集合 | 3 |
| Schema 错误 | 0 |
| 重复 URL | 0 |
| 索引 / 模板泄漏 | 0 |
| 枚举外的结论值 | 0 |
| 失效卡片链接 | 0 |

## 结论

**通过。** loader 是卡片数据的唯一生产者，两个索引页都直接从它渲染，不需要
页面级映射代码。

残留风险：loader 只规范化 frontmatter，不验证正文。一张卡片可以在形状上
正确，却仍然包含没有证据的断言。因此每份报告都必须在正文里给出复现步骤。

## 相关

- [三份 themeConfig，一个真相源](/zh/cases/three-themeconfigs)
- [路径审计：不存在的 `work/` 目录](/zh/evals/path-audit-work-directory)

</div>
