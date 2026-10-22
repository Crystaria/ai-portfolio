// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import ProjectsGrid from './components/ProjectsGrid.vue'

// Stylesheets are imported from tokens -> base -> shared -> page-specific
// so the cascade order stays predictable and matches the original theme.
import './styles/tokens.css'
import './styles/base.css'
import './styles/cards.css'
import './styles/home.css'
import './styles/projects.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // Register global components
    app.component('ProjectsGrid', ProjectsGrid)
  }
}
