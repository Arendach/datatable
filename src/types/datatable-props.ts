import type {Column} from "@/types/column"
import type {PaginationProps} from "@/types/pagination-props"
import type {FilterProps} from "@/types/filter-props"
import type {RepresentationProps} from "@/types/representation-props"

export interface DataTableProps {
  // uniqueId is a required parameter so that there are no conflicts with other tables
  uniqueId: string

  // columns is a required parameter as it describes the representation of the table
  columns: Column[]

  // The isServerMode parameter is necessary for the component to understand where to get data from
  isServerMode: boolean

  // rows parameter is passed if isServerMode = false
  rows?: Object[]

  // rows parameter is passed if isServerMode = true
  fetchRows?: string | (() => Promise<T[]>)

  // Representation
  representation?: RepresentationProps

  // Pagination settings
  pagination?: PaginationProps

  // Filtering and sorting settings
  filter?: FilterProps
}
