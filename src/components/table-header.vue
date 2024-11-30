<template>
  <div class="container-fluid">
    <div class="row" style="padding: 10px; border: 1px solid #ccc; border-bottom: none">
      <div class="col">
        <slot name="control"></slot>
      </div>
      <div class="col" style="text-align: right">
        <!-- Вибір колонок -->
        <div class="btn-group btn-group-sm" style="margin-right: 10px;">
          <button type="button" class="btn btn-outline-primary dropdown-toggle btn-sm" data-bs-toggle="dropdown"
                  aria-expanded="false">
            <i class="fa fa-eye"></i>
          </button>
          <ul class="dropdown-menu">
            <li class="dropdown-item" v-if="representationStore.autoListing">
<!--              <input type="checkbox" @change="saveSelectedColumns">-->
              <span style="margin-left: 5px;">№ з/п</span>
            </li>
            <li class="dropdown-item" v-if="representationStore.hasCheckbox">
<!--              <input type="checkbox" @change="saveSelectedColumns"> -->
              <span style="margin-left: 5px;">Чекбокс</span>
            </li>
            <li v-for="column in dataTableStore.columns" class="dropdown-item">
<!--              <input type="checkbox" v-model="column.show" @change="saveSelectedColumns">-->
              <span style="margin-left: 5px;" v-text="column.title"></span>
            </li>
          </ul>
        </div>

        <!-- Експорт в ЕКСЕЛЬ-->
<!--        <button @click="exportToEXCEL" title="Експортувати в EXCEL" class="btn btn-outline-success btn-sm">
          <i class="fa fa-file-excel"></i>
        </button>-->
      </div>
    </div>
  </div>
</template>

<script setup>
import {dataTableStore} from "@/stores/data-table-store.ts"
import {representationStore} from "@/stores/representation-store.ts"
</script>
