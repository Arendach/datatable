<template>
  <div class="table-responsive" :style="{ 'height': props.height }">
    <table-header/>

    <table class="table table-sm table-bordered" :class="[skin ? `table-${skin}` : '']" :id="uniqueId">

      <display-thead/>

      <display-tbody/>

      <display-tfoot/>

    </table>
  </div>

<!--  <display-pagination/>-->
</template>

<script setup lang="ts">
import useDataTableStore from "@/stores/data-table-store"
import useRepresentationStore from "@/stores/representation-store"
import TableHeader from "@/components/table-header.vue"
import {DataTableProps} from "@/types/datatable-props"
import DisplayTbody from "@/components/body/display-tbody.vue"
import DisplayThead from "@/components/header/display-thead.vue"
import DisplayTfoot from "@/components/footer/display-tfoot.vue"
import DisplayPagination from "@/components/pagination/display-pagination.vue"
import {Column, ColumnType} from "@/types/datatable-props/column"


const props = defineProps<DataTableProps>()

props.columns.map((item: Column) => {
  const type = typeof item.type === 'undefined' ? ColumnType.STRING : item.type
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

// dataTableStore
const dataTableStore = useDataTableStore()
dataTableStore.setColumns(props.columns)
dataTableStore.setRows(props.rows)
dataTableStore.setIsServerMode(props.isServerMode)

// representationStore
const representationStore = useRepresentationStore()
if (typeof props.skin !== 'undefined') representationStore.setSkin(props.skin)
if (typeof props.rowClass !== 'undefined') representationStore.setRowClass(props.rowClass)
if (typeof props.cellClass !== 'undefined') representationStore.setCellClass(props.cellClass)
if (typeof props.height !== 'undefined') representationStore.setHeight(props.height)
if (typeof props.loading !== 'undefined') representationStore.setLoading(props.loading)
if (typeof props.hasAutoListing !== 'undefined') representationStore.setHasAutoListing(props.hasAutoListing)
if (typeof props.hasCheckbox) representationStore.setHasCheckbox(props.hasCheckbox)
if (typeof props.cloneHeaderInFooter) representationStore.setCloneHeaderInFooter(props.cloneHeaderInFooter)


/*export default {
  name: 'DataTable',
  components: {
    TableHeader,
    RenderDate,
    RenderBoolean,
    columnHeader,
    Pagination,
  },
  mixins: [mixins,],
  beforeMount() {


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

  },
}*/
</script>

<style>
.no-data {
  text-align: center;
  height: 100px;
  vertical-align: middle;
  font-weight: bold;
}
</style>
