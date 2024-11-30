<template>
  <ul class="dropdown-menu dropdown-menu-sm-end" @click="close">
    <li class="dropdown-item" :class="{ active: column.condition === '' }">
      <div @click="select('')">Без фільтра</div>
    </li>
    <template v-if="column.type === 'string'">
      <li class="dropdown-item" :class="{ active: column.condition === 'contain' }">
        <div @click="select('contain')">Містить</div>
      </li>
      <li class="dropdown-item" :class="{ active: column.condition === 'not_contain' }">
        <div @click="select('not_contain')">Не містить</div>
      </li>
      <li class="dropdown-item" :class="{ active: column.condition === 'equal' }">
        <div @click="select('equal')">Рівно</div>
      </li>
      <li class="dropdown-item" :class="{ active: column.condition === 'not_equal' }">
        <div @click="select('not_equal')">Не рівно</div>
      </li>
      <li class="dropdown-item" :class="{ active: column.condition === 'start_with' }">
        <div @click="select('start_with')">Починається з</div>
      </li>
      <li class="dropdown-item" :class="{ active: column.condition === 'end_with' }">
        <div @click="select('end_with')">Закінчується на</div>
      </li>
    </template>
    <template v-else-if="column.type === 'number'">
      <li class="dropdown-item" :class="{ active: column.condition === 'equal' }">
        <div @click="select('equal')">Рівно</div>
      </li>
      <li class="dropdown-item" :class="{ active: column.condition === 'not_equal' }">
        <div @click="select('not_equal')">Не рівно</div>
      </li>
      <li class="dropdown-item" :class="{ active: column.condition === 'greater_than' }">
        <div @click="select('greater_than')">Більше ніж</div>
      </li>
      <li class="dropdown-item" :class="{ active: column.condition === 'greater_than_equal' }">
        <div @click="select('greater_than_equal')">Більше або рівно</div>
      </li>
      <li class="dropdown-item" :class="{ active: column.condition === 'less_than' }">
        <div @click="select('less_than')">Менше ніж</div>
      </li>
      <li class="dropdown-item" :class="{ active: column.condition === 'less_than_equal' }">
        <div @click="select('less_than_equal')">Менше або рівно</div>
      </li>
    </template>
    <template v-else-if="column.type === 'date'">
      <li class="dropdown-item" :class="{ active: column.condition === 'equal' }">
        <div @click="select('equal')">Рівно</div>
      </li>
      <li class="dropdown-item" :class="{ active: column.condition === 'not_equal' }">
        <div @click="select('not_equal')">Не рівно</div>
      </li>
      <li class="dropdown-item" :class="{ active: column.condition === 'greater_than' }">
        <div @click="select('greater_than')">Старіші за</div>
      </li>
      <li class="dropdown-item" :class="{ active: column.condition === 'less_than' }">
        <div @click="select('less_than')">Новіші за</div>
      </li>
    </template>
    <li class="dropdown-item" :class="{ active: column.condition === 'is_null' }">
      <div @click="select('is_null')">Порожні</div>
    </li>
    <li class="dropdown-item" :class="{ active: column.condition === 'is_not_null' }">
      <div @click="select('is_not_null')">Не порожні</div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, reactive, PropType } from 'vue';

interface Column {
  condition: string;
  value: string;
  type: string;
}

export default defineComponent({
  name: 'FilterComponent',
  props: {
    column: {
      type: Object as PropType<Column>,
      required: true,
    },
  },
  emits: ['close', 'filterChange'],
  setup(props, { emit }) {
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
