<template>
  <ul class="dropdown-menu dropdown-menu-xs dropdown-menu-sm-end">
    <li class="dropdown-item" :class="{ active: column.filter.condition === Condition.WITHOUT }">
      <div @click="select(Condition.WITHOUT)">Без фільтра</div>
    </li>
    <template v-for="(label, condition) in typeConditions" :key="condition">
      <li class="dropdown-item" :class="{ active: column.filter.condition === condition }">
        <div @click="select(condition)">{{ label }}</div>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import {reactive, computed} from 'vue'
import Condition from "@/types/condition"
import {Column} from "@/types/column"
import useEventBus from "@/composables/use-event-bus"
import Events from "@/types/events"
import useDataTableStore from "@/stores/data-table-store"

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
    [Condition.GREATER_THAN]: 'Новіші за',
    [Condition.LESS_THAN]: 'Старіші за',
  },
})

const typeConditions = computed(() => {
  const type = props.column.type || 'default'
  return {
    ...conditions.default,
    ...conditions[type],
  }
})

const props = defineProps<{ column: Column }>()
const datatable = useDataTableStore()

const select = (condition: Condition) => {
  props.column.filter.condition = condition

  if (condition === Condition.WITHOUT) {
    props.column.filter.value = ''
  }

  useEventBus().emit(Events.FILTERS_UPDATED)
  datatable.saveColumns()
}
</script>
