<template>
  <div class="container-fluid">
    <div class="row" style="padding: 10px; border: 1px solid #ccc; border-bottom: none">
      <div class="col">
        <slot name="control"></slot>
      </div>
      <div class="col" style="text-align: right">
        <!-- Вибір колонок -->
        <div class="btn-group btn-group-sm" style="margin-right: 10px;">
          <button type="button" class="btn btn-outline-primary dropdown-toggle btn-sm" data-bs-toggle="dropdown">
            <i class="fa fa-eye"></i>
          </button>
          <ul class="dropdown-menu">
            <li class="dropdown-item">
              <input type="checkbox" v-model="hasAutoListing">
              <span style="margin-left: 5px;">№ з/п</span>
            </li>
            <li class="dropdown-item">
              <input type="checkbox" v-model="hasCheckbox">
              <span style="margin-left: 5px;">Чекбокс</span>
            </li>
            <li v-for="column in dataTable.columns" class="dropdown-item">
              <input type="checkbox" v-model="column.show">
              <span style="margin-left: 5px;" v-text="column.title"></span>
            </li>
          </ul>
        </div>

        <!-- Експорт в ЕКСЕЛЬ-->
        <button @click="exportToEXCEL" title="Експортувати в EXCEL" class="btn btn-outline-success btn-sm">
          <img :src="excelImage" alt="excel image" height="20px">
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useDataTableStore from "@/stores/data-table-store"
import useRepresentationStore from "@/stores/representation-store"
import {ref, watch} from "vue"
import exportToEXCEL from "@/utility/export-to-excel"
import excelImage from '@/assets/images/excel.svg'

const dataTable = useDataTableStore()
const representation = useRepresentationStore()

const hasCheckbox = ref(representation.hasCheckbox)
const hasAutoListing = ref(representation.hasAutoListing)

watch(hasCheckbox, (value: Boolean) => {
  representation.setHasCheckbox(value)
})

watch(hasAutoListing, (value: Boolean) => {
  representation.setHasAutoListing(value)
})

</script>
