import ColumnType from "@/types/column-type"
import FilterType from "@/types/filter-type"
import Condition from "@/types/condition"
import type { Column } from "@/types/column"

const defaultColumnValues: Omit<Column, "field" | "title"> = {
  type: ColumnType.STRING,
  isUnique: false,
  show: true,
  filter: false,
  search: false,
  sort: false,
  html: false,
  condition: Condition.CONTAIN,
  exportable: true,
  selectable: false,
  className: "",
  width: "",
  maxWidth: "",
  filterValue: null,
  filterType: FilterType.STRING_INPUT,
}

export default function normalizeColumn(column: Column): Column {
  const base = { ...defaultColumnValues, ...column }

  switch (base.type) {
    case ColumnType.NUMBER:
      base.filterType = base.filterType || FilterType.NUMBER_INPUT
      base.condition = base.condition || Condition.EQUAL
      break
    case ColumnType.STRING:
      base.filterType = base.filterType || FilterType.STRING_INPUT
      base.condition = base.condition || Condition.CONTAIN
      break
    case ColumnType.BOOLEAN:
      base.filterType = base.filterType || FilterType.SELECT_BOOLEAN
      base.condition = base.condition || Condition.EQUAL
      break
    case ColumnType.DATE:
      base.filterType = base.filterType || FilterType.DATE_PICKER
      base.condition = base.condition || (base.filterType === FilterType.DATE_RANGE ? Condition.BETWEEN : Condition.EQUAL)
      break
    case ColumnType.PICTURE:
      base.filter = false
      base.search = false
      base.exportable = false
      base.sort = false
      break
    default:
      break
  }

  return base
}
