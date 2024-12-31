import {Column} from "@/types/column"
import {FilterItem} from "@/types/filter-item"
import Condition from "@/types/condition"

function applyBoolean(column: Column): null | FilterItem {
  if (column.filterValue === true || column.filterValue === false) {
    return {
      field: column.field,
      condition: Condition.EQUAL,
      value: column.filterValue
    }
  }
  return null
}

export default applyBoolean
