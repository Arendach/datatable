<template>
  <div class="table-responsive">
    <table class="table table-sm table-bordered" :id="props.uniqueId">
      <display-thead/>
      <display-tbody/>
      <display-tfoot/>
    </table>
  </div>
  <display-pagination/>
</template>

<script setup lang="ts">
import DisplayTbody from "@/components/body/display-tbody.vue"
import DisplayTfoot from "@/components/footer/display-tfoot.vue"
import DisplayThead from "@/components/header/display-thead.vue"
import DisplayPagination from "@/components/pagination/display-pagination.vue"
import useDataTableStore from "@/stores/data-table-store"
import useRepresentationStore from "@/stores/representation-store"
import useSlotsStore from "@/stores/slots-store"
import useFilterStore from "@/stores/filter-store"
import usePaginationStore from "@/stores/pagination-store"
import {useSlots} from "vue"
import normalizeColumn from "@/utility/normalize-column"
import {DataTableProps} from "@/types/datatable-props"

const props = defineProps<DataTableProps>()

// set default values for column
props.columns.map(normalizeColumn)

// dataTableStore
const dataTableStore = useDataTableStore()
dataTableStore.setColumns(props.columns)
dataTableStore.setRows(props.rows)
dataTableStore.setIsServerMode(props.isServerMode)

// representationStore
const representationStore = useRepresentationStore()
representationStore.setProps(props.representation)

// set filter store
const filterStore = useFilterStore()
filterStore.setProps(props.filter)

// set pagination store
const paginationStore = usePaginationStore()
paginationStore.setProps(props.pagination)

// set slots to global store
const slotsStore = useSlotsStore()
slotsStore.setSlots(useSlots())

</script>

<style>
@import "@/assets/app.css";
</style>
