<template>
  <div class="table-responsive" :style="{ 'height': height }">
    <div class="container-fluid">
      <div class="row" style="padding: 10px; border: 1px solid #ccc; border-bottom: none">
        <div class="col">
          <slot name="control"></slot>
        </div>
        <div class="col" style="text-align: right">
          <!-- Вибір колонок -->
          <div class="btn-group btn-group-sm" style="margin-right: 10px;">
            <button type="button" class="btn btn-outline-primary dropdown-toggle btn-sm" data-bs-toggle="dropdown"
                    aria-expanded="false">
              <i class="fa fa-eye"></i>
            </button>
            <ul class="dropdown-menu">
              <li class="dropdown-item" v-if="autoListing">
                <input type="checkbox" @change="saveSelectedColumns"> <span style="margin-left: 5px;">№ з/п</span>
              </li>
              <li class="dropdown-item" v-if="hasCheckbox">
                <input type="checkbox" @change="saveSelectedColumns"> <span style="margin-left: 5px;">Чекбокс</span>
              </li>
              <li v-for="column in columns" class="dropdown-item">
                <input type="checkbox" v-model="column.show" @change="saveSelectedColumns">
                <span style="margin-left: 5px;" v-text="column.title"></span>
              </li>
            </ul>
          </div>

          <!-- Експорт в ЕКСЕЛЬ-->
          <button @click="exportToEXCEL" title="Експортувати в EXCEL" class="btn btn-outline-success btn-sm">
            <i class="fa fa-file-excel"></i>
          </button>
        </div>
      </div>
    </div>

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
  <div v-if="pagination && filterRowCount" class="bh-pagination bh-py-5" :class="{ 'pe-none': currentLoader }">
    <div class="bh-flex bh-items-center bh-flex-wrap bh-flex-col sm:bh-flex-row bh-gap-4">
      <div class="bh-pagination-info bh-flex bh-items-center">
        <span class="bh-mr-2">
          {{ stringFormat(paginationInfo, filterRowCount ? offset : 0, limit, filterRowCount) }}
        </span>
        <select v-if="showPageSize" v-model="currentPageSize" class="bh-pagesize">
          <option v-for="option in pageSizeOptions" :value="option" :key="option">
            {{ option }}
          </option>
        </select>
      </div>

      <div class="bh-pagination-number sm:bh-ml-auto bh-inline-flex bh-items-center bh-space-x-1">
        <button v-if="showFirstPage" type="button" class="bh-page-item first-page"
                :class="{ disabled: currentPage <= 1 }" @click="currentPage = 1">
          <span v-if="firstArrow" v-html="firstArrow"></span>
          <svg v-else aria-hidden="true" width="14" height="14" viewBox="0 0 16 16">
            <g fill="currentColor" fill-rule="evenodd">
              <path
                  d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
              <path
                  d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
            </g>
          </svg>
        </button>
        <button type="button" class="bh-page-item previous-page" :class="{ disabled: currentPage <= 1 }"
                @click="previousPage">
          <span v-if="previousArrow" v-html="previousArrow"> </span>
          <svg v-else aria-hidden="true" width="14" height="14" viewBox="0 0 16 16">
            <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </button>

        <template v-if="showNumbers">
          <button
              v-for="page in paging"
              :key="page"
              type="button"
              class="bh-page-item"
              :class="{disabled: currentPage === page, 'bh-active': page === currentPage,}"
              @click="movePage(page)"
          >
            {{ page }}
          </button>
        </template>

        <button type="button" class="bh-page-item next-page" :class="{ disabled: currentPage >= maxPage }"
                @click="nextPage">
          <span v-if="nextArrow" v-html="nextArrow"> </span>
          <svg v-else aria-hidden="true" width="14" height="14" viewBox="0 0 16 16">
            <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8L4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </button>

        <button v-if="showLastPage" type="button" class="bh-page-item last-page"
                :class="{ disabled: currentPage >= maxPage }" @click="currentPage = maxPage">
          <span v-if="lastArrow" v-html="lastArrow"> </span>
          <svg v-else aria-hidden="true" width="14" height="14" viewBox="0 0 16 16">
            <g fill="currentColor" fill-rule="evenodd">
              <path
                  d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8L3.646 2.354a.5.5 0 0 1 0-.708z"/>
              <path
                  d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8L7.646 2.354a.5.5 0 0 1 0-.708z"/>
            </g>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import columnHeader from './column-header.vue'
import * as XLSX from "xlsx"
import dateFormat from "dateformat"
import RenderBoolean from "./render-boolean.vue"
import mixins from "../mixins"
import store2 from 'store2'
import RenderDate from "./render-date.vue"

export default {
  name: 'DataTable',
  props: {
    loading: {type: Boolean, default: true,},
    isServerMode: {type: Boolean, default: false,},
    skin: {type: String},
    totalRows: {type: Number, default: null,},
    rows: {type: Array},
    columns: {type: Array},
    hasCheckbox: {type: Boolean},
    search: {type: String},
    page: {type: Number, default: 1,},
    pageSize: {type: Number, default: 10},
    pageSizeOptions: {type: Array, default: [10, 20, 30, 50, 100],},
    showPageSize: {type: Boolean,},
    rowClass: {default: null,},
    cellClass: {type: Array | Function},
    sortable: {type: Boolean,},
    sortColumn: {type: String, default: null,},
    sortDirection: {type: String},
    hasFilter: {type: Boolean},
    pagination: {type: Boolean, default: true,},
    showNumbers: {type: Boolean},
    showNumbersCount: {type: Number},
    showFirstPage: {type: Boolean},
    showLastPage: {type: Boolean},
    firstArrow: {type: String},
    lastArrow: {type: String},
    nextArrow: {type: String},
    previousArrow: {type: String},
    paginationInfo: {type: String, default: 'Показано з {0} по {1} з {2} записів'},
    noDataContent: {type: String, default: 'Немає даних для відображення!',},
    height: {type: String, default: 'auto',},
    cloneHeaderInFooter: {type: Boolean},
    selectRowOnClick: {type: Boolean, default: false,},
    autoListing: {type: Boolean, default: true,},
    uniqueId: {type: String, default: 'datatable',},
    persistSelection: {type: Boolean, default: true,},
  },
  components: {
    RenderDate,
    RenderBoolean,
    columnHeader,
  },
  mixins: [mixins,],
  beforeMount() {
    this.setDefaultColumns()
    this.loadSelectedColumns()
  },
  mounted() {
    this.filterRows()
  },
  data() {
    return {
      filterItems: [],
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
      delay: 230,
      persistedElements: [],
    }
  },
  computed: {
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
  }
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
