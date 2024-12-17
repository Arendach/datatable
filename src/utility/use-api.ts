function jsonToQuery(params: Record<string, any> = {}): string {
    const queryString = new URLSearchParams();

    // Перебираємо ключі і значення об'єкта params
    for (const [key, value] of Object.entries(params)) {
        // Якщо значення масив або об'єкт, перетворюємо в JSON строку
        if (Array.isArray(value)) {
            value.forEach((item) => queryString.append(key, item));
        } else if (typeof value === 'object' && value !== null) {
            queryString.append(key, JSON.stringify(value));
        } else {
            queryString.append(key, value.toString());
        }
    }

    return queryString.toString();
}

const DefaultHeaders: Object = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Referer': 'https://simplify.local/'
}

const DefaultOptions = {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: DefaultHeaders,
}

const ResponseHandler = (res) => {
    if (res.status === 401 && window.location.pathname !== '/login') {
        window.location.href = '/login'
    }

    if (!res.ok) throw res

    return res.json()
}

export default function useApi() {
    return {
        async get(url: string, queryParams: Record<any, string>, options: Record<any, string> = {}) {
            return fetch(this.apiUrl(url, queryParams), {
                method: 'GET',
                ...DefaultOptions,
                ...options,
            }).then(ResponseHandler)
        },

        async put(url: string, body: Record<any, string>, options: Record<any, string> = {}) {
            return fetch(this.apiUrl(url), {
                method: 'PUT',
                body: JSON.stringify(body),
                ...DefaultOptions,
                ...options,
            }).then(ResponseHandler)
        },

        async post(url: string, body: Record<any, string>, options: Record<any, string> = {}) {
            return fetch(this.apiUrl(url), {
                method: 'POST',
                body: JSON.stringify(body),
                ...DefaultOptions,
                ...options,
            }).then(ResponseHandler)
        },

        async delete(url: string) {
            return fetch(this.apiUrl(url), {
                method: 'DELETE',
                ...DefaultOptions,
            }).then(ResponseHandler)
        },

        apiUrl(path: string, queryParams: Record<any, string> = {}): string {
            let query = jsonToQuery(queryParams)

            return `${path}?${query}`
        },
    }
}
