<template>
  <tr class="exportable">
    <th v-if="representation.hasExpand" class="centered middle"></th>
    <th v-if="representation.hasAutoListing" class="centered middle">№</th>

    <th v-if="representation.hasCheckbox" class="centered middle">
      <div class="form-check">
        <input class="form-check-input" :checked="dataTable.isAllSelected" @change="toggleSelectAll" type="checkbox"/>
      </div>
    </th>

    <template v-for="column in columns" :key="column.field">
      <th v-if="column.show" :class="getColumnClasses(column)" :style="getColumnStyles(column)" class="middle">
        <div class="form-header-nowrap" @click="column.sort && filter.useSorting ? sortChange(column.field) : null">
          <div v-if="column.selectable" class="form-check form-check-xs" @click.stop>
            <input
              class="form-check-input"
              type="checkbox"
              :value="column"
              v-model="dataTable.selectedColumns"
              @change="changeSelectedColumns"
            />
          </div>

          <div class="d-flex align-items-center gap-1">
            <span class="column-title">{{ column.title }}</span>
            <display-sort-direction
              :column="column"
              :sortable="filter.useSorting"
              :sort-column="filter.sortColumn"
              :sort-direction="filter.sortDirection"
            />
          </div>
        </div>
      </th>
    </template>
  </tr>
</template>

<script setup lang="ts">
import useFilterStore from "@/stores/filter-store"
import useDataTableStore from "@/stores/data-table-store"
import useRepresentationStore from "@/stores/representation-store"
import SortDirection from "@/types/sort-direction"
import DisplaySortDirection from "@/components/header/columns/display-sort-direction.vue"
import {Column} from "@/types/column"
import useEventBus from "@/composables/use-event-bus"
import Events from "@/types/events"
import {computed, nextTick} from "vue"

const dataTable = useDataTableStore()
const filter = useFilterStore()
const representation = useRepresentationStore()
const eventBus = useEventBus()
const columns = computed(() => dataTable.columns)

const toggleSelectAll = () => {
  dataTable.setAllSelected(!dataTable.isAllSelected)

  nextTick(() => {
    eventBus.emit(Events.CHANGE_SELECTED_ROWS, dataTable.selectedRows)
  })
}

const sortChange = function (field: string) {
  if (field !== filter.sortColumn) {
    filter.setSortColumn(field)
    filter.setSortDirection(SortDirection.ASC)

    eventBus.emit(Events.SORT_CHANGED)

    return
  }

  if (filter.sortDirection === SortDirection.ASC) {
    filter.setSortDirection(SortDirection.DESC)
  } else if (filter.sortDirection === SortDirection.DESC) {
    filter.setSortDirection(SortDirection.DEFAULT)
    filter.setSortColumn(null)
  } else {
    filter.setSortDirection(SortDirection.ASC)
  }

  eventBus.emit(Events.SORT_CHANGED)
}

const changeSelectedColumns = () => {
  eventBus.emit(Events.CHANGE_SELECTED_COLUMNS, dataTable.selectedColumns)
}

const getColumnClasses = (column: Column) => [column.className || '']

const getColumnStyles = (column: Column) => ({
  'width': column.width,
  'max-width': column.maxWidth
})
</script>

<style lang="scss">
.form-header-nowrap {
  white-space: nowrap;
  display: flex;
  align-items: center;
  cursor: pointer;

  input {
    cursor: pointer;
  }

  .column-title {
    user-select: none;
  }
}
</style>
