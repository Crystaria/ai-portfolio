---
layout: page
title: 社交媒体监控
---

<div class="project-detail">

# 社交媒体监控

**角色：** 应用开发者 🛠️

面向品牌和营销人员的社交媒体情感分析工具 - 负面预警、音量趋势、周报生成。

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

- 🦞 [**ClawHub 页面**](https://clawhub.ai/Crystaria/social-media-monitor)

---

## 📋 概述

一个**面向商业的 MCP 工具**，用于监控社交媒体情感和品牌声誉。

### MCP 工具

#### 关键词监控
| 工具 | 功能 |
|------|------|
| `add_keyword` | 添加监控关键词 |
| `list_keywords` | 查看监控列表 |
| `monitor_keywords` | 检查关键词匹配 |

#### 负面预警
| 工具 | 功能 |
|------|------|
| `set_alert_threshold` | 设置负面阈值 |
| `check_alerts` | 检查负面情感 |

#### 音量趋势
| 工具 | 功能 |
|------|------|
| `get_volume_trend` | 获取提及音量随时间变化 |

#### 核心功能
| 工具 | 功能 |
|------|------|
| `analyze_sentiment` | 情感分析 |
| `extract_keywords` | 关键词提取 |
| `generate_weekly_report` | 周报总结 |

---

## 🦞 协作过程

<details>
<summary><strong>查看协作亮点</strong></summary>

### 第一轮：市场定位

**Paw (小爪):** "这和 linguistic-landscape-analyzer 代码一样，但面向商业用户。如何区分？"

**Kyle (小克):** "相同的引擎，不同的定位。语言景观 = 学术/研究。社交媒体监控 = 商业/品牌。"

### 第二轮：功能集

**Kyle:** "添加了关键词监控工具和负面预警阈值。商业用户需要主动预警。"

**Paw:** "已验证。品牌经理需要立即知道负面提及。"

### 第三轮：发布决策

**Kyle:** "我们应该合并这两个项目还是保持独立？"

**Paw:** "保持独立。不同的受众，不同的营销。代码可以以后分化。"

---

**关键要点：** 相同的技术，不同的产品。定位很重要。

</details>

---

## 📁 文件结构

```
social-media-monitor/
├── src/
│   └── server.js       # MCP 服务器逻辑
├── data/
│   ├── sample.csv      # 示例数据
│   └── config.json     # 配置
├── reports/            # 生成的报告
├── SKILL.md
├── README.md
└── package.json
```

---

## 🚀 快速开始

```bash
npm install
npm start
```

### 示例：设置品牌监控

```bash
# 添加品牌关键词
mcporter call social-media-monitor.add_keyword \
  keyword:"MyBrand" category:"brand"

# 设置负面阈值
mcporter call social-media-monitor.set_alert_threshold \
  threshold:-2

# 检查负面提及
mcporter call social-media-monitor.check_alerts \
  source:"sample"
```

---

## ⚠️ 局限性

- 情感分析使用基于词典的方法（约 70% 准确率）
- 数据源仅限本地 CSV（无实时爬取）
- 生产环境考虑使用商业情感 API

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
