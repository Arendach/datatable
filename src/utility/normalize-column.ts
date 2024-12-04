import ColumnType from "@/types/column-type"
import Condition from "@/types/condition"
import type Column from "@/types/column"

const defaultColumnValues: Omit<Column, 'field' | 'title'> = {
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
  className: '',
  width: '',
  maxWidth: '',
  filterValue: null,
  startDate: '',
  endDate: '',
}

function normalizeColumn(column: Column): Column {
  return {
    ...defaultColumnValues,
    condition: column.type === ColumnType.STRING ? Condition.CONTAIN : Condition.EQUAL,
    ...column,
  }
}

export default normalizeColumn
