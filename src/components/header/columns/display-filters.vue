<template>
  <tr v-if="filter.useFiltering">
    <th class="middle" v-if="representation.hasAutoListing"></th>
    <th class="middle" v-if="representation.hasCheckbox"></th>
    <template v-for="column in dataTable.columns" :key="column.field">
      <th
        class="middle"
        v-if="column.show"
        :style="{ width: column.width, 'max-width': column.maxWidth }"
      >
        <div class="input-group input-group-xs" v-if="column.filter">
          <!-- STRING_INPUT -->
          <input
            v-if="column.filter.type === FilterType.STRING_INPUT"
            v-model.trim="column.filter.value"
            type="text"
            class="form-control form-control-xs"
            @input="eventBus.emit(Events.FILTERS_UPDATED)"
          />

          <!-- NUMBER_INPUT -->
          <input
            v-else-if="column.filter.type === FilterType.NUMBER_INPUT"
            v-model.number="column.filter.value"
            type="number"
            class="form-control form-control-xs"
            @input="eventBus.emit(Events.FILTERS_UPDATED)"
          />

          <!-- SELECT -->
          <multiselect
            v-else-if="column.filter.type === FilterType.SELECT"
            v-model="column.filter.value"
            :options="filterOptionsMap[column.field] || []"
            :searchable="true"
            label="label"
            value-prop="value"
            track-by="value"
            :object="true"
            @change="(value) => {column.filter.value = value.length ? value : null; eventBus.emit(Events.FILTERS_UPDATED)}"
          />

          <!-- SELECT_MULTIPLE -->
          <multiselect
            mode="tags"
            v-else-if="column.filter.type === FilterType.SELECT_MULTIPLE"
            :options="filterOptionsMap[column.field] || []"
            multiple
            :searchable="true"
            label="label"
            value-prop="value"
            track-by="value"
            :object="true"
            @change="(value) => {column.filter.value = value.length ? value : null; eventBus.emit(Events.FILTERS_UPDATED)}"
          />

          <!-- DATE_PICKER -->
          <vue-date-picker
            v-else-if="column.filter.type === FilterType.DATE_PICKER"
            v-model="column.filter.value"
            @update:model-value="eventBus.emit(Events.FILTERS_UPDATED)"
            :preview-format="displayDate"
            :format="displayDate"
            :auto-apply="true"
            :enable-time-picker="false"
            input-class="form-control-xs"
            :close-on-select="false"
          ></vue-date-picker>

          <!-- DATE_RANGE -->
          <vue-date-picker
            v-else-if="column.filter.type === FilterType.DATE_RANGE"
            v-model="column.filter.value"
            @update:model-value="eventBus.emit(Events.FILTERS_UPDATED)"
            :enable-time-picker="false"
            :preview-format="displayDateRange"
            :format="displayDateRange"
            range
            input-class="form-control-xs"
          ></vue-date-picker>

          <!-- SLIDER_BOOLEAN -->
          <boolean-toggle
            v-else-if="column.filter.type === FilterType.SLIDER_BOOLEAN"
            :model-value="column.filter.value"
            @update:model-value="value => { column.filter.value = value; eventBus.emit(Events.FILTERS_UPDATED) }"
          />

          <!-- SELECT_BOOLEAN -->
          <select
            v-else-if="column.filter.type === FilterType.SELECT_BOOLEAN"
            v-model="column.filter.value"
            class="form-control form-control-xs"
            @change="eventBus.emit(Events.FILTERS_UPDATED)"
          >
            <option :value="null">-</option>
            <option :value="true">Yes</option>
            <option :value="false">No</option>
          </select>

          <!-- Кнопка для додаткових фільтрів -->
          <button
            v-if="displayAdditionalFilter(column.filter.type)"
            class="btn btn-xs btn-outline-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            data-bs-auto-close="true"
          ></button>

          <!-- Додаткові фільтри -->
          <column-filter v-if="displayAdditionalFilter(column.filter.type)" :column="column"/>
        </div>
      </th>
    </template>
  </tr>
</template>

<script setup lang="ts">
import {ref, watchEffect} from "vue"
import useRepresentationStore from "@/stores/representation-store"
import useFilterStore from "@/stores/filter-store"
import useDataTableStore from "@/stores/data-table-store"
import ColumnFilter from "@/components/header/columns/column-filter.vue"
import useEventBus from "@/composables/use-event-bus"
import Events from "@/types/events"
import VueDatePicker from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css"
import displayDate from "@/utility/display-date"
import displayDateRange from "@/utility/display-date-range"
import BooleanToggle from "@/components/header/filters/boolean-toggle.vue"
import FilterType from "@/types/filter-type"
import Multiselect from "@vueform/multiselect"

const representation = useRepresentationStore()
const filter = useFilterStore()
const dataTable = useDataTableStore()
const eventBus = useEventBus()

// Створюємо об'єкт для кешування опцій фільтрів
const filterOptionsMap = ref<Record<string, any[]>>({})

// Функція для завантаження опцій
const loadFilterOptions = async (columnField: string, columnOptions: any) => {
  if (typeof columnOptions === "function") {
    try {
      const result = await columnOptions()
      filterOptionsMap.value[columnField] = Array.isArray(result) ? result : []
    } catch (error) {
      console.error(`Помилка завантаження опцій для ${columnField}:`, error)
      filterOptionsMap.value[columnField] = []
    }
  } else if (Array.isArray(columnOptions)) {
    filterOptionsMap.value[columnField] = columnOptions
  } else {
    filterOptionsMap.value[columnField] = []
  }
}

// Виконуємо завантаження опцій при зміні колонок
watchEffect(() => {
  dataTable.columns.forEach(column => {
    if (column.filter.use && column.filter.options) {
      loadFilterOptions(column.field, column.filter.options)
    }
  })
})

const displayAdditionalFilter = (filterType?: FilterType) => {
  return filterType && ![
    FilterType.SELECT_BOOLEAN,
    FilterType.SLIDER_BOOLEAN,
    FilterType.DATE_RANGE,
    FilterType.SELECT,
    FilterType.SELECT_MULTIPLE,
  ].includes(filterType)
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
