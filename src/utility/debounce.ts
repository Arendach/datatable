export default function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timer: ReturnType<typeof setTimeout> | null = null

  return function debounced(this: unknown, ...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
