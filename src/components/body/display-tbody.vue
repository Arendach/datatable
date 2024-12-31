<template>
  <tbody>
  <display-preloader v-if="dataTable.isLoading"/>
  <display-content v-else-if="dataTable.filteredItems.length > 0 && !dataTable.isLoading"/>
  <display-no-content v-else/>
  </tbody>
</template>

<script setup lang="ts">
import DisplayNoContent from './display-no-content.vue'
import DisplayPreloader from './display-preloader.vue'
import DisplayContent from './display-content.vue'
import useDataTableStore from "@/stores/data-table-store"

const dataTable = useDataTableStore()
</script>
