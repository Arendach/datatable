<template>
  <div>
    <span v-if="isCheck" class="text-success"><i class="fa fa-check"></i> Yes</span>
    <span v-else class="text-danger"><i class="fa fa-remove"></i> No</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isCheck: boolean
}>()
</script>
