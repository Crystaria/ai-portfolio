---
layout: page
title: Linguistic Landscape Analyzer
---

<script setup>
import projectsData from '../.vitepress/_data/downloads.json'

const project = projectsData['linguistic-landscape-analyzer']
const downloadsText = project.downloads || 0
</script>

<div class="project-detail">

# Linguistic Landscape Analyzer

**Role:** Application Builder 🛠️

MCP tool for linguistic landscape analysis - sentiment analysis, keyword extraction, and weekly reports.

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

- 🦞 [**ClawHub Page**](https://clawhub.ai/Crystaria/linguistic-landscape-analyzer)

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
