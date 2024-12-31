<template>
  <span v-text="renderDate"></span>
</template>

<script setup lang="ts">
import {computed} from "vue"
import displayCellValue from "@/utility/display-cell-value"
import displayDate from "@/utility/display-date";

const props = defineProps<{
  name: string,
  item: Object
}>()

const renderDate = computed(() => {
  const date = displayCellValue(props.item, props.name)

  return displayDate(date)
})
</script>
