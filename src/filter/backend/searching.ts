import useFilterStore from "@/stores/filter-store"
import {BackendParams} from "@/types/backend-params"

function applySearch(params: Partial<BackendParams>): Partial<BackendParams> {
  const filter = useFilterStore()

  if (filter.search) {
    params.search = filter.search
  }

  return params
}

export default applySearch

