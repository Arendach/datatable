import {Column} from "@/types/column"
import {FilterItem} from "@/types/filter-item"
import Condition from "@/types/condition"

function applyIsEmpty(column: Column): null | FilterItem {
  return {
    field: column.field,
    value: null,
    condition: Condition.IS_EMPTY,
  }
}

export default applyIsEmpty

