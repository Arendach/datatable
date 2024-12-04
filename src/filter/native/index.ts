import useDataTableStore from "@/stores/data-table-store"
import searching from "@/filter/native/searching"
import sorting from "@/filter/native/sorting"
import filtering from "@/filter/native/filter"

function applyFilter() {
  const dataTable = useDataTableStore()
  let rows = dataTable.rows

  rows = filtering(rows)
  rows = searching(rows)
  rows = sorting(rows)

  return rows
}

export default applyFilter
