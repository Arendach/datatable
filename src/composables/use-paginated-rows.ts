import usePaginateStore from "@/stores/paginate-store"
import useDataTableStore from "@/stores/data-table-store"

function usePaginationRows(): Array<Object> {
  const paginate = usePaginateStore()
  const dataTable = useDataTableStore()

  return dataTable.filterItems.slice(paginate.offset - 1, <number>paginate.limit)
}

export default usePaginationRows
