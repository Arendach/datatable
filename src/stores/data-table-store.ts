import {defineStore} from 'pinia'
import {Column} from "@/types/column"
import getFilteredRows from "@/filter/native"
import usePaginatedRows from "@/composables/use-paginated-rows"
import areArraysIdentical from "@/utility/are-arrays-identical"

const useDataTableStore = defineStore('dataTable', {
  state: () => ({
    columns: [] as Column[],
    rows: [] as Object[],
    isServerMode: false as Boolean,
    selected: [] as Object[],
  }),
  getters: {
    filterRowCount: () => getFilteredRows().length,
    filterItems: () => getFilteredRows(),
    paginatedItems: () => usePaginatedRows(),
    isAllSelected(state): boolean {
      return areArraysIdentical(this.paginatedItems, state.selected)
    },
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
    isSelected(item: Object): boolean {
      return this.selected.some(selectedItem => JSON.stringify(selectedItem) === JSON.stringify(item))
    },
    toggleSelection(item: Object): void {
      const index = this.selected.findIndex(selectedItem => JSON.stringify(selectedItem) === JSON.stringify(item))
      if (index !== -1) this.selected.splice(index, 1)
      else this.selected.push(item)
    },
    selectAll(): void {
      this.selected = this.paginatedItems
    },
    clearSelected(): void {
      this.selected = []
    }
  }
})

export default useDataTableStore
