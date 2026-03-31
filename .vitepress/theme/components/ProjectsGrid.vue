<template>
  <div class="projects-page">
    <h1>{{ t('title') }}</h1>
    <p class="explore-text">{{ t('explore') }}</p>

    <div v-for="(role, key) in roles" :key="key" class="role-section" :id="role.anchor">
      <h2>{{ role.icon }} {{ lang === 'zh' ? role.labelZh : role.label }}</h2>

      <div class="project-grid">
        <div v-for="project in groupedProjects[key]" :key="project.slug" class="project-card">
          <div class="card-header">
            <h3>{{ t('name', project) }}</h3>
            <span v-if="project.status === 'published'" class="status-badge published">{{ t('published') }}</span>
            <span v-else-if="project.status === 'pending'" class="status-badge pending">{{ t('pending') }}</span>
          </div>

          <p class="description">{{ t('description', project) }}</p>

          <div class="stats-row">
            <span v-if="project.clawhubUrl && project.downloads" class="stat">
              <span class="stat-icon">⬇</span> {{ t('downloads') }}: {{ project.downloads }}
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
            <span class="last-updated">{{ t('lastUpdated') }}: {{ project.lastUpdated }}</span>
            <span class="author">{{ t('author') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import projectsData from '../../_data/downloads.json'

export default {
  data() {
    return {
      lang: 'en',
      roles: {
        builder: { label: 'Application Builder', labelZh: '应用开发者', icon: '🛠️', anchor: 'builder' },
        contributor: { label: 'Community Contributor', labelZh: '社区贡献者', icon: '🤝', anchor: 'contributor' },
        optimizer: { label: 'Experience Optimizer', labelZh: '体验优化师', icon: '✨', anchor: 'optimizer' }
      }
    }
  },
  mounted() {
    this.lang = new URLSearchParams(window.location.search).get('lang') ||
                (window.location.pathname.startsWith('/zh/') ? 'zh' : 'en')
  },
  methods: {
    t(key, project = null) {
      const isZh = this.lang === 'zh'
      if (project && key === 'name') return isZh ? (project.nameZh || project.name) : project.name
      if (project && key === 'description') return isZh ? (project.descriptionZh || project.description) : project.description
      if (project && key === 'roleLabel') return isZh ? (project.roleLabelZh || project.roleLabel) : project.roleLabel
      const translations = {
        title: { en: 'All Projects', zh: '全部项目' },
        explore: { en: 'Explore projects by role:', zh: '按角色浏览项目：' },
        downloads: { en: 'Downloads', zh: '下载量' },
        published: { en: 'Published', zh: '已发布' },
        pending: { en: 'Pending', zh: '待发布' },
        lastUpdated: { en: 'Updated', zh: '更新' },
        author: { en: 'Crystaria (with Paw and Kyle)', zh: 'Crystaria (与 Paw 和 Kyle)' }
      }
      return translations[key]?.[isZh ? 'zh' : 'en'] || key
    }
  },
  computed: {
    groupedProjects() {
      return Object.values(projectsData).reduce((acc, p) => {
        if (!acc[p.role]) acc[p.role] = []
        acc[p.role].push(p)
        return acc
      }, {})
    }
  }
}
</script>

<style scoped>
.projects-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.explore-text {
  color: var(--vp-c-text-mute);
  font-size: 1rem;
  margin-bottom: 2rem;
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
