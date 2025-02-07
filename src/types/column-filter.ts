import Condition from "@/types/condition"
import FilterType from "@/types/filter-type"
import {FilterOption} from "@/types/filter-option"

export default interface ColumnFilter {
  // whether to use filtering
  use: boolean

  // whether to include the column in the search
  searchable: boolean

  // filter condition
  condition?: Condition

  // filter value
  value: any

  // filter view render
  type?: FilterType

  // options for select if filterType is select or select-multiple
  options?: (() => Array<FilterOption>) | Array<FilterOption>

  // backend filter field
  by?: string
}
