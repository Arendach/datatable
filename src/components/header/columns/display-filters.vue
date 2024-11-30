<template>
  <tr v-if="filter.useFiltering">
    <th v-if="representation.hasAutoListing"></th>
    <th v-if="representation.hasCheckbox"></th>
    <template v-for="column in dataTable.columns">
      <th
          v-if="column.show"
          :key="column.field"
          :style="{width: column.width, 'min-width': column.minWidth,'max-width': column.maxWidth,}"
      >
        <div class="input-group" v-if="column.filter">
          <input v-if="column.type === ColumnType.STRING" v-model.trim="column.filterValue" type="text"
                 class="form-control form-control-sm" @keyup="$emit('filterChange')"/>
          <input v-if="column.type === ColumnType.NUMBER" v-model.number.trim="column.filterValue" type="number"
                 class="form-control form-control-sm" @keyup="$emit('filterChange')"/>
          <input v-else-if="column.type === ColumnType.DATE" v-model="column.filterValue" type="date"
                 class="form-control form-control-sm" @change="$emit('filterChange')"/>
          <select v-else-if="column.type === ColumnType.BOOLEAN" v-model="column.filterValue"
                  class="form-control form-control-sm" @change="$emit('filterChange')" @click="isOpenFilter = null">
            <option :value="undefined">Всі</option>
            <option :value="true">Так</option>
            <option :value="false">Ні</option>
          </select>
          <template v-else-if="column.type === 'date-range'">
            <div class="input-group date-range-filter">
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
          </template>

          <button
              v-if="column.type !== 'bool' && column.type !== 'date-range'"
              class="btn btn-sm btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-auto-close="true"
          ></button>

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
import {ref} from "vue"
import ColumnFilter from "@/components/header/columns/column-filter.vue"
import ColumnType from "@/types/column-type"

const representation = useRepresentationStore()
const filter = useFilterStore()
const dataTable = useDataTableStore()

const isOpenFilter = ref(null)
</script>
