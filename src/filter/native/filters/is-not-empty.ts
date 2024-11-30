import {Column} from "@/types/column"
import displayCellValue from "@/utility/display-cell-value"

function isNotEmptyFilter(rows: Array<object>, column: Column): Array<object> {
    column.filterValue = ''

    return rows.filter((item) => {
        const value = displayCellValue(item, column.field)
        return value != null && value !== ''
    })
}

export default isNotEmptyFilter
