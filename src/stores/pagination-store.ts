import {defineStore} from 'pinia'
import {useFilterRowCount} from "@/composables/use-filter-row-count"
import useStore from "@/utility/use-store"

interface PaginationState {
  totalRows: number
  page: number
  pageSize: number
  usePagination: boolean
  showNumbersCount: number
  noDataContent: string
}

const store = useStore()

const usePaginationStore = defineStore('pagination', {
  state: (): PaginationState => ({
    totalRows: 0,
    page: 1,
    pageSize: 20,
    usePagination: false,
    showNumbersCount: 4,
    noDataContent: 'No data content',
  }),
  getters: {
    offset(state): number {
      return (state.page - 1) * state.pageSize + 1
    },
    limit(state): number {
      let limit: number = state.page * this.pageSize

      return useFilterRowCount() >= limit ? limit : useFilterRowCount()
    },
    maxPage(state): number {
      const totalPages = state.pageSize < 1 ? 1 : Math.ceil(this.totalRows / state.pageSize)

      return Math.max(totalPages || 0, 1)
    },
    paging(state): number[] {
      const {page, showNumbersCount} = state
      const maxPage = this.maxPage
      const isMaxSized = showNumbersCount && showNumbersCount < maxPage

      let startPage = 1
      let endPage = maxPage

      if (isMaxSized) {
        startPage = Math.max(page - Math.floor(showNumbersCount / 2), 1)
        endPage = Math.min(startPage + showNumbersCount - 1, maxPage)

        if (endPage - startPage + 1 < showNumbersCount) {
          startPage = Math.max(endPage - showNumbersCount + 1, 1)
        }
      }

      return Array.from({length: endPage - startPage + 1}, (_, i) => startPage + i)
    },
    isShowFirstPage(): boolean {
      return this.paging.length && this.paging[0] > 1
    },
    isShowLastPage(): boolean {
      return this.paging.length && this.paging[this.paging.length - 1] < this.maxPage
    },
    isShowFirstDelimiter(): boolean {
      return this.paging.length && this.paging[0] > 2
    },
    isShowLastDelimiter(): boolean {
      return this.paging.length && this.paging[this.paging.length - 1] < this.maxPage - 1
    },
  },
  actions: {
    init(props: Partial<PaginationState>): void {
      this.$patch(props)

      const saved = store.load('pagination')
      if (saved) {
        this.$patch(saved)
      }

      this.saveToStorage()
    },
    setPage(page: number): void {
      this.page = page
      this.saveToStorage()
    },
    saveToStorage(): void {
      const {page} = this

      store.save('pagination', {page})
    },
  },
})

export default usePaginationStore
