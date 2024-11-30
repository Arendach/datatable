import {defineStore} from 'pinia'

enum SortDirection {
    ASC = 'asc',
    DESC = 'desc'
}

export const filterStore = defineStore('filter', {
    state: () => ({
        search: '' as String,
        useSorting: false as Boolean,
        sortColumn: null as String | null,
        sortDirection: SortDirection.ASC as SortDirection,
        useFiltering: false as Boolean,
        useSelectRowOnClick: false as Boolean,
        usePersistSelection: false as Boolean,
    }),
    getters: {
        search: (state): String => state.search,
        useSorting: (state): Boolean => state.useSorting,
        sortColumn: (state): String | null => state.sortColumn,
        sortDirection: (state): SortDirection => state.sortDirection,
        useFiltering: (state): Boolean => state.useFiltering,
        useSelectRowOnClick: (state): Boolean => state.useSelectRowOnClick,
        usePersistSelection: (state): Boolean => state.usePersistSelection,
    },
    actions: {
        setSearch(search: String): void {
            this.$state.search = search
        },
        setUseSorting(useSorting: Boolean): void {
            this.$state.useSorting = useSorting
        },
        setSortColumn(sortColumn: String): void {
            this.$state.sortColumn = sortColumn
        },
        setSortDirection(sortDirection: SortDirection): void {
            this.$state.sortDirection = sortDirection
        },
        setUseFiltering(useFiltering: Boolean): void {
            this.$state.useFiltering = useFiltering
        },
        setUseSelectRowOnClick(useSelectRowOnClick: Boolean): void {
            this.$state.useSelectRowOnClick = useSelectRowOnClick
        },
        setUsePersistSelection(usePersistSelection: Boolean): void {
            this.$state.usePersistSelection = usePersistSelection
        },
    }
})
