import {defineStore} from 'pinia'

const useUniqueIdStore = defineStore('uniqueId', {
    state: () => ({
        uniqueId: 'datatable' as String,
    }),
    actions: {
        setUniqueId(uniqueId: String): void {
            this.uniqueId = uniqueId
        }
    }
})

export default useUniqueIdStore
