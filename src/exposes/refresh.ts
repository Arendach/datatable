import useEventBus from "@/composables/use-event-bus"
import Events from "@/types/events"

const useRefresh = () => {
  useEventBus().emit(Events.ROW_DELETED)
}

export default useRefresh
