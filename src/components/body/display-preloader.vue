<template>
  <template v-if="!dataTable.filterRowCount && representation.loading">
    <tr>
      <td :colspan="countColumns">
        <div class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </td>
    </tr>
  </template>
</template>

<script setup lang="ts">
import useDataTableStore from "@/stores/data-table-store"
import useRepresentationStore from "@/stores/representation-store"
import {useColumnCount} from "@/composables/use-column-count"

const dataTable = useDataTableStore()
const representation = useRepresentationStore()
const countColumns = useColumnCount()

</script>
