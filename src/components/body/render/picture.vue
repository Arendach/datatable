<template>
  <div>
    <img :src="url" :alt="url" style="height: 100px">
  </div>
</template>

<script setup lang="ts">
defineProps<{
  url: string
}>()
</script>
