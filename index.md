---
layout: home
title: AI Portfolio - Crystaria
titleTemplate: AI Evaluation & Logic Boundary Testing

hero:
  name: AI Portfolio
  text: Crystaria (with Paw and Kyle)
  tagline: Evidence-driven AI evaluation, multi-turn interaction cases, and logic-boundary testing.
  actions:
    - theme: brand
      text: Read Eval Reports
      link: /evals/
    - theme: alt
      text: Interaction Cases
      link: /cases/

features:
  - icon: 🔬
    title: AI Evaluation
    details: Prompt robustness, hallucination audits and reproducible verdicts
    link: /evals/
  - icon: 🧭
    title: Interaction Cases
    details: Multi-turn branching, information gaps and state drift
    link: /cases/
  - icon: 🛠️
    title: Shipped Work
    details: "MCP skills and upstream contributions, including SillyTavern PR #43"
    link: /projects/
---

<div class="portfolio-home">

## Welcome 👋

This portfolio is an **evidence log of AI collaboration**: what we shipped, how we
tested it, and where it broke. Working alongside my AI partners **Paw** (小爪,
validator) and **Kyle** (小克, builder), I design interaction cases and evaluation
reports for multi-turn logic, information gaps and boundary failures.

Start with the evidence: [evaluation reports](/evals/) · [interaction cases](/cases/) · [shipped work](/projects/).

### 🎯 Our Collaboration Model

<div class="collaboration-flow">

**Crystaria** (Boss) 👑  
↓  
**Paw** (Validator) 🦞  
↓  
**Kyle** (Builder) 👨‍💻

</div>

<div class="collaboration-details">

| Role | Responsibility | Focus |
|------|----------------|-------|
| Crystaria | Decision, Communication | Strategy & Direction |
| Paw | Verification, Web Validation | Quality Assurance |
| Kyle | Implementation, Code/Git | Building & Execution |

</div>

### 📊 Project Overview

<div class="project-stats">

| Category | Projects | Description |
|----------|----------|-------------|
| 🚀 Independent Apps | 1 | Full-stack applications with live demos |
| 🤖 ClawHub Skills | 6 | MCP tools published on ClawHub |
| 🤝 Community Contributions | 1 | Open-source project contributions |
| ✨ Experience Optimizers | 1 | Tools and scripts for better UX |
| **Total** | **9** | |

</div>

### 🏆 Featured Project

<div class="featured-project-card">
  <div class="project-header">
    <span class="project-icon">🚀</span>
    <h3>LinguaMate Pro</h3>
    <span class="project-badge">Full-Stack</span>
  </div>
  <p class="project-desc">
    A full-stack language learning and analysis platform built with React
    and Node.js.
  </p>
  <div class="project-tech">
    <span class="tech-tag">React</span>
    <span class="tech-tag">Node.js</span>
    <span class="tech-tag">Vercel</span>
    <span class="tech-tag">Railway</span>
  </div>
  <div class="project-links">
    <a href="https://linguamate-pro.vercel.app" target="_blank" class="project-link primary">
      🔗 Live Demo
    </a>
    <a href="https://github.com/Crystaria/linguamate-pro" target="_blank" class="project-link">
      📂 GitHub
    </a>
  </div>
</div>

### 🌟 Featured Achievement

<div class="featured-achievement">
  <div class="achievement-header">
    <span class="achievement-icon">🎉</span>
    <h3>SillyTavern Message Collapser</h3>
    <span class="achievement-badge">✅ Merged</span>
  </div>
  <p class="achievement-desc">
    Your extension has been successfully merged into the official 
    <strong>SillyTavern-Content</strong> repository (PR #43), becoming part of 
    the global SillyTavern ecosystem used by thousands of users worldwide.
  </p>
  <div class="achievement-links">
    <a href="https://github.com/Crystaria/SillyTavern-MessageCollapser" target="_blank" class="achievement-link">
      📂 View Extension
    </a>
    <a href="https://github.com/SillyTavern/SillyTavern-Content/pull/43" target="_blank" class="achievement-link">
      🔗 View PR #43
    </a>
  </div>
</div>

### 📈 Skills & Downloads

<div class="skills-table-container">
  <div class="total-stats">
    <span class="stat-label">Total Downloads:</span>
    <span class="stat-value" id="total-downloads">Loading...</span>
    <span class="stat-divider">|</span>
    <span class="stat-label">Skills:</span>
    <span class="stat-value" id="skills-count">-</span>
  </div>

  <table class="skills-table">
    <thead>
      <tr>
        <th>Skill</th>
        <th>Downloads</th>
        <th>Link</th>
      </tr>
    </thead>
    <tbody id="skills-tbody">
      <tr><td colspan="3" style="text-align:center;padding:2rem;">Loading data...</td></tr>
    </tbody>
  </table>
</div>

<script setup>
import { onMounted } from 'vue'
// Single source of truth: .vitepress/_data/downloads.json (updated by the sync script)
import downloads from './.vitepress/_data/downloads.json'

// Injected by .vitepress/config.js at build time.
const buildDate = __BUILD_DATE_EN__

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
            ${skill.name}
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
      tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;padding:2rem;color:var(--vp-c-warning);">Failed to load data</td></tr>'
    }
  }
})
</script>

---

*Last updated: {{ buildDate }}*

</div>
