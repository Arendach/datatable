import store from "store2"
import jsonToQuery from "@/utility/json-to-query"

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

