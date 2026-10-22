# AI Portfolio - CLAUDE.md

**位置：** `/home/admin/.openclaw/workspace/ai-portfolio/`
**创建日期：** 2026-03-23
**维护者：** 小克 (Kyle) 👨‍💻

---

## 📁 项目概述

AI Portfolio 是一个使用 VitePress 构建的静态网站，展示 Crystaria 与 AI 助手（Paw 和 Kyle）协作完成的项目。

---

## 🚀 快速启动

```bash
cd /home/admin/.openclaw/workspace/ai-portfolio

# 安装依赖
npm install

# 本地开发
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

---

## 📦 文件结构

```text
ai-portfolio/
├── .vitepress/
│   ├── config.js          # VitePress 配置
│   ├── _data/
│   │   └── downloads.json # 下载量 / 项目元数据
│   ├── loaders/
│   │   └── content.data.ts # 统一卡片加载器（work / cases / evals）
│   └── theme/
│       ├── index.js       # 主题入口
│       ├── components/    # ProjectsGrid / PortfolioCard / CardGrid / EvalVerdict
│       └── styles/        # tokens / base / cards / home / projects / evals CSS
├── cases/                 # 交互案例 + 索引
├── evals/                 # 评测报告 + 索引
├── about/                 # 关于页
├── projects/              # 作品详情 + 索引（URL 保持 /projects/）
├── zh/                    # 中文镜像：about / cases / evals / projects
├── index.md               # 首页
├── package.json
├── README.md
└── CLAUDE.md              # 本文件
```

---

## 🎨 设计规范

**主题：** GitHub Dark Theme

**主要 CSS 变量：**
```css
--vp-c-bg: #0d1117;        /* 主背景 */
--vp-c-bg-soft: #161b22;   /* 卡片背景 */
--vp-c-border: #30363d;    /* 边框 */
--vp-c-text: #c9d1d9;      /* 主文字 */
--vp-c-brand: #58a6ff;     /* 强调蓝 */
--vp-c-success: #3fb950;   /* 成功绿 */
```

---

## 📊 数据管理

### downloads.json

位置：`.vitepress/_data/downloads.json`

包含 8 个项目：
| 项目 | 角色 | 状态 |
|------|------|------|
| Memory Boost | Builder | Published |
| MCP Hello World | Builder | Published |
| Chinese Daily Report Generator | Builder | Published |
| Safe Skill Advisor | Builder | Published |
| Linguistic Landscape Analyzer | Builder | Published |
| Social Media Monitor | Builder | Published |
| SillyTavern Message Collapser | Contributor | Published |
| SillyTavern Mac Installer | Optimizer | Published |

**更新时机：** 发布新技能或数据变化时手动更新

### 内容加载器

位置：`.vitepress/loaders/content.data.ts`

`createContentLoader` 同时读取：

- `projects/*.md` → `kind: 'work'`（保持既有 `/projects/` URL）
- `cases/*.md` → `kind: 'case'`
- `evals/*.md` → `kind: 'eval'`
- 以上三者的 `zh/` 镜像

它是所有 `<CardGrid>` 卡片页面的唯一数据源。`/projects/` 现有的按角色分组网格
仍使用 `downloads.json` 提供下载量与外部链接，这些页面同时以 `kind: 'work'`
暴露给 loader，供新的卡片页面复用。

输出统一卡片结构：`url` / `kind` / `lang` / `title` / `tldr` /
`capabilities` / `metrics` / `verdict` / `date` / `featured`。

过滤规则：目录索引页、`template.md`、`draft: true` 不会成为卡片。

**卡片 frontmatter 示例：**

```yaml
title: Content Loader Contract
tldr: "One loader feeds Work, Interaction Cases and Evaluation Reports."
date: '2026-10-22'
capabilities: [content-pipeline, schema-validation]
metrics:
  - label: Schema errors
    value: '0'
verdict: pass
featured: true
```

**结论枚举：** `pass` / `conditional` / `fail`。三态徽章由
`EvalVerdict.vue` 渲染，卡片由 `PortfolioCard.vue` + `CardGrid.vue` 渲染。

### GitHub Stars

通过前端 JavaScript 动态获取 GitHub API

---

## 🔧 配置说明

### VitePress 配置

位置：`.vitepress/config.js`

- 导航栏：Work / Interaction Cases / Eval Reports / About（中文：作品 / 交互案例 / 评测报告 / 关于）
- 侧边栏：按角色和项目分类（`/projects/`）
- 社交链接：GitHub
- 页脚：`Crystaria (with Paw and Kyle)`
- 外观：`appearance: 'force-dark'`（强制暗色，无需客户端脚本）

### 主题定制

位置：`.vitepress/theme/styles/`

包含：
- `tokens.css`：GitHub 暗色主题变量（颜色 / 间距 / 字体 / 圆角）
- `base.css`：全局元素样式与 VitePress 布局覆盖
- `cards.css`：卡片、标签、按钮等共享组件样式
- `home.css`：首页专属样式
- `projects.css`：项目详情页专属样式（`/projects/*` 与 `/zh/projects/*` 共用）
- `evals.css`：专区页面、卡片网格、EvalVerdict 三态徽章样式

---

## 📝 添加内容

### 作品 / 项目

1. 在 `.vitepress/_data/downloads.json` 添加条目
2. 在 `projects/` 创建 `[slug].md` 文件（参考 `template.md`）
3. 在 `zh/projects/` 创建对应中文页
4. 更新首页统计数据（如需要）
5. 本地测试：`npm run dev`

### 交互案例

1. 在 `cases/[slug].md` 写入卡片 frontmatter 与正文
2. 在 `zh/cases/[slug].md` 创建中文镜像
3. `/cases/` 与 `/zh/cases/` 索引会自动读取，无需改页面代码

### 评测报告

1. 在 `evals/[slug].md` 写入 `verdict`、`metrics`、`capabilities`
2. 在 `zh/evals/[slug].md` 创建中文镜像
3. 正文必须包含：命题、方法、证据、残留风险
4. `/evals/` 与 `/zh/evals/` 索引会自动读取

未完成的内容设置 `draft: true`，loader 会自动从所有卡片列表中排除。

---

## 🛠️ 技术栈

- **框架：** VitePress 1.6.4
- **样式：** Custom CSS (GitHub Dark Theme)
- **托管：** Vercel (auto-deploy on push)
- **数据：** Static JSON + Markdown frontmatter（内容加载器）+ GitHub API

---

## ⚠️ 注意事项

1. **CSS 语法检查** - 确保所有括号匹配
2. **路径脱敏** - 提交前移除本地路径信息
3. **署名规范** - 统一使用 `Crystaria (with Paw and Kyle)`

---

## 🔗 相关链接

- **GitHub 仓库:** https://github.com/Crystaria/ai-portfolio
- **Vercel 部署:** [待配置]
- **ClawHub:** https://clawhub.ai/Crystaria

---

**最后更新：** 2026-10-22
