# GitHub 暗色主题样式指南

**调研时间：** 2026-03-23  
**调研者：** 小爪 (Paw) 🦞  
**参考来源：** GitHub 实际页面 + Primer Design System

---

## 🎨 颜色变量

### 基础颜色

```css
:root {
  /* 背景色 */
  --color-canvas-default: #0d1117;        /* 主背景 */
  --color-canvas-subtle: #161b22;         /* 卡片/次级背景 */
  --color-canvas-inset: #010409;          /* 嵌入元素背景 */
  
  /* 边框色 */
  --color-border-default: #30363d;        /* 默认边框 */
  --color-border-muted: #21262d;          /* 弱化边框 */
  
  /* 文字色 */
  --color-fg-default: #c9d1d9;            /* 默认文字 */
  --color-fg-muted: #8b949e;              /* 弱化文字 */
  --color-fg-subtle: #6e7681;             /* 更弱化文字 */
  
  /* 强调色 */
  --color-accent-fg: #58a6ff;             /* 蓝色强调（链接） */
  --color-success-fg: #3fb950;            /* 绿色（成功） */
  --color-attention-fg: #d29922;          /* 黄色（警告） */
  --color-danger-fg: #f85149;             /* 红色（错误） */
  
  /* 按钮色 */
  --color-btn-primary-bg: #238636;        /* 主要按钮背景 */
  --color-btn-primary-hover: #2ea043;     /* 主要按钮悬停 */
}
```

---

## 📏 间距系统

### 间距标尺（基于 4px 网格）

```css
:root {
  --spacer-1: 4px;
  --spacer-2: 8px;
  --spacer-3: 16px;
  --spacer-4: 24px;
  --spacer-5: 32px;
  --spacer-6: 40px;
  --spacer-7: 48px;
  --spacer-8: 64px;
}
```

**使用建议：**
- 卡片内边距：`var(--spacer-4)` (24px)
- 卡片间距：`var(--spacer-5)` (32px)
- 区块间距：`var(--spacer-7)` (48px)

---

## 🔤 字体系统

### 字体家族

```css
:root {
  /* 正文字体 */
  --font-stack-default: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif;
  
  /* 等宽字体（代码） */
  --font-stack-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
}

/* 字号 */
:root {
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 20px;
  --text-xl: 24px;
  --text-2xl: 32px;
  --text-3xl: 40px;
}

/* 字重 */
:root {
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}

/* 行高 */
:root {
  --line-height-default: 1.5;
  --line-height-tight: 1.25;
}
```

---

## 🔲 圆角系统

```css
:root {
  --border-radius-small: 6px;
  --border-radius-medium: 8px;
  --border-radius-large: 12px;
  --border-radius-full: 9999px;  /* 圆形 */
}
```

**使用建议：**
- 卡片圆角：`var(--border-radius-medium)` (8px)
- 按钮圆角：`var(--border-radius-small)` (6px)
- 头像圆角：`var(--border-radius-full)` (圆形)

---

## 🃏 卡片样式

### 基础卡片

```css
.card {
  background-color: var(--color-canvas-subtle);  /* #161b22 */
  border: 1px solid var(--color-border-default); /* #30363d */
  border-radius: var(--border-radius-medium);    /* 8px */
  padding: var(--spacer-4);                      /* 24px */
  transition: all 0.2s ease;
}

.card:hover {
  border-color: var(--color-fg-muted);           /* #8b949e */
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}
```

### 卡片 Grid 布局

```css
.card-grid {
  display: grid;
  gap: var(--spacer-5);  /* 32px */
}

/* 桌面端：3 列 */
@media (min-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 平板端：2 列 */
@media (min-width: 768px) and (max-width: 1023px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 移动端：1 列 */
@media (max-width: 767px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## 🎯 角色标签样式

```css
.role-tag {
  display: inline-block;
  padding: 4px 12px;
  background-color: rgba(88, 166, 255, 0.1);  /* 蓝色透明 */
  border: 1px solid var(--color-accent-fg);   /* #58a6ff */
  border-radius: var(--border-radius-full);   /* 圆形 */
  color: var(--color-accent-fg);              /* #58a6ff */
  font-size: var(--text-xs);                  /* 12px */
  font-weight: var(--font-weight-medium);     /* 500 */
}

/* 不同角色的颜色变体 */
.role-tag.builder {
  background-color: rgba(88, 166, 255, 0.1);
  border-color: var(--color-accent-fg);
  color: var(--color-accent-fg);
}

.role-tag.integrator {
  background-color: rgba(63, 185, 80, 0.1);
  border-color: var(--color-success-fg);
  color: var(--color-success-fg);
}

.role-tag.contributor {
  background-color: rgba(210, 153, 34, 0.1);
  border-color: var(--color-attention-fg);
  color: var(--color-attention-fg);
}

.role-tag.optimizer {
  background-color: rgba(139, 92, 246, 0.1);
  border-color: #8b5cf6;
  color: #8b5cf6;
}
```

---

## 📦 折叠面板样式

```css
details {
  background-color: var(--color-canvas-inset);  /* #010409 */
  border: 1px solid var(--color-border-muted);  /* #21262d */
  border-radius: var(--border-radius-medium);   /* 8px */
  padding: var(--spacer-3);                     /* 16px */
  margin-top: var(--spacer-3);                  /* 16px */
}

summary {
  cursor: pointer;
  font-weight: var(--font-weight-medium);
  color: var(--color-fg-default);
  list-style: none;
  display: flex;
  align-items: center;
  gap: 8px;
}

summary:hover {
  color: var(--color-accent-fg);
}

summary::before {
  content: "▶";
  font-size: 10px;
  transition: transform 0.2s;
}

details[open] summary::before {
  transform: rotate(90deg);
}

details[open] summary {
  margin-bottom: var(--spacer-3);
  border-bottom: 1px solid var(--color-border-muted);
  padding-bottom: var(--spacer-3);
}
```

---

## 🌙 暗色模式切换（可选）

```css
/* 默认暗色主题 */
:root {
  /* 上述所有暗色变量 */
}

/* 亮色主题（通过类切换） */
.light-theme {
  --color-canvas-default: #ffffff;
  --color-canvas-subtle: #f6f8fa;
  --color-canvas-inset: #f0f0f0;
  --color-border-default: #d0d7de;
  --color-border-muted: #d8dee4;
  --color-fg-default: #24292f;
  --color-fg-muted: #57606a;
  --color-fg-subtle: #6e7781;
  --color-accent-fg: #0969da;
  --color-success-fg: #1a7f37;
  --color-attention-fg: #9a6700;
  --color-danger-fg: #cf222e;
  --color-btn-primary-bg: #1f883d;
  --color-btn-primary-hover: #1a7f37;
}
```

---

## 📱 响应式断点

```css
/* 移动端优先 */
:root {
  --breakpoint-sm: 544px;   /* 小手机 */
  --breakpoint-md: 768px;   /* 平板 */
  --breakpoint-lg: 1024px;  /* 桌面 */
  --breakpoint-xl: 1280px;  /* 大桌面 */
}
```

---

## 🎨 完整 CSS 变量文件

**文件位置：** `.vitepress/theme/custom.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  /* 颜色 */
  --color-canvas-default: #0d1117;
  --color-canvas-subtle: #161b22;
  --color-canvas-inset: #010409;
  --color-border-default: #30363d;
  --color-border-muted: #21262d;
  --color-fg-default: #c9d1d9;
  --color-fg-muted: #8b949e;
  --color-fg-subtle: #6e7681;
  --color-accent-fg: #58a6ff;
  --color-success-fg: #3fb950;
  --color-attention-fg: #d29922;
  --color-danger-fg: #f85149;
  --color-btn-primary-bg: #238636;
  --color-btn-primary-hover: #2ea043;
  
  /* 间距 */
  --spacer-1: 4px;
  --spacer-2: 8px;
  --spacer-3: 16px;
  --spacer-4: 24px;
  --spacer-5: 32px;
  --spacer-6: 40px;
  --spacer-7: 48px;
  --spacer-8: 64px;
  
  /* 字体 */
  --font-stack-default: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-stack-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 20px;
  --text-xl: 24px;
  --text-2xl: 32px;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --line-height-default: 1.5;
  --line-height-tight: 1.25;
  
  /* 圆角 */
  --border-radius-small: 6px;
  --border-radius-medium: 8px;
  --border-radius-large: 12px;
  --border-radius-full: 9999px;
}

/* 全局样式 */
body {
  background-color: var(--color-canvas-default);
  color: var(--color-fg-default);
  font-family: var(--font-stack-default);
  font-size: var(--text-base);
  line-height: var(--line-height-default);
}
```

---

## 📋 使用建议

### 卡片设计
- ✅ 背景：`#161b22`（次级背景）
- ✅ 边框：`#30363d`（默认边框）
- ✅ 圆角：`8px`
- ✅ 内边距：`24px`
- ✅ hover 效果：边框变亮 + 轻微上移

### 文字层次
- ✅ 标题：`#c9d1d9`（默认文字）+ 600 字重
- ✅ 描述：`#8b949e`（弱化文字）
- ✅ 标签：`#58a6ff`（蓝色强调）

### 布局
- ✅ 桌面端：3 列 Grid
- ✅ 平板端：2 列 Grid
- ✅ 移动端：1 列
- ✅ 间距：`32px`

---

**调研完成！此样式指南可直接用于 VitePress 主题定制。**
