import {Column} from "@/types/column"
import Condition from "@/types/condition"

function shouldApplyFilter(column: Column): boolean {
  return (
    column.filter.use &&
    (
      column.filter.value !== undefined &&
      column.filter.value !== null &&
      column.filter.value !== ''
    ) ||
    column.filter.condition === Condition.IS_EMPTY ||
    column.filter.condition === Condition.IS_NOT_EMPTY
  )
}

export default shouldApplyFilter
