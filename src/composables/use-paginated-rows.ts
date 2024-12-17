import usePaginationStore from "@/stores/pagination-store"
import useDataTableStore from "@/stores/data-table-store"

function usePaginationRows(): Array<Object> {
  const paginate = usePaginationStore()
  const dataTable = useDataTableStore()

  return dataTable.filteredItems.slice(paginate.offset - 1, <number>paginate.limit)
}

export default usePaginationRows
