<template>
  <div v-html="parsedHtml"></div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import stripTags from '@/utility/strip-tags'

const props = defineProps({
  value: {default: null},
  html: {type: Boolean},
})

const parsedHtml = computed(() => {
  if (!props.value) return ''

  let text = ''

  if (Array.isArray(props.value)) {
    text = props.value.filter(Boolean).join(', ')
  } else {
    text = String(props.value)
  }

  if (!props.html) {
    text = stripTags(text)
  }

  text = linkToHtml(text)
  text = emailToHtml(text)
  text = phoneToHtml(text)

  text = text.replace(/\n/g, '<br>')

  return text
})

const emailToHtml = (text: string | null): string => {
  if (!text) return ''
  return text.replace(
    /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
    '<a target="_blank" href="mailto:$1">$1</a>'
  )
}

const linkToHtml = (text: string | null): string => {
  if (!text) return ''
  return text.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a target="_blank" href="$1">$1</a>'
  )
}

const phoneToHtml = (text: string | null): string => {
  if (!text) return ''
  return text.replace(
    /(?<!href="tel:)(\+?\d[\d\s\-\(\)]{7,}\d)/g,
    (match) => {
      const phone = match.replace(/[\s\-\(\)]/g, '')
      return `<a href="tel:${phone}">${match}</a>`
    }
  )
}
</script>
