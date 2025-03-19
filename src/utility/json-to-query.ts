export default function jsonToQuery(params: Record<string, any>, prefix: string = ''): string {
  const queryParts: string[] = []

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = params[key]
      const prefixedKey = prefix ? `${prefix}[${encodeURIComponent(key)}]` : encodeURIComponent(key)

      if (value !== null && typeof value === 'object') {
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (typeof item === 'object' && item !== null) {
              queryParts.push(jsonToQuery(item, `${prefixedKey}[${index}]`))
            } else {
              queryParts.push(`${prefixedKey}[${index}]=${encodeURIComponent(item)}`)
            }
          })
        } else {
          queryParts.push(jsonToQuery(value, prefixedKey))
        }
      } else {
        queryParts.push(`${prefixedKey}=${encodeURIComponent(value)}`)
      }
    }
  }

  return queryParts.join('&')
}
