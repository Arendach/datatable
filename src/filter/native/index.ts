import useDataTableStore from "@/stores/data-table-store"
import searching from "@/filter/native/searching"
import sorting from "@/filter/native/sorting"
import filtering from "@/filter/native/filter"
import paginate from "@/filter/native/paginate"

function applyNativeFilter() {
  const dataTable = useDataTableStore()
  let rows = dataTable.rows

  rows = filtering(rows)
  rows = searching(rows)
  rows = sorting(rows)

  dataTable.filteredItems = rows

  rows = paginate(rows)

  dataTable.paginatedItems = rows
}

export default applyNativeFilter
