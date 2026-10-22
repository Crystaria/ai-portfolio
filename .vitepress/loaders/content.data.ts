// .vitepress/loaders/content.data.ts
//
// Single content source for every card rendered by <CardGrid>.
//
// Collections:
//   work  -> projects/*.md      (URLs stay on /projects/ so links and SEO survive)
//   case  -> cases/*.md
//   eval  -> evals/*.md
//   plus the zh/ mirrors of all three.
//
// The spec calls the first collection `work/*.md`. That directory does not
// exist; the published work lives in `projects/`. Mapping it here (instead of
// inventing a duplicate directory) is recorded in the path-audit eval report.
import { createContentLoader } from 'vitepress'
import type { ContentData } from 'vitepress'

export type ContentKind = 'work' | 'case' | 'eval'
export type Verdict = 'pass' | 'conditional' | 'fail'

export interface Metric {
  label: string
  value: string
}

export interface PortfolioEntry {
  url: string
  kind: ContentKind
  lang: 'en' | 'zh'
  slug: string
  title: string
  tldr: string
  capabilities: string[]
  metrics: Metric[]
  verdict: Verdict | null
  date: string
  featured: boolean
}

const SOURCES: string[] = [
  'projects/*.md',
  'cases/*.md',
  'evals/*.md',
  'zh/projects/*.md',
  'zh/cases/*.md',
  'zh/evals/*.md'
]

const VERDICTS: Verdict[] = ['pass', 'conditional', 'fail']

/** Normalize a YAML list or a comma-separated string into a string array. */
function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean)
  }
  if (typeof value === 'string' && value.trim()) {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  }
  return []
}

/** Accept both `- label: X\n  value: Y` and `- "X: Y"` frontmatter shapes. */
function toMetrics(value: unknown): Metric[] {
  if (!Array.isArray(value)) return []

  const metrics: Metric[] = []
  for (const item of value) {
    if (typeof item === 'string') {
      const separator = item.indexOf(':')
      if (separator === -1) continue
      const label = item.slice(0, separator).trim()
      const metricValue = item.slice(separator + 1).trim()
      if (label && metricValue) metrics.push({ label, value: metricValue })
      continue
    }

    if (item && typeof item === 'object') {
      const record = item as Record<string, unknown>
      const label = String(record.label ?? '').trim()
      if (!label || record.value == null) continue
      metrics.push({ label, value: String(record.value) })
    }
  }
  return metrics
}

function toDate(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10)
  }
  return typeof value === 'string' ? value.trim() : ''
}

function toEntry(page: ContentData): PortfolioEntry | null {
  // Directory indexes (`/cases/`, `/projects/`, ...) are not cards.
  if (page.url.endsWith('/')) return null

  const slug = (page.url.split('/').filter(Boolean).pop() || '').replace(
    /\.html$/,
    ''
  )
  if (!slug || slug === 'index' || slug === 'template') return null

  const frontmatter = page.frontmatter || {}
  if (frontmatter.draft === true) return null

  const lang: 'en' | 'zh' = page.url.startsWith('/zh/') ? 'zh' : 'en'
  const path = lang === 'zh' ? page.url.slice(3) : page.url
  const kind: ContentKind = path.startsWith('/cases/')
    ? 'case'
    : path.startsWith('/evals/')
      ? 'eval'
      : 'work'

  const verdict = VERDICTS.includes(frontmatter.verdict) ? frontmatter.verdict : null

  return {
    url: page.url,
    kind,
    lang,
    slug,
    title: String(frontmatter.title || slug).trim(),
    tldr: String(frontmatter.tldr || frontmatter.description || '').trim(),
    capabilities: toStringArray(frontmatter.capabilities),
    metrics: toMetrics(frontmatter.metrics),
    verdict,
    date: toDate(frontmatter.date),
    featured: frontmatter.featured === true || frontmatter.featured === 'true'
  }
}

export default createContentLoader<PortfolioEntry[]>(SOURCES, {
  transform(rawData) {
    return rawData
      .map(toEntry)
      .filter((entry): entry is PortfolioEntry => entry !== null)
      .sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1
        const byDate = b.date.localeCompare(a.date)
        return byDate || a.title.localeCompare(b.title)
      })
  }
})
