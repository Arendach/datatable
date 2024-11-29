<template>
  <div>
    <span v-if="isCheck" class="text-success">
      <i class="fa fa-check"></i> Так
    </span>
    <span v-else class="text-danger">
      <i class="fa fa-remove"></i> Ні
    </span>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'RenderBoolean',
  props: {
    isCheck: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    return {
      isCheck: props.isCheck,
    }
  },
})
</script>
