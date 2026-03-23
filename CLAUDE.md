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

```
ai-portfolio/
├── .vitepress/
│   ├── config.js          # VitePress 配置
│   └── theme/
│       ├── index.js       # 主题入口
│       └── custom.css     # GitHub 暗色主题样式
├── _data/
│   └── downloads.json     # 项目元数据
├── projects/
│   ├── index.md           # 项目列表页
│   ├── template.md        # 项目模板
│   └── *.md               # 各项目详情页
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

位置：`_data/downloads.json`

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

### GitHub Stars

通过前端 JavaScript 动态获取 GitHub API

---

## 🔧 配置说明

### VitePress 配置

位置：`.vitepress/config.js`

- 导航栏：Home, Projects
- 侧边栏：按角色和项目分类
- 社交链接：GitHub
- 页脚：`Crystaria (with Paw and Kyle)`

### 主题定制

位置：`.vitepress/theme/custom.css`

包含：
- GitHub 暗色主题变量
- 卡片样式
- 角色标签样式
- 折叠面板样式
- 响应式布局

---

## 📝 添加新项目

1. 在 `_data/downloads.json` 添加条目
2. 在 `projects/` 创建 `[slug].md` 文件（参考 template.md）
3. 更新首页统计数据（如需要）
4. 本地测试：`npm run dev`

---

## 🛠️ 技术栈

- **框架：** VitePress 1.6.4
- **样式：** Custom CSS (GitHub Dark Theme)
- **托管：** Vercel (auto-deploy on push)
- **数据：** Static JSON + GitHub API

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

**最后更新：** 2026-03-23
