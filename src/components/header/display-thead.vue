<template>
  <thead class="table-light">
  <table-header/>
  <display-columns/>
  <display-filters/>
  </thead>
</template>


<script setup lang="ts">
import DisplayColumns from "./columns/display-columns.vue"
import DisplayFilters from "./columns/display-filters.vue"
import TableHeader from "@/components/table-header.vue"
</script>
