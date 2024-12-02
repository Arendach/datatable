<template>
  <div class="container-fluid">
    <div class="row p-2 border border border-1 border-bottom-0">
      <!-- Перша колонка -->
      <div class="col">
        <slot name="control"></slot>
      </div>

      <!-- Друга колонка -->
      <div class="col d-flex align-items-center gap-2">
        <!-- Поле для пошуку -->
        <div class="input-group input-group-sm flex-grow-1">
          <input
            type="text"
            class="form-control form-control-sm"
            placeholder="Please enter text to filter"
            v-model="filter.search"
          >
          <button class="btn btn-outline-secondary" type="button">Search</button>
        </div>

        <!-- Вибір колонок -->
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

        <!-- Експорт в Excel -->
        <button
          @click="exportToEXCEL"
          title="Експортувати в EXCEL"
          class="btn btn-outline-success btn-sm"
        >
          Export
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useDataTableStore from "@/stores/data-table-store"
import useRepresentationStore from "@/stores/representation-store"
import useFilterStore from "@/stores/filter-store"
import { ref, watch } from "vue"
import exportToEXCEL from "@/utility/export-to-excel"
import excelImage from "@/assets/images/excel.svg"

// Стан таблиці
const dataTable = useDataTableStore()
const representation = useRepresentationStore()
const filter = useFilterStore()

// Стан чекбоксів
const hasCheckbox = ref(representation.hasCheckbox)
const hasAutoListing = ref(representation.hasAutoListing)

// Синхронізація стану чекбоксів з глобальним сховищем
watch(hasCheckbox, (value) => representation.setHasCheckbox(value))
watch(hasAutoListing, (value) => representation.setHasAutoListing(value))
</script>
