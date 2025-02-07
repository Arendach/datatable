import ColumnType from "@/types/column-type"
import ColumnFilter from "@/types/column-filter"

export interface Column {
  // field from object for display
  field: string

  // title of table column
  title: string

  // field type
  type?: ColumnType

  // use filter for column
  filter?: boolean | ColumnFilter

  // display field as html
  html?: boolean

  // use sorting this field
  sort?: boolean

  // field is unique?
  isUnique?: boolean

  // show on table (switch in table header)
  show?: boolean

  // selectable (example: for mass editing)
  selectable?: boolean

  // callback for render cell
  cellRender?: Function

  // class of cell
  className?: string

  // column width
  width?: string

  // column max width
  maxWidth?: string
}
