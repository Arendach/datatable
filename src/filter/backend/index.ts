import useDataTableStore from "@/stores/data-table-store"
import usePaginationStore from "@/stores/pagination-store"
import useApi from "@/utility/use-api"
import debounce from "@/utility/debounce"
import useFilterStore from "@/stores/filter-store"

function appendPage(params: Object): Object {
  const pagination = usePaginationStore()

  if (pagination.page !== 1) {
    params.page = pagination.page
  }

  return params
}

function appendLimit(params: Object): Object {
  const pagination = usePaginationStore()

  params.limit = pagination.pageSize

  return params
}

function appendSearch(params: Object): Object {
  const filter = useFilterStore()

  if (filter.search) {
    params.search = filter.search
  }

  return params
}

function appendSorting(params: Object): Object {
  const filter = useFilterStore()

  // if you don't using sorting then return original params
  if (!filter.useSorting) {
    return params
  }

  // sorting column
  if (filter.currentSortColumn) {
    params.orderBy = filter.currentSortColumn
  }

  // sorting direction (ASC|DESC)
  if (filter.currentSortDirection) {
    params.sortedBy = filter.currentSortDirection
  }

  return params
}

const sendRequest = (params: Object): void => {
  const datatable = useDataTableStore()
  const pagination = usePaginationStore()
  const api = useApi()

  datatable.isLoading = true

  api.get(datatable.endpoint, params).then(response => {
    datatable.paginatedItems = response.data
    datatable.rows = response.data
    datatable.filteredItems = response.data
    datatable.isLoading = false
    pagination.totalRows = response.meta.total
  })
}

const sendRequestWithDelay = debounce((params) => {
  sendRequest(params)
}, 300)

export default function applyBackendFilter(needDelay) {
  let params = {}

  params = appendPage(params)
  params = appendLimit(params)
  params = appendSearch(params)
  params = appendSorting(params)

  if (needDelay) sendRequestWithDelay(params)
  else sendRequest(params)

}
