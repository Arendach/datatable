import {defineStore} from 'pinia'

const useSlotsStore = defineStore('slotsStore', {
  state: () => ({
    slots: {} as Object,
  }),
  actions: {
    setSlots(slots: Object): void {
      this.slots = slots
    },
    hasSlot(slot: string): boolean {
      return this.slots.hasOwnProperty(slot)
    },
    getSlot(slot: string): any {
      return this.slots[slot]
    },
  }
})

export default useSlotsStore
