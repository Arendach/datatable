<template>
  <div>
    <span v-if="isCheck" class="text-success"><i class="fa fa-check"></i> Так</span>
    <span v-else class="text-danger"><i class="fa fa-remove"></i> Ні</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isCheck: boolean
}>()
</script>
