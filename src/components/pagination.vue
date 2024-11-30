<template>
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

<script setup>

</script>
