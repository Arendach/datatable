import {Column} from "@/types/column"
import Condition from "@/types/condition"
import {FilterItem} from "@/types/filter-item"

function applyNumber(column: Column): null | FilterItem {
  if (!column.filterValue) return null

  const condition = column.condition || Condition.EQUAL
  const filterValue = parseFloat(column.filterValue)

  return {
    field: column.field,
    value: filterValue,
    condition: condition,
  }
}

export default applyNumber
