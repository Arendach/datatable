<template>
  <tr>
    <td :colspan="countColumns" class="no-data" v-html="paginate.noDataContent"></td>
  </tr>
</template>

<script setup lang="ts">
import useDataTableStore from "@/stores/data-table-store"
import usePaginationStore from "@/stores/pagination-store"
import {useColumnCount} from "@/composables/use-column-count"

const dataTable = useDataTableStore()
const paginate = usePaginationStore()
const countColumns = useColumnCount()

</script>

<style>
.no-data {
  text-align: center;
  height: 100px;
  vertical-align: middle;
  font-weight: bold;
}
</style>

