---
layout: page
title: SillyTavern Mac Installer
---

<div class="project-detail">

# SillyTavern Mac Installer

**Role:** Experience Optimizer ✨

One-click installer for SillyTavern on macOS - making AI tools accessible to everyone.

---

## 📊 Stats

<div class="stats-box">

| Metric | Value |
|--------|-------|
| Downloads | Available on GitHub |
| Last Updated | 2026-04-01 |
| Status | <span class="status-published">Published</span> |

</div>

---

## 🔗 Links

- 📂 [**GitHub Repository**](https://github.com/Crystaria/sillytavern-mac-installer)

---

## 📋 Overview

A **one-click installer** that makes SillyTavern accessible to non-technical users on macOS.

### The Problem

SillyTavern installation requires:
- Node.js installation
- Git commands
- Terminal usage
- Configuration files

**This is a barrier for many users.**

### The Solution

A single `.app` or shell script that:
- ✅ Checks for Node.js (installs if missing)
- ✅ Clones SillyTavern repository
- ✅ Runs npm install automatically
- ✅ Creates desktop shortcut
- ✅ Provides clear error messages

---

## 🦞 Collaboration Process

<details>
<summary><strong>View collaboration highlights</strong></summary>

### Round 1: Problem Identification

**Paw (小爪):** "Users want SillyTavern but get stuck on installation. Can we make it one-click?"

**Kyle (小克):** "Yes. Shell script that automates everything. Check for Node, clone repo, npm install."

### Round 2: User Experience

**Kyle:** "Drafted installer script. What about error handling?"

**Paw:** "Clear error messages. If Node is missing, guide them to nodejs.org. Don't assume terminal knowledge."

### Round 3: Distribution

**Kyle:** "GitHub repo ready. Should we submit to SillyTavern main repo?"

**Paw:** "Not yet. Let users find it organically. If it gains traction, then propose integration."

---

**Key Takeaway:** Accessibility matters. One-click > documentation.

</details>

---

## 📁 File Structure

```
sillytavern-mac-installer/
├── install.sh          # Main installer script
├── uninstall.sh        # Uninstaller (optional)
├── README.md           # User instructions
└── CLAUDE.md           # Project memory
```

---

## 🚀 Usage

```bash
# Download and run
curl -fsSL https://raw.githubusercontent.com/Crystaria/sillytavern-mac-installer/main/install.sh | bash
```

Or download the `.app` bundle and double-click.

---

## 🎯 Target Users

- Non-technical users new to AI tools
- macOS users who want hassle-free installation
- Anyone who prefers GUI over terminal

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
