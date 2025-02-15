import {defineStore} from 'pinia'
import {Column} from "@/types/column"
import areArraysIdentical from "@/utility/are-arrays-identical"
import useFilterStore from "@/stores/filter-store";

const useDataTableStore = defineStore('dataTable', {
  state: () => ({
    columns: [] as Column[],
    rows: [] as Object[],
    isServerMode: false as Boolean,
    selected: [] as Array<Object>,
    filteredItems: [] as Array<Object>,
    paginatedItems: [] as Array<Object>,
    isLoading: true,
    endpoint: '' as string,
    expandedRows: [],
  }),
  getters: {
    isAllSelected(state): boolean {
      return areArraysIdentical(state.filteredItems, state.selected)
    },
    sortColumn(state): null | Column {
      let filterStore = useFilterStore()
      let filteredColumns = state.columns.filter(col => col.field === filterStore.currentSortColumn)

      if (filteredColumns.length === 1) return filteredColumns[0]
      return null
    }
  },
  actions: {
    setColumns(columns: Column[]): void {
      this.columns = columns
    },
    setRows(rows: Array<Object>): void {
      this.rows = rows
    },
    setEndpoint(endpoint: string): void {
      this.endpoint = endpoint
    },
    init() {
      this.filteredItems = this.rows

      if (!this.isServerMode) {
        this.isLoading = false
      }
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
      this.selected = this.filteredItems
    },
    clearSelected(): void {
      this.selected = []
    }
  }
})

export default useDataTableStore
