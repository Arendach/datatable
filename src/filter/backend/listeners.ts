import useEventBus from "@/composables/use-event-bus"
import Events from "@/types/events"
import applyBackendFilter from "@/filter/backend/index"

const applyBackendListeners = () => {
  useEventBus().on(Events.SEARCH_CHANGED, applyBackendFilter)
  useEventBus().on(Events.FILTERS_UPDATED, applyBackendFilter)
  useEventBus().on(Events.SORT_CHANGED, applyBackendFilter)
  useEventBus().on(Events.PAGE_CHANGED, applyBackendFilter)
}

export default applyBackendListeners
