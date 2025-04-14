<template>
  <td
    style="vertical-align: middle"
    v-if="column.show"
    :key="column.field"
    :class="[typeof cellClass === 'function' ? cellClass(item) : '', column.className ? column.className : '']"
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
    <template v-else-if="column.type === ColumnType.DATE">
      <render-date :name="column.field" :item="item"/>
    </template>

    <template v-else-if="column.type === ColumnType.PICTURE">
      <render-picture :url="displayCellValue(item, column.field)"/>
    </template>

    <!-- Native text render -->
    <template v-else>
      <smart-text :value="displayCellValue(item, column.field)" :html="column.html"/>
    </template>
  </td>
</template>

<script setup lang="ts">
import displayCellValue from "@/utility/display-cell-value"
import RenderBoolean from "@/components/body/render/boolean.vue"
import RenderDate from "@/components/body/render/date.vue"
import RenderPicture from "@/components/body/render/picture.vue"
import {Column} from "@/types/column"
import ColumnType from "@/types/column-type"
import useRepresentationStore from "@/stores/representation-store"
import useSlotsStore from "@/stores/slots-store"
import SmartText from "@/components/body/render/smart-text.vue"

defineProps<{
  column: Column,
  item: Object
}>()

const representation = useRepresentationStore()
const slots = useSlotsStore()

const cellClass = representation.cellClass

</script>
