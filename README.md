# AI Portfolio - Crystaria

**Showcasing AI-human collaborative projects built with Paw (小爪) and Kyle (小克).**

---

## 🎯 About

This portfolio demonstrates my work as a **human-AI collaborator** across four distinct roles:

| Role | Description | Projects |
|------|-------------|----------|
| 🛠️ **Application Builder** | Building standalone MCP skills and tools | 2 |
| 🔗 **Toolchain Integrator** | Integrating MCP servers with AI workflows | 5 |
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

```
ai-portfolio/
├── .vitepress/
│   ├── config.js          # VitePress configuration
│   └── theme/
│       ├── index.js       # Theme entry point
│       └── custom.css     # GitHub Dark Theme
├── _data/
│   └── downloads.json     # Project metadata (static data)
├── projects/
│   ├── index.md           # Projects listing page
│   ├── memory-boost.md
│   ├── mcp-hello-world.md
│   ├── chinese-daily-report-generator.md
│   ├── safe-skill-advisor.md
│   ├── linguistic-landscape-analyzer.md
│   ├── social-media-monitor.md
│   ├── sillytavern-pr-43.md
│   └── sillytavern-mac-installer.md
├── index.md               # Home page
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
| Downloads | `_data/downloads.json` | Static (manual update) |
| GitHub Stars | GitHub API | Dynamic (frontend fetch) |
| Project Info | Frontmatter | Static (manual update) |

**Note:** ClawHub has no public API. Download counts are tracked manually.

---

## 🛠️ Tech Stack

- **Framework:** VitePress 1.x
- **Styling:** Custom CSS (GitHub Dark Theme)
- **Hosting:** Vercel (auto-deploy on push)
- **Data:** Static JSON + GitHub API

---

## 📝 Adding New Projects

1. Add entry to `_data/downloads.json`
2. Create `projects/[slug].md` using template
3. Update `index.md` stats if needed
4. Test locally: `npm run dev`

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

*Last updated: March 23, 2026*
