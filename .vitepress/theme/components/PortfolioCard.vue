<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import EvalVerdict from './EvalVerdict.vue'

const props = defineProps({
  title: { type: String, required: true },
  url: { type: String, default: '' },
  tldr: { type: String, default: '' },
  capabilities: { type: Array, default: () => [] },
  metrics: { type: Array, default: () => [] },
  verdict: { type: String, default: null },
  kind: { type: String, default: 'work' },
  date: { type: String, default: '' },
  featured: { type: Boolean, default: false }
})

const { lang } = useData()
const isZh = computed(() => (lang.value || '').startsWith('zh'))

const kindLabels = {
  work: { en: 'Work', zh: '作品' },
  case: { en: 'Case', zh: '案例' },
  eval: { en: 'Eval', zh: '评测' }
}

const ctaLabels = {
  work: { en: 'View project', zh: '查看项目' },
  case: { en: 'Read case', zh: '阅读案例' },
  eval: { en: 'Read report', zh: '阅读报告' }
}

const kindLabel = computed(
  () => kindLabels[props.kind]?.[isZh.value ? 'zh' : 'en'] || props.kind
)

const ctaLabel = computed(
  () => ctaLabels[props.kind]?.[isZh.value ? 'zh' : 'en'] || 'Read more'
)

const formattedDate = computed(() => {
  if (!props.date) return ''
  const date = new Date(props.date)
  if (Number.isNaN(date.getTime())) return props.date
  return new Intl.DateTimeFormat(isZh.value ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC'
  }).format(date)
})
</script>

<template>
  <article class="portfolio-card card" :class="{ 'is-featured': featured }">
    <header class="portfolio-card__header">
      <div class="portfolio-card__heading">
        <span class="portfolio-card__kind">{{ kindLabel }}</span>
        <h3 class="portfolio-card__title">
          <a v-if="url" :href="url">{{ title }}</a>
          <template v-else>{{ title }}</template>
        </h3>
      </div>
      <EvalVerdict v-if="verdict" :verdict="verdict" />
    </header>

    <p v-if="tldr" class="portfolio-card__tldr">{{ tldr }}</p>

    <ul v-if="capabilities.length" class="portfolio-card__capabilities">
      <li
        v-for="capability in capabilities"
        :key="capability"
        class="capability-tag"
      >
        {{ capability }}
      </li>
    </ul>

    <dl v-if="metrics.length" class="portfolio-card__metrics">
      <div v-for="metric in metrics" :key="metric.label" class="metric">
        <dt class="metric__label">{{ metric.label }}</dt>
        <dd class="metric__value">{{ metric.value }}</dd>
      </div>
    </dl>

    <footer class="portfolio-card__footer">
      <time v-if="date" class="portfolio-card__date" :datetime="date">
        {{ formattedDate }}
      </time>
      <span v-else />
      <a v-if="url" class="portfolio-card__link" :href="url">{{ ctaLabel }} →</a>
    </footer>
  </article>
</template>
