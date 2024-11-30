<template>
  <span class="text-primary" v-text="renderDate"></span>
</template>

<script setup lang="ts">
import {computed} from "vue"
import displayCellValue from "@/utility/display-cell-value"

const props = defineProps<{
  name: string,
  item: Object
}>()

const renderDate = computed(() => {
  let name = props.name
  let nameFormat = `${props.name}Format`

  if (displayCellValue(props.item, nameFormat)) {
    return displayCellValue(props.item, nameFormat)
  }

  return displayCellValue(props.item, name)
})
</script>
