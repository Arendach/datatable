import useEventBus from "@/composables/use-event-bus"
import applyNativeFilter from "@/filter/native/index"
import Events from "@/types/events"

const applyNativeListeners = () => {
  useEventBus().on(Events.SEARCH_CHANGED, applyNativeFilter)
  useEventBus().on(Events.FILTERS_UPDATED, applyNativeFilter)
  useEventBus().on(Events.SORT_CHANGED, applyNativeFilter)
  useEventBus().on(Events.PAGE_CHANGED, applyNativeFilter)
}

export default applyNativeListeners
