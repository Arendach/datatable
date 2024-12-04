import {Column} from "@/types/column"

export interface RepresentationProps {
  skin?: string
  rowClass?: string | ((row: Record<string, any>, rowIndex: number) => string)
  cellClass?: string | ((row: Record<string, any>, column: Column, rowIndex: number, columnIndex: number) => string)
  height?: string
  loading?: boolean
  hasAutoListing?: boolean
  hasCheckbox?: boolean
  cloneHeaderInFooter?: boolean
}
