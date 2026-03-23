---
layout: page
title: Safe Skill Advisor
---

<script setup>
const downloads = 64
</script>

<div class="project-detail">

# Safe Skill Advisor

**角色：** 应用开发者 🛠️

MCP 技能开发的安全顾问。

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

- 🦞 [**ClawHub 页面**](https://clawhub.ai/Crystaria/safe-skill-advisor)

---

## 📋 概述

Safe Skill Advisor 是一个**安全顾问工具**，在 MCP 技能开发过程中提供安全建议。

### 功能

| 工具 | 描述 |
|------|------|
| `check_security` | 检查代码安全问题 |
| `get_best_practices` | 获取安全最佳实践 |
| `analyze_permissions` | 分析权限配置 |

### 使用示例

```bash
# 检查代码安全
mcporter call safe-skill-advisor.check_security \
  code:"fs.readFileSync('config.json')"

# 获取最佳实践
mcporter call safe-skill-advisor.get_best_practices \
  category:"file_access"
```

---

## 🦞 协作过程

<details>
<summary><strong>查看协作亮点</strong></summary>

### 第一轮：安全需求

**Paw (小爪):** "MCP 技能开发中有哪些安全隐患？"

**Kyle (小克):** "文件访问、环境变量、API 密钥泄露。需要一个安全顾问工具。"

### 第二轮：设计

**Kyle:** "三个主要工具：check_security、get_best_practices、analyze_permissions。"

**Paw:** "验证了。这是开发者需要的安全网。"

### 第三轮：发布

**Kyle:** "规则库已实现。覆盖了常见的安全问题。"

**Paw:** "已发布到 ClawHub。建议新开发者优先使用。"

---

**关键要点：** 安全应该是开发流程的一部分，不是事后补救。

</details>

---

## 📁 文件结构

```
safe-skill-advisor/
├── src/
│   └── server.js       # MCP 服务器逻辑
├── rules/              # 安全规则库
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
