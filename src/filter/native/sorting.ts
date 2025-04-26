import useFilterStore from "@/stores/filter-store"
import useDataTableStore from "@/stores/data-table-store"
import { Column } from "@/types/column"
import SortDirection from "@/types/sort-direction";
import ColumnType from "@/types/column-type";

function sorting(rows: Array<Object>): Array<Object> {
    const filter = useFilterStore()
    const dataTable = useDataTableStore()

    const sortColumn = dataTable.columns.find(
        (col: Column) => col.field === filter.sortColumn
    )

    if (!sortColumn) {
        return rows
    }

    const collator = createCollator(sortColumn.type === ColumnType.NUMBER)

    const sortOrder = filter.sortDirection === SortDirection.DESC ? -1 : 1

    return [...rows].sort((a, b) => {
        const valA = getNestedValue(a, filter.sortColumn)
        const valB = getNestedValue(b, filter.sortColumn)

        return collator.compare(valA, valB) * sortOrder
    })
}

function createCollator(numeric: boolean): Intl.Collator {
    return new Intl.Collator(undefined, {
        numeric,
        sensitivity: "base",
    })
}

function getNestedValue(obj: Record<string, any>, path?: string): any {
    return path?.split(".").reduce((acc, key) => acc?.[key], obj)
}

export default sorting

