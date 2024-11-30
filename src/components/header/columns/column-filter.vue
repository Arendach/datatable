<template>
  <ul class="dropdown-menu dropdown-menu-sm-end" @click="close">
    <li class="dropdown-item" :class="{ active: column.condition === Condition.WITHOUT }">
      <div @click="select(Condition.WITHOUT)">Без фільтра</div>
    </li>
    <template v-if="column.type === 'string'">
      <li class="dropdown-item" :class="{ active: column.condition === Condition.CONTAIN }">
        <div @click="select(Condition.CONTAIN)">Містить</div>
      </li>
      <li class="dropdown-item" :class="{ active: column.condition === Condition.NOT_CONTAIN }">
        <div @click="select(Condition.NOT_CONTAIN)">Не містить</div>
      </li>
      <li class="dropdown-item" :class="{ active: column.condition === Condition.EQUAL }">
        <div @click="select(Condition.EQUAL)">Рівно</div>
      </li>
      <li class="dropdown-item" :class="{ active: column.condition === Condition.NOT_EQUAL }">
        <div @click="select(Condition.NOT_EQUAL)">Не рівно</div>
      </li>
      <li class="dropdown-item" :class="{ active: column.condition === Condition.START_WITH }">
        <div @click="select(Condition.START_WITH)">Починається з</div>
      </li>
      <li class="dropdown-item" :class="{ active: column.condition === Condition.END_WITH }">
        <div @click="select(Condition.END_WITH)">Закінчується на</div>
      </li>
    </template>
    <template v-else-if="column.type === 'number'">
      <li class="dropdown-item" :class="{ active: column.condition === Condition.EQUAL }">
        <div @click="select(Condition.EQUAL)">Рівно</div>
      </li>
      <li class="dropdown-item" :class="{ active: column.condition === Condition.NOT_EQUAL }">
        <div @click="select(Condition.NOT_EQUAL)">Не рівно</div>
      </li>
      <li class="dropdown-item" :class="{ active: column.condition === Condition.GREATER_THAN }">
        <div @click="select(Condition.GREATER_THAN)">Більше ніж</div>
      </li>
      <li class="dropdown-item" :class="{ active: column.condition === Condition.GREATER_THAN_EQUAL }">
        <div @click="select(Condition.GREATER_THAN_EQUAL)">Більше або рівно</div>
      </li>
      <li class="dropdown-item" :class="{ active: column.condition === Condition.LESS_THAN }">
        <div @click="select(Condition.LESS_THAN)">Менше ніж</div>
      </li>
      <li class="dropdown-item" :class="{ active: column.condition === Condition.LESS_THAN_EQUAL }">
        <div @click="select(Condition.LESS_THAN_EQUAL)">Менше або рівно</div>
      </li>
    </template>
    <template v-else-if="column.type === 'date'">
      <li class="dropdown-item" :class="{ active: column.condition === Condition.EQUAL }">
        <div @click="select(Condition.EQUAL)">Рівно</div>
      </li>
      <li class="dropdown-item" :class="{ active: column.condition === Condition.NOT_EQUAL }">
        <div @click="select(Condition.NOT_EQUAL)">Не рівно</div>
      </li>
      <li class="dropdown-item" :class="{ active: column.condition === Condition.GREATER_THAN }">
        <div @click="select(Condition.GREATER_THAN)">Старіші за</div>
      </li>
      <li class="dropdown-item" :class="{ active: column.condition === Condition.LESS_THAN }">
        <div @click="select(Condition.LESS_THAN)">Новіші за</div>
      </li>
    </template>
    <li class="dropdown-item" :class="{ active: column.condition === Condition.IS_EMPTY }">
      <div @click="select(Condition.IS_EMPTY)">Порожні</div>
    </li>
    <li class="dropdown-item" :class="{ active: column.condition === Condition.IS_NOT_EMPTY }">
      <div @click="select(Condition.IS_NOT_EMPTY)">Не порожні</div>
    </li>
  </ul>
</template>

<script lang="ts">
import {defineComponent, onMounted, onBeforeUnmount, PropType} from 'vue';
import Condition from "@/types/condition";

interface Column {
  condition: string;
  value: string;
  type: string;
}

export default defineComponent({
  name: 'FilterComponent',
  computed: {
    Condition() {
      return Condition
    }
  },
  props: {
    column: {
      type: Object as PropType<Column>,
      required: true,
    },
  },
  emits: ['close', 'filterChange'],
  setup(props, {emit}) {
    const close = () => {
      emit('close');
    };

    const select = (condition: string) => {
      props.column.condition = condition;
      if (condition === '') props.column.value = '';

      emit('filterChange', props.column);
    };

    onMounted(() => {
      document.addEventListener('click', close);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('click', close);
    });

    return {
      close,
      select,
    };
  },
});
</script>
