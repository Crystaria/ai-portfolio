---
layout: page
title: Safe Skill Advisor
---

<script setup>
import projectsData from '../.vitepress/_data/downloads.json'

const project = projectsData['safe-skill-advisor']
const downloadsText = project.downloads || 0
</script>

<div class="project-detail">

# Safe Skill Advisor

**Role:** Application Builder 🛠️

Safety advisor for MCP skill development - security best practices for AI assistants.

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

- 🦞 [**ClawHub Page**](https://clawhub.ai/Crystaria/safe-skill-advisor)

---

## 📋 Overview

A **security-first advisor** that helps AI assistants and developers build safe MCP skills.

### What It Does

- 🔒 **Permission guidance** - When to ask for user confirmation
- 🚫 **Dangerous operation detection** - Identify risky commands before execution
- ✅ **Safe pattern recommendations** - Best practices for common operations
- 📋 **Checklist generation** - Pre-flight checks for actions

### Risk Categories

| Category | Examples | Handling |
|----------|----------|----------|
| 🔴 High | `rm -rf`, `git push --force` | Always confirm |
| 🟡 Medium | File overwrites, npm install | Confirm first time |
| 🟢 Low | Read operations, ls, cat | Auto-allow |

---

## 🦞 Collaboration Process

<details>
<summary><strong>View collaboration highlights</strong></summary>

### Round 1: Security Audit

**Paw (小爪):** "We need a way to prevent AI assistants from making dangerous changes without confirmation."

**Kyle (小克):** "Categorize operations by risk level. High-risk requires explicit user approval."

### Round 2: Pattern Definition

**Kyle:** "Defined risk categories: High (destructive), Medium (overwrites), Low (reads)."

**Paw:** "Validated against real scenarios. The categories match user expectations."

### Round 3: Integration

**Kyle:** "SKILL.md complete with decision tree for risk assessment."

**Paw:** "Published. This should be required reading for all AI assistants."

---

**Key Takeaway:** Security isn't optional. Build it in from day one.

</details>

---

## 📁 File Structure

```
safe-skill-advisor/
└── SKILL.md   # Complete documentation
```

---

## 🚀 Usage

Before any action, the AI consultant should:

1. **Categorize the risk level**
2. **Check if confirmation is needed**
3. **Provide clear consequences**
4. **Wait for explicit approval (if high-risk)**

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
