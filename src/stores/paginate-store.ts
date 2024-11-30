import {defineStore} from 'pinia';

// Типізація стану
interface PaginationState {
    totalRows: number;
    page: number;
    pageSize: number;
    pageSizeOptions: number[];
    usePageSize: boolean;
    usePagination: boolean;
    isShowNumbers: boolean;
    isShowNumbersCount: boolean;
    isShowFirstPage: boolean;
    isShowLastPage: boolean;
    firstArrow: string;
    lastArrow: string;
    nextArrow: string;
    previousArrow: string;
    paginationInfo: string;
    noDataContent: string;
}

const usePaginateStore = defineStore('paginate', {
    state: (): PaginationState => ({
        totalRows: 0,
        page: 1,
        pageSize: 50,
        pageSizeOptions: [10, 20, 50, 100, 200, 500, 10000],
        usePageSize: false,
        usePagination: false,
        isShowNumbers: true,
        isShowNumbersCount: true,
        isShowFirstPage: true,
        isShowLastPage: true,
        firstArrow: '',
        lastArrow: '',
        nextArrow: '',
        previousArrow: '',
        paginationInfo: 'Показано з {0} по {1} з {2} записів',
        noDataContent: 'No data content',
    }),

    actions: {
        setTotalRows(totalRows: number): void {
            this.totalRows = totalRows;
        },
        setPage(page: number): void {
            this.page = page;
        },
        setPageSize(pageSize: number): void {
            this.pageSize = pageSize;
        },
        setPageSizeOptions(pageSizeOptions: number[]): void {
            this.pageSizeOptions = pageSizeOptions;
        },
        setUsePageSize(usePageSize: boolean): void {
            this.usePageSize = usePageSize;
        },
        setUsePagination(usePagination: boolean): void {
            this.usePagination = usePagination;
        },
        setIsShowNumbers(isShowNumbers: boolean): void {
            this.isShowNumbers = isShowNumbers;
        },
        setIsShowNumbersCount(isShowNumbersCount: boolean): void {
            this.isShowNumbersCount = isShowNumbersCount;
        },
        setIsShowFirstPage(isShowFirstPage: boolean): void {
            this.isShowFirstPage = isShowFirstPage;
        },
        setIsShowLastPage(isShowLastPage: boolean): void {
            this.isShowLastPage = isShowLastPage;
        },
        setFirstArrow(firstArrow: string): void {
            this.firstArrow = firstArrow;
        },
        setLastArrow(lastArrow: string): void {
            this.lastArrow = lastArrow;
        },
        setNextArrow(nextArrow: string): void {
            this.nextArrow = nextArrow;
        },
        setPreviousArrow(previousArrow: string): void {
            this.previousArrow = previousArrow;
        },
        setPaginationInfo(paginationInfo: string): void {
            this.paginationInfo = paginationInfo;
        },
        setNoDataContent(noDataContent: string): void {
            this.noDataContent = noDataContent;
        },
    },
})

export default usePaginateStore
