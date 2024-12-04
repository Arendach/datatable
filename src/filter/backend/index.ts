import axios from "axios"
import {ref} from "vue"
import useQueryBuilder from "./useQueryBuilder"
import useEventBus from "./useEventBus"

function applyFilter(endpoint: string) {
  const {emit, on} = useEventBus()
  const rows = ref([])
  const loading = ref(false)
  const total = ref(0)
  const queryParams = ref({})

  const fetchData = async () => {
    loading.value = true
    const queryString = useQueryBuilder(queryParams.value)
    try {
      const response = await axios.get(`${endpoint}?${queryString}`)
      rows.value = response.data.data // Адаптуйте під вашу структуру
      total.value = response.data.total // Загальна кількість записів
    } catch (err) {
      console.error("Error fetching data:", err)
    } finally {
      loading.value = false
    }
  }

  // Слухаємо події
  on("filters-updated", (filters) => {
    queryParams.value = {...queryParams.value, ...filters}
    fetchData()
  })

  return {
    rows,
    loading,
    total,
    fetchData,
  }
}

export default applyFilter
