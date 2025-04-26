import {ref} from 'vue'

const uniqueId = ref<string | null>(null)

const useUniqueId = () => {
  function setUniqueId(id: string) {
    uniqueId.value = id
  }

  return {
    uniqueId,
    setUniqueId,
  }
}

export default useUniqueId
