import useDataTableStore from '@/stores/data-table-store'

export function useFilterRowCount(): number {
  const dataTable = useDataTableStore()

  return dataTable.filterRowCount
}
