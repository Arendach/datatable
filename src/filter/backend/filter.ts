import useDataTableStore from "@/stores/data-table-store"
import {Column} from "@/types/column"
import Condition from "@/types/condition"
import shouldApplyFilter from "@/utility/should-apply-filter"
import ColumnType from "@/types/column-type"
import applyString from "@/filter/backend/filters/string"
import applyBoolean from "@/filter/backend/filters/boolean"
import applyDate from "@/filter/backend/filters/date"
import applyIsEmpty from "@/filter/backend/filters/is-empty"
import applyIsNotEmpty from "@/filter/backend/filters/is-not-empty"
import {BackendParams} from "@/types/backend-params"

function applyFilter(params: Partial<BackendParams>): Partial<BackendParams> {
  const dataTable = useDataTableStore()
  let filters = []

  dataTable.columns.forEach((column: Column) => {
    if (shouldApplyFilter(column)) {
      switch (column.type) {
        case ColumnType.BOOLEAN:
          filters.push(applyBoolean(column))
          break
        case ColumnType.DATE:
          filters.push(applyDate(column))
          break
        case ColumnType.NUMBER:
          break
        case ColumnType.STRING:
          filters.push(applyString(column))
          break
      }

      if (column.condition === Condition.IS_EMPTY) {
        filters.push(applyIsEmpty(column))
      } else if (column.condition === Condition.IS_NOT_EMPTY) {
        filters.push(applyIsNotEmpty(column))
      }
    }
  })

  if (filters.length) {
    params.filters = filters
  }

  return params
}

export default applyFilter
