import {BackendParams} from "@/types/backend-params"
import usePaginationStore from "@/stores/pagination-store"

function applyPaginate(params: Partial<BackendParams>): Partial<BackendParams> {
  const pagination = usePaginationStore()

  if (!pagination.usePagination) return params

  if (pagination.page !== 1) {
    params.page = pagination.page
  }

  params.limit = pagination.pageSize

  return params
}

export default applyPaginate

