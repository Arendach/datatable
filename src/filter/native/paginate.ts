import usePaginationStore from "@/stores/pagination-store"

function paginate(rows: Array<Object>): Array<Object> {
  const paginate = usePaginationStore()

  if (!paginate.usePagination) return rows

  return rows.slice(paginate.offset - 1, <number>paginate.limit)
}

export default paginate
