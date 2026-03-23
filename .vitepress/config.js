// .vitepress/config.js
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AI Portfolio - Crystaria',
  description: 'Showcasing AI-human collaborative projects',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  themeConfig: {
    logo: {
      src: '/logo.png',
      alt: 'Portfolio Logo'
    },

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
            { text: 'Mac Installer', link: '/projects/sillytavern-mac-installer' }
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
      pattern: 'https://github.com/Crystaria/ai-portfolio/edit/main/:path',
      text: 'Edit this page on GitHub'
    }
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  }
})
