import store from "store2"

export function jsonToQuery(params: Record<string, any>, prefix: string = ''): string {
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

const DefaultHeaders: HeadersInit = {
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
  'Authorization': 'Bearer ' + store('token'),
}

const DefaultOptions: RequestInit = {
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: DefaultHeaders,
}

const ResponseHandler = (res: any) => {
  if (res.status === 401) {
    console.error('Fetch data from server failed! Unauthorized!')
  }

  if (!res.ok) throw res

  return res.json()
}

export default function useApi() {
  return {
    async get(url: string, queryParams: any = {}, options: RequestInit = {}) {
      const urlObj = new URL(url, window.location.origin)

      const originalParams = Object.fromEntries(urlObj.searchParams.entries())
      const mergedParams = {...originalParams, ...queryParams}

      urlObj.search = ''

      const finalUrl = this.apiUrl(urlObj.toString(), mergedParams)

      return fetch(finalUrl, {
        method: 'GET',
        ...DefaultOptions,
        ...options,
      }).then(ResponseHandler)
    },
    apiUrl(path: string, queryParams: Record<any, string> = {}): string {
      let query = jsonToQuery(queryParams)

      return `${path}?${query}`
    },
  }
}

