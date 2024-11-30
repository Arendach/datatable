import {computed} from 'vue'
import useDataTableStore from '@/stores/data-table-store'
import useRepresentationStore from '@/stores/representation-store'

export function useColumnCount() {
    const dataTable = useDataTableStore()
    const representation = useRepresentationStore()

    return computed(() => {
        let count = dataTable.columns.length
        if (representation.hasAutoListing) count++
        if (representation.hasCheckbox) count++

        return count
    })
}
