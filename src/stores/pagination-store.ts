import {defineStore} from 'pinia'
import {useFilterRowCount} from "@/composables/use-filter-row-count"

interface PaginationState {
  totalRows: number
  page: number
  pageSize: number
  pageSizeOptions: number[]
  usePageSize: boolean
  usePagination: boolean
  isShowNumbers: boolean
  showNumbersCount: number
  firstArrow: string
  lastArrow: string
  nextArrow: string
  previousArrow: string
  paginationInfo: string
  noDataContent: string
}

const usePaginationStore = defineStore('pagination', {
  state: (): PaginationState => ({
    totalRows: 0,
    page: 1,
    pageSize: 5,
    pageSizeOptions: [10, 20, 50, 100, 200, 500, 10000],
    usePageSize: false,
    usePagination: false,
    isShowNumbers: true,
    showNumbersCount: 4,
    firstArrow: '',
    lastArrow: '',
    nextArrow: '',
    previousArrow: '',
    paginationInfo: 'Показано з {0} по {1} з {2} записів',
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
    setProps(props: Partial<PaginationState>): void {
      Object.assign(this, props)
    },
  },
})

export default usePaginationStore
