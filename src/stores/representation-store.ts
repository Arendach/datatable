import {defineStore} from 'pinia'

type UiClass = Array<string> | null | Function | string

interface RepresentationState {
  skin: string | null
  rowClass: UiClass
  cellClass: UiClass
  height: number | string | null
  hasExpand: boolean
  hasAutoListing: boolean
  hasCheckbox: boolean
  cloneHeaderInFooter: boolean
  dateFormat: string
}

const useRepresentationStore = defineStore('representation', {
  state: (): RepresentationState => ({
    skin: null,
    rowClass: null,
    cellClass: null,
    height: null,
    hasExpand: false,
    hasAutoListing: false,
    hasCheckbox: false,
    cloneHeaderInFooter: false,
    dateFormat: 'dd.mm.yyyy',
  }),
  actions: {
    setProps(props: Partial<RepresentationState>): void {
      Object.assign(this, props)
    },
  },
})

export default useRepresentationStore
