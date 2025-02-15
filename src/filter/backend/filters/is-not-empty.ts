import {Column} from "@/types/column"
import {FilterItem} from "@/types/filter-item"
import Condition from "@/types/condition"
import ColumnFilter from "@/types/column-filter"

function applyIsNotEmpty(column: Column & { filter: ColumnFilter }): null | FilterItem {
  return {
    field: column.filter.by,
    value: null,
    condition: Condition.IS_NOT_EMPTY,
  }
}

export default applyIsNotEmpty

