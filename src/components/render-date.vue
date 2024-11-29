<template>
  <span class="text-primary" v-text="renderDate"></span>
</template>

<script>
import mixins from "../mixins"

export default {
  name: 'RenderDate',
  props: {
    name: {
      required: true,
      default: 'date',
    },
    item: {
      required: true,
    },
  },
  mixins: [mixins],
  computed: {
    renderDate() {
      let name = this.name
      let nameFormat = `${this.name}Format`

      if (this.cellValue(this.item, nameFormat))
        return this.cellValue(this.item, nameFormat)

      return this.cellValue(this.item, name)
    }
  }
}
</script>
