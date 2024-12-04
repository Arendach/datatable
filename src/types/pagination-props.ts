export interface PaginationProps {
  page?: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  usePageSize?: boolean;
  usePagination?: boolean;
  isShowNumbers?: boolean;
  showNumbersCount?: number;
  firstArrow?: string;
  lastArrow?: string;
  nextArrow?: string;
  previousArrow?: string;
  paginationInfo?: string;
  noDataContent?: string;
}
