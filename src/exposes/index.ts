import useRefresh from '@/exposes/refresh'
import useSelected from "@/exposes/selected"

export default function useExposes() {
  return {
    refresh: useRefresh,
    selected: useSelected(),
  }
}
