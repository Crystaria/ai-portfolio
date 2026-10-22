// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import CardGrid from './components/CardGrid.vue'
import EvalVerdict from './components/EvalVerdict.vue'
import PortfolioCard from './components/PortfolioCard.vue'
import ProjectsGrid from './components/ProjectsGrid.vue'

// Stylesheets are imported from tokens -> base -> shared -> page-specific
// so the cascade order stays predictable and matches the original theme.
import './styles/tokens.css'
import './styles/base.css'
import './styles/cards.css'
import './styles/home.css'
import './styles/projects.css'
import './styles/evals.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // Register global components so Markdown pages can use them directly.
    app.component('ProjectsGrid', ProjectsGrid)
    app.component('PortfolioCard', PortfolioCard)
    app.component('CardGrid', CardGrid)
    app.component('EvalVerdict', EvalVerdict)
  }
}
