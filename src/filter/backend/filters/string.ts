import {Column} from "@/types/column"
import Condition from "@/types/condition"
import {FilterItem} from "@/types/filter-item"

function applyString(column: Column): null | FilterItem {
  if (!column.filterValue) return null

  const condition = column.condition || Condition.CONTAIN
  const filterValue = column.filterValue

  return {
    field: column.field,
    value: filterValue,
    condition: condition,
  }
}

export default applyString
