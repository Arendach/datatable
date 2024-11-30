<template>
  <div class="table-responsive" :style="{ 'height': height }">

    <table-header/>

    <table
        class="table table-sm table-bordered" :class="[skin ? `table-${skin}` : '']"
        :id="uniqueId"
    >
      <thead>
      <column-header
          :all="$props"
          :current-sort-column="currentSortColumn"
          :current-sort-direction="currentSortDirection"
          :is-open-filter="isOpenFilter"
          :check-all="selectedAll"
          @selectAll="selectAll"
          @sortChange="sortChange"
          @filterChange="filterChange"
          @toggleFilterMenu="toggleFilterMenu"
          ref="header"
      />
      </thead>
      <tbody>
      <template v-if="filterRowCount">
        <tr
            v-for="(item, i) in filterItems"
            :key="item[uniqueKey] ? item[uniqueKey] : i"
            :class="[rowClass && typeof rowClass === 'function' ? rowClass(item) : rowClass, selectRowOnClick ? 'bh-cursor-pointer' : '', 'exportable']"
            @click="rowClick(item, i)"
        >
          <td v-if="autoListing" v-text="i + 1" class="centered exportable"></td>
          <td v-if="hasCheckbox" class="centered">
            <div class="form-check">
              <input class="form-check-input" v-model="selected" type="checkbox"
                     :value="item[uniqueKey] ? item[uniqueKey] : i" @click.stop/>
            </div>
          </td>
          <template v-for="col in columns">
            <td v-if="col.show" :key="col.field" :class="[
                  typeof cellClass === 'function' ? cellClass(item) : cellClass,
                  col.position ? col.position : '',
                  col.exportable ? 'exportable' : '',
                  col.className ? col.className : '',
               ]"
            >
              <template v-if="$slots[col.field]">
                <slot :name="col.field" :value="item"></slot>
              </template>
              <div v-else-if="col.cellRenderer" v-html="col.cellRenderer(item)"></div>
              <template v-else-if="col.type === 'bool'">
                <render-boolean :is-check="cellValue(item, col.field)"/>
              </template>
              <template v-else-if="col.type === 'date'">
                <render-date :name="col.field" :item="item"></render-date>
              </template>
              <template v-else>
                {{ cellValue(item, col.field) }}
              </template>
            </td>
          </template>
        </tr>
      </template>
      <tr v-if="!filterRowCount && !currentLoader">
        <td :colspan="countColumns" class="no-data" v-html="noDataContent"></td>
      </tr>

      <template v-if="!filterRowCount && currentLoader">
        <tr>
          <td :colspan="countColumns">
            <div class="d-flex justify-content-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </td>
        </tr>
      </template>
      </tbody>

      <tfoot v-if="cloneHeaderInFooter">
      <column-header
          :all="props"
          :current-sort-column="currentSortColumn"
          :current-sort-direction="currentSortDirection"
          :is-open-filter="isOpenFilter"
          :is-footer="true"
          :check-all="selectedAll"
          @selectAll="selectAll"
          @sortChange="sortChange"
          @filterChange="filterChange"
          @toggleFilterMenu="toggleFilterMenu"
      />
      </tfoot>
    </table>
  </div>

  <!--  <pagination/>-->
</template>

<script lang="ts">
import columnHeader from './column-header.vue'
import * as XLSX from "xlsx"
import dateFormat from "dateformat"
import RenderBoolean from "./render-boolean.vue"
import mixins from "../mixins"
import store2 from 'store2'
import RenderDate from "./render-date.vue"
import {dataTableStore} from "@/stores/data-table-store"
import {representationStore} from "@/stores/representation-store"
import {paginateStore} from "@/stores/paginate-store"
import {filterStore} from "@/stores/filter-store"
import {mapStores} from "pinia"
import TableHeader from "@/components/table-header.vue"
import Pagination from "@/components/pagination.vue"
import {Column} from "@/types/datatable-props/columns"

export default {
  name: 'DataTable',
  props: {
    // representation
    skin: {type: String},
    rowClass: {},
    cellClass: {},
    height: {type: String},
    loading: {type: Boolean},
    hasAutoListing: {type: Boolean},
    hasCheckbox: {type: Boolean},
    cloneHeaderInFooter: {type: Boolean},

    // data
    columns: {type: Array<Column>, required: true},
    rows: {type: Array<Object>, required: true},
    isServerMode: {type: Boolean},

    // paginate
    totalRows: {type: Number},
    page: {type: Number},
    pageSize: {type: Number},
    pageSizeOptions: {type: Array},
    usePageSize: {type: Boolean},
    usePagination: {type: Boolean, default: false},
    isShowNumbers: {type: Boolean},
    isShowNumbersCount: {type: Number},
    isShowFirstPage: {type: Boolean},
    isShowLastPage: {type: Boolean},
    firstArrow: {type: String},
    lastArrow: {type: String},
    nextArrow: {type: String},
    previousArrow: {type: String},
    paginationInfo: {type: String},
    noDataContent: {type: String},

    // filter
    search: {type: String},
    useSorting: {type: Boolean},
    sortColumn: {type: String},
    sortDirection: {type: String},
    useFiltering: {type: Boolean},
    useSelectRowOnClick: {type: Boolean},
    usePersistSelection: {type: Boolean},

    uniqueId: {type: String, default: 'datatable',},
  },
  components: {
    TableHeader,
    RenderDate,
    RenderBoolean,
    columnHeader,
    Pagination,
  },
  mixins: [mixins,],
  beforeMount() {
    // representation
    if (this.skin) {
      this.representationStore.setSkin(this.skin)
    }

    if (this.rowClass) {
      this.representationStore.setRowClass(this.rowClass)
    }

    if (this.cellClass) {
      this.representationStore.setCellClass(this.cellClass)
    }

    if (this.height) {
      this.representationStore.setHeight(this.height)
    }

    if (this.loading) {
      this.representationStore.setLoading(this.loading)
    }

    if (this.hasAutoListing) {
      this.representationStore.setHasAutoListing(this.hasAutoListing)
    }

    if (this.hasCheckbox) {
      this.representationStore.setHasCheckbox(this.hasCheckbox)
    }

    if (this.cloneHeaderInFooter) {
      this.representationStore.setCloneHeaderInFooter(this.cloneHeaderInFooter)
    }

    // data
    if (this.columns) {
      this.dataTableStore.setColumns(this.columns)
    }

    if (this.rows) {
      this.dataTableStore.setRows(this.rows)
    }

    if (this.isServerMode) {
      this.dataTableStore.setIsServerMode(this.isServerMode)
    }

    // paginate
    if (this.totalRows) {
      this.paginateStore.setTotalRows(this.totalRows)
    }

    if (this.page) {
      this.paginateStore.setPage(this.page)
    }

    if (this.pageSize) {
      this.paginateStore.setPageSize(this.pageSize)
    }

    if (this.pageSizeOptions) {
      this.paginateStore.setPageSizeOptions(this.pageSizeOptions)
    }

    if (this.usePageSize) {
      this.paginateStore.setUsePageSize(this.usePageSize)
    }

    if (typeof this.usePagination !== 'undefined') {
      this.paginateStore.setUsePagination(this.usePagination)
    }

    if (this.isShowNumbers) {
      this.paginateStore.setIsShowNumbers(this.isShowNumbers)
    }

    if (this.isShowNumbersCount) {
      this.paginateStore.setIsShowNumbersCount(this.isShowNumbersCount)
    }

    if (this.isShowFirstPage) {
      this.paginateStore.setIsShowFirstPage(this.isShowFirstPage)
    }

    if (this.isShowLastPage) {
      this.paginateStore.setIsShowLastPage(this.isShowLastPage)
    }

    if (this.firstArrow) {
      this.paginateStore.setFirstArrow(this.firstArrow)
    }

    if (this.lastArrow) {
      this.paginateStore.setLastArrow(this.lastArrow)
    }

    if (this.nextArrow) {
      this.paginateStore.setNextArrow(this.nextArrow)
    }

    if (this.previousArrow) {
      this.paginateStore.setPreviousArrow(this.previousArrow)
    }

    if (this.paginationInfo) {
      this.paginateStore.setPaginationInfo(this.paginationInfo)
    }

    if (this.noDataContent) {
      this.paginateStore.setNoDataContent(this.noDataContent)
    }

    this.setDefaultColumns()
    this.loadSelectedColumns()
  },
  mounted() {
    this.filterRows()
  },
  data() {
    return {
      filterItems: this.rows,
      currentPage: 1,
      currentPageSize: 0,
      oldPageSize: this.pageSize,
      currentSortColumn: null,
      oldSortColumn: null,
      currentSortDirection: 'asc',
      oldSortDirection: this.sortDirection,
      filterRowCount: 0,
      selected: [],
      selectedAll: false,
      currentLoader: true,
      currentSearch: this.search,
      oldColumns: JSON.parse(JSON.stringify(this.columns)),
      isOpenFilter: null,
      clickCount: 0,
      timer: null,
      delay: 220,
      persistedElements: [],
    }
  },
  computed: {
    ...mapStores(dataTableStore, representationStore, paginateStore, filterStore),
    uniqueKey() {
      return this.columns.find(col => col.isUnique)?.field || 'id';
    },
    offset() {
      return (this.currentPage - 1) * this.currentPageSize + 1
    },
    limit() {
      let limit = this.currentPage * this.currentPageSize

      return this.filterRowCount >= limit ? limit : this.filterRowCount
    },
    maxPage() {
      const totalPages = this.currentPageSize < 1 ? 1 : Math.ceil(this.filterRowCount / this.currentPageSize)

      return Math.max(totalPages || 0, 1)
    },
    paging() {
      let startPage, endPage
      let isMaxSized = typeof this.showNumbersCount !== 'undefined' && this.showNumbersCount < this.maxPage
      if (isMaxSized) {
        // Current page is displayed in the middle of the visible ones
        startPage = Math.max(this.currentPage - Math.floor(this.showNumbersCount / 2), 1);
        endPage = startPage + this.showNumbersCount - 1

        // Adjust if limit is exceeded
        if (endPage > this.maxPage) {
          endPage = this.maxPage
          startPage = endPage - this.showNumbersCount + 1;
        }
      } else {
        startPage = 1
        endPage = this.maxPage
      }

      return Array.from(Array(endPage + 1 - startPage).keys()).map((i) => startPage + i)
    },
    countColumns() {
      let count = this.columns.length
      if (this.autoListing) count++
      if (this.hasCheckbox) count++

      return count
    },
    storage() {
      return store2.local.namespace(this.uniqueId)
    },
  },
  watch: {
    rows(value) {
      this.filterItems = value
      this.currentPageSize = this.pagination ? this.pageSize : value.length
      this.filterRowCount = value.length

      this.changeRows()
    },
    currentPage() {
      this.changePage()
    },
    loading(value) {
      this.currentLoader = value
    },
    currentPageSize() {
      this.changePageSize()
    },
    selected(value) {
      this.checkboxChange(value)
    },
    search(value) {
      this.currentSearch = value
      this.changeSearch()
    },
  },
  methods: {
    selectAll(checked) {
      if (checked) {
        const selectedItems = this.filterItems.map((d, i) => (this.uniqueKey ? d[this.uniqueKey] : i));

        if (this.persistSelection) {
          this.selected = selectedItems;
          this.persistedElements = [...new Set([...this.persistedElements, ...selectedItems])];
        } else {
          this.selected = selectedItems;
        }
      } else {
        const deselectItems = this.filterItems.map((d, i) => (this.uniqueKey ? d[this.uniqueKey] : i));
        if (this.persistSelection) {
          this.selected = [];
          this.persistedElements = this.persistedElements.filter(item => !deselectItems.includes(item));
        } else {
          this.selected = [];
        }
      }
    },
    sortChange(field) {
      let direction = 'asc'
      if (field === this.currentSortColumn && this.currentSortDirection === 'asc') direction = 'desc'

      let offset = (this.currentPage - 1) * this.currentPageSize
      let limit = this.currentPageSize
      this.currentSortColumn = field
      this.currentSortDirection = direction

      if (!this.persistSelection) {
        this.selectAll(false)
      }
      this.filterRows()

      if (this.isServerMode) {
        this.changeForServer('sort')
      } else {
        this.$emit('sortChange', {offset, limit, field, direction})
      }
    },
    applyFilters() {
      this.filterItems = this.rows.filter((row) => {
        return this.columns.every((column) => {
          if (column.type === "date-range" && (column.startDate || column.endDate)) {
            const dateValue = new Date(row[column.field]);
            const start = column.startDate ? new Date(column.startDate) : null;
            const end = column.endDate ? new Date(column.endDate) : null;
            return (!start || dateValue >= start) && (!end || dateValue <= end);
          }
          return true;
        });
      });
    },
    updateDateRange(field, {startDate, endDate}) {
      const column = this.columns.find((col) => col.field === field);
      if (column) {
        column.startDate = startDate;
        column.endDate = endDate;
        this.applyFilters();
      }
    },
    filterChange() {
      if (!this.persistSelection) {
        this.selectAll(false)
      }

      if (this.isServerMode) {
        // for server side paginations
        if (this.currentPage === 1) {
          this.changeForServer('filter', true)
        } else {
          this.currentPage = 1; // changeForServer method call when currentPage change
        }
      } else {
        this.currentPage = 1;
        this.filterRows()
        this.$emit('filterChange', this.columns)
      }
    },
    toggleFilterMenu(col) {
      if (col) {
        if (this.isOpenFilter === col.field) this.isOpenFilter = null
        else this.isOpenFilter = col.field
      } else {
        this.isOpenFilter = null
      }
    },
    rowClick(item, index) {
      this.clickCount++

      if (this.clickCount === 1) {
        this.timer = setTimeout(() => {
          this.clickCount = 0

          if (this.selectRowOnClick) {
            if (this.isRowSelected(index)) this.unselectRow(index)
            else this.selectRow(index)

            this.checkboxChange(this.selected)
          }
          this.$emit('rowClick', item)
        }, this.delay)
      } else if (this.clickCount === 2) {
        clearTimeout(this.timer)
        this.clickCount = 0
        this.$emit('rowDBClick', item)
      }
    },
    isRowSelected(index) {
      const rows = this.filterItems.find((d, i) => i === index)

      if (rows) return this.selected.includes(this.uniqueKey ? rows[this.uniqueKey] : index)

      return false
    },
    selectRow(index) {
      if (!this.isRowSelected(index)) {
        const rows = this.filterItems.find((d, i) => i === index)
        this.selected.push(this.uniqueKey ? rows[this.uniqueKey] : index)
      }
    },
    unselectRow(index) {
      if (this.isRowSelected(index)) {
        const rows = this.filterItems.find((d, i) => i === index)
        this.selected = this.selected.filter((d) => d !== (this.uniqueKey ? rows[this.uniqueKey] : index))
      }
    },
    checkboxChange(value) {
      if (this.persistSelection) {
        this.persistedElements = [...new Set([...this.persistedElements, ...value])];
      }
      this.selectedAll = value?.length && this.filterItems.length && value?.length === this.filterItems.length;
      const rows = this.filterItems.filter((d) => this.selected.includes(this.uniqueKey ? d[this.uniqueKey] : d));
      this.$emit('rowSelect', rows);
    },
    filterRows() {

      this.filterItems = this.rows;
      this.filterRowCount = this.rows.length;

      return;

      let result = [];
      let rows = this.filteredRows();

      if (this.isServerMode) {
        this.filterRowCount = this.totalRows || 0;
        result = rows;
      } else {
        this.filterRowCount = rows?.length || 0;
        result = rows.slice(this.offset - 1, this.limit);
      }

      if (this.persistSelection) {
        this.selected = this.persistedElements.filter((uuid) => {
          return result.some((row) => String(row[this.uniqueKey]) === String(uuid));
        });
      }

      this.filterItems = result || [];
    },
    filteredRows() {
      let rows = this.rows || []

      if (this.isServerMode) return rows

      this.columns?.forEach((d) => {
        if (d.filter && ((d.value !== undefined && d.value !== null && d.value !== '') || d.condition === 'is_null' || d.condition === 'is_not_null' || d.type === "date-range")) {
          // string filters
          if (d.type === 'string') {
            if (d.value && !d.condition) {
              d.condition = 'contain';
            }

            if (d.condition === 'contain') {
              rows = rows.filter((item) => {
                return this.cellValue(item, d.field)?.toString().toLowerCase().includes(d.value.toLowerCase());
              });
            } else if (d.condition === 'not_contain') {
              rows = rows.filter((item) => {
                return !this.cellValue(item, d.field)?.toString().toLowerCase().includes(d.value.toLowerCase());
              });
            } else if (d.condition === 'equal') {
              rows = rows.filter((item) => {
                return this.cellValue(item, d.field)?.toString().toLowerCase() === d.value.toLowerCase();
              });
            } else if (d.condition === 'not_equal') {
              rows = rows.filter((item) => {
                return this.cellValue(item, d.field)?.toString().toLowerCase() !== d.value.toLowerCase();
              });
            } else if (d.condition === 'start_with') {
              rows = rows.filter((item) => {
                return this.cellValue(item, d.field)?.toString().toLowerCase().indexOf(d.value.toLowerCase()) === 0;
              });
            } else if (d.condition === 'end_with') {
              rows = rows.filter((item) => {
                return (
                    this.cellValue(item, d.field)
                        ?.toString()
                        .toLowerCase()
                        .substr(d.value.length * -1) === d.value.toLowerCase()
                );
              });
            }
          }
          // number filters
          else if (d.type === 'number') {
            if (d.value && !d.condition) {
              d.condition = 'equal';
            }

            if (d.condition === 'equal') {
              rows = rows.filter((item) => {
                return this.cellValue(item, d.field) && parseFloat(this.cellValue(item, d.field)) === parseFloat(d.value);
              });
            } else if (d.condition === 'not_equal') {
              rows = rows.filter((item) => {
                return this.cellValue(item, d.field) && parseFloat(this.cellValue(item, d.field)) !== parseFloat(d.value);
              });
            } else if (d.condition === 'greater_than') {
              rows = rows.filter((item) => {
                return this.cellValue(item, d.field) && parseFloat(this.cellValue(item, d.field)) > parseFloat(d.value);
              });
            } else if (d.condition === 'greater_than_equal') {
              rows = rows.filter((item) => {
                return this.cellValue(item, d.field) && parseFloat(this.cellValue(item, d.field)) >= parseFloat(d.value);
              });
            } else if (d.condition === 'less_than') {
              rows = rows.filter((item) => {
                return this.cellValue(item, d.field) && parseFloat(this.cellValue(item, d.field)) < parseFloat(d.value);
              });
            } else if (d.condition === 'less_than_equal') {
              rows = rows.filter((item) => {
                return this.cellValue(item, d.field) && parseFloat(this.cellValue(item, d.field)) <= parseFloat(d.value);
              });
            }
          }
          // date filters
          else if (d.type === 'date') {
            if (d.value && !d.condition) {
              d.condition = 'equal';
            }

            if (d.condition === 'equal') {
              rows = rows.filter((item) => {
                return this.cellValue(item, d.field) && this.dateFormat(this.cellValue(item, d.field)) === d.value
              })
            } else if (d.condition === 'not_equal') {
              rows = rows.filter((item) => {
                return this.cellValue(item, d.field) && this.dateFormat(this.cellValue(item, d.field)) !== d.value
              });
            } else if (d.condition === 'greater_than') {
              rows = rows.filter((item) => {
                return this.cellValue(item, d.field) && this.dateFormat(this.cellValue(item, d.field)) > d.value
              });
            } else if (d.condition === 'less_than') {
              rows = rows.filter((item) => {
                return this.cellValue(item, d.field) && this.dateFormat(this.cellValue(item, d.field)) < d.value
              });
            }
          }
          // boolean filters
          else if (d.type === 'bool') {
            rows = rows.filter((item) => {
              return this.cellValue(item, d.field) === d.value
            });
          } else if (d.type === "date-range") {
            rows = rows.filter((row) => {
              const dateValue = new Date(this.cellValue(row, d.field));
              const start = d.startDate ? new Date(d.startDate) : null;
              const end = d.endDate ? new Date(d.endDate) : null;
              return (!start || dateValue >= start) && (!end || dateValue <= end);
            });
          }

          if (d.condition === 'is_null') {
            rows = rows.filter((item) => {
              return this.cellValue(item, d.field) == null || this.cellValue(item, d.field) === ''
            })
            d.value = ''
          } else if (d.condition === 'is_not_null') {
            d.value = ''
            rows = rows.filter((item) => {
              return this.cellValue(item, d.field)
            })
          }
        }
      })

      if (this.currentSearch && this.rows?.length) {
        let final = []

        const keys = (this.columns || [])
            .filter(d => d.search && d.show)
            .map(d => d.field)

        for (let j = 0; j < rows?.length; j++) {
          for (let i = 0; i < keys.length; i++) {
            if (this.cellValue(rows[j], keys[i])?.toString().toLowerCase().includes(this.currentSearch.toLowerCase())) {
              final.push(rows[j]);
              break;
            }
          }
        }

        rows = final;
      }

      // sort rows
      let collator = new Intl.Collator(undefined, {
        numeric: this.columns.find((col) => col.field === this.currentSortColumn)?.type === 'number',
        sensitivity: 'base',
      })
      const sortOrder = this.currentSortDirection === 'desc' ? -1 : 1


      rows.sort((a, b) => {
        const valA = this.currentSortColumn?.split('.').reduce((obj, key) => obj?.[key], a)
        const valB = this.currentSortColumn?.split('.').reduce((obj, key) => obj?.[key], b)

        return collator.compare(valA, valB) * sortOrder
      })

      return rows
    },
    dateFormat(date) {
      try {
        if (!date) return ''
        const dt = new Date(date)
        const day = dt.getDate()
        const month = dt.getMonth() + 1
        const year = dt.getFullYear()

        return year + '-' + (month > 9 ? month : '0' + month) + '-' + (day > 9 ? day : '0' + day)
      } catch {
      }
      return ''
    },
    nextPage() {
      if (this.currentPage >= this.maxPage) return false
      this.currentPage++
    },
    previousPage() {
      if (this.currentPage === 1) return false

      this.currentPage--
    },
    movePage(page) {
      this.currentPage = page
    },
    changePage() {
      this.selectAll(false)

      if (this.isServerMode) {
        this.changeForServer('page')
      } else {
        this.filterRows()
        this.$emit('pageChange', this.currentPage)
      }
    },
    stringFormat(template, ...args) {
      return template.replace(/{(\d+)}/g, (match, number) => {
        return typeof args[number] != 'undefined' ? args[number] : match
      })
    },
    changeForServer(changeType, isResetPage = false) {
      if (!this.isServerMode) return

      this.setDefaultCondition()

      this.$emit('change', {
        current_page: isResetPage ? 1 : this.currentPage,
        pagesize: this.currentPageSize,
        offset: (this.currentPage - 1) * this.currentPageSize,
        sort_column: this.currentSortColumn,
        sort_direction: this.currentSortDirection,
        search: this.currentSearch,
        column_filters: this.columns,
        change_type: changeType,
      })
    },
    saveSelectedColumns() {
      let selectedColumns = this.columns.map(col => col.show ? col.field : null).filter(col => !!col)

      this.storage.set('selected-columns', selectedColumns)
    },
    loadSelectedColumns() {
      let selectedColumns = this.storage.get('selected-columns')

      if (!Array.isArray(selectedColumns)) return

      this.columns.forEach(col => col.show = selectedColumns.includes(col.field))
    },

    // public methods
    clearSelectedRows() {
      this.selected = []
    },
    getSelectedRows() {
      return this.filterItems.filter((d, i) => this.selected.includes(this.uniqueKey ? d[this.uniqueKey] : i))
    },
    getSelectedColumns() {
      return this.$refs.header.selectedColumns
    },
    getColumnFilters() {
      return this.columns
    },
    reset() {
      this.selectAll(false)
      for (let i = 0; i < this.columns.length; i++) {
        this.columns[i] = this.oldColumns[i];
      }
      this.currentSearch = ''
      this.currentPageSize = this.oldPageSize
      this.currentSortColumn = this.oldSortColumn
      this.currentSortDirection = this.oldSortDirection

      if (this.isServerMode) {
        // for server side paginations
        if (this.currentPage === 1) {
          this.changeForServer('reset', true)
        } else {
          this.currentPage = 1 // changeForServer method call when currentPage change
        }
      } else {
        this.currentPage = 1
        this.filterRows()
      }
    },
    setDefaultCondition() {
      for (let i = 0; i < this.columns.length; i++) {
        let d = this.columns[i]

        if (d.filter && ((d.value !== undefined && d.value !== null && d.value !== '') || d.condition === 'is_null' || d.condition === 'is_not_null')) {
          if (d.type === 'string' && d.value && !d.condition) d.condition = 'contain'
          if (d.type === 'number' && d.value && !d.condition) d.condition = 'equal'
          if (d.type === 'date' && d.value && !d.condition) d.condition = 'equal'
        }
      }
    },
    changeSearch() {
      this.selectAll(false)

      if (this.isServerMode) {
        if (this.currentPage === 1) {
          this.changeForServer('search', true)
        } else {
          this.currentPage = 1
        }
      } else {
        this.currentPage = 1
        this.filterRows()
        this.$emit('searchChange', this.currentSearch)
      }
    },
    changePageSize() {
      this.selectAll(false)

      if (this.isServerMode) {
        // for server side paginations
        if (this.currentPage === 1) {
          this.changeForServer('pagesize', true)
        } else {
          this.currentPage = 1 // changeForServer method call when currentPage change
        }
      } else {
        this.currentPage = 1
        this.filterRows()
        this.$emit('pageSizeChange', this.currentPageSize)
      }
    },
    changeRows() {
      if (!this.isServerMode) this.currentPage = 1

      this.selectAll(false)
      this.filterRows()
    },
    setDefaultColumns() {
      this.columns.map((item) => {
        const type = item.type?.toLowerCase() || 'string'
        item.type = type
        item.isUnique = item.isUnique !== undefined ? item.isUnique : false
        item.show = item.show !== undefined ? item.show : true
        item.filter = item.filter !== undefined ? item.filter : false
        item.search = item.search !== undefined ? item.search : false
        item.sort = item.sort !== undefined ? item.sort : false
        item.html = item.html !== undefined ? item.html : false
        item.condition = !type || type === 'string' ? 'contain' : 'equal'
        item.exportable = item.exportable !== undefined ? item.exportable : true
        item.selectable = item.selectable !== undefined ? item.selectable : false

        return item
      })
    },
    tableToJson(table) {
      let data = []

      let headers = []
      for (let i = 0; i < table.rows[0].cells.length; i++) {
        if (!table.rows[0].cells[i].classList.contains('exportable')) continue

        headers.push(table.rows[0].cells[i].innerText)
      }

      data.push(headers)

      // go through cells
      for (let i = 1; i < table.rows.length; i++) {
        let tableRow = table.rows[i]
        let rowData = []

        if (!tableRow.classList.contains('exportable')) continue

        for (let j = 0; j < tableRow.cells.length; j++) {
          let cell = tableRow.cells[j]
          if (!cell.classList.contains('exportable')) continue
          rowData.push(tableRow.cells[j].innerText);
        }

        data.push(rowData)
      }

      return data
    },
    exportToEXCEL() {
      let table = document.querySelector(`#${this.uniqueId}`)
      const data = this.tableToJson(table)
      const date = dateFormat(new Date, 'dd-mm-yyyy_H-MM')

      const ws = XLSX.utils.json_to_sheet(data)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, "Data")
      XLSX.writeFileXLSX(wb, `${this.uniqueId}_${date}.xlsx`)
    },
  },
}
</script>

<style>
.no-data {
  text-align: center;
  height: 100px;
  vertical-align: middle;
  font-weight: bold;
}
</style>
