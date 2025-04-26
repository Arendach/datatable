<template>
  <div class="selected-filters-container">
    <!-- Кнопка для скидання всіх фільтрів -->
    <button
      v-if="filters.length > 0 || dataTableStore.sortColumn || filterStore.search"
      class="clear-filters-btn clear-filters-btn-xs"
      @click="clearAllFilters"
    >
      Clear
    </button>

    <div class="selected-filter selected-filter-xs" v-if="filterStore.search">
      <span class="selected-filter-title">Search:</span>
      <span class="selected-filter-value">{{ filterStore.search }}</span>

      <button
        type="button"
        class="remove-btn remove-btn-xs"
        aria-label="Remove"
        @click="removeSearching()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="remove-icon"
        >
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
            stroke="currentColor"
            stroke-width="2"
          />
        </svg>
      </button>
    </div>

    <div class="selected-filter selected-filter-xs" v-if="dataTableStore.sortColumn">
      <span class="selected-filter-title">Order by:</span>
      <span class="selected-filter-value">{{ dataTableStore.sortColumn.title }}</span>

      <button
        type="button"
        class="remove-btn remove-btn-xs"
        aria-label="Remove"
        @click="removeSorting()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="remove-icon"
        >
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
            stroke="currentColor"
            stroke-width="2"
          />
        </svg>
      </button>
    </div>

    <div
      v-for="filter in filters"
      :key="filter.field"
      class="selected-filter selected-filter-xs"
    >
      <span class="selected-filter-title">{{ filter.title }}:</span>
      <span class="selected-filter-value">{{ filter.value }}</span>

      <button
        type="button"
        class="remove-btn remove-btn-xs"
        aria-label="Remove"
        @click="removeFilter(filter.field)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="remove-icon"
        >
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
            stroke="currentColor"
            stroke-width="2"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import useDataTableStore from "@/stores/data-table-store"
import {computed} from "vue"
import useEventBus from "@/composables/use-event-bus"
import Events from "@/types/events"
import {Column} from "@/types/column"
import ColumnType from "@/types/column-type"
import FilterType from "@/types/filter-type"
import displayDate from "@/utility/display-date"
import {FilterOption} from "@/types/filter-option"
import ColumnFilter from "@/types/column-filter"
import useFilterStore from "@/stores/filter-store"
import SortDirection from "@/types/sort-direction"

const dataTableStore = useDataTableStore()
const filterStore = useFilterStore()
const eventBus = useEventBus()

// Форматування значення фільтра залежно від типу колонки
const formatFilterValue = (column: Column & { filter: ColumnFilter }): string => {
  const {filter, type} = column

  if (type === ColumnType.BOOLEAN) {
    return filter.value ? 'Yes' : 'No'
  }

  if ([FilterType.SELECT, FilterType.SELECT_MULTIPLE].includes(filter.type)) {
    return filter.value.map((option: FilterOption) => option.label).join(', ')
  }

  if (type === ColumnType.DATE) {
    if (filter.type === FilterType.DATE_RANGE && Array.isArray(filter.value)) {
      return `${displayDate(filter.value[0])} - ${displayDate(filter.value[1])}`
    }
    return displayDate(filter.value)
  }

  return String(filter.value)
}

const filters = computed(() =>
  dataTableStore.columns
    .filter((col: Column & { filter: ColumnFilter }) => col.filter.value !== null && col.filter.value !== '')
    .map((col: Column & { filter: ColumnFilter }) => ({
      field: col.field,
      title: col.title,
      value: formatFilterValue(col)
    }))
)

// Скидання конкретного фільтра
function removeFilter(field: string) {
  const columnMap = new Map(dataTableStore.columns.map((col: Column & { filter: ColumnFilter }) => [col.field, col]))
  const column = columnMap.get(field)

  if (column) {
    column.filter.value = null
    eventBus.emit(Events.FILTERS_UPDATED)
    dataTableStore.saveColumns()
  }
}

// Скидання всіх фільтрів
// todo: пофіксити проблему багатьох запитів до сервера
function clearAllFilters() {
  dataTableStore.columns.forEach((col: Column & { filter: ColumnFilter }) => {
    col.filter.value = null
  })

  eventBus.emit(Events.FILTERS_UPDATED)
  dataTableStore.saveColumns()

  removeSorting()
  removeSearching()
}

// Скидання сортування
function removeSorting() {
  filterStore.setSortColumn(null)
  filterStore.setSortDirection(SortDirection.DEFAULT)

  eventBus.emit(Events.SORT_CHANGED)
}

// Скидання сортування
function removeSearching() {
  filterStore.setSearch(null)

  eventBus.emit(Events.SEARCH_CHANGED)
}
</script>
