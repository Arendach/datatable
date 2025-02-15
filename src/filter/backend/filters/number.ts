import {Column} from "@/types/column"
import Condition from "@/types/condition"
import {FilterItem} from "@/types/filter-item"
import ColumnFilter from "@/types/column-filter"

function applyNumber(column: Column & { filter: ColumnFilter }): null | FilterItem {
  if (!column.filter.value) return null

  const condition = column.filter.condition || Condition.EQUAL
  const filterValue = parseFloat(column.filter.value)

  return {
    field: column.filter.by,
    value: filterValue,
    condition: condition,
  }
}

export default applyNumber
