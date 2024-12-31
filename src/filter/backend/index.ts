import useDataTableStore from "@/stores/data-table-store"
import usePaginationStore from "@/stores/pagination-store"
import useApi from "@/utility/use-api"
import debounce from "@/utility/debounce"
import applyFilter from "@/filter/backend/filter"
import applySort from "@/filter/backend/sorting"
import applySearch from "@/filter/backend/searching"
import applyPaginate from "@/filter/backend/paginate"
import {BackendParams} from "@/types/backend-params"


const sendRequest = (params: Partial<BackendParams>): void => {
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
    datatable.isLoading = false
  })
}

const sendRequestWithDelay = debounce((params) => {
  sendRequest(params)
}, 300)

export default function applyBackendFilter(needDelay: boolean) {
  let params = {}

  params = applyPaginate(params)
  params = applySearch(params)
  params = applySort(params)
  params = applyFilter(params)

  if (needDelay) sendRequestWithDelay(params)
  else sendRequest(params)

}
