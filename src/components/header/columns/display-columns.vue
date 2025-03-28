<template>
  <tr class="exportable">
    <th v-if="representation.hasExpand" class="centered middle"></th>
    <th v-if="representation.hasAutoListing" class="centered middle">№</th>

    <th v-if="representation.hasCheckbox" class="centered middle">
      <div class="form-check">
        <input class="form-check-input" :checked="dataTable.isAllSelected" @change="toggleSelectAll" type="checkbox"/>
      </div>
    </th>

    <template v-for="column in dataTable.columns" :key="column.field">
      <th v-if="column.show" :class="getColumnClasses(column)" :style="getColumnStyles(column)" class="middle">
        <div
          class="form-header-nowrap"
          @click="column.sort && filter.useSorting ? sortChange(column.field) : null"
        >
          <div v-if="column.selectable" class="form-check form-check-xs">
            <input class="form-check-input" type="checkbox" :value="column.field" v-model="selectedColumns" @click.stop/>
            <label class="form-check-label">{{ column.title }}</label>
            <display-sort-direction
              :column="column"
              :sortable="filter.useSorting"
              :sort-column="filter.currentSortColumn"
              :sort-direction="filter.currentSortDirection"/>
          </div>

          <div class="form-header-nowrap" v-else>
            {{ column.title }}
            <display-sort-direction
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
import SortDirection from "@/types/sort-direction"
import DisplaySortDirection from "@/components/header/columns/display-sort-direction.vue"
import {Column} from "@/types/column"
import useEventBus from "@/composables/use-event-bus"
import Events from "@/types/events"

const dataTable = useDataTableStore()
const filter = useFilterStore()
const representation = useRepresentationStore()
const eventBus = useEventBus()

const selectedColumns = ref([])

const toggleSelectAll = () => {
  if (dataTable.isAllSelected) dataTable.clearSelected()
  else dataTable.selectAll()
}

const sortChange = function (field: string) {
  if (field !== filter.currentSortColumn) {
    filter.currentSortColumn = field
    filter.currentSortDirection = SortDirection.ASC

    eventBus.emit(Events.SORT_CHANGED)

    return
  }

  if (filter.currentSortDirection === SortDirection.ASC) {
    filter.currentSortDirection = SortDirection.DESC
  } else if (filter.currentSortDirection === SortDirection.DESC) {
    filter.currentSortDirection = SortDirection.DEFAULT
    filter.currentSortColumn = null
  } else {
    filter.currentSortDirection = SortDirection.ASC
  }

  eventBus.emit(Events.SORT_CHANGED)
}

const getColumnClasses = (column: Column) => [
  filter.useSorting && column.sort ? 'bh-cursor-pointer' : '',
  column.exportable ? 'exportable' : '',
  column.className || ''
]

const getColumnStyles = (column: Column) => ({
  'width': column.width,
  'max-width': column.maxWidth
})
</script>
