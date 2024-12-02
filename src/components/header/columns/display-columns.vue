<template>
  <tr class="exportable">
    <th v-if="representation.hasAutoListing" class="centered exportable">№</th>

    <th v-if="representation.hasCheckbox" class="centered">
      <div class="form-check">
        <input class="form-check-input" :checked="dataTable.isAllSelected" @change="toggleSelectAll" type="checkbox"/>
      </div>
    </th>

    <template v-for="column in dataTable.columns" :key="column.field">
      <th v-if="column.show" :class="getColumnClasses(column)" :style="getColumnStyles(column)">
        <div
          :class="column.headerClass || ''"
          @click="column.sort && filter.useSorting ? sortChange(column.field) : null"
        >
          <div v-if="column.selectable" class="form-check">
            <input class="form-check-input" type="checkbox" :value="column.field" v-model="selectedColumns" @click.stop/>
            <label class="form-check-label">{{ column.title }}</label>
            <sort-direction
              :column="column"
              :sortable="filter.useSorting"
              :sort-column="filter.currentSortColumn"
              :sort-direction="filter.currentSortDirection"/>
          </div>

          <div v-else>
            {{ column.title }}
            <sort-direction
              :column="column"
              :sortable="filter.useSorting"
              :sort-column="filter.currentSortColumn"
              :sort-direction="filter.currentSortDirection"/>
          </div>
        </div>
      </th>
    </template>
  </tr>
</template>

<script setup lang="ts">
import {ref} from "vue"
import useFilterStore from "@/stores/filter-store"
import useDataTableStore from "@/stores/data-table-store"
import useRepresentationStore from "@/stores/representation-store"
import SortDirection from "@/components/header/columns/sort-direction.vue"
import {Column} from "@/types/column"

const dataTable = useDataTableStore()
const filter = useFilterStore()
const representation = useRepresentationStore()

const selectedColumns = ref([])

const toggleSelectAll = () => {
  if (dataTable.isAllSelected) dataTable.clearSelected()
  else dataTable.selectAll()
}

const sortChange = function (field: string) {
  if (field !== filter.currentSortColumn) {
    filter.currentSortColumn = field
    filter.currentSortDirection = 'asc'
    return
  }

  if (filter.currentSortDirection === 'asc') {
    filter.currentSortDirection = 'desc'
  } else if (filter.currentSortDirection === 'desc') {
    filter.currentSortDirection = null
    filter.currentSortColumn = null
  } else {
    filter.currentSortDirection = 'asc'
  }
}


const getColumnClasses = (column: Column) => [
  filter.useSorting && column.sort ? 'bh-cursor-pointer' : '',
  column.exportable ? 'exportable' : '',
  column.className || ''
]

const getColumnStyles = (column: Column) => ({
  'width': column.width,
  'min-width': column.minWidth,
  'max-width': column.maxWidth
})
</script>
