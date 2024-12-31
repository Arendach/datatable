import {Column} from "@/types/column"
import Condition from "@/types/condition"
import ColumnType from "@/types/column-type"

function shouldApplyFilter(column: Column): boolean {
  return (
    column.filter &&
    (
      column.filterValue !== undefined &&
      column.filterValue !== null &&
      column.filterValue !== ''
    ) ||
    column.condition === Condition.IS_EMPTY ||
    column.condition === Condition.IS_NOT_EMPTY ||
    column.type === ColumnType.DATE_RANGE
  )
}

export default shouldApplyFilter
