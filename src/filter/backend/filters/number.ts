import {Column} from "@/types/column"
import Condition from "@/types/condition"
import {FilterItem} from "@/types/filter-item"

function applyNumber(column: Column): null | FilterItem {
  if (!column.filter.value) return null

  const condition = column.filter.condition || Condition.EQUAL
  const filterValue = parseFloat(column.filter.value)

  return {
    field: column.field,
    value: filterValue,
    condition: condition,
  }
}

export default applyNumber
