<template>
  <tr>
    <th :colspan="columnCount">
      <div class="container-fluid">
        <div class="row p-2">
          <div class="col">
            <display-selected-filters/>

            <slot name="control"></slot>
          </div>

          <div class="col d-flex align-items-center gap-2">
            <!-- Search field -->
            <div class="input-group input-group-xs flex-grow-1">
              <input
                type="text"
                class="form-control form-control-xs"
                placeholder="Please enter text to filter"
                :value="filter.search"
                @input="changeSearch"
              >
              <button class="btn btn-outline-secondary" type="button">Search</button>
            </div>

            <!-- Select columns -->
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary dropdown-toggle btn-xs"
                data-bs-toggle="dropdown"
              >
                Columns
              </button>
              <ul class="dropdown-menu">
<!--                <li class="dropdown-item">
                  <input type="checkbox" v-model="hasAutoListing">
                  <span class="ms-2">№ з/п</span>
                </li>-->
                <li class="dropdown-item">
                  <input type="checkbox" v-model="hasCheckbox">
                  <span class="ms-2">Чекбокс</span>
                </li>
                <li
                  v-for="column in dataTable.columns"
                  :key="column.field"
                  class="dropdown-item"
                >
                  <input type="checkbox" v-model="column.show" @change="dataTable.saveColumns()">
                  <span class="ms-2" v-text="column.title"></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </th>
  </tr>
</template>

<script setup lang="ts">
import useDataTableStore from "@/stores/data-table-store"
import useRepresentationStore from "@/stores/representation-store"
import useFilterStore from "@/stores/filter-store"
import {ref, watch} from "vue"
import {useColumnCount} from "@/composables/use-column-count"
import useEventBus from "@/composables/use-event-bus"
import Events from "@/types/events"
import DisplaySelectedFilters from "@/components/header/display-selected-filters.vue"

const dataTable = useDataTableStore()
const representation = useRepresentationStore()
const filter = useFilterStore()
const eventBus = useEventBus()

const hasCheckbox = ref(representation.hasCheckbox)
const hasAutoListing = ref(representation.hasAutoListing)
const columnCount = useColumnCount()

watch(hasCheckbox, (value: boolean) => representation.hasCheckbox = value)
watch(hasAutoListing, (value: boolean) => representation.hasAutoListing = value)

const changeSearch = (event) => {
  filter.setSearch(event.target.value)
  eventBus.emit(Events.SEARCH_CHANGED)
}
</script>
