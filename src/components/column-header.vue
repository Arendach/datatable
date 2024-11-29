<template>
  <tr class="exportable">
    <th v-if="all.autoListing" class="centered exportable">№ з/п</th>
    <th
        v-if="all.hasCheckbox"
        :key="'chkall'"
        class="centered"
    >
      <div class="form-check">
        <input class="form-check-input" :checked="checkAll" ref="selectedAll" type="checkbox" @click.stop="$emit('selectAll', $event.target.checked)"/>
      </div>
    </th>
    <template v-for="col in all.columns">
      <th
          v-if="col.show"
          :key="col.field"
          :class="[
            all.sortable && col.sort ? 'bh-cursor-pointer' : '',
            col.position ? col.position : '',
            col.exportable ? 'exportable' : '',
            col.className ? col.className : '',
          ]"
          :style="{
            width: col.width,
            'min-width': col.minWidth,
            'max-width': col.maxWidth,
          }"
      >
        <div :class="[col.headerClass ? col.headerClass : '']" @click="all.sortable && col.sort && $emit('sortChange', col.field)">
          <div class="form-check" v-if="col.selectable">
            <input class="form-check-input" type="checkbox" :value="col" v-model="selectedColumns" @click.stop>
            <label class="form-check-label">{{ col.title }}</label>
            <sort-direction :column="col" :sortable="all.sortable" :sort-column="currentSortColumn" :sort-direction="currentSortDirection"/>
          </div>
          <div v-else>
            {{ col.title }}
            <sort-direction :column="col" :sortable="all.sortable" :sort-column="currentSortColumn" :sort-direction="currentSortDirection"/>
          </div>
        </div>
      </th>
    </template>
  </tr>

  <tr v-if="all.hasFilter && !isFooter">
    <th v-if="all.autoListing"></th>
    <th v-if="all.hasCheckbox"></th>
    <template v-for="col in all.columns">
      <th
          v-if="col.show"
          :key="col.field"
          :style="{width: col.width, 'min-width': col.minWidth,'max-width': col.maxWidth,}"
      >
          <div class="input-group" v-if="col.filter">
            <input v-if="col.type === 'string'" v-model.trim="col.value" type="text" class="form-control form-control-sm"
                   @keyup="$emit('filterChange')"/>
            <input v-if="col.type === 'number'" v-model.number.trim="col.value" type="number" class="form-control form-control-sm"
                   @keyup="$emit('filterChange')"/>
            <input v-else-if="col.type === 'date'" v-model="col.value" type="date" class="form-control form-control-sm"
                   @change="$emit('filterChange')"/>
            <select v-else-if="col.type === 'bool'" v-model="col.value" class="form-control form-control-sm"
                    @change="$emit('filterChange')" @click="isOpenFilter = null">
              <option :value="undefined">Всі</option>
              <option :value="true">Так</option>
              <option :value="false">Ні</option>
            </select>
            <template v-else-if="col.type === 'date-range'">
              <div class="input-group date-range-filter">
                <div class="date-range-field">
                  <label>З:</label>
                  <input
                    type="date"
                    v-model="col.startDate"
                    class="form-control form-control-sm date-range-input"
                    @change="$emit('filterChange')"
                  />
                </div>
                <div class="date-range-field">
                  <label>По:</label>
                  <input
                    type="date"
                    v-model="col.endDate"
                    class="form-control form-control-sm date-range-input"
                    @change="$emit('filterChange')"
                  />
                </div>
              </div>
            </template>

            <button
                v-if="col.type !== 'bool' && col.type !== 'date-range'"
                class="btn btn-sm btn-outline-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                data-bs-auto-close="true"
            ></button>

            <column-filter v-if="col.type !== 'date-range'"
                :column="col"
                :type="col.type"
                @close="$emit('toggleFilterMenu', null)"
                @filterChange="$emit('filterChange')"
            />
          </div>
      </th>
    </template>
  </tr>
</template>


<script>
import columnFilter from './column-filter.vue'
import SortDirection from "./sort-direction.vue"

export default {
  name: 'ColumnHeader',
  props: ['all', 'currentSortColumn', 'currentSortDirection', 'isOpenFilter', 'isFooter', 'checkAll',],
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
}

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
