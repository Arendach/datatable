<template>
  <thead>
  <display-columns/>
  <display-filters/>
  </thead>
</template>


<script setup lang="ts">
import DisplayColumns from "./columns/display-columns.vue"
import DisplayFilters from "./columns/display-filters.vue"


/*export default {
  name: 'ColumnHeader',
  components: {
    SortDirection,
    columnFilter,
  },
  emits: [
    'selectAll',
    'sortChange',
    'filterChange',
    'toggleFilterMenu',
  ],
  data() {
    return {
      selectedAll: null,
      selectedColumns: [],
    }
  },
  watch: {
    selectedAll() {
      if (this.selectedAll) {
        this.selectedAll.indeterminate = this.checkAll !== false ? !this.checkAll : false;
        this.selectedAll.checked = this.checkAll;
      }
    }
  }
}*/

</script>

<style>
.date-range-filter {
  display: flex;
  flex-direction: column;
  position: relative;
}

.date-range-field {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
}

.date-range-field label {
  width: 30px;
}

.date-range-input {
  width: 100%;
  max-width: 150px;
}
</style>
