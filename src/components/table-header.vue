<template>
  <tr>
    <th :colspan="columnCount">
      <div class="container-fluid">
        <div class="row p-2">
          <div class="col">
            <slot name="control"></slot>
          </div>

          <div class="col d-flex align-items-center gap-2">
            <!-- Search field -->
            <div class="input-group input-group-sm flex-grow-1">
              <input
                type="text"
                class="form-control form-control-sm"
                placeholder="Please enter text to filter"
                v-model="filter.search"
                @input="eventBus.emit(Events.SEARCH_CHANGED)"
              >
              <button class="btn btn-outline-secondary" type="button">Search</button>
            </div>

            <!-- Select columns -->
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary dropdown-toggle btn-sm"
                data-bs-toggle="dropdown"
              >
                Columns
              </button>
              <ul class="dropdown-menu">
                <li class="dropdown-item">
                  <input type="checkbox" v-model="hasAutoListing">
                  <span class="ms-2">№ з/п</span>
                </li>
                <li class="dropdown-item">
                  <input type="checkbox" v-model="hasCheckbox">
                  <span class="ms-2">Чекбокс</span>
                </li>
                <li
                  v-for="column in dataTable.columns"
                  :key="column.field"
                  class="dropdown-item"
                >
                  <input type="checkbox" v-model="column.show">
                  <span class="ms-2" v-text="column.title"></span>
                </li>
              </ul>
            </div>

            <!-- Export to Excel -->
            <button
              @click="exportToEXCEL"
              title="Export to EXCEL"
              class="btn btn-outline-success btn-sm"
            >
              Export
            </button>
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
import exportToEXCEL from "@/utility/export-to-excel"
import {useColumnCount} from "@/composables/use-column-count"
import useEventBus from "@/composables/use-event-bus"

const dataTable = useDataTableStore()
const representation = useRepresentationStore()
const filter = useFilterStore()
const eventBus = useEventBus()

const hasCheckbox = ref(representation.hasCheckbox)
const hasAutoListing = ref(representation.hasAutoListing)
const columnCount = useColumnCount()

watch(hasCheckbox, (value: boolean) => representation.hasCheckbox = value)
watch(hasAutoListing, (value: boolean) => representation.hasAutoListing = value)
</script>
