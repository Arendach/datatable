<template>
  <div class="boolean-toggle-xs">
    <button
      type="button"
      class="toggle-btn true"
      :class="{ active: modelValue === true }"
      @click="updateValue(true)"
    >
      Yes
    </button>
    <button
      type="button"
      class="toggle-btn null"
      :class="{ active: modelValue === null || modelValue === undefined }"
      @click="updateValue(null)"
    >
      —
    </button>
    <button
      type="button"
      class="toggle-btn false"
      :class="{ active: modelValue === false }"
      @click="updateValue(false)"
    >
      No
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  modelValue: boolean | null | undefined
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean | null): void;
}>();

function updateValue(value: boolean | null) {
  emit('update:modelValue', value);
}
</script>
