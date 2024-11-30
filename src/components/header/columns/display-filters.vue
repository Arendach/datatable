<template>
  <tr v-if="representation.getHasFilter && !isFooter">
    <th v-if="representation.hasAutoListing"></th>
    <th v-if="representation.hasCheckbox"></th>
    <template v-for="col in dataTable.columns">
      <th
          v-if="col.show"
          :key="col.field"
          :style="{width: col.width, 'min-width': col.minWidth,'max-width': col.maxWidth,}"
      >
        <div class="input-group" v-if="col.filter">
          <input v-if="col.type === 'string'" v-model.trim="col.value" type="text" class="form-control form-control-sm" @keyup="$emit('filterChange')"/>
          <input v-if="col.type === 'number'" v-model.number.trim="col.value" type="number" class="form-control form-control-sm" @keyup="$emit('filterChange')"/>
          <input v-else-if="col.type === 'date'" v-model="col.value" type="date" class="form-control form-control-sm" @change="$emit('filterChange')"/>
          <select v-else-if="col.type === 'bool'" v-model="col.value" class="form-control form-control-sm" @change="$emit('filterChange')" @click="isOpenFilter = null">
            <option :value="undefined">Всі</option>
            <option :value="true">Так</option>
            <option :value="false">Ні</option>
          </select>
          <template v-else-if="col.type === 'date-range'">
            <div class="input-group date-range-filter">
              <div class="date-range-field">
                <label>З:</label>
                <input
                    type="date"
                    v-model="col.startDate"
                    class="form-control form-control-sm date-range-input"
                    @change="$emit('filterChange')"
                />
              </div>
              <div class="date-range-field">
                <label>По:</label>
                <input
                    type="date"
                    v-model="col.endDate"
                    class="form-control form-control-sm date-range-input"
                    @change="$emit('filterChange')"
                />
              </div>
            </div>
          </template>

          <button
              v-if="col.type !== 'bool' && col.type !== 'date-range'"
              class="btn btn-sm btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-auto-close="true"
          ></button>

          <column-filter v-if="col.type !== 'date-range'"
                         :column="col"
                         :type="col.type"
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

const representation = useRepresentationStore()
const filter = useFilterStore()
const dataTable = useDataTableStore()

const isOpenFilter = ref(null)
</script>
