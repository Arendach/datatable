import useDataTableStore from "@/stores/data-table-store"
import {computed} from "vue"

const useSelectedColumns = () => {
  const datatable = useDataTableStore()

  return computed(() => datatable.filteredItems.filter(item => item.isSelected))
}

export default useSelectedColumns
