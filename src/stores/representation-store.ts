import {defineStore} from 'pinia'

type UiClass = Array<string> | null | Function | String;

const useRepresentationStore = defineStore('representation', {
    state: () => ({
        skin: null as String | null,
        rowClass: null as UiClass,
        cellClass: null as UiClass,
        height: null as Number | String | null,
        loading: true as Boolean,
        hasAutoListing: false as Boolean,
        hasCheckbox: false as Boolean,
        cloneHeaderInFooter: false as Boolean,
    }),
    actions: {
        setSkin(skin: String | null): void {
            this.$state.skin = skin
        },
        setRowClass(rowClass: UiClass): void {
            this.$state.rowClass = rowClass
        },
        setCellClass(cellClass: Array<string> | Function | null): void {
            this.$state.cellClass = cellClass
        },
        setHeight(height: Number | String | null): void {
            this.$state.height = height
        },
        setLoading(loading: Boolean): void {
            this.$state.loading = loading
        },
        setHasAutoListing(hasAutoListing: Boolean): void {
            this.$state.hasAutoListing = hasAutoListing
        },
        setHasCheckbox(hasCheckbox: Boolean): void {
            this.$state.hasCheckbox = hasCheckbox
        },
        setCloneHeaderInFooter(cloneHeaderInFooter: Boolean): void {
            this.$state.cloneHeaderInFooter = cloneHeaderInFooter
        }
    }
})


export default useRepresentationStore
