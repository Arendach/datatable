import {computed} from "vue"
import useDataTableStore from "@/stores/data-table-store"
import {Column} from "@/types/datatable-props/column"

export function useUniqueKey() {
    const dataTable = useDataTableStore()

    return computed(() => {
        return dataTable.columns.find((col: Column) => col.isUnique)?.field || 'id'
    })
}
