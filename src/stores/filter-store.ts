import {defineStore} from 'pinia'
import SortDirection from "@/types/sort-direction"

interface FilterStore {
  search: string | null
  useSorting: boolean
  sortColumn: string | null
  sortDirection: SortDirection
  useFiltering: boolean
  useSelectRowOnClick: boolean
  usePersistSelection: boolean
  currentSortColumn: string | null
  currentSortDirection: SortDirection
}

const useFilterStore = defineStore('filter', {
  state: (): FilterStore => ({
    search: null,
    useSorting: false,
    sortColumn: null,
    sortDirection: SortDirection.DEFAULT,
    useFiltering: false,
    useSelectRowOnClick: false,
    usePersistSelection: false,
    currentSortColumn: null,
    currentSortDirection: SortDirection.DEFAULT,
  }),
  actions: {
    setProps(props: Partial<FilterStore>): void {
      Object.assign(this, props)
    },
  },
})

export default useFilterStore
