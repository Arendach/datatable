<template>
  <div>
    <a :href="url" target="_blank">
      <img :src="url" :alt="url" style="height: 100px">
    </a>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  url: string
}>()
</script>
