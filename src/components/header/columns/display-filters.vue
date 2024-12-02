<template>
  <tr v-if="filter.useFiltering">
    <th v-if="representation.hasAutoListing"></th>
    <th v-if="representation.hasCheckbox"></th>
    <template v-for="column in dataTable.columns">
      <th
          v-if="column.show"
          :key="column.field"
          :style="{ width: column.width, 'min-width': column.minWidth, 'max-width': column.maxWidth }"
      >
        <div class="input-group" v-if="column.filter">
          <!-- Поле вводу для текстових значень -->
          <input
              v-if="column.type === ColumnType.STRING"
              v-model.trim="column.filterValue"
              type="text"
              class="form-control form-control-sm"
              @input="$emit('filterChange')"
          />

          <!-- Поле вводу для числових значень -->
          <input
              v-if="column.type === ColumnType.NUMBER"
              v-model.number.trim="column.filterValue"
              type="number"
              class="form-control form-control-sm"
              @input="$emit('filterChange')"
          />

          <!-- Поле для дати -->
          <input
              v-else-if="column.type === ColumnType.DATE"
              v-model="column.filterValue"
              type="date"
              class="form-control form-control-sm"
              @change="$emit('filterChange')"
          />

          <!-- Поле для булевих значень -->
          <select
              v-else-if="column.type === ColumnType.BOOLEAN"
              v-model="column.filterValue"
              class="form-control form-control-sm"
              @change="$emit('filterChange')"
          >
            <option :value="undefined">Всі</option>
            <option :value="true">Так</option>
            <option :value="false">Ні</option>
          </select>

          <!-- Поле для діапазону дат -->
          <div
              v-else-if="column.type === 'date-range'"
              class="input-group date-range-filter"
          >
            <div class="date-range-field">
              <label>З:</label>
              <input
                  type="date"
                  v-model="column.startDate"
                  class="form-control form-control-sm date-range-input"
                  @change="$emit('filterChange')"
              />
            </div>
            <div class="date-range-field">
              <label>По:</label>
              <input
                  type="date"
                  v-model="column.endDate"
                  class="form-control form-control-sm date-range-input"
                  @change="$emit('filterChange')"
              />
            </div>
          </div>

          <!-- Кнопка для додаткових фільтрів -->
          <button
              v-if="column.type !== 'BOOLEAN' && column.type !== 'date-range'"
              class="btn btn-sm btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-auto-close="true"
          ></button>

          <!-- Додаткові фільтри -->
          <column-filter
              v-if="column.type !== 'date-range'"
              :column="column"
              :type="column.type"
              @close="$emit('toggleFilterMenu', null)"
              @filterChange="$emit('filterChange')"
          />
        </div>
      </th>
    </template>
  </tr>
</template>

<script setup lang="ts">
import useRepresentationStore from "@/stores/representation-store"
import useFilterStore from "@/stores/filter-store"
import useDataTableStore from "@/stores/data-table-store"
import ColumnFilter from "@/components/header/columns/column-filter.vue"
import ColumnType from "@/types/column-type"

const representation = useRepresentationStore()
const filter = useFilterStore()
const dataTable = useDataTableStore()
</script>


<style>
.date-range-filter {
  display: flex;
  flex-direction: column;
  position: relative;
}

.date-range-field {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
}

.date-range-field label {
  width: 30px;
}

.date-range-input {
  width: 100%;
  max-width: 150px;
}
</style>
