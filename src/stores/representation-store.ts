import {defineStore} from 'pinia'

type UiClass = Array<string> | null | Function | string

interface RepresentationState {
  skin: string | null
  rowClass: UiClass
  cellClass: UiClass
  height: number | string | null
  loading: boolean
  hasAutoListing: boolean
  hasCheckbox: boolean
  cloneHeaderInFooter: boolean
}

const useRepresentationStore = defineStore('representation', {
  state: (): RepresentationState => ({
    skin: null,
    rowClass: null,
    cellClass: null,
    height: null,
    loading: true,
    hasAutoListing: false,
    hasCheckbox: false,
    cloneHeaderInFooter: false,
  }),
  actions: {
    setProps(props: Partial<RepresentationState>): void {
      Object.assign(this, props)
    },
  },
})

export default useRepresentationStore
