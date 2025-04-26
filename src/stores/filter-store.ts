import {defineStore} from 'pinia'
import SortDirection from "@/types/sort-direction"
import useStore from "@/utility/use-store"

interface FilterStore {
  search: string | null
  useSorting: boolean
  sortColumn: string | null
  sortDirection: SortDirection
  useFiltering: boolean
}

const store = useStore()

const useFilterStore = defineStore('filter', {
  state: (): FilterStore => ({
    search: null,
    useSorting: false,
    sortColumn: null,
    sortDirection: SortDirection.DEFAULT,
    useFiltering: false,
  }),
  actions: {
    init(props: Partial<FilterStore>): void {
      this.$patch(props)

      const saved = store.load('filters')
      if (saved) {
        this.$patch(saved)
      }

      this.saveToStorage()
    },
    saveToStorage(): void {
      const {search, sortColumn, sortDirection} = this
      store.save('filters', {search, sortColumn, sortDirection})
    },
    setSortColumn(sortColumn: string | null): void {
      this.sortColumn = sortColumn
      this.saveToStorage()
    },
    setSortDirection(sortDirection: SortDirection): void {
      this.sortDirection = sortDirection
      this.saveToStorage()
    },
    setSearch(search: string | null): void {
      this.search = search
      this.saveToStorage()
    },
  },
})

export default useFilterStore
