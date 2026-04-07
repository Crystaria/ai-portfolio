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

### 📈 Skills & Downloads

<div class="skills-table-container" v-if="typeof window !== 'undefined'">
  <div class="total-stats">
    <span class="stat-label">Total Downloads:</span>
    <span class="stat-value">{{ totalDownloads.toLocaleString() }}</span>
    <span class="stat-divider">|</span>
    <span class="stat-label">Skills:</span>
    <span class="stat-value">{{ skillsList.length }}</span>
  </div>

  <table class="skills-table">
    <thead>
      <tr>
        <th>Skill</th>
        <th>Downloads</th>
        <th>Link</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="skill in skillsList" :key="skill.slug">
        <td class="skill-name">
          <span class="skill-icon">🛠️</span>
          {{ skill.name }}
        </td>
        <td class="downloads-count">{{ skill.downloads.toLocaleString() }}</td>
        <td class="skill-links">
          <a v-if="skill.clawhubUrl" :href="skill.clawhubUrl" target="_blank" class="link-btn clawhub">
            🦞 ClawHub
          </a>
          <a v-if="skill.githubUrl" :href="skill.githubUrl" target="_blank" class="link-btn github">
            📂 GitHub
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</div>

### 🚀 Quick Links

- **ClawHub Skills**: [Browse on ClawHub](https://clawhub.ai/Crystaria)
- **GitHub**: [github.com/Crystaria](https://github.com/Crystaria)

---

*Last updated: April 1, 2026*

</div>

<script setup>
import { ref, computed } from 'vue'
import downloads from './.vitepress/_data/downloads.json'

const skillsList = computed(() => {
  const skills = Object.values(downloads).filter(s => s.role === 'builder')
  return skills.sort((a, b) => b.downloads - a.downloads)
})

const totalDownloads = computed(() => {
  return skillsList.value.reduce((sum, skill) => sum + skill.downloads, 0)
})
</script>

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
}
</style>
