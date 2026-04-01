// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import ProjectsGrid from './components/ProjectsGrid.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // Register global components
    app.component('ProjectsGrid', ProjectsGrid)

    // Force dark theme on mount (prevent light/dark mismatch)
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', 'dark')
      document.documentElement.classList.add('dark')
    }
  }
}
