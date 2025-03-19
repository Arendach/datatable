import useDataTableStore from "@/stores/data-table-store"
import usePaginationStore from "@/stores/pagination-store"
import useApi from "@/utility/use-api"
import debounce from "@/utility/debounce"
import applyFilter from "@/filter/backend/filter"
import applySort from "@/filter/backend/sorting"
import applySearch from "@/filter/backend/searching"
import applyPaginate from "@/filter/backend/paginate"
import {BackendParams} from "@/types/backend-params"
import jsonToQuery from "@/utility/json-to-query"

export default function applyBackendFilter(needDelay: boolean): void {
  const datatable = useDataTableStore()
  const pagination = usePaginationStore()
  const api = useApi()

  const getBackendParams = (): Partial<BackendParams> => {
    let params = {}
    params = applyPaginate(params)
    params = applySearch(params)
    params = applySort(params)
    params = applyFilter(params)
    return params
  }

  const handleResponse = (response: any) => {
    datatable.isLoading = false
    datatable.paginatedItems = response.data
    datatable.rows = response.data
    datatable.filteredItems = response.data
    pagination.totalRows = response.meta?.total ?? 0
  }

  const handleError = (error: any) => {
    console.error("Error fetching data:", error)
    datatable.isLoading = false
  }

  const sendRequest = async (params: Partial<BackendParams>): Promise<void> => {
    datatable.isLoading = true

    try {
      const response =
        typeof datatable.fetchRows === "function"
          ? await datatable.fetchRows(params, jsonToQuery(params))
          : await api.get(datatable.fetchRows)

      handleResponse(response)
    } catch (error) {
      handleError(error)
    }
  }

  const sendRequestWithDelay = debounce(sendRequest, 300)

  const params = getBackendParams()
  needDelay ? sendRequestWithDelay(params) : sendRequest(params)
}
