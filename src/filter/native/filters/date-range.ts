import { Column } from "@/types/column"
import displayCellValue from "@/utility/display-cell-value"

function filterDateRange(rows: Array<Object>, column: Column): Array<Object> {
    if (!column.startDate && !column.endDate) return rows

    const startDate = column.startDate ? new Date(column.startDate) : null
    const endDate = column.endDate ? new Date(column.endDate) : null

    return rows.filter((row) => {
        const dateValue = new Date(displayCellValue(row, column.field))
        if (isNaN(dateValue.getTime())) return false

        const isAfterStart = startDate ? dateValue >= startDate : true
        const isBeforeEnd = endDate ? dateValue <= endDate : true

        return isAfterStart && isBeforeEnd
    })
}

export default filterDateRange
