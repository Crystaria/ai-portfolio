<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import PortfolioCard from './PortfolioCard.vue'

const props = defineProps({
  items: { type: Array, default: () => [] },
  minWidth: { type: String, default: '320px' }
})

const { lang } = useData()
const isZh = computed(() => (lang.value || '').startsWith('zh'))

const emptyText = computed(() =>
  isZh.value
    ? '该专区的内容正在整理中，敬请期待。'
    : 'Content for this section is being prepared. Check back soon.'
)
</script>

<template>
  <div
    v-if="items.length"
    class="card-grid"
    :style="{ '--card-grid-min': minWidth }"
  >
    <PortfolioCard
      v-for="item in items"
      :key="item.url"
      :title="item.title"
      :url="item.url"
      :tldr="item.tldr"
      :capabilities="item.capabilities"
      :metrics="item.metrics"
      :verdict="item.verdict"
      :kind="item.kind"
      :date="item.date"
      :featured="item.featured"
    />
  </div>
  <p v-else class="empty-state">{{ emptyText }}</p>
</template>
