// .vitepress/config.js
import { defineConfig } from 'vitepress'

const EDIT_LINK_PATTERN =
  'https://github.com/Crystaria/ai-portfolio/edit/main/:path'

export default defineConfig({
  title: 'AI Portfolio - Crystaria',
  description: 'Showcasing AI-human collaborative projects',

  // Always render in dark mode. VitePress applies the `dark` class before
  // paint, so no client-side DOM patching is required.
  appearance: 'force-dark',

  // Phase 0: keep internal docs and temp files out of the build so they are
  // never published as public pages. VitePress already ignores
  // "**/node_modules/**" and "**/dist/**" by default.
  srcExclude: [
    'notes/**',
    'PRD-*',
    '诊断报告*',
    '20*.md', // dated work logs, e.g. 2026-04-07-工作记录.md
    '0[1-9]-*.md', // internal research / framework reports
    'GitHub-Stars-*.md',
    'SYNC_SETUP.md',
    'README.md',
    '**/README.md',
    'CLAUDE.md',
    '**/CLAUDE.md',
    '**/template.md' // project page template
  ],

  head: [],

  // Copy static files from public directory
  publicDir: 'public',

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      link: '/',
      title: 'AI Portfolio - Crystaria',
      description: 'Showcasing AI-human collaborative projects'
    },
    zh: {
      label: '简体中文',
      lang: 'zh',
      link: '/zh/',
      title: 'AI 作品集 - Crystaria',
      description: '展示 AI 与人类协作的项目',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '项目', link: '/zh/projects/' }
        ],
        sidebar: {
          '/zh/projects/': [
            {
              text: '按角色分类',
              items: [
                { text: '🛠️ 应用开发者', link: '/zh/projects/#builder' },
                { text: '🤝 社区贡献者', link: '/zh/projects/#contributor' },
                { text: '✨ 体验优化师', link: '/zh/projects/#optimizer' }
              ]
            },
            {
              text: '个人项目',
              items: [
                { text: 'Memory Boost', link: '/zh/projects/memory-boost' },
                { text: 'MCP Hello World', link: '/zh/projects/mcp-hello-world' },
                { text: '中文日报生成器', link: '/zh/projects/chinese-daily-report-generator' },
                { text: 'Safe Skill Advisor', link: '/zh/projects/safe-skill-advisor' },
                { text: '语言景观分析器', link: '/zh/projects/linguistic-landscape-analyzer' },
                { text: '社交媒体监控', link: '/zh/projects/social-media-monitor' },
                { text: 'SillyTavern Message Collapser', link: '/zh/projects/sillytavern-message-collapser' },
                { text: 'Mac 安装器', link: '/zh/projects/sillytavern-mac-installer' }
              ]
            }
          ]
        },
        editLink: {
          pattern: EDIT_LINK_PATTERN,
          text: '在 GitHub 上编辑此页面'
        }
      }
    }
  },

  // Shared theme config. English values are the defaults; the `zh` locale
  // only overrides the strings that need translating.
  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Projects', link: '/projects/' }
    ],

    sidebar: {
      '/projects/': [
        {
          text: 'Projects by Role',
          items: [
            { text: '🛠️ Application Builder', link: '/projects/#builder' },
            { text: '🤝 Community Contributor', link: '/projects/#contributor' },
            { text: '✨ Experience Optimizer', link: '/projects/#optimizer' }
          ]
        },
        {
          text: 'Individual Projects',
          items: [
            { text: 'Memory Boost', link: '/projects/memory-boost' },
            { text: 'MCP Hello World', link: '/projects/mcp-hello-world' },
            { text: 'Chinese Daily Report', link: '/projects/chinese-daily-report-generator' },
            { text: 'Safe Skill Advisor', link: '/projects/safe-skill-advisor' },
            { text: 'Linguistic Landscape', link: '/projects/linguistic-landscape-analyzer' },
            { text: 'Social Media Monitor', link: '/projects/social-media-monitor' },
            { text: 'SillyTavern Message Collapser', link: '/projects/sillytavern-message-collapser' },
            { text: 'SillyTavern Mac Installer', link: '/projects/sillytavern-mac-installer' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Crystaria' }
    ],

    footer: {
      message: 'Crystaria (with Paw and Kyle)',
      copyright: 'MIT License'
    },

    editLink: {
      pattern: EDIT_LINK_PATTERN,
      text: 'Edit this page on GitHub'
    }
  },

  markdown: {
    theme: 'github-dark'
  }
})
