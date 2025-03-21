import useRefresh from './refresh'

export default function useExposes() {
  return {
    refresh: useRefresh,
  }
}
