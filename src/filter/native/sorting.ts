import useFilterStore from "@/stores/filter-store"
import useDataTableStore from "@/stores/data-table-store"
import { Column } from "@/types/column"

function sorting(rows: Array<Object>): Array<Object> {
    const filter = useFilterStore()
    const dataTable = useDataTableStore()

    const sortColumn = dataTable.columns.find(
        (col: Column) => col.field === filter.currentSortColumn
    )

    if (!sortColumn) {
        return rows
    }

    const collator = createCollator(sortColumn.type === "number")

    const sortOrder = filter.currentSortDirection === "desc" ? -1 : 1

    return [...rows].sort((a, b) => {
        const valA = getNestedValue(a, filter.currentSortColumn)
        const valB = getNestedValue(b, filter.currentSortColumn)

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

