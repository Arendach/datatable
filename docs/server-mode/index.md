# Server Mode

You can use the **DataTable** component in **server mode** by setting the prop `:is-server-mode="true"` and specifying an `endpoint` URL.

### Example Usage:
```vue
<DataTable
  :is-server-mode="true"
  endpoint="https://yourapi.com/datatable-content"
/>
```

## Server Response Format
The server should return data in **JSON format**, structured as an object with the following keys:

- **`data`** (array) – The dataset that will be displayed in the table.
- **`meta.total`** (integer) – The total number of records (useful for pagination).

### Example API Response:
```json
{
  "data": [
    { "id": 1, "name": "Item 1", "price": 100 },
    { "id": 2, "name": "Item 2", "price": 150 }
  ],
  "meta": {
    "total": 200
  }
}
```

## Pagination
If your table uses pagination, ensure your API supports it properly. See the [Pagination Guide](/base/pagination) for more details.

## Authentication
Your API **should not require authentication** for direct endpoint access. If authentication is required, you need to implement a **custom method** for fetching data. See the [Custom Fetch Data Guide](/server-mode/custom-fetch-data) for instructions.
