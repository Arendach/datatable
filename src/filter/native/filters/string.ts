import {Column} from "@/types/column"
import displayCellValue from "@/utility/display-cell-value"
import Condition from "@/types/condition"

function filterString(rows: Array<Object>, column: Column): Array<Object> {
    if (!column.filter.value) return rows

    const condition = column.filter.condition || Condition.CONTAIN
    const filterValue = column.filter.value.toLowerCase()

    return rows.filter((item) => {
        const cellValue = displayCellValue(item, column.field)?.toString().toLowerCase()

        switch (condition) {
            case Condition.CONTAIN:
                return cellValue?.includes(filterValue)
            case Condition.NOT_CONTAIN:
                return !cellValue?.includes(filterValue)
            case Condition.EQUAL:
                return cellValue === filterValue
            case Condition.NOT_EQUAL:
                return cellValue !== filterValue
            case Condition.START_WITH:
                return cellValue?.startsWith(filterValue)
            case Condition.END_WITH:
                return cellValue?.endsWith(filterValue)
            default:
                return true
        }
    })
}

export default filterString
