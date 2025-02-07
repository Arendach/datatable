import ColumnType from "@/types/column-type"
import type { Column } from "@/types/column"
import normalizeFilter from "@/utility/normalize-filter";

const defaultColumnValues: Omit<Column, "field" | "title"> = {
  type: ColumnType.STRING,
  isUnique: false,
  show: true,
  filter: false,
  search: false,
  sort: false,
  html: false,
  condition: null,
  exportable: true,
  selectable: false,
  className: "",
  width: "",
  maxWidth: "",
}

export default function normalizeColumn(column: Column): Column {
  const base = { ...defaultColumnValues, ...column }

  base.filter = normalizeFilter(base)

  return base
}
