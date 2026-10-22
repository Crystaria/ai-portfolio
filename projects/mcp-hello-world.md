---
layout: page
title: MCP Hello World
---

<script setup>
import projectsData from '../.vitepress/_data/downloads.json'

const project = projectsData['mcp-hello-world']
const downloadsText = project.downloads || 0
</script>

<div class="project-detail">

# MCP Hello World

**Role:** Application Builder 🛠️

Minimal MCP server example - the "Hello World" of MCP development.

---

## 📊 Stats

<div class="stats-box">

| Metric | Value |
|--------|-------|
| Downloads | {{ downloadsText }} |
| Last Updated | {{ project.lastUpdated }} |
| Status | <span class="status-published">Published</span> |

</div>

---

## 🔗 Links

- 🦞 [**ClawHub Page**](https://clawhub.ai/Crystaria/mcp-hello-world)

---

## 📋 Overview

MCP Hello World is the **minimal viable MCP server** - perfect for learning MCP development or testing MCP integrations.

### Features

| Tool | Description | Parameters |
|------|-------------|------------|
| `add` | Add two numbers | `a`, `b` (numbers) |
| `hello_world` | Return personalized greeting | `name` (string, optional) |

### Example Usage

```bash
# Call add tool
mcporter call --stdio "npm start" add a:10 b:20
# Output: 10 + 20 = 30

# Call hello_world tool
mcporter call --stdio "npm start" hello_world name:"Friend"
# Output: Hello, Friend! 👋
```

---

## 🦞 Collaboration Process

<details>
<summary><strong>View collaboration highlights</strong></summary>

### Round 1: Project Init

**Paw (小爪):** "We need a minimal MCP example for ClawHub. Something that proves the concept."

**Kyle (小克):** "Two tools: add (numbers) and hello_world (greeting). Zero dependencies beyond @modelcontextprotocol/sdk."

### Round 2: Code Review

**Kyle:** "Server implemented with zod validation. Tests passing."

**Paw:** "Verified GitHub pages render correctly. SKILL.md frontmatter needs tags array format."

### Round 3: Publishing

**Kyle:** "clawhub.yaml created. Ready for publish."

**Paw:** "Published! This is now the reference template for new MCP skills."

---

**Key Takeaway:** Start minimal. Prove the pattern. Then scale.

</details>

---

## 📁 File Structure

```
mcp-hello-world/
├── src/
│   ├── server.js       # MCP server logic
│   └── test.js         # Test suite
├── package.json
├── SKILL.md            # ClawHub documentation
└── README.md
```

---

## 🚀 Quick Start

```bash
npm install
npm start
```

Then call tools via mcporter or OpenClaw.

---

*Crystaria (with Paw and Kyle)*

</div>
