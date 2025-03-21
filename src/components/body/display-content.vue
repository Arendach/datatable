<template>
  <template v-for="(item, i) in dataTable.filteredItems" :key="item[uniqueKey] ? item[uniqueKey] : i">
    <tr
      :class="[rowClass && typeof rowClass === 'function' ? rowClass(item) : rowClass, 'exportable']"
    >
      <td v-if="representation.hasExpand" class="centered middle">
        <button @click="toggleExpand(item[uniqueKey] ? item[uniqueKey] : i)" class="btn btn-xs btn-outline-primary">
          {{ dataTable.expandedRows.includes(item[uniqueKey] ? item[uniqueKey] : i) ? "−" : "+" }}
        </button>
      </td>
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

    <transition name="expand">
      <tr v-if="dataTable.expandedRows.includes(item[uniqueKey] ? item[uniqueKey] : i)">
        <td :colspan="columnCount">
          <template v-if="slots.hasSlot('expand')">
            <template v-for="(node, index) in slots.getSlot('expand')({value: item})" :key="index">
              <div class="expanded-content">
                <component :is="node"/>
              </div>
            </template>
          </template>
        </td>
      </tr>
    </transition>
  </template>
</template>

<script setup lang="ts">
import useDataTableStore from "@/stores/data-table-store"
import {useUniqueKey} from "@/composables/use-unique-key"
import useRepresentationStore from "@/stores/representation-store"
import RenderCell from "@/components/body/render/render-cell.vue"
import {useColumnCount} from "@/composables/use-column-count"
import useSlotsStore from "@/stores/slots-store"

const representation = useRepresentationStore()
const dataTable = useDataTableStore()
const slots = useSlotsStore()
const uniqueKey = useUniqueKey()
const columnCount = useColumnCount()


const rowClass = representation.rowClass

const toggleExpand = (id: any) => {
  if (dataTable.expandedRows.includes(id)) {
    dataTable.expandedRows = dataTable.expandedRows.filter((rowId) => rowId !== id)
  } else {
    dataTable.expandedRows.push(id)
  }
}

</script>
