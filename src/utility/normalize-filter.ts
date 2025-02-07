import ColumnType from "@/types/column-type"
import FilterType from "@/types/filter-type"
import Condition from "@/types/condition"
import type {Column} from "@/types/column"
import ColumnFilter from "@/types/column-filter"

const defaultFilterValues: Omit<ColumnFilter> = {
  use: false,
  searchable: false,
  condition: null,
  value: null,
  type: null,
  options: [],
  by: null,
}

export default function normalizeFilter(column: Column): Column {
  const filter = {...defaultFilterValues, ...column.filter}

  if (typeof column.filter === 'boolean') {
    filter.use = column.filter
  }

  switch (column.type) {
    case ColumnType.NUMBER:
      filter.type = filter.type || FilterType.NUMBER_INPUT
      filter.condition = filter.condition || Condition.EQUAL
      break
    case ColumnType.STRING:
      filter.type = filter.type || FilterType.STRING_INPUT
      filter.condition = filter.condition || Condition.CONTAIN
      break
    case ColumnType.BOOLEAN:
      filter.type = filter.type || FilterType.SELECT_BOOLEAN
      filter.condition = filter.condition || Condition.EQUAL
      break
    case ColumnType.DATE:
      filter.type = filter.type || FilterType.DATE_PICKER
      filter.condition = filter.condition || (filter.type === FilterType.DATE_RANGE ? Condition.BETWEEN : Condition.EQUAL)
      break
    case ColumnType.PICTURE:
      filter.use = false
      filter.search = false
      filter.exportable = false
      column.sort = false
      break
    default:
      break
  }

  switch (filter.type) {
    case FilterType.SELECT_MULTIPLE:
      filter.condition = Condition.IN
      break
  }

  return filter
}
