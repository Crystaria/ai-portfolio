---
layout: home
title: AI 作品集 - Crystaria
titleTemplate: AI 评测与逻辑边界测试
hero:
  name: AI 作品集
  text: Crystaria (与 Paw 和 Kyle)
  tagline: 以证据驱动的 AI 评测、多轮交互案例与逻辑边界测试。
  actions:
    - theme: brand
      text: 阅读评测报告
      link: /zh/evals/
    - theme: alt
      text: 交互案例
      link: /zh/cases/

features:
  - icon: 🔬
    title: AI 评测
    details: Prompt 鲁棒性、幻觉审计与可复现的结论
    link: /zh/evals/
  - icon: 🧭
    title: 交互案例
    details: 多轮分支、信息差与状态漂移
    link: /zh/cases/
  - icon: 🛠️
    title: 已发布作品
    details: "MCP 技能与上游贡献，包括 SillyTavern PR #43"
    link: /zh/projects/
---

<div class="portfolio-home">

## 欢迎 👋

本作品集是一份 **AI 协作的证据日志**：我们发布了什么、如何测试、又在哪里失效。
我与 AI 伙伴 **Paw**（小爪，验证者）和 **Kyle**（小克，构建者）一起，围绕多轮
逻辑、信息差与边界失效设计交互案例和评测报告。

从证据开始：[评测报告](/zh/evals/) · [交互案例](/zh/cases/) · [已发布作品](/zh/projects/)。

### 🎯 我们的协作模式

<div class="collaboration-flow">

**Crystaria** (老板) 👑  
↓  
**Paw** (验证者) 🦞  
↓  
**Kyle** (构建者) 👨‍💻

</div>

<div class="collaboration-details">

| 角色 | 职责 | 重点 |
|------|------|------|
| Crystaria | 决策、沟通 | 战略与方向 |
| Paw | 验证、Web 验证 | 质量保证 |
| Kyle | 实施、代码/Git | 构建与执行 |

</div>

### 📊 项目概览

<div class="project-stats">

| 类别 | 项目数 | 说明 |
|------|--------|------|
| 🚀 独立应用 | 1 | 全栈应用，可在线体验 |
| 🤖 ClawHub 技能 | 6 | 发布在 ClawHub 的 MCP 工具 |
| 🤝 社区贡献 | 1 | 开源项目贡献 |
| ✨ 体验优化 | 1 | 工具/脚本优化 |
| **总计** | **9** | |

</div>

### 🏆 精选项目

<div class="featured-project-card">
  <div class="project-header">
    <span class="project-icon">🚀</span>
    <h3>LinguaMate Pro</h3>
    <span class="project-badge">全栈应用</span>
  </div>
  <p class="project-desc">
    基于 React 和 Node.js 构建的全栈语言学习与分析平台。
  </p>
  <div class="project-tech">
    <span class="tech-tag">React</span>
    <span class="tech-tag">Node.js</span>
    <span class="tech-tag">Vercel</span>
    <span class="tech-tag">Railway</span>
  </div>
  <div class="project-links">
    <a href="https://linguamate-pro.vercel.app" target="_blank" class="project-link primary">
      🔗 在线体验
    </a>
    <a href="https://github.com/Crystaria/linguamate-pro" target="_blank" class="project-link">
      📂 GitHub
    </a>
  </div>
</div>

### 🌟 亮点成就

<div class="featured-achievement">
  <div class="achievement-header">
    <span class="achievement-icon">🎉</span>
    <h3>SillyTavern Message Collapser</h3>
    <span class="achievement-badge">✅ 已合并</span>
  </div>
  <p class="achievement-desc">
    你的扩展已成功合并到 <strong>SillyTavern-Content</strong> 官方仓库（PR #43），
    成为全球 SillyTavern 生态系统的一部分，供数千用户使用。
  </p>
  <div class="achievement-links">
    <a href="https://github.com/Crystaria/SillyTavern-MessageCollapser" target="_blank" class="achievement-link">
      📂 查看扩展仓库
    </a>
    <a href="https://github.com/SillyTavern/SillyTavern-Content/pull/43" target="_blank" class="achievement-link">
      🔗 查看 PR #43
    </a>
  </div>
</div>

### 📈 技能与下载量

<div class="skills-table-container">
  <div class="total-stats">
    <span class="stat-label">总下载量:</span>
    <span class="stat-value" id="total-downloads">Loading...</span>
    <span class="stat-divider">|</span>
    <span class="stat-label">技能数:</span>
    <span class="stat-value" id="skills-count">-</span>
  </div>

  <table class="skills-table">
    <thead>
      <tr>
        <th>技能</th>
        <th>下载量</th>
        <th>链接</th>
      </tr>
    </thead>
    <tbody id="skills-tbody">
      <tr><td colspan="3" style="text-align:center;padding:2rem;">加载中...</td></tr>
    </tbody>
  </table>
</div>

<script setup>
import { onMounted } from 'vue'
// 唯一数据源：.vitepress/_data/downloads.json（由同步脚本更新）
import downloads from '../.vitepress/_data/downloads.json'

onMounted(() => {
  try {
    const skills = Object.values(downloads).filter(s => s.role === 'builder')
    skills.sort((a, b) => b.downloads - a.downloads)

    // Update stats
    const total = skills.reduce((sum, s) => sum + (s.downloads || 0), 0)
    const totalEl = document.getElementById('total-downloads')
    const countEl = document.getElementById('skills-count')
    if (totalEl) totalEl.textContent = total.toLocaleString()
    if (countEl) countEl.textContent = skills.length

    // Build table
    const tbody = document.getElementById('skills-tbody')
    if (!tbody) return

    tbody.innerHTML = skills.map(skill => {
      const clawhubLink = skill.clawhubUrl
        ? `<a href="${skill.clawhubUrl}" target="_blank" class="link-btn clawhub">🦞 ClawHub</a>`
        : ''
      const githubLink = skill.githubUrl
        ? `<a href="${skill.githubUrl}" target="_blank" class="link-btn github">📂 GitHub</a>`
        : ''
      return `
        <tr>
          <td class="skill-name">
            <span class="skill-icon">🛠️</span>
            ${skill.nameZh || skill.name}
          </td>
          <td class="downloads-count">${(skill.downloads || 0).toLocaleString()}</td>
          <td class="skill-links">${clawhubLink}${githubLink}</td>
        </tr>
      `
    }).join('')
  } catch (err) {
    console.error('Failed to load skills data:', err)
    const tbody = document.getElementById('skills-tbody')
    if (tbody) {
      tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;padding:2rem;color:var(--vp-c-warning);">加载失败</td></tr>'
    }
  }
})
</script>

---

*最后更新：2026 年 4 月 7 日*

</div>
