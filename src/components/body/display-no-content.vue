<template>
  <tr>
    <td :colspan="countColumns" class="no-data" v-html="paginate.noDataContent"></td>
  </tr>
</template>

<script setup lang="ts">
import usePaginationStore from "@/stores/pagination-store"
import {useColumnCount} from "@/composables/use-column-count"

const paginate = usePaginationStore()
const countColumns = useColumnCount()
</script>

