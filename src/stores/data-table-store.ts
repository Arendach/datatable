import {defineStore} from 'pinia'
import {Column} from "@/types/datatable-props/columns"

export const dataTableStore = defineStore('dataTable', {
    state: () => ({
        columns: [] as Column[],
        rows: [] as Object[],
        isServerMode: false as Boolean,
    }),
    getters: {
        columns: (state): Column[] => state.columns,
        rows: (state): Object[] => state.rows,
        isServerMode: (state): Boolean => state.isServerMode,
    },
    actions: {
        setColumns(columns: Column[]) {
            this.$state.columns = columns
        },
        setRows(rows: Object[]) {
            this.$state.rows = rows
        },
        setIsServerMode(isSeverMode: Boolean): void {
            this.$state.isServerMode = isSeverMode
        },
    }
})
