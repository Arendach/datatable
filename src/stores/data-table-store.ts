import {defineStore} from 'pinia'
import {Column} from "@/types/column"
import useFilterStore from "@/stores/filter-store"
import useStore from "@/utility/use-store"

type RowItem = Record<string, any>

const store = useStore()

const useDataTableStore = defineStore('dataTable', {
  state: () => ({
    uniqueId: 'datatable' as string,
    columns: [] as Column[],
    rows: [] as RowItem[],
    isServerMode: false as boolean,
    selected: [] as RowItem[],
    filteredItems: [] as RowItem[],
    paginatedItems: [] as RowItem[],
    isLoading: true as boolean,
    fetchRows: '',
    expandedRows: [],
  }),
  getters: {
    isAllSelected(state): boolean {
      return state.filteredItems.length > 0 && state.filteredItems.every(item => item.isSelected)
    },
    sortColumn(state): Column | null {
      const filterStore = useFilterStore()
      const filteredColumns = state.columns.filter(col => col.field === filterStore.sortColumn)
      return filteredColumns.length === 1 ? filteredColumns[0] : null
    }
  },
  actions: {
    setColumns(columns: Column[]): void {
      this.columns = columns
    },
    setRows(rows: RowItem[]): void {
      this.rows = rows
    },
    setFetchRows(fetchRows: any): void {
      this.fetchRows = fetchRows
    },
    init(): void {
      this.filteredItems = this.rows

      if (!this.isServerMode) {
        this.isLoading = false
      }

      const saved = store.load('columns')

      if (saved) this.columns = saved
    },
    setIsServerMode(isServerMode: boolean): void {
      this.isServerMode = isServerMode
    },
    isSelected(item: RowItem): boolean {
      return this.selected.some((selectedItem: RowItem) => JSON.stringify(selectedItem) === JSON.stringify(item))
    },
    setAllSelected(value: boolean): void {
      this.rows.forEach((row: RowItem) => row.isSelected = value)
    },
    saveColumns(): void {
      store.save('columns', this.columns)
    }
  }
})

export default useDataTableStore
