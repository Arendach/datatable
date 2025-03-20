import { App } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import DataTable from "./components/DataTable.vue"

const piniaInstance = createPinia()
setActivePinia(piniaInstance)

const install = (app: App) => {
  app.use(piniaInstance)
  app.component("DataTable", DataTable)
}

export { DataTable, install, piniaInstance }
export default DataTable
