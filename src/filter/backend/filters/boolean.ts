import {Column} from "@/types/column"
import {FilterItem} from "@/types/filter-item"
import Condition from "@/types/condition"
import ColumnFilter from "@/types/column-filter"

function applyBoolean(column: Column & { filter: ColumnFilter }): null | FilterItem {
  if (column.filter.value === true || column.filter.value === false) {
    return {
      field: column.filter.by,
      condition: Condition.EQUAL,
      value: column.filter.value
    }
  }
  return null
}

export default applyBoolean
