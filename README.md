# AI Portfolio - Crystaria

**Showcasing AI-human collaborative projects built with Paw (小爪) and Kyle (小克).**

## 🌐 站点镜像与全球节点

| Node | Platform | Access | URL |
|------|----------|--------|-----|
| **Primary** (国内加速) | Cloudflare Pages | 国内电信/移动/联通 直连秒开 | [https://ai-portfolio-75t.pages.dev](https://ai-portfolio-75t.pages.dev) |
| **Secondary** (海外主站) | Vercel | 海外/全球 CDN 加速 | [https://ai-portfolio-beta-ten.vercel.app](https://ai-portfolio-beta-ten.vercel.app) |

---

## 🎯 About

This portfolio demonstrates my work as a **human-AI collaborator** across three distinct roles:

| Role | Description | Projects |
|------|-------------|----------|
| 🛠️ **Application Builder** | Building standalone MCP skills and tools | 6 |
| 🤝 **Community Contributor** | Contributing to open-source projects | 1 |
| ✨ **Experience Optimizer** | Creating installers for better UX | 1 |

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```text
ai-portfolio/
├── .vitepress/
│   ├── config.js          # VitePress configuration
│   ├── _data/
│   │   └── downloads.json # Download counts / project metadata (static data)
│   ├── loaders/
│   │   └── content.data.ts # Unified card loader (work / cases / evals)
│   └── theme/
│       ├── index.js       # Theme entry point
│       ├── components/    # ProjectsGrid, PortfolioCard, CardGrid, EvalVerdict
│       └── styles/        # tokens / base / cards / home / projects / evals CSS
├── cases/                 # Interaction cases + index
├── evals/                 # Evaluation reports + index
├── about/                 # About page
├── projects/              # Work detail pages + index (URLs stay on /projects/)
├── zh/                    # Chinese mirrors: about / cases / evals / projects
├── index.md               # English home page
├── package.json
└── README.md
```

---

## 🎨 Design

Uses **GitHub Dark Theme** with the following CSS variables:

```css
--vp-c-bg: #0d1117;        /* Main background */
--vp-c-bg-soft: #161b22;   /* Card background */
--vp-c-border: #30363d;    /* Border color */
--vp-c-text: #c9d1d9;      /* Primary text */
--vp-c-brand: #58a6ff;     /* Accent blue */
--vp-c-success: #3fb950;   /* Success green */
```

---

## 📊 Data Sources

| Data Type | Source | Update Method |
|-----------|--------|---------------|
| Downloads | `.vitepress/_data/downloads.json` | Static / daily sync |
| Card metadata (Work, Cases, Evals) | Markdown frontmatter via `.vitepress/loaders/content.data.ts` | Static (manual update) |
| Project detail pages | `projects/*.md` + `zh/projects/*.md` | Static (manual update) |

`content.data.ts` is the single card source for every `<CardGrid>` surface. It
reads `projects/*.md` (exposed as `kind: "work"` so existing `/projects/` URLs
stay stable), `cases/*.md`, `evals/*.md` and their `zh/` mirrors.

The existing `/projects/` role-grouped grid still uses `downloads.json` for
download counts and external links; those pages are also exposed by the loader
as `kind: "work"` for reuse on new card surfaces.

**Note:** ClawHub has no public API. Download counts are synced automatically via daily cron job.

---

## 🧪 Content model

Every case or evaluation report is a Markdown page whose frontmatter drives its
card:

```yaml
---
layout: page
title: Content Loader Contract
tldr: "One loader feeds Work, Interaction Cases and Evaluation Reports."
date: '2026-10-22'
capabilities: [content-pipeline, schema-validation]
metrics:
  - label: Schema errors
    value: '0'
verdict: pass
featured: true
---
```

| Verdict | Meaning |
|---------|---------|
| `pass` | Every stated check passed; residual risks listed. |
| `conditional` | Intent met, but a literal requirement / environment condition is open. |
| `fail` | At least one check failed; do not reuse yet. |

Index pages import the loader and filter by `kind` + `lang`:

```md
<script setup>
import { data } from '../.vitepress/loaders/content.data.ts'
import CardGrid from '../.vitepress/theme/components/CardGrid.vue'

const cases = data.filter((entry) => entry.kind === 'case' && entry.lang === 'en')
</script>

<CardGrid :items="cases" />
```

Directory indexes, `template.md` and entries with `draft: true` are excluded by
the loader and never become cards.

---

## 🛠️ Tech Stack

- **Framework:** VitePress 1.x
- **Styling:** Custom CSS (GitHub Dark Theme)
- **Hosting:** Vercel (auto-deploy on push)
- **Data:** Static JSON + Markdown frontmatter (content loader) + GitHub API

---

## 📝 Adding Content

### Work / projects

1. Add an entry to `.vitepress/_data/downloads.json`
2. Create `projects/[slug].md` using `projects/template.md`
3. Mirror the page under `zh/projects/[slug].md`
4. Update home stats if needed
5. Test locally: `npm run dev`

### Interaction cases

1. Create `cases/[slug].md` with the card frontmatter above
2. Mirror it as `zh/cases/[slug].md`
3. Link both pages from the report if they are related
4. The `/cases/` and `/zh/cases/` indexes pick them up automatically

### Evaluation reports

1. Create `evals/[slug].md` with `verdict`, `metrics` and `capabilities`
2. Mirror it as `zh/evals/[slug].md`
3. State the claim, the method, the evidence and the residual risk
4. The `/evals/` and `/zh/evals/` indexes pick them up automatically

If a page is unfinished, set `draft: true` in frontmatter. The loader will omit
it from every card grid.

---

## 🔗 Links

- **Live Site:** [TBD - Deploy URL]
- **GitHub:** [github.com/Crystaria/ai-portfolio](https://github.com/Crystaria/ai-portfolio)
- **ClawHub Skills:** [clawhub.ai/Crystaria](https://clawhub.ai/Crystaria)

---

## 👥 Team

- **Crystaria**  - Human collaborator, decision maker
- **Paw (小爪)**  - AI assistant, validator, communicator
- **Kyle (小克)**  - AI assistant, code builder

**Signature:** `Crystaria (with Paw and Kyle)`

---

## 📄 License

MIT License

---

*Last updated: October 22, 2026*
