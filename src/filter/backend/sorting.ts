import useFilterStore from "@/stores/filter-store"
import {BackendParams} from "@/types/backend-params"
import SortDirection from "@/types/sort-direction"

function applySort(params: Partial<BackendParams>): Partial<BackendParams> {
  const filter = useFilterStore()

  // if you don't using sorting then return original params
  if (!filter.useSorting) return params

  // if empty sort column then return original params
  if (!filter.sortColumn) return params

  params.sortColumn = filter.sortColumn
  params.sortDirection = filter.sortDirection ?? SortDirection.ASC

  return params
}

export default applySort

