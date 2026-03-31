// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import ProjectsGrid from './components/ProjectsGrid.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // Register global components
    app.component('ProjectsGrid', ProjectsGrid)
  }
}
