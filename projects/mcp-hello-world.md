---
layout: page
title: MCP Hello World
---

<script setup>
const stars = 0
</script>

<div class="project-detail">

# MCP Hello World

**Role:** Toolchain Integrator 🔗

Minimal MCP server example - the "Hello World" of MCP development.

---

## 📊 Stats

<div class="stats-box">

| Metric | Value |
|--------|-------|
| Downloads | Available on ClawHub |
| GitHub Stars | {{ stars }} ⭐ |
| Last Updated | 2026-03-23 |
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
