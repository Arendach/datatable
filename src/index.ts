import {App} from 'vue'
import {createPinia, setActivePinia} from 'pinia'
import DataTable from "./components/DataTable.vue"
import '@vueform/multiselect/themes/default.css'
import '@vuepic/vue-datepicker/dist/main.css'
import '@/assets/app.css'

const piniaInstance = createPinia()
setActivePinia(piniaInstance)

const install = (app: App) => {
  app.use(piniaInstance)
  app.component("DataTable", DataTable)
}

export {DataTable, install, piniaInstance}
export default DataTable
