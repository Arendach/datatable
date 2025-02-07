import ColumnType from "@/types/column-type"
import type {Column} from "@/types/column"
import normalizeFilter from "@/utility/normalize-filter"

const defaultColumnValues: Omit<Column, "field" | "title"> = {
  type: ColumnType.STRING,
  isUnique: false,
  show: true,
  filter: false,
  sort: false,
  html: false,
  selectable: false,
  className: "",
  width: "",
  maxWidth: "",
} as const

export default function normalizeColumn(column: Column): Column {
  const normalizedColumn: Column = Object.assign({}, defaultColumnValues, column)

  normalizedColumn.filter = normalizeFilter(normalizedColumn)

  return normalizedColumn
}
