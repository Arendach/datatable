import {ref} from "vue"

const events = ref(new Map<string, Array<Function>>())

const emit = (event: string, payload?: any) => {
  if (events.value.has(event)) {
    events.value.get(event)!.forEach((callback) => callback(payload))
  }
}

const on = (event: string, callback: Function) => {
  if (!events.value.has(event)) {
    events.value.set(event, [])
  }
  events.value.get(event)!.push(callback)
}

const off = (event: string, callback: Function) => {
  if (events.value.has(event)) {
    const updatedListeners = events.value
      .get(event)!
      .filter((listener) => listener !== callback)
    events.value.set(event, updatedListeners)
  }
}

export default function useEventBus() {
  return {emit, on, off}
}
