<template>
  <div style="margin: 10px;">
    <nav v-if="paginate.usePagination && paginate.paging.length > 1">
      <ul class="pagination pagination-sm justify-content-center">
        <li :class="['page-item', {disabled: paginate.page === 1}]">
          <a class="page-link" href="javascript:void(0)" @click="paginate.page--">«</a>
        </li>

        <li v-if="paginate.isShowFirstPage" class="page-item">
          <a class="page-link" href="javascript:void(0)" @click="paginate.page = 1">1</a>
        </li>

        <li v-if="paginate.isShowFirstDelimiter" class="page-item disabled">
          <a class="page-link" href="javascript:void(0)">...</a>
        </li>

        <li
          v-for="page in paginate.paging"
          :key="page"
          :class="['page-item', { active: page === paginate.page }]"
        >
          <a class="page-link" href="javascript:void(0)" @click="paginate.page = page" v-text="page"></a>
        </li>

        <li v-if="paginate.isShowLastDelimiter" class="page-item disabled">
          <a class="page-link" href="javascript:void(0)">...</a>
        </li>

        <li v-if="paginate.isShowLastPage" class="page-item">
          <a class="page-link" href="javascript:void(0)" @click="paginate.page = paginate.maxPage">
            {{ paginate.maxPage }}
          </a>
        </li>
        <li :class="['page-item', {disabled: paginate.page === paginate.maxPage}]">
          <a class="page-link" href="javascript:void(0)" @click="paginate.page++">»</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import usePaginationStore from "@/stores/pagination-store"

const paginate = usePaginationStore()
</script>
