import ColumnType from "@/types/column-type"
import FilterType from "@/types/filter-type"
import Condition from "@/types/condition"
import type {Column} from "@/types/column"
import type ColumnFilter from "@/types/column-filter"

const defaultFilterValues: Partial<ColumnFilter> = {
  use: false,
  searchable: false,
  condition: null,
  value: null,
  type: null,
  options: [],
  by: null,
} as const

export default function normalizeFilter(column: Column): ColumnFilter {
  const filter: ColumnFilter = {
    ...defaultFilterValues,
    ...(typeof column.filter === "boolean" ? {use: column.filter} : column.filter),
  }

  // Призначаємо типи фільтрів залежно від типу колонки
  switch (column.type) {
    case ColumnType.NUMBER:
      filter.type ??= FilterType.NUMBER_INPUT
      filter.condition ??= Condition.EQUAL
      break
    case ColumnType.STRING:
      filter.type ??= FilterType.STRING_INPUT
      filter.condition ??= Condition.CONTAIN
      break
    case ColumnType.BOOLEAN:
      filter.type ??= FilterType.SELECT_BOOLEAN
      filter.condition ??= Condition.EQUAL
      break
    case ColumnType.DATE:
      filter.type ??= FilterType.DATE_PICKER
      filter.condition ??= filter.type === FilterType.DATE_RANGE ? Condition.BETWEEN : Condition.EQUAL
      break
    case ColumnType.PICTURE:
      filter.use = false
      filter.searchable = false
      column.sort = false
      break
  }

  if (filter.type === FilterType.SELECT_MULTIPLE) {
    filter.condition = Condition.IN
  }

  return filter
}
