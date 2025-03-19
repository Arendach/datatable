# Pagination

The **DataTable** component supports pagination in both **server mode** and **client mode**. Pagination is handled automatically, but you can customize its behavior using the `pagination` prop.

## Example Usage
```vue

<template>
  <DataTable :pagination="pagination"/>
</template>

<script setup lang="ts">
  const pagination = {
    page: 1,
    pageSize: 20,
    usePagination: true,
    showNumbersCount: 4,
    noDataContent: 'No data available'
  }
</script>

```

## Pagination Props
You can configure pagination using the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `page` | `number` | `1` | The initial page number when the table is first loaded. |
| `pageSize` | `number` | `20` | The number of items displayed per page. |
| `usePagination` | `boolean` | `false` | Enables or disables pagination. If `false`, all data will be displayed on a single page. |
| `showNumbersCount` | `number` | `4` | The number of page numbers displayed between the navigation arrows (e.g., `<< 1 2 3 4 >>`). |
| `noDataContent` | `string` | `'No data available'` | The message displayed when no data is available due to filtering or an empty dataset. |

## Pagination in Server Mode
When using **server mode**, the pagination controls work automatically with the API. The server response should include:
- **`data`** (array) – The dataset to be displayed.
- **`meta.total`** (integer) – The total number of records for proper pagination.

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

If the API supports pagination, it should return only the data for the requested page while including the total number of records.

## Customizing Pagination
If you need custom pagination behavior, you can manually handle data fetching and update the pagination state accordingly. See the [Custom Fetch Data Guide](/server-mode/custom-fetch-data) for details.
