---
layout: page
title: Social Media Monitor
---

<script setup>
import projectsData from '../.vitepress/_data/downloads.json'

const project = projectsData['social-media-monitor']
const downloadsText = project.downloads || 0
</script>

<div class="project-detail">

# Social Media Monitor

**Role:** Application Builder 🛠️

Social media sentiment analysis tool for brands and marketers - negative alerts, volume trends, and weekly reports.

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

- 🦞 [**ClawHub Page**](https://clawhub.ai/Crystaria/social-media-monitor)

---

## 📋 Overview

A **business-focused MCP tool** for monitoring social media sentiment and brand reputation.

### MCP Tools

#### Keyword Monitoring
| Tool | Function |
|------|----------|
| `add_keyword` | Add monitored keyword |
| `list_keywords` | View monitoring list |
| `monitor_keywords` | Check keyword matches |

#### Negative Alerts
| Tool | Function |
|------|----------|
| `set_alert_threshold` | Set negative threshold |
| `check_alerts` | Check for negative sentiment |

#### Volume Trends
| Tool | Function |
|------|----------|
| `get_volume_trend` | Get mention volume over time |

#### Core Functions
| Tool | Function |
|------|----------|
| `analyze_sentiment` | Sentiment analysis |
| `extract_keywords` | Keyword extraction |
| `generate_weekly_report` | Weekly summary report |

---

## 🦞 Collaboration Process

<details>
<summary><strong>View collaboration highlights</strong></summary>

### Round 1: Market Positioning

**Paw (小爪):** "This is the same code as linguistic-landscape-analyzer, but for business users. How do we differentiate?"

**Kyle (小克):** "Same engine, different positioning. Linguistic = academic/research. Social Media Monitor = business/brands."

### Round 2: Feature Set

**Kyle:** "Added keyword monitoring tools and negative alert thresholds. Business users need proactive alerts."

**Paw:** "Validated. Brand managers need to know about negative mentions immediately."

### Round 3: Publishing Decision

**Kyle:** "Should we merge the two projects or keep them separate?"

**Paw:** "Keep separate. Different audiences, different marketing. Code can diverge later."

---

**Key Takeaway:** Same technology, different products. Positioning matters.

</details>

---

## 📁 File Structure

```
social-media-monitor/
├── src/
│   └── server.js       # MCP server logic
├── data/
│   ├── sample.csv      # Sample data
│   └── config.json     # Configuration
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

### Example: Set Up Brand Monitoring

```bash
# Add brand keyword
mcporter call social-media-monitor.add_keyword \
  keyword:"MyBrand" category:"brand"

# Set negative threshold
mcporter call social-media-monitor.set_alert_threshold \
  threshold:-2

# Check for negative mentions
mcporter call social-media-monitor.check_alerts \
  source:"sample"
```

---

## ⚠️ Limitations

- Sentiment analysis uses dictionary-based approach (~70% accuracy)
- Data source is local CSV only (no real-time scraping)
- Consider commercial sentiment APIs for production use

---

*Crystaria (with Paw and Kyle)*

</div>
