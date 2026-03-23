---
layout: page
title: Projects
titleTemplate: All Projects
---

<script setup>
import { ref, onMounted } from 'vue'
import projectsData from '../_data/downloads.json'

const roles = {
  builder: { label: 'Application Builder', icon: '🛠️', anchor: 'builder' },
  contributor: { label: 'Community Contributor', icon: '🤝', anchor: 'contributor' },
  optimizer: { label: 'Experience Optimizer', icon: '✨', anchor: 'optimizer' }
}

const githubData = ref({})

// Fetch GitHub stars on mount
onMounted(async () => {
  const githubUrls = new Set()
  Object.values(projectsData).forEach(p => {
    if (p.githubUrl) githubUrls.add(p.githubUrl)
  })

  for (const url of githubUrls) {
    try {
      const repo = url.replace('https://github.com/', '')
      const res = await fetch(`https://api.github.com/repos/${repo}`)
      const data = await res.json()
      if (data.stargazers_count !== undefined) {
        githubData.value[url] = data.stargazers_count
      }
    } catch (e) {
      console.warn('Failed to fetch GitHub stars for', url)
    }
  }
})

const getStars = (project) => {
  if (project.githubUrl && githubData.value[project.githubUrl] !== undefined) {
    return githubData.value[project.githubUrl]
  }
  return project.githubStars || 0
}

const groupedProjects = Object.values(projectsData).reduce((acc, p) => {
  if (!acc[p.role]) acc[p.role] = []
  acc[p.role].push(p)
  return acc
}, {})
</script>

<div class="projects-page">

# All Projects

Explore projects by role:

</div>

<div v-for="(role, key) in roles" :key="key" class="role-section" :id="role.anchor">

## {{ role.icon }} {{ role.label }}

<div class="project-grid">
  <div v-for="project in groupedProjects[key]" :key="project.slug" class="project-card">
    <div class="card-header">
      <h3>{{ project.name }}</h3>
      <span v-if="project.status === 'published'" class="status-badge published">Published</span>
      <span v-else-if="project.status === 'pending'" class="status-badge pending">Pending</span>
    </div>

    <p class="description">{{ project.description }}</p>

    <div class="stats-row">
      <span v-if="project.downloads" class="stat">
        <span class="stat-icon">⬇</span> {{ project.downloads }}
      </span>
      <span v-if="project.githubUrl" class="stat">
        <span class="stat-icon">⭐</span> {{ getStars(project) }}
      </span>
    </div>

    <div class="links-row">
      <a v-if="project.clawhubUrl" :href="project.clawhubUrl" target="_blank" class="external-link">
        🦞 ClawHub
      </a>
      <a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" class="external-link">
        📂 GitHub
      </a>
    </div>

    <div class="card-footer">
      <span class="last-updated">Updated: {{ project.lastUpdated }}</span>
      <span class="author">Crystaria (with Paw and Kyle)</span>
    </div>
  </div>
</div>

</div>

<style scoped>
.projects-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.role-section {
  margin-bottom: 4rem;
}

.role-section h2 {
  color: var(--vp-c-text);
  border-bottom: 1px solid var(--vp-c-border);
  padding-bottom: 0.75rem;
  margin-bottom: 1.5rem;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.project-card {
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: var(--vp-radius-medium);
  padding: 1.5rem;
  transition: all 0.2s ease;
}

.project-card:hover {
  border-color: var(--vp-c-text-mute);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.card-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: var(--vp-c-text);
}

.status-badge {
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 999px;
  font-weight: 500;
  white-space: nowrap;
}

.status-badge.published {
  background-color: rgba(63, 185, 80, 0.15);
  border: 1px solid var(--vp-c-success);
  color: var(--vp-c-success);
}

.status-badge.pending {
  background-color: rgba(210, 153, 34, 0.15);
  border: 1px solid var(--vp-c-warning);
  color: var(--vp-c-warning);
}

.description {
  color: var(--vp-c-text-mute);
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  min-height: 2.5rem;
}

.stats-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.85rem;
  color: var(--vp-c-text-mute);
}

.stat-icon {
  font-size: 1rem;
}

.links-row {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.external-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  background-color: rgba(88, 166, 255, 0.1);
  border: 1px solid var(--vp-c-brand);
  border-radius: var(--vp-radius-small);
  color: var(--vp-c-brand);
  font-size: 0.8rem;
  text-decoration: none;
  transition: all 0.2s;
}

.external-link:hover {
  background-color: rgba(88, 166, 255, 0.2);
  text-decoration: none;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-border-muted);
  font-size: 0.75rem;
}

.last-updated {
  color: var(--vp-c-text-subtle);
}

.author {
  color: var(--vp-c-text-mute);
  font-style: italic;
}

@media (max-width: 768px) {
  .projects-page {
    padding: 1rem;
  }

  .project-grid {
    grid-template-columns: 1fr;
  }
}
</style>
