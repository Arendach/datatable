<template>
  <tr class="exportable">
    <th v-if="representation.hasAutoListing" class="centered exportable">№</th>
    <th v-if="representation.hasCheckbox" class="centered">
      <div class="form-check">
        <input class="form-check-input" v-model="checkAll" ref="selectedAll" type="checkbox"/>
      </div>
    </th>
    <template v-for="col in dataTable.columns">
      <th
          v-if="col.show"
          :key="col.field"
          :class="[
            filter.useSorting && col.sort ? 'bh-cursor-pointer' : '',
            col.position ? col.position : '',
            col.exportable ? 'exportable' : '',
            col.className ? col.className : '',
          ]"
          :style="{
            width: col.width,
            'min-width': col.minWidth,
            'max-width': col.maxWidth,
          }"
      >
        <div :class="[col.headerClass ? col.headerClass : '']" @click="sortChange(col.field)">
          <div class="form-check" v-if="col.selectable">
            <input class="form-check-input" type="checkbox" :value="col" v-model="selectedColumns" @click.stop>
            <label class="form-check-label">{{ col.title }}</label>
            <sort-direction
                :column="col"
                :sortable="filter.useSorting"
                :sort-column="filter.currentSortColumn"
                :sort-direction="filter.currentSortDirection"
            />
          </div>
          <div v-else>
            {{ col.title }}
            <sort-direction
                :column="col"
                :sortable="filter.useSorting"
                :sort-column="filter.currentSortColumn"
                :sort-direction="filter.currentSortDirection"
            />
          </div>
        </div>
      </th>
    </template>
  </tr>
</template>

<script setup lang="ts">
import useFilterStore from "@/stores/filter-store"
import useDataTableStore from "@/stores/data-table-store"
import useRepresentationStore from "@/stores/representation-store"
import SortDirection from "@/components/header/columns/sort-direction.vue"
import {ref, watch} from "vue"

const dataTable = useDataTableStore()
const filter = useFilterStore()
const representation = useRepresentationStore()

const checkAll = ref(false)
const selectedColumns = ref([])

watch(checkAll, (value) => {
  console.log(value)
})

const sortChange = function (field: string) {
  let direction = 'asc'
  if (field === filter.currentSortColumn && filter.currentSortDirection === 'asc') {
    direction = 'desc'
  }

  filter.currentSortColumn = field
  filter.currentSortDirection = direction
  /*let offset = (this.currentPage - 1) * this.currentPageSize
  let limit = this.currentPageSize*/


 /* if (!this.persistSelection) {
    this.selectAll(false)
  }*/

  /*if (this.isServerMode) {
    this.changeForServer('sort')
  } else {
    this.$emit('sortChange', {offset, limit, field, direction})
  }*/
}
</script>
