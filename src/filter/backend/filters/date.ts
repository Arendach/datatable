import {Column} from "@/types/column"
import Condition from "@/types/condition"
import {FilterItem} from "@/types/filter-item"
import backendDate from "@/utility/backend-date"
import FilterType from "@/types/filter-type"

function applyDate(column: Column): null | FilterItem {
  if (!column.filter.value) return null

  if (!column.filter.condition) column.filter.condition = Condition.EQUAL

  let value: any

  if (column.filter.type === FilterType.DATE_PICKER) {
    value = backendDate(column.filter.value)
  } else if (column.filter.type === FilterType.DATE_RANGE) {
    value = [backendDate(column.filter.value[0]), backendDate(column.filter.value[1])]
  } else {
    value = column.filter.value
  }

  return {
    field: column.field,
    condition: column.filter.condition,
    value: value,
  }
}

export default applyDate
