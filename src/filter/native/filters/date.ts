import {Column} from "@/types/column"
import displayCellValue from "@/utility/display-cell-value"
import dateFormat from "@/utility/date-format"
import Condition from "@/types/condition"

function filterDate(rows: Array<Object>, column: Column): Array<Object> {
    if (column.filter.value && !column.filter.condition) {
        column.filter.condition = Condition.EQUAL
    }

    const conditions: Record<string, (rowValue: string, filterValue: string) => boolean> = {
        [Condition.EQUAL]: (rowValue, filterValue) => rowValue === filterValue,
        [Condition.NOT_EQUAL]: (rowValue, filterValue) => rowValue !== filterValue,
        [Condition.GREATER_THAN]: (rowValue, filterValue) => rowValue > filterValue,
        [Condition.LESS_THAN]: (rowValue, filterValue) => rowValue < filterValue,
    }

    const filterCondition = conditions[column.filter.condition]

    if (!filterCondition) return rows

    return rows.filter((item) => {
        const cellValue = displayCellValue(item, column.field)
        const formattedValue = cellValue ? dateFormat(cellValue) : null

        return formattedValue && filterCondition(formattedValue, column.filter.value)
    })
}

export default filterDate
