import {defineStore} from 'pinia'
import {Column} from "@/types/datatable-props/column"

const useDataTableStore = defineStore('dataTable', {
    state: () => ({
        columns: [] as Column[],
        rows: [] as Object[],
        isServerMode: false as Boolean,
        selected: [] as number[],
    }),
    getters: {
        filterRowCount: (state) => state.rows.length,
        filterItems: (state) => state.rows,
    },
    actions: {
        setColumns(columns: Column[]): void {
            this.columns = columns
        },
        setRows(rows: Object[]): void {
            this.rows = rows
        },
        setIsServerMode(isSeverMode: Boolean): void {
            this.isServerMode = isSeverMode
        },
        setSelected(selected: number[]): void {
            this.selected = selected
        }
    }
})

export default useDataTableStore
