<template>
  <template v-if="dataTable.filterRowCount">
    <tr
      v-for="(item, i) in dataTable.paginatedItems"
      :key="item[uniqueKey] ? item[uniqueKey] : i"
      :class="[rowClass && typeof rowClass === 'function' ? rowClass(item) : rowClass, useSelectRowOnClick ? 'bh-cursor-pointer' : '', 'exportable']"
      @click="rowClick(item, i)"
    >
      <td v-if="representation.hasAutoListing" v-text="i + 1" class="centered exportable"></td>
      <td v-if="representation.hasCheckbox" class="centered">
        <div class="form-check">
          <input
            class="form-check-input"
            :checked="dataTable.isSelected(item)"
            @change="dataTable.toggleSelection(item)"
            type="checkbox"
            @click.stop/>
        </div>
      </td>
      <template v-for="col in dataTable.columns">
        <render-cell :item="item" :column="col"/>
      </template>
    </tr>
  </template>
</template>

<script setup lang="ts">
import useDataTableStore from "@/stores/data-table-store"
import {useUniqueKey} from "@/composables/use-unique-key"
import useRepresentationStore from "@/stores/representation-store"
import RenderCell from "@/components/body/render/render-cell.vue"

const representation = useRepresentationStore()
const dataTable = useDataTableStore()
const uniqueKey = useUniqueKey()

const rowClass = representation.rowClass
const useSelectRowOnClick = representation.useSelectRowOnClick


const rowClick = (item, index) => {
  // todo: write logic
}

</script>
