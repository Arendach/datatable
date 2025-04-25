import useDataTableStore from "@/stores/data-table-store"
import {computed} from "vue"

const useSelected = () => {
  const datatable = useDataTableStore()

  return computed(() => datatable.filteredItems.filter(item => item.isSelected))
}

export default useSelected
