const filter = 'native'
import applyFilterNative from "@/filter/native/index"
import applyFilterBackend from '@/filter/backend/index'

if (filter === 'native') {
  export default applyFilterNative
} else {
  export default applyFilterBackend
}
