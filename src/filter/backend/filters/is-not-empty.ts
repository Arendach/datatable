import {Column} from "@/types/column"
import {FilterItem} from "@/types/filter-item"
import Condition from "@/types/condition"

function applyIsNotEmpty(column: Column): null | FilterItem {
  return {
    field: column.field,
    value: null,
    condition: Condition.IS_NOT_EMPTY,
  }
}

export default applyIsNotEmpty

