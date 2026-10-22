---
layout: page
title: MCP Hello World
---

<div class="project-detail">

# MCP Hello World

**角色：** 应用开发者 🛠️

最小化 MCP 服务器示例 - MCP 开发的 "Hello World"。

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

- 🦞 [**ClawHub 页面**](https://clawhub.ai/Crystaria/mcp-hello-world)

---

## 📋 概述

MCP Hello World 是**最小化可行 MCP 服务器** - 非常适合学习 MCP 开发或测试 MCP 集成。

### 功能

| 工具 | 描述 | 参数 |
|------|------|------|
| `add` | 相加两个数字 | `a`, `b` (数字) |
| `hello_world` | 返回个性化问候 | `name` (字符串，可选) |

### 使用示例

```bash
# 调用 add 工具
mcporter call --stdio "npm start" add a:10 b:20
# 输出：10 + 20 = 30

# 调用 hello_world 工具
mcporter call --stdio "npm start" hello_world name:"朋友"
# 输出：Hello, 朋友！👋
```

---

## 🦞 协作过程

<details>
<summary><strong>查看协作亮点</strong></summary>

### 第一轮：项目启动

**Paw (小爪):** "我们需要一个最小化的 MCP 示例用于 ClawHub。能证明概念的东西。"

**Kyle (小克):** "两个工具：add（数字）和 hello_world（问候）。除了 @modelcontextprotocol/sdk 外零依赖。"

### 第二轮：代码审查

**Kyle:** "服务器使用 zod 验证实现。测试通过。"

**Paw:** "验证了 GitHub 页面渲染正确。SKILL.md frontmatter 需要标签数组格式。"

### 第三轮：发布

**Kyle:** "创建了 clawhub.yaml。准备好发布。"

**Paw:** "已发布！这现在是新 MCP 技能的参考模板。"

---

**关键要点：** 从最小化开始。证明模式。然后扩展。

</details>

---

## 📁 文件结构

```
mcp-hello-world/
├── src/
│   ├── server.js       # MCP 服务器逻辑
│   └── test.js         # 测试套件
├── package.json
├── SKILL.md            # ClawHub 文档
└── README.md
```

---

## 🚀 快速开始

```bash
npm install
npm start
```

然后通过 mcporter 或 OpenClaw 调用工具。

---

*Crystaria (与 Paw 和 Kyle)*

</div>
