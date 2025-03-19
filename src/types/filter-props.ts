import type SortDirection from "@/types/sort-direction"

export interface FilterProps {
  search: string | null
  useSorting: boolean
  sortColumn: string | null
  sortDirection: SortDirection
  useFiltering: boolean
  currentSortColumn: string | null
  currentSortDirection: SortDirection
}
