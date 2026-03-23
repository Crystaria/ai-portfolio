---
layout: page
title: 语言景观分析器
---

<script setup>
const downloads = 143
</script>

<div class="project-detail">

# 语言景观 Analyzer

**角色：** 应用开发者 🛠️

语言景观分析 MCP 工具 - 情感分析、关键词提取、周报生成。

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

- 🦞 [**ClawHub 页面**](https://clawhub.ai/Crystaria/linguistic-landscape-analyzer)

---

## 📋 概述

一个**面向研究的 MCP 工具**，用于分析社交媒体内容中的语言景观。

### MCP 工具

| 工具 | 功能 | 参数 |
|------|------|------|
| `analyze_sentiment` | 情感分析 | text, language (zh/en) |
| `extract_keywords` | 关键词提取 | text, limit, language |
| `list_notes` | 列出笔记 | source, limit, sortBy, order |
| `generate_weekly_report` | 周报生成 | limit, outputDir |

### 使用示例

```bash
# 情感分析
mcporter call linguistic-landscape.analyze_sentiment \
  text:"这个产品很好用" language:"zh"

# 关键词提取
mcporter call linguistic-landscape.extract_keywords \
  text:"小红书运营数据分析" limit:5

# 生成周报
mcporter call linguistic-landscape.generate_weekly_report \
  limit:20
```

---

## 🦞 协作过程

<details>
<summary><strong>查看协作亮点</strong></summary>

### 第一轮：研究需求

**Paw (小爪):** "语言学研究需要分析社交媒体数据。什么工具会有帮助？"

**Kyle (小克):** "情感分析、关键词提取、自动周报。MCP 服务器模式非常适合。"

### 第二轮：技术决策

**Kyle:** "使用基于词典的情感分析处理中文。约 70% 准确率。"

**Paw:** "注意到局限性。研究人员理解这是起点。以后可以用 jieba 改进。"

### 第三轮：验证

**Kyle:** "所有 4 个工具已实现。测试通过。"

**Paw:** "在 GitHub 上验证。已发布到 ClawHub。"

---

**关键要点：** 从简单、可用的解决方案开始。根据用户反馈迭代。

</details>

---

## 📁 文件结构

```
linguistic-landscape-analyzer/
├── src/
│   └── server.js       # MCP 服务器逻辑
├── data/
│   └── sample.csv      # 示例数据
├── reports/            # 生成的报告
├── SKILL.md
├── README.md
└── package.json
```

---

## 🚀 快速开始

```bash
npm install
npm start
```

---

## ⚠️ 局限性

- 情感分析使用基于词典的方法（约 70% 准确率）
- 中文分词是简单的 2-3 字符分割
- 考虑集成 jieba 以获得更高准确率

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
