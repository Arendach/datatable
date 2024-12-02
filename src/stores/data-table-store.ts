import {defineStore} from 'pinia'
import {Column} from "@/types/column"
import getFilteredRows from "@/filter/native"
import usePaginatedRows from "@/composables/use-paginated-rows"

const useDataTableStore = defineStore('dataTable', {
  state: () => ({
    columns: [] as Column[],
    rows: [] as Object[],
    isServerMode: false as Boolean,
    selected: [] as number[],
  }),
  getters: {
    filterRowCount: () => getFilteredRows().length,
    filterItems: () => getFilteredRows(),
    paginatedItems: () => usePaginatedRows(),
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
