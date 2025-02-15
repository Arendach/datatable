import {Column} from "@/types/column"
import Condition from "@/types/condition"
import {FilterItem} from "@/types/filter-item"
import {FilterOption} from "@/types/filter-option"
import ColumnFilter from "@/types/column-filter"

function applyString(column: Column & { filter: ColumnFilter }): null | FilterItem {
  if (!column.filter.value) return null

  const condition = column.filter.condition || Condition.CONTAIN
  let filterValue = column.filter.value

  if (condition === Condition.IN) {
    filterValue = filterValue.map((option: FilterOption) => option.value)
  }

  return {
    field: column.filter.by,
    value: filterValue,
    condition: condition,
  }
}

export default applyString
