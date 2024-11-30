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
    <template v-if="$slots[column.field]">
      <slot :name="column.field" :value="item"></slot>
    </template>

    <!-- Callback column render -->
    <div v-else-if="column.cellRender" v-html="column.cellRender(item)"></div>

    <!-- Boolean value render -->
    <template v-else-if="column.type === ColumnType.BOOLEAN">
      <render-boolean :is-check="displayCellValue(item, column.field)"/>
    </template>

    <!-- Date render -->
    <template v-else-if="column.type === ColumnType.DATE">
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

const representation = useRepresentationStore()

const cellClass = representation.cellClass

defineProps<{
  column: Column,
  item: Object
}>()
</script>
