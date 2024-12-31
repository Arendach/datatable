<template>
  <td
      v-if="column.show"
      :key="column.field"
      :class="[
        typeof cellClass === 'function' ? cellClass(item) : '',
        column.exportable ? 'exportable' : '',
        column.className ? column.className : '',
      ]"
  >
    <!-- Slot render -->
    <template v-if="slots.hasSlot(column.field)">
      <template v-for="(node, index) in slots.getSlot(column.field)({value: item})" :key="index">
        <component :is="node"/>
      </template>
    </template>

    <!-- Callback column render -->
    <div v-else-if="column.cellRender" v-html="column.cellRender(item)"></div>

    <!-- Boolean value render -->
    <template v-else-if="column.type === ColumnType.BOOLEAN">
      <render-boolean :is-check="displayCellValue(item, column.field)"/>
    </template>

    <!-- Date render -->
    <template v-else-if="column.type === ColumnType.DATE || column.type === ColumnType.DATE_RANGE">
      <render-date :name="column.field" :item="item"></render-date>
    </template>

    <!-- Native text render -->
    <template v-else>
      {{ displayCellValue(item, column.field) }}
    </template>
  </td>
</template>

<script setup lang="ts">
import displayCellValue from "@/utility/display-cell-value"
import RenderBoolean from "@/components/body/render/boolean.vue"
import RenderDate from "@/components/body/render/date.vue"
import {Column} from "@/types/column"
import ColumnType from "@/types/column-type"
import useRepresentationStore from "@/stores/representation-store"
import useSlotsStore from "@/stores/slots-store"

defineProps<{
  column: Column,
  item: Object
}>()

const representation = useRepresentationStore()
const slots = useSlotsStore()

const cellClass = representation.cellClass

</script>
