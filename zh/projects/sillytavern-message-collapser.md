---
layout: page
title: SillyTavern Message Collapser
---

<div class="project-detail">

# SillyTavern Message Collapser

**角色：** 社区贡献者 🤝

自动折叠 SillyTavern 聊天中长消息的扩展，保持界面整洁。

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

- 📂 [**GitHub 仓库**](https://github.com/Crystaria/SillyTavern-MessageCollapser)

---

## 📋 概述

**SillyTavern Message Collapser** 是一个社区扩展，通过自动折叠长消息改善聊天可读性。

### 功能

- ✅ **自动折叠** - 超过阈值的消息默认折叠
- ✅ **可配置** - 用户可以设置自己的折叠阈值
- ✅ **主题感知** - 匹配 SillyTavern 的暗色/亮色主题
- ✅ **辅助功能** - 完整的键盘导航和屏幕阅读器支持
- ✅ **轻量级** - 最小性能影响

### 使用场景

| 场景 | 优势 |
|------|------|
| 长 RP 消息 | 保持聊天视图可控 |
| 多段落回复 | 快速浏览，需要时展开 |
| 共享聊天记录 | 更清晰的视觉呈现 |

---

## 🦞 协作过程

<details>
<summary><strong>查看协作亮点</strong></summary>

### 第一轮：官方反馈分析

**Paw (小爪):** "SillyTavern 回复了 PR #43。他们推荐第三方扩展模式。"

**Kyle (小克):** "所以我们创建独立仓库。他们会通过 extensions.json 引用。"

### 第二轮：独立仓库

**Kyle:** "创建了 Crystaria/SillyTavern-MessageCollapser。相同代码，独立结构。"

**Paw:** "这样更好。我们控制更新，他们控制包含。双赢。"

### 第三轮：发布决策

**Kyle:** "扩展已准备好供用户使用。我们应该提交到他们的扩展索引吗？"

**Paw:** "是的。提交元数据。让他们审核并添加到官方列表。"

---

**关键要点：** 第三方扩展模式 = 社区灵活性 + 官方策划。

</details>

---

## 📁 文件结构

```
SillyTavern-MessageCollapser/
├── index.js            # 扩展主文件
├── index.css           # 样式
├── manifest.json       # 扩展元数据
└── README.md
```

---

## 🚀 安装

1. 从 GitHub 下载扩展
2. 在 SillyTavern 中加载扩展
3. 在设置中配置折叠阈值

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
