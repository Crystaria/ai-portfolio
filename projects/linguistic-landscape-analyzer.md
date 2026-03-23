---
layout: page
title: Linguistic Landscape Analyzer
---

<script setup>
import { ref, onMounted } from 'vue'
const stars = ref(0)

onMounted(async () => {
  try {
    const res = await fetch('https://api.github.com/repos/Crystaria/linguistic-landscape-analyzer')
    const data = await res.json()
    if (data.stargazers_count !== undefined) stars.value = data.stargazers_count
  } catch (e) {
    console.warn('Failed to fetch GitHub stars')
  }
})
</script>

<div class="project-detail">

# Linguistic Landscape Analyzer

**Role:** Toolchain Integrator 🔗

MCP tool for linguistic landscape analysis - sentiment analysis, keyword extraction, and weekly reports.

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

- 🦞 [**ClawHub Page**](https://clawhub.ai/Crystaria/linguistic-landscape-analyzer)
- 📂 [**GitHub Repository**](https://github.com/Crystaria/linguistic-landscape-analyzer)

---

## 📋 Overview

A **research-focused MCP tool** for analyzing linguistic landscapes in social media content.

### MCP Tools

| Tool | Function | Parameters |
|------|----------|------------|
| `analyze_sentiment` | Sentiment analysis | text, language (zh/en) |
| `extract_keywords` | Keyword extraction | text, limit, language |
| `list_notes` | List notes | source, limit, sortBy, order |
| `generate_weekly_report` | Weekly report generation | limit, outputDir |

### Example Usage

```bash
# Sentiment analysis
mcporter call linguistic-landscape.analyze_sentiment \
  text:"这个产品很好用" language:"zh"

# Keyword extraction
mcporter call linguistic-landscape.extract_keywords \
  text:"小红书运营数据分析" limit:5

# Generate weekly report
mcporter call linguistic-landscape.generate_weekly_report \
  limit:20
```

---

## 🦞 Collaboration Process

<details>
<summary><strong>View collaboration highlights</strong></summary>

### Round 1: Research Requirements

**Paw (小爪):** "Linguistics researchers need to analyze social media data. What tools would help?"

**Kyle (小克):** "Sentiment analysis, keyword extraction, and automated weekly reports. MCP server pattern fits perfectly."

### Round 2: Technical Decisions

**Kyle:** "Using simple dictionary-based sentiment analysis for Chinese. ~70% accuracy."

**Paw:** "Noted limitation. Researchers understand this is a starting point. Can improve with jieba later."

### Round 3: Validation

**Kyle:** "All 4 tools implemented. Tests passing."

**Paw:** "Verified on GitHub. Published to ClawHub."

---

**Key Takeaway:** Start with simple, working solutions. Iterate based on user feedback.

</details>

---

## 📁 File Structure

```
linguistic-landscape-analyzer/
├── src/
│   └── server.js       # MCP server logic
├── data/
│   └── sample.csv      # Sample data
├── reports/            # Generated reports
├── SKILL.md
├── README.md
└── package.json
```

---

## 🚀 Quick Start

```bash
npm install
npm start
```

---

## ⚠️ Limitations

- Sentiment analysis uses dictionary-based approach (~70% accuracy)
- Chinese word segmentation is simple 2-3 character splits
- Consider integrating jieba for better accuracy

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
