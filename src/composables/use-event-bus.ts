import {ref} from 'vue'

const events = ref(new Map<string, Array<(payload: any) => void>>())

const emit = (event: string, payload?: any) => {
  const listeners = events.value.get(event)
  if (listeners) {
    listeners.forEach((callback) => callback(payload))
  }
}

const on = (event: string, callback: (payload: any) => void) => {
  if (!events.value.has(event)) {
    events.value.set(event, [])
  }
  events.value.get(event)!.push(callback)
}

const off = (event: string, callback: (payload: any) => void) => {
  const listeners = events.value.get(event)
  if (listeners) {
    events.value.set(
      event,
      listeners.filter((cb) => cb !== callback)
    )
  }
}

const eventBus = {
  emit,
  on,
  off
}

const useEventBus = () => eventBus

export default useEventBus
