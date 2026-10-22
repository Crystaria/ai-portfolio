---
layout: page
title: "路径审计：不存在的 work/ 目录"
titleTemplate: 评测 · 幻觉审计
tldr: "需求要求 loader 读取 work/*.md，但仓库里没有 work/ 目录。我们没有凭空创建一个，而是审计文件系统，把 Work 映射到既有的 projects/ URL，并把这一偏差记录为有条件通过。"
date: '2026-10-22'
capabilities:
  - 幻觉审计
  - 路径校验
  - 信息差
metrics:
  - label: 声明 glob
    value: '3'
  - label: 实际存在
    value: '2'
  - label: 映射集合
    value: '1'
  - label: 失效链接
    value: '0'
verdict: conditional
---

<script setup>
import EvalVerdict from '../../.vitepress/theme/components/EvalVerdict.vue'
</script>

<div class="section-page section-page--narrow">

<p class="section-kicker">评测报告 · 幻觉审计</p>

# 路径审计：不存在的 `work/` 目录

<div class="report-meta">
  <EvalVerdict verdict="conditional" />
  <time datetime="2026-10-22">2026 年 10 月 22 日</time>
  <span>·</span>
  <span>仓库审计</span>
</div>

## TL;DR

Phase 2 需求要求内容加载器读取 `work/*.md`、`cases/*.md` 和 `evals/*.md`。
脚手架完成后，后两个路径存在，`work/` 从来没有存在过。一个“热心”的模型可能
直接创建这个目录，但那会制造第二个真相源。这次审计先检查文件系统，再把
`Work` 映射到既有的 `projects/` 集合，并保持所有已发布 URL 不变。

## 待验证命题

> loader 可以读取 `work/*.md`。

## 方法

1. 列出项目根目录下的已跟踪文件与目录。
2. 检查 `work/`、`cases/` 和 `evals/` 是否存在。
3. 对比声明的 glob 与实际路径。
4. 检查 Work 页面目前如何发布。
5. 选择能满足意图、且不会复制内容的最小改动。

```bash
find . -maxdepth 2 -type d \
  -not -path './node_modules*' \
  -not -path './.git*' \
  -not -path './.vitepress/dist*'
```

## 发现

| 声明路径 | 存在？ | 实际路径 | 决定 |
|---|---|---|---|
| `work/*.md` | 否 | `projects/*.md` | 映射为 `kind: 'work'` |
| `cases/*.md` | 是（新建） | `cases/*.md` | 直接使用 |
| `evals/*.md` | 是（新建） | `evals/*.md` | 直接使用 |

没有隐藏的 `work/` 目录，没有符号链接，git 历史里也没有重命名记录。导航中的
`Work` 指向 `/projects/`，那里已经以两种语言提供 8 个项目详情页。

## 决定

映射由 loader 承担：

```ts
const SOURCES = [
  'projects/*.md', // 以 kind: 'work' 暴露
  'cases/*.md',
  'evals/*.md',
  // zh/ 镜像...
]
```

这样做保住了：

- 既有的 `/projects/...` URL 与外部链接；
- 每个项目页只有一份内容；
- Work、Cases、Evals 共用一套卡片 Schema。

它**没有**满足需求中字面的 `work/*.md` 路径。

## 结论

**有条件通过。** 意图——一个 loader 覆盖 work、cases、evals——已经满足，并且
没有创建幻觉目录；字面路径要求未满足。

未来可以重命名，但必须是一次显式迁移：创建 `work/`、移动文件、为
`/projects/*` 增加重定向、更新侧边栏与导航，然后删除旧目录。在 loader 里
偷偷完成这件事会破坏链接，并分裂真相源。

## 证据

| 检查项 | 结果 |
|---|---|
| 声明集合 | 3 |
| 实际存在集合 | 2 |
| 映射集合 | 1 |
| 凭空创建的目录 | 0 |
| 失效 Work 链接 | 0 |
| 重复项目页 | 0 |

## 相关

- [内容加载器契约](/zh/evals/content-loader-contract)
- [三份 themeConfig，一个真相源](/zh/cases/three-themeconfigs)

</div>
