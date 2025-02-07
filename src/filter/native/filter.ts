import useDataTableStore from "@/stores/data-table-store"
import {Column} from "@/types/column"
import filterString from "@/filter/native/filters/string"
import filterNumber from "@/filter/native/filters/number"
import filterDate from "@/filter/native/filters/date"
import filterBoolean from "@/filter/native/filters/boolean"
import filterDateRange from "@/filter/native/filters/date-range"
import isEmptyFilter from "@/filter/native/filters/is-empty"
import isNotEmptyFilter from "@/filter/native/filters/is-not-empty"
import Condition from "@/types/condition"
import ColumnType from "@/types/column-type"
import shouldApplyFilter from "@/utility/should-apply-filter"

// Основна логіка фільтрації
function filtering(rows: Array<object>): Array<object> {
    const dataTable = useDataTableStore()

    dataTable.columns.forEach((column: Column) => {
        if (shouldApplyFilter(column)) {
            switch (column.type) {
                case ColumnType.STRING:
                    rows = filterString(rows, column)
                    break
                case ColumnType.NUMBER:
                    rows = filterNumber(rows, column)
                    break
                case ColumnType.DATE:
                    rows = filterDate(rows, column)
                    break
                case ColumnType.BOOLEAN:
                    rows = filterBoolean(rows, column)
                    break
                case ColumnType.DATE_RANGE:
                    rows = filterDateRange(rows, column)
                    break
            }

            // Обробка специфічних умов
            if (column.filter.condition === Condition.IS_EMPTY) {
                rows = isEmptyFilter(rows, column)
            } else if (column.filter.condition === Condition.IS_NOT_EMPTY) {
                rows = isNotEmptyFilter(rows, column)
            }
        }
    })

    return rows
}

export default filtering
