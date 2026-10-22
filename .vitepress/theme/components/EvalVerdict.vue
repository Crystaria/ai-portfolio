<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const props = defineProps({
  verdict: {
    type: String,
    default: 'conditional',
    validator: (value) => ['pass', 'conditional', 'fail'].includes(value)
  },
  compact: {
    type: Boolean,
    default: false
  }
})

const { lang } = useData()
const isZh = computed(() => (lang.value || '').startsWith('zh'))

const labels = {
  pass: { en: 'Pass', zh: '通过' },
  conditional: { en: 'Conditional', zh: '有条件通过' },
  fail: { en: 'Fail', zh: '未通过' }
}

const label = computed(
  () => labels[props.verdict]?.[isZh.value ? 'zh' : 'en'] || props.verdict
)
</script>

<template>
  <span
    class="eval-verdict"
    :class="[`is-${verdict}`, { 'is-compact': compact }]"
    :aria-label="label"
  >
    <span class="eval-verdict__dot" aria-hidden="true" />
    <span class="eval-verdict__label">{{ label }}</span>
  </span>
</template>
