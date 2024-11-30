import displayCellValue from "@/utility/display-cell-value"
import useFilterStore from "@/stores/filter-store"
import useDataTableStore from "@/stores/data-table-store"
import { Column } from "@/types/column"

function searching(rows: Array<Object>): Array<Object> {
    const filter = useFilterStore()
    const dataTable = useDataTableStore()

    if (!filter.search || rows.length === 0) {
        return rows
    }

    const searchableFields = getSearchableFields(dataTable.columns)

    return filterRowsBySearch(rows, searchableFields, filter.search)
}


function getSearchableFields(columns: Array<Column>): Array<string> {
    return columns
        .filter((column: Column) => column.search && column.show)
        .map((column: Column) => column.field)
}

function filterRowsBySearch(
    rows: Array<Object>,
    searchableFields: Array<string>,
    searchTerm: string
): Array<Object> {
    const lowerCaseSearchTerm = searchTerm.toLowerCase()

    return rows.filter((row) => {
        return searchableFields.some((field) => {
            const cellValue = displayCellValue(row, field)
            return cellValue?.toString().toLowerCase().includes(lowerCaseSearchTerm)
        })
    })
}

export default searching
