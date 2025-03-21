import useEventBus from "@/composables/use-event-bus"
import Events from "@/types/events"
import applyBackendFilter from "@/filter/backend/index"
import usePaginationStore from "@/stores/pagination-store"

const applyBackendListeners = () => {
  const pagination = usePaginationStore()

  useEventBus().on(Events.SEARCH_CHANGED, () => {
    pagination.page = 1
    applyBackendFilter(true)
  })

  useEventBus().on(Events.FILTERS_UPDATED, () => {
    pagination.page = 1
    applyBackendFilter(true)
  })

  useEventBus().on(Events.SORT_CHANGED, () => {
    pagination.page = 1
    applyBackendFilter(false)
  })

  useEventBus().on(Events.PAGE_CHANGED, () => {
    applyBackendFilter(false)
  })

  useEventBus().on(Events.ROW_DELETED, () => {
    applyBackendFilter(false)
  })
}

export default applyBackendListeners
