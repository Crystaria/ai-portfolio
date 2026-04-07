---
layout: home
title: AI Portfolio - Crystaria
titleTemplate: Showcasing AI-Human Collaboration

hero:
  name: AI Portfolio
  text: Crystaria (with Paw and Kyle)
  tagline: Showcasing AI-human collaborative projects across three roles
  actions:
    - theme: brand
      text: View Projects
      link: /projects/
    - theme: alt
      text: GitHub
      link: https://github.com/Crystaria

features:
  - icon: 🛠️
    title: Application Builder
    details: Building MCP skills, AI tools, and standalone applications
    link: /projects/#builder
  - icon: 🤝
    title: Community Contributor
    details: Contributing to open-source projects like SillyTavern
    link: /projects/#contributor
  - icon: ✨
    title: Experience Optimizer
    details: Creating installers and tools for better UX
    link: /projects/#optimizer
---

<div class="portfolio-home">

## Welcome 👋

This portfolio showcases my work as a **human-AI collaborator**. Working alongside my AI partners **Paw** (小爪) and **Kyle** (小克), I've created a range of projects that demonstrate the power of thoughtful AI partnership.

### 🎯 Our Collaboration Model

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Crystaria │ ──→ │    Paw      │ ──→ │    Kyle     │
│    (Boss)   │     │ (Validator) │     │ (Builder)   │
│     👑      │     │     🦞      │     │    👨‍💻      │
└─────────────┘     └─────────────┘     └─────────────┘
   Decision           Verification        Implementation
   Communication      Web Validation      Code/Git
```

### 📊 Project Overview

<div class="project-stats">

| Role | Projects | Published | In Progress |
|------|----------|-----------|-------------|
| Application Builder | 6 | ✅ 6 | - |
| Community Contributor | 1 | ✅ 1 | - |
| Experience Optimizer | 1 | ✅ 1 | - |
| **Total** | **8** | **✅ 8** | **-** |

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

onMounted(() => {
  fetch('/_data/downloads.json')
    .then(res => res.json())
    .then(data => {
      const skills = Object.values(data).filter(s => s.role === 'builder')
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
    })
    .catch(err => {
      console.error('Failed to load skills data:', err)
      const tbody = document.getElementById('skills-tbody')
      if (tbody) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;padding:2rem;color:var(--vp-c-warning);">Failed to load data</td></tr>'
      }
    })
})
</script>

---

*Last updated: April 7, 2026*

</div>

<style>
.portfolio-home {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem;
}

.portfolio-home h2 {
  color: var(--vp-c-text);
  margin-top: 2rem;
}

.project-stats {
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: var(--vp-radius-medium);
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.project-stats table {
  width: 100%;
  border-collapse: collapse;
}

.project-stats th,
.project-stats td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-border-muted);
}

.project-stats th {
  color: var(--vp-c-text-mute);
  font-weight: 500;
}

.project-stats td:first-child {
  font-weight: 500;
}

/* Featured Achievement */
.featured-achievement {
  background: linear-gradient(135deg, rgba(88, 166, 255, 0.1) 0%, rgba(130, 80, 226, 0.1) 100%);
  border: 1px solid rgba(88, 166, 255, 0.3);
  border-radius: var(--vp-radius-medium);
  padding: 2rem;
  margin: 1.5rem 0;
}

.achievement-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.achievement-icon {
  font-size: 2rem;
}

.achievement-header h3 {
  margin: 0;
  font-size: 1.3rem;
  color: var(--vp-c-text);
}

.achievement-badge {
  background-color: rgba(63, 185, 80, 0.15);
  border: 1px solid var(--vp-c-success);
  color: var(--vp-c-success);
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 500;
}

.achievement-desc {
  color: var(--vp-c-text-mute);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.achievement-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.achievement-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  background-color: rgba(88, 166, 255, 0.1);
  border: 1px solid var(--vp-c-brand);
  border-radius: var(--vp-radius-small);
  color: var(--vp-c-brand);
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.achievement-link:hover {
  background-color: rgba(88, 166, 255, 0.2);
  text-decoration: none;
}

/* Skills Table */
.skills-table-container {
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: var(--vp-radius-medium);
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.total-stats {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-border-muted);
}

.stat-label {
  color: var(--vp-c-text-mute);
  font-size: 0.9rem;
}

.stat-value {
  color: var(--vp-c-text);
  font-weight: 600;
  font-size: 1.1rem;
}

.stat-divider {
  color: var(--vp-c-border);
  font-size: 0.9rem;
}

.skills-table {
  width: 100%;
  border-collapse: collapse;
}

.skills-table th {
  text-align: left;
  padding: 0.75rem;
  color: var(--vp-c-text-mute);
  font-weight: 500;
  border-bottom: 2px solid var(--vp-c-border);
}

.skills-table td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--vp-c-border-muted);
}

.skill-name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  color: var(--vp-c-text);
}

.skill-icon {
  font-size: 1.1rem;
}

.downloads-count {
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-brand);
  font-weight: 500;
  white-space: nowrap;
}

.skill-links {
  display: flex;
  gap: 0.5rem;
}

.link-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: var(--vp-radius-small);
  font-size: 0.8rem;
  text-decoration: none;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.link-btn.clawhub {
  background-color: rgba(255, 107, 53, 0.1);
  border-color: rgba(255, 107, 53, 0.3);
  color: #ff6b35;
}

.link-btn.clawhub:hover {
  background-color: rgba(255, 107, 53, 0.2);
  text-decoration: none;
}

.link-btn.github {
  background-color: rgba(130, 80, 226, 0.1);
  border-color: rgba(130, 80, 226, 0.3);
  color: #8250e2;
}

.link-btn.github:hover {
  background-color: rgba(130, 80, 226, 0.2);
  text-decoration: none;
}

@media (max-width: 640px) {
  .portfolio-home {
    padding: 1rem;
  }
  
  .skills-table {
    font-size: 0.85rem;
  }
  
  .skills-table th,
  .skills-table td {
    padding: 0.5rem;
  }
  
  .total-stats {
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  
  .achievement-header {
    flex-wrap: wrap;
  }
  
  .achievement-links {
    flex-direction: column;
  }
}
</style>
