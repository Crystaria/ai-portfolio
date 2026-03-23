---
layout: page
title: SillyTavern Mac 安装器
---

<script setup>
const stars = 8
</script>

<div class="project-detail">

# SillyTavern Mac 安装器

**角色：** 体验优化师 ✨

macOS 上一键安装 SillyTavern - 让 AI 工具对每个人都可访问。

---

## 📊 统计

<div class="stats-box">

| 指标 | 值 |
|------|-----|
| GitHub Stars | {{ stars }} ⭐ |
| 最后更新 | 2026-03-23 |
| 状态 | <span class="status-published">已发布</span> |

</div>

---

## 🔗 链接

- 📂 [**GitHub 仓库**](https://github.com/Crystaria/sillytavern-mac-installer)

---

## 📋 概述

一个**一键安装器**，让非技术用户也能在 macOS 上轻松安装 SillyTavern。

### 问题

SillyTavern 安装需要：
- 安装 Node.js
- 使用 Git 命令
- 终端操作
- 配置文件

**这对许多用户来说是障碍。**

### 解决方案

一个 `.app` 或 shell 脚本，可以：
- ✅ 检查 Node.js（缺失时安装）
- ✅ 克隆 SillyTavern 仓库
- ✅ 自动运行 npm install
- ✅ 创建桌面快捷方式
- ✅ 提供清晰的错误信息

---

## 🦞 协作过程

<details>
<summary><strong>查看协作亮点</strong></summary>

### 第一轮：问题识别

**Paw (小爪):** "很多 macOS 用户因为安装复杂而放弃使用 SillyTavern。"

**Kyle (小克):** "一键安装器可以解决这个问题。类似 Windows 的 setup.exe。"

### 第二轮：设计

**Kyle:** "脚本会检查依赖，自动安装缺失的组件。用户只需双击运行。"

**Paw:** "验证了。这才是真正的用户体验优化。"

### 第三轮：发布

**Kyle:** "安装器已测试通过。支持 Intel 和 Apple Silicon Mac。"

**Paw:** "已发布到 GitHub。这是降低门槛的关键工具。"

---

**关键要点：** 好的工具应该让技术隐形，而不是炫耀技术。

</details>

---

## 📁 文件结构

```
sillytavern-mac-installer/
├── install.sh          # 安装脚本
├── uninstall.sh        # 卸载脚本
├── README.md
└── assets/             # 图标等资源
```

---

## 🚀 快速开始

```bash
# 下载安装脚本
curl -O https://raw.githubusercontent.com/Crystaria/sillytavern-mac-installer/main/install.sh

# 运行安装
chmod +x install.sh
./install.sh
```

---

## ⚠️ 系统要求

- macOS 10.15 或更高版本
- 网络连接（用于下载依赖）
- 约 500MB 可用空间

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
