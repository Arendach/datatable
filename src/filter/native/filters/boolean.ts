import {Column} from "@/types/column"
import displayCellValue from "@/utility/display-cell-value"

function filterBoolean(rows: Array<Object>, column: Column): Array<Object> {
    return rows.filter((item) => {
        return displayCellValue(item, column.field) === column.filterValue
    })
}

export default filterBoolean
