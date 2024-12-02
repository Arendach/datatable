<template>
  <tr class="exportable">
    <!-- Колонка для авто-лістингу -->
    <th v-if="representation.hasAutoListing" class="centered exportable">№</th>

    <!-- Колонка для чекбоксів -->
    <th v-if="representation.hasCheckbox" class="centered">
      <div class="form-check">
        <input
            class="form-check-input"
            v-model="checkAll"
            type="checkbox"
            ref="selectedAll"
        />
      </div>
    </th>

    <!-- Динамічні колонки -->
    <template v-for="column in dataTable.columns" :key="column.field">
      <th
          v-if="column.show"
          :class="getColumnClasses(column)"
          :style="getColumnStyles(column)"
      >
        <!-- Заголовок з опцією вибору колонок -->
        <div
            :class="column.headerClass || ''"
            @click="column.sort && filter.useSorting ? sortChange(column.field) : null"
        >
          <div v-if="column.selectable" class="form-check">
          <input
                class="form-check-input"
                type="checkbox"
                :value="column"
                v-model="selectedColumns"
                @click.stop
            />
            <label class="form-check-label">{{ column.title }}</label>
          </div>

          <!-- Заголовок для сортування -->
          <div v-else>
            {{ column.title }}
          </div>

          <!-- Індикатор сортування -->
          <sort-direction
              :column="column"
              :sortable="filter.useSorting"
              :sort-column="filter.currentSortColumn"
              :sort-direction="filter.currentSortDirection"
          />
        </div>
      </th>
    </template>
  </tr>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import useFilterStore from "@/stores/filter-store"
import useDataTableStore from "@/stores/data-table-store"
import useRepresentationStore from "@/stores/representation-store"
import SortDirection from "@/components/header/columns/sort-direction.vue"
import {Column} from "@/types/column"

const dataTable = useDataTableStore()
const filter = useFilterStore()
const representation = useRepresentationStore()

const checkAll = ref(false)
const selectedColumns = ref([])

watch(checkAll, (value) => {
  console.log("Всі обрані:", value)
})

const sortChange = function (field: string) {
  let direction = 'asc'
  if (field === filter.currentSortColumn && filter.currentSortDirection === 'asc') {
    direction = 'desc'
  }

  filter.currentSortColumn = field
  filter.currentSortDirection = direction
  /*let offset = (this.currentPage - 1) * this.currentPageSize
  let limit = this.currentPageSize*/
}


// Отримання класів для колонки
const getColumnClasses = (column: Column) => [
  filter.useSorting && column.sort ? 'bh-cursor-pointer' : '',
  column.position || '',
  column.exportable ? 'exportable' : '',
  column.className || ''
]

// Отримання стилів для колонки
const getColumnStyles = (column: Column) => ({
  width: column.width,
  'min-width': column.minWidth,
  'max-width': column.maxWidth
})
</script>
