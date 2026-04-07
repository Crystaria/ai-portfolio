---
layout: home
title: AI 作品集 - Crystaria
titleTemplate: 展示我和 AI 的协作
hero:
  name: AI 作品集
  text: Crystaria (与 Paw 和 Kyle)
  tagline: 展示我和 AI 的协作项目
  actions:
    - theme: brand
      text: 查看项目
      link: /zh/projects/
    - theme: alt
      text: GitHub
      link: https://github.com/Crystaria

features:
  - icon: 🛠️
    title: 应用开发者
    details: 构建 MCP 技能、AI 工具和独立应用
    link: /zh/projects/#builder
  - icon: 🤝
    title: 社区贡献者
    details: 为 SillyTavern 等开源项目做贡献
    link: /zh/projects/#contributor
  - icon: ✨
    title: 体验优化师
    details: 创建安装程序优化工具和用户体验
    link: /zh/projects/#optimizer
---

<div class="portfolio-home">

## 欢迎 👋

本作品集展示了我作为 **AI 与人类协作者** 的工作成果。与我的 AI 合作伙伴 **Paw**（小爪）和 **Kyle**（小克）一起，我们创建了一系列展示深思熟虑的 AI 合作伙伴关系的项目。

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

| 角色 | 项目数 | 已发布 | 进行中 |
|------|--------|--------|--------|
| 应用开发者 | 6 | ✅ 6 | - |
| 社区贡献者 | 1 | ✅ 1 | - |
| 体验优化师 | 1 | ✅ 1 | - |
| **总计** | **8** | **✅ 8** | **-** |

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
              ${skill.nameZh || skill.name}
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
        tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;padding:2rem;color:var(--vp-c-warning);">加载失败</td></tr>'
      }
    })
})
</script>

---

*最后更新：2026 年 4 月 7 日*

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

@media (max-width: 768px) {
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
