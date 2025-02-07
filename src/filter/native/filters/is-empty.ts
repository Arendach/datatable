import { Column } from "@/types/column"
import displayCellValue from "@/utility/display-cell-value"

function isEmptyFilter(rows: Array<Object>, column: Column): Array<Object> {
    const filteredRows = rows.filter((item) => {
        const value = displayCellValue(item, column.field)
        return value == null || value === ''
    })

    column.filter.value = ''

    return filteredRows
}

export default isEmptyFilter

