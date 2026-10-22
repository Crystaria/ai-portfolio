---
layout: page
title: 三份 themeConfig，一个真相源
titleTemplate: 交互案例 · Locale 合并
tldr: "一次多轮重构暴露了信息差：AI 以为 root locale 会继承顶层主题配置，但 VitePress 按 locale 解析 nav 与 sidebar。三份配置最终合并，未改动任何已渲染页面。"
date: '2026-10-22'
capabilities:
  - 多轮交互
  - 信息差
  - i18n
metrics:
  - label: 配置块
    value: 3 → 2
  - label: 已验证页面
    value: '21'
  - label: Locale 回归
    value: '0'
verdict: pass
featured: true
---

<script setup>
import EvalVerdict from '../../.vitepress/theme/components/EvalVerdict.vue'
</script>

<div class="section-page section-page--narrow">

<p class="section-kicker">交互案例 · Phase 1 重构</p>

# 三份 themeConfig，一个真相源

<div class="report-meta">
  <EvalVerdict verdict="pass" />
  <time datetime="2026-10-22">2026 年 10 月 22 日</time>
  <span>·</span>
  <span>VitePress 1.6.4</span>
</div>

## TL;DR

站点把同一份导航放在三个地方：顶层 `themeConfig`、`root` locale 和 `zh`
locale。AI 伙伴默认 root locale 会继承顶层默认值，因此修改共享块就能更新
英文页面。事实并非如此：root locale 有一份自己的副本，会覆盖默认值。正确
的做法不是再复制一遍，而是删掉重复项，并把合并顺序写清楚。

## 背景

Phase 1 要收敛一个双语 VitePress 站点里分散的配置。修改前的结构大致是：

```js
themeConfig: {
  logo, socialLinks, footer, editLink,
  nav: [...], sidebar: {...}          // 英文默认值
},
locales: {
  root: { themeConfig: { nav, sidebar } }, // 与默认值重复
  zh:    { themeConfig: { nav, sidebar, editLink } }
}
```

VitePress 解析页面主题配置时做的是浅合并：

```js
themeConfig: {
  ...siteData.themeConfig,
  ...siteData.locales[localeIndex]?.themeConfig
}
```

这个行为本身没问题，但它意味着：除非 locale 块只写真正的差异，否则它就不是
“覆盖层”。root 块是一份完整副本，所以顶层块对英文页面完全无效。

## 信息差

| 假设 | 实际行为 | 后果 |
|---|---|---|
| root 会继承顶层 nav | root 有自己的 nav，并在合并中胜出 | 改共享块不会影响 `/` |
| 存在单一真相源 | 三份副本可以各自漂移 | EN/ZH 静默分叉 |
| 直接删 root 块即可 | 只有先把英文默认值放到顶层才安全 | 需要先迁移默认值 |

这类问题不会报错。两份配置都合法，站点只是安静地忽略了其中一份。

## 测试设计

1. 把英文 nav 与 sidebar 移到顶层 `themeConfig`。
2. 完全删除 `root.themeConfig`。
3. `zh.themeConfig` 只保留真正的覆盖项（`nav`、`sidebar`、`editLink`）。
4. 构建后检查四条路由的导航与侧边栏：
   `/`、`/projects/`、`/zh/`、`/zh/projects/`。
5. 确认 logo、footer、社交链接在两种语言下仍然渲染。

## 证据

| 检查项 | 结果 |
|---|---|
| 生产构建 | 通过，21 个 HTML 页面 |
| 英文导航 | `Home` / `Projects` |
| 中文导航 | `首页` / `项目` |
| 英文侧边栏 | `Projects by Role` / `Individual Projects` |
| 中文侧边栏 | `按角色分类` / `个人项目` |
| Logo、footer、社交链接 | 两种语言均存在 |
| Locale 回归 | 0 |

## 结论

**通过。** 这次合并不是增加第四份副本，而是删除了遮蔽层，并在构建后检查了
每一条 locale 路由。

可复用的规则：locale 的 `themeConfig` 只放真正不同的键；其余放进共享默认值，
并在代码旁写清合并顺序。

## 下一个边界

下一个风险不在配置，而在内容：一个 loader 现在同时供给多个卡片页面。这个
契约记录在[内容加载器评测](/zh/evals/content-loader-contract)中。

</div>
