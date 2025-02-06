<template>
  <tr v-if="filter.useFiltering">
    <th v-if="representation.hasAutoListing"></th>
    <th v-if="representation.hasCheckbox"></th>
    <template v-for="column in dataTable.columns">
      <th
        v-if="column.show"
        :key="column.field"
        :style="{ width: column.width, 'max-width': column.maxWidth }"
      >
        <div class="input-group" v-if="column.filter">
          <!-- STRING_INPUT -->
          <input
            v-if="column.filterType === FilterType.STRING_INPUT"
            v-model.trim="column.filterValue"
            type="text"
            class="form-control form-control-xs"
            @input="eventBus.emit(Events.FILTERS_UPDATED)"
          />

          <!-- NUMBER_INPUT -->
          <input
            v-if="column.filterType === FilterType.NUMBER_INPUT"
            v-model.number.trim="column.filterValue"
            type="number"
            class="form-control form-control-xs"
            @input="eventBus.emit(Events.FILTERS_UPDATED)"
          />

          <!-- DATE_PICKER -->
          <vue-date-picker
            v-else-if="column.filterType === FilterType.DATE_PICKER"
            v-model="column.filterValue"
            @change="eventBus.emit(Events.FILTERS_UPDATED)"
            :preview-format="displayDate"
            :format="displayDate"
            :auto-apply="true"
            :enable-time-picker="false"
            input-class="form-control-xs"
          ></vue-date-picker>

          <!-- DATE_RANGE -->
          <vue-date-picker
            v-else-if="column.filterType == FilterType.DATE_RANGE"
            v-model="column.filterValue"
            @change="eventBus.emit(Events.FILTERS_UPDATED)"
            :enable-time-picker="false"
            :preview-format="displayDateRange"
            :format="displayDateRange"
            range
            input-class="form-control-xs"
          ></vue-date-picker>

          <!-- SLIDER_BOOLEAN -->
          <boolean-toggle
            v-else-if="column.filterType === FilterType.SLIDER_BOOLEAN"
            :model-value="column.filterValue"
            @update:modelValue="value => {column.filterValue = value; eventBus.emit(Events.FILTERS_UPDATED)}"/>

          <!-- SELECT_BOOLEAN -->
          <select
            v-else-if="column.filterType === FilterType.SELECT_BOOLEAN"
            v-model="column.filterValue"
            class="form-control form-control-xs"
            @change="eventBus.emit(Events.FILTERS_UPDATED)"
          >
            <option :value="undefined">-</option>
            <option :value="true">Так</option>
            <option :value="false">Ні</option>
          </select>

          <!-- Кнопка для додаткових фільтрів -->
          <button
            v-if="column.type !== ColumnType.BOOLEAN && column.filterType !== FilterType.DATE_RANGE"
            class="btn btn-xs btn-outline-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            data-bs-auto-close="true"
          ></button>

          <!-- Додаткові фільтри -->
          <column-filter v-if="column.type !== ColumnType.BOOLEAN && column.filterType !== FilterType.DATE_RANGE" :column="column"/>
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
import BooleanToggle from "@/components/header/filters/boolean-toggle.vue";
import FilterType from "@/types/filter-type";

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
