---
layout: page
title: Memory Boost
---

<script setup>
const downloads = 127
</script>

<div class="project-detail">

# Memory Boost

**角色：** 应用开发者 🛠️

基于文本的 AI 助手记忆系统 - 不再丢失上下文。

---

## 📊 统计

<div class="stats-box">

| 指标 | 值 |
|------|-----|
| 下载量 | {{ downloads }} |
| 最后更新 | 2026-03-23 |
| 状态 | <span class="status-published">已发布</span> |

</div>

---

## 🔗 链接

- 🦞 [**ClawHub 页面**](https://clawhub.ai/Crystaria/memory-boost)

---

## 📋 概述

Memory Boost 解决了一个根本问题：**AI 助手没有持久记忆**。每次会话都是全新的开始，重要的上下文在对话之间丢失。

### 解决方案

一个**基于文本的记忆系统**，使用简单的 markdown 文件：

```
your-workspace/
├── MEMORY.md           # 长期记忆（决策、偏好）
├── MEMORY_INDEX.md     # 快速参考（可选）
└── memory/             # 每日日志
    ├── 2026-03-23.md   # 每日会话日志
    └── project-name.md # 项目特定笔记
```

### 三层架构

| 层 | 文件 | 用途 |
|-------|------|---------|
| 1 | `MEMORY_INDEX.md` | 活跃项目的快速参考 |
| 2 | `MEMORY.md` | 长期记忆：决策、偏好、上下文 |
| 3 | `memory/*.md` | 每日日志和项目笔记 |

---

## 🦞 协作过程

<details>
<summary><strong>查看协作亮点</strong></summary>

### 第一轮：初始概念

**Paw (小爪):** "我们需要一种在 AI 会话之间持久化上下文的方法。最简单的方法是什么？"

**Kyle (小克):** "文本文件。不需要数据库，不需要配置。只是任何 AI 都可以读/写的 markdown 文件。"

### 第二轮：设计评审

**Kyle:** "提议三层架构：MEMORY.md 用于长期记忆，memory/ 用于每日日志，可选的 INDEX 用于快速参考。"

**Paw:** "已验证。这符合人类自然做笔记的方式。低摩擦，高采用率。"

### 第三轮：实施和发布

**Kyle:** "SKILL.md 已准备好发布到 ClawHub。只需要一个文件 - 没有代码，只是方法论。"

**Paw:** "已发布到 ClawHub。标签在前缀修复后显示正确。"

---

**关键要点：** 有时最好的解决方案根本不需要代码。

</details>

---

## 📁 文件结构

```
memory-boost/
└── SKILL.md   # 完整文档 (11KB)
```

---

## 🚀 快速开始

1. 在工作区创建 `MEMORY.md`
2. 创建 `memory/` 文件夹
3. 创建 `memory/YYYY-MM-DD.md`（今天的日期）
4. 开始记录！

---

*Crystaria (与 Paw 和 Kyle)*

</div>

<style scoped>
.project-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.project-detail h1 {
  color: var(--vp-c-text);
  margin-bottom: 0.5rem;
}

.stats-box {
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: var(--vp-radius-medium);
  padding: 1rem;
  margin: 1rem 0;
}

.stats-box table {
  width: 100%;
  border-collapse: collapse;
}

.stats-box th,
.stats-box td {
  padding: 0.5rem;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-border-muted);
}

.stats-box th {
  color: var(--vp-c-text-mute);
  width: 150px;
}

.status-published {
  color: var(--vp-c-success);
  font-weight: 500;
}

details {
  background-color: var(--vp-c-bg-mute);
  border: 1px solid var(--vp-c-border-muted);
  border-radius: var(--vp-radius-medium);
  padding: 1rem;
  margin: 1rem 0;
}

summary {
  cursor: pointer;
  font-weight: 500;
  color: var(--vp-c-text);
  list-style: none;
  padding: 0.5rem 0;
}

summary:hover {
  color: var(--vp-c-brand);
}

pre {
  background-color: var(--vp-c-bg-mute);
  border: 1px solid var(--vp-c-border);
  border-radius: var(--vp-radius-small);
  padding: 1rem;
  overflow-x: auto;
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
}
</style>
