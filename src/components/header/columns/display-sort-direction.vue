<template>
  <span v-if="sortable && column.sort" :class="[sortColumn, sortDirection]">
    <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
      <polygon
        points="3.11,6.25 10.89,6.25 7,1.75 "
        fill="currentColor"
        :class="[sortColumn === column.field && sortDirection === SortDirection.ASC ? 'text-primary' : 'text-dark']"
      ></polygon>
      <polygon
        points="7,12.25 10.89,7.75 3.11,7.75 "
        fill="currentColor"
        :class="[sortColumn === column.field && sortDirection === SortDirection.DESC ? 'text-primary' : 'text-dark']"
      ></polygon>
    </svg>
  </span>
</template>

<script setup lang="ts">
import SortDirection from "@/types/sort-direction"

defineProps({
  sortable: {type: Boolean, default: false, required: true},
  column: {type: Object, required: true},
  sortColumn: {type: String, required: false},
  sortDirection: {type: String, required: true},
})
</script>
