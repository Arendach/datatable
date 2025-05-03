<template>
  <div class="table-responsive">
    <table class="table table-xs table-bordered" :id="props.uniqueId">
      <display-thead/>
      <display-tbody/>
      <display-tfoot/>
    </table>

    <display-pagination/>
  </div>
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
import {defineExpose, onMounted, useSlots} from "vue"
import normalizeColumn from "@/utility/normalize-column"
import {DataTableProps} from "@/types/datatable-props"
import applyNativeListeners from "@/filter/native/listeners"
import applyNativeFilter from "@/filter/native"
import applyBackendListeners from "@/filter/backend/listeners"
import applyBackendFilter from "@/filter/backend"
import useExposes from "@/exposes/index"
import useUniqueId from "@/composables/use-unique-id"
import useEventBus from "@/composables/use-event-bus"
import Events from "@/types/events"

const exposes = useExposes()
defineExpose(exposes)

const props = defineProps<DataTableProps>()
const slots = useSlots();
const uniqueId = useUniqueId()

const emit = defineEmits([
  Events.CHANGE_SELECTED_COLUMNS,
  Events.SEARCH_CHANGED,
  Events.FILTERS_UPDATED,
  Events.SORT_CHANGED,
  Events.PAGE_CHANGED,
  Events.CHANGE_SELECTED_ROWS,
  Events.ROW_EXPANDED,
  Events.ROW_COLLAPSED,
  Events.DATA_LOADED,
  Events.ROW_DELETED,
])

const eventBus = useEventBus()

onMounted(() => {
  eventBus.on(Events.CHANGE_SELECTED_COLUMNS, (payload: any) => {
    emit(Events.CHANGE_SELECTED_COLUMNS, payload)
  })

  eventBus.on(Events.SEARCH_CHANGED, (payload: any) => {
    emit(Events.SEARCH_CHANGED, payload)
  })

  eventBus.on(Events.FILTERS_UPDATED, (payload: any) => {
    emit(Events.FILTERS_UPDATED, payload)
  })

  eventBus.on(Events.SORT_CHANGED, (payload: any) => {
    emit(Events.SORT_CHANGED, payload)
  })

  eventBus.on(Events.PAGE_CHANGED, (payload: any) => {
    emit(Events.PAGE_CHANGED, payload)
  })

  eventBus.on(Events.CHANGE_SELECTED_ROWS, (payload: any) => {
    emit(Events.CHANGE_SELECTED_ROWS, payload)
  })

  eventBus.on(Events.ROW_EXPANDED, (payload: any) => {
    emit(Events.ROW_EXPANDED, payload)
  })

  eventBus.on(Events.ROW_COLLAPSED, (payload: any) => {
    emit(Events.ROW_COLLAPSED, payload)
  })

  eventBus.on(Events.ROW_DELETED, (payload: any) => {
    emit(Events.ROW_DELETED, payload)
  })
})

onMounted(() => {
  uniqueId.setUniqueId(props.uniqueId)

  // set default values for column
  const columns = props.columns.map(normalizeColumn)

  // dataTableStore
  const dataTableStore = useDataTableStore()
  dataTableStore.setColumns(columns)
  dataTableStore.setIsServerMode(props.isServerMode)

  if (props.isServerMode) {
    if (!props.fetchRows || (typeof props.fetchRows !== "string" && typeof props.fetchRows !== "function")) {
      throw new Error("Prop `fetchRows` is required and must be a string or function when `isServerMode` is true");
    }
    dataTableStore.setFetchRows(props.fetchRows);
  }

  if (!props.isServerMode) {
    if (!props.rows || (typeof props.rows !== "object" && typeof props.rows !== "function")) {
      throw new Error("Prop `rows` is required and must be an array or function when `isServerMode` is false");
    }
    dataTableStore.setRows(props.rows ?? []);
  }

  dataTableStore.init()

  // representationStore
  const representationStore = useRepresentationStore()
  representationStore.setProps(props.representation)

  // set filter store
  const filterStore = useFilterStore()
  filterStore.init(props.filter)

  // set pagination store
  const paginationStore = usePaginationStore()
  paginationStore.init(props.pagination)

  // set slots to global store
  const slotsStore = useSlotsStore()
  slotsStore.setSlots(slots)

  representationStore.setProps({hasExpand: slotsStore.hasSlot('expand')})

  if (props.isServerMode) {
    applyBackendListeners()
    applyBackendFilter(false)
  } else {
    applyNativeListeners()
    applyNativeFilter()
  }
})
</script>
