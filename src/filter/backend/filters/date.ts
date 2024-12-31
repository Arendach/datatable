import {Column} from "@/types/column"
import Condition from "@/types/condition"
import {FilterItem} from "@/types/filter-item"

function applyDate(column: Column): null | FilterItem {
  if (!column.filterValue) return null

  if (!column.condition) column.condition = Condition.EQUAL

  return {
    field: column.field,
    condition: column.condition,
    value: column.filterValue
  }
}

export default applyDate
