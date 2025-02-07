import {Column} from "@/types/column"
import {FilterItem} from "@/types/filter-item"
import Condition from "@/types/condition"

function applyBoolean(column: Column): null | FilterItem {
  if (column.filter.value === true || column.filter.value === false) {
    return {
      field: column.field,
      condition: Condition.EQUAL,
      value: column.filter.value
    }
  }
  return null
}

export default applyBoolean
