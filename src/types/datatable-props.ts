import {Column} from "@/types/datatable-props/column"

export interface DataTableProps {
  // Representation
  skin?: string;
  rowClass?: string | ((row: Record<string, any>, rowIndex: number) => string);
  cellClass?: string | ((row: Record<string, any>, column: Column, rowIndex: number, columnIndex: number) => string);
  height?: string;
  loading?: boolean;
  hasAutoListing?: boolean;
  hasCheckbox?: boolean;
  cloneHeaderInFooter?: boolean;

  // Data
  columns: Column[];
  rows: Record<string, any>[];
  isServerMode?: boolean;

  // Pagination
  totalRows?: number;
  page?: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  usePageSize?: boolean;
  usePagination?: boolean;
  isShowNumbers?: boolean;
  isShowNumbersCount?: number;
  isShowFirstPage?: boolean;
  isShowLastPage?: boolean;
  firstArrow?: string;
  lastArrow?: string;
  nextArrow?: string;
  previousArrow?: string;
  paginationInfo?: string;
  noDataContent?: string;

  // Filtering and sorting
  search?: string;
  useSorting?: boolean;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc' | ''; // Можливі значення
  useFiltering?: boolean;
  useSelectRowOnClick?: boolean;
  usePersistSelection?: boolean;

  // Other
  uniqueId?: string;
}
