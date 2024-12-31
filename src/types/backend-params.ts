import {FilterItem} from "@/types/filter-item"
import SortDirection from "@/types/sort-direction"

export interface BackendParams {
  filters: Array<FilterItem> | undefined
  sortDirection: SortDirection | undefined
  sortColumn: string | undefined
  search: string | undefined
  page: number | undefined
  limit: number | undefined
}
