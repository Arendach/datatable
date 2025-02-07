import {Column} from "@/types/column"
import displayCellValue from "@/utility/display-cell-value"
import Condition from "@/types/condition"

function filterNumber(rows: Array<Object>, column: Column): Array<Object> {
    if (!column.filter.value) return rows

    const condition = column.filter.condition || Condition.EQUAL
    const filterValue = parseFloat(column.filter.value)

    return rows.filter((item) => {
        const cellValue = parseFloat(displayCellValue(item, column.field) || NaN)

        if (isNaN(cellValue)) return false

        switch (condition) {
            case Condition.EQUAL:
                return cellValue === filterValue
            case Condition.NOT_EQUAL:
                return cellValue !== filterValue
            case Condition.GREATER_THAN:
                return cellValue > filterValue
            case Condition.GREATER_THAN_EQUAL:
                return cellValue >= filterValue
            case Condition.LESS_THAN:
                return cellValue < filterValue
            case Condition.LESS_THAN_EQUAL:
                return cellValue <= filterValue
            default:
                return true
        }
    })
}

export default filterNumber
