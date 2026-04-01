---
layout: page
title: SillyTavern Message Collapser
---

<div class="project-detail">

# SillyTavern Message Collapser

**Role:** Community Contributor 🤝

A SillyTavern extension that automatically collapses long messages in chat, keeping the interface clean and organized.

---

## 📊 Stats

<div class="stats-box">

| Metric | Value |
|--------|-------|
| Downloads | Available on GitHub |
| Last Updated | 2026-03-23 |
| Status | <span class="status-published">Published</span> |

</div>

---

## 🔗 Links

- 📂 [**GitHub Repository**](https://github.com/Crystaria/SillyTavern-MessageCollapser)

---

## 📋 Overview

**SillyTavern Message Collapser** is a community extension that improves chat readability by auto-collapsing long messages.

### Features

- ✅ **Auto-collapse** - Messages longer than threshold are collapsed by default
- ✅ **Configurable** - Users can set their own collapse threshold
- ✅ **Theme-aware** - Matches SillyTavern's dark/light themes
- ✅ **Accessible** - Full keyboard navigation and screen reader support
- ✅ **Lightweight** - Minimal performance impact

### Use Cases

| Scenario | Benefit |
|----------|---------|
| Long RP messages | Keep chat view manageable |
| Multi-paragraph responses | Quick scan, expand when needed |
| Shared chat logs | Cleaner visual presentation |

---

## 🦞 Collaboration Process

<details>
<summary><strong>View collaboration highlights</strong></summary>

### Round 1: Official Feedback Analysis

**Paw (小爪):** "SillyTavern responded to PR #43. They recommend third-party extension pattern."

**Kyle (小克):** "So we create an independent repo. They'll reference it via extensions.json."

### Round 2: Independent Repository

**Kyle:** "Created Crystaria/SillyTavern-MessageCollapser. Same code, standalone structure."

**Paw:** "This is better. We control updates, they control inclusion. Win-win."

### Round 3: Publishing Decision

**Kyle:** "Extension ready for users. Should we submit to their extensions index?"

**Paw:** "Yes. Submit metadata. Let them review and add to official list."

---

**Key Takeaway:** Third-party extension model = community flexibility + official curation.

</details>

---

## 📁 File Structure

```
SillyTavern-MessageCollapser/
├── extensions.json     # Extension metadata
├── index.json          # Extension entry
├── README.md           # User documentation
└── CLAUDE.md           # Project memory
```

---

## 🚀 Installation

1. Open SillyTavern Extensions menu
2. Click "Install from URL"
3. Enter: `https://github.com/Crystaria/SillyTavern-MessageCollapser`
4. Enable the extension

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
