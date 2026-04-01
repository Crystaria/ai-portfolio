---
layout: page
title: 中文日报生成器
---

<div class="project-detail">

# 中文日报生成器

**角色：** 应用开发者 🛠️

面向专业人士的自动化日报/周报生成器。

---

## 📊 统计

<div class="stats-box">

| 指标 | 值 |
|------|-----|
| 最后更新 | 2026-03-23 |
| 状态 | <span class="status-published">已发布</span> |

</div>

---

## 🔗 链接

- 🦞 [**ClawHub 页面**](https://clawhub.ai/Crystaria/chinese-daily-report-generator)

---

## 📋 概述

Chinese Daily Report Generator 是一个**面向专业人士的自动化工具**，帮助生成结构化的日报和周报。

### 功能

| 工具 | 描述 |
|------|------|
| `generate_daily_report` | 生成结构化日报 |
| `generate_weekly_report` | 生成周报总结 |
| `list_tasks` | 列出任务项 |
| `add_task` | 添加任务 |

### 使用示例

```bash
# 生成日报
mcporter call chinese-daily-report.generate_daily_report \
  date:"2026-03-23"

# 生成周报
mcporter call chinese-daily-report.generate_weekly_report \
  week:"2026-W13"
```

---

## 🦞 协作过程

<details>
<summary><strong>查看协作亮点</strong></summary>

### 第一轮：需求分析

**Paw (小爪):** "专业人士需要每天写日报，很耗时。能自动化吗？"

**Kyle (小克):** "可以用 MCP 模式。读取任务列表，生成结构化报告。"

### 第二轮：设计

**Kyle:** "两个主要工具：generate_daily_report 和 generate_weekly_report。支持自定义模板。"

**Paw:** "验证了。中文报告格式符合企业需求。"

### 第三轮：发布

**Kyle:** "SKILL.md 已准备好。包含使用示例和模板说明。"

**Paw:** "已发布到 ClawHub。这是高频使用场景。"

---

**关键要点：** 自动化重复性工作，释放创造力。

</details>

---

## 📁 文件结构

```
chinese-daily-report-generator/
├── src/
│   └── server.js       # MCP 服务器逻辑
├── templates/          # 报告模板
├── SKILL.md
└── package.json
```

---

## 🚀 快速开始

```bash
npm install
npm start
```

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
