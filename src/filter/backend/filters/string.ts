import {Column} from "@/types/column"
import Condition from "@/types/condition"
import {FilterItem} from "@/types/filter-item"
import {FilterOption} from "@/types/filter-option";

function applyString(column: Column): null | FilterItem {
  if (!column.filter.value) return null

  const condition = column.filter.condition || Condition.CONTAIN
  let filterValue = column.filter.value

  if (condition === Condition.IN) {
    filterValue = filterValue.map((option: FilterOption)=> option.value)
  }

  return {
    field: column.field,
    value: filterValue,
    condition: condition,
  }
}

export default applyString
