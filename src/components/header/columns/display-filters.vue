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
              @input="eventBus.emit(Events.FILTERS_UPDATED)"
          />

          <!-- Поле вводу для числових значень -->
          <input
              v-if="column.type === ColumnType.NUMBER"
              v-model.number.trim="column.filterValue"
              type="number"
              class="form-control form-control-sm"
              @input="eventBus.emit(Events.FILTERS_UPDATED)"
          />

          <!-- Поле для дати -->
          <vue-date-picker
            v-else-if="column.type === ColumnType.DATE"
            v-model="column.filterValue"
            @change="eventBus.emit(Events.FILTERS_UPDATED)"
            :preview-format="displayDate"
            :format="displayDate"
            :auto-apply="true"
            :enable-time-picker="false"
          ></vue-date-picker>

          <!-- Поле для булевих значень -->
          <select
              v-else-if="column.type === ColumnType.BOOLEAN"
              v-model="column.filterValue"
              class="form-control form-control-sm"
              @change="eventBus.emit(Events.FILTERS_UPDATED)"
          >
            <option :value="undefined">Всі</option>
            <option :value="true">Так</option>
            <option :value="false">Ні</option>
          </select>

          <!-- Поле для діапазону дат -->
          <vue-date-picker
            v-else-if="column.type === ColumnType.DATE_RANGE"
            v-model="column.filterValue"
            @change="eventBus.emit(Events.FILTERS_UPDATED)"
            :enable-time-picker="false"
            :preview-format="displayDateRange"
            :format="displayDateRange"
            range
          ></vue-date-picker>

          <!-- Кнопка для додаткових фільтрів -->
          <button
              v-if="column.type !== ColumnType.BOOLEAN && column.type !== ColumnType.DATE_RANGE"
              class="btn btn-sm btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-auto-close="true"
          ></button>

          <!-- Додаткові фільтри -->
          <column-filter v-if="column.type !== ColumnType.DATE_RANGE" :column="column"/>
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
import useEventBus from "@/composables/use-event-bus"
import Events from "@/types/events"
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import displayDate from "@/utility/display-date"
import displayDateRange from "@/utility/display-date-range"

const representation = useRepresentationStore()
const filter = useFilterStore()
const dataTable = useDataTableStore()
const eventBus = useEventBus()
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
