import store from 'store2'
import useUniqueId from "@/composables/use-unique-id"

const {uniqueId} = useUniqueId()

export default function useStore() {

  function load(key: string) {
    return store.get(`${uniqueId.value}.${key}`)
  }

  function save(key: string, data: any) {
    store.set(`${uniqueId.value}.${key}`, data)
  }

  function remove(key: string) {
    store.remove(`${uniqueId.value}.${key}`)
  }

  return {
    load,
    save,
    remove
  }
}
