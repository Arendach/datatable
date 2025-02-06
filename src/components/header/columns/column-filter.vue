<template>
  <ul class="dropdown-menu dropdown-menu-xs dropdown-menu-sm-end">
    <li class="dropdown-item" :class="{ active: column.condition === Condition.WITHOUT }">
      <div @click="select(Condition.WITHOUT)">Без фільтра</div>
    </li>
    <template v-for="(label, condition) in conditions[column.type || 'default']" :key="condition">
      <li class="dropdown-item" :class="{ active: column.condition === condition }">
        <div @click="select(condition)">{{ label }}</div>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import {reactive} from 'vue'
import Condition from "@/types/condition"
import {Column} from "@/types/column"
import useEventBus from "@/composables/use-event-bus"
import Events from "@/types/events"

const conditions = reactive({
  default: {
    [Condition.IS_EMPTY]: 'Порожні',
    [Condition.IS_NOT_EMPTY]: 'Не порожні',
  },
  string: {
    [Condition.CONTAIN]: 'Містить',
    [Condition.NOT_CONTAIN]: 'Не містить',
    [Condition.EQUAL]: 'Рівно',
    [Condition.NOT_EQUAL]: 'Не рівно',
    [Condition.START_WITH]: 'Починається з',
    [Condition.END_WITH]: 'Закінчується на',
  },
  number: {
    [Condition.EQUAL]: 'Рівно',
    [Condition.NOT_EQUAL]: 'Не рівно',
    [Condition.GREATER_THAN]: 'Більше ніж',
    [Condition.GREATER_THAN_EQUAL]: 'Більше або рівно',
    [Condition.LESS_THAN]: 'Менше ніж',
    [Condition.LESS_THAN_EQUAL]: 'Менше або рівно',
  },
  date: {
    [Condition.EQUAL]: 'Рівно',
    [Condition.NOT_EQUAL]: 'Не рівно',
    [Condition.GREATER_THAN]: 'Старіші за',
    [Condition.LESS_THAN]: 'Новіші за',
  },
})

const props = defineProps<{ column: Column }>()

const select = (condition: Condition) => {
  props.column.condition = condition

  if (condition === Condition.WITHOUT) {
    props.column.filterValue = ''
  }

  useEventBus().emit(Events.FILTERS_UPDATED)
}
</script>
