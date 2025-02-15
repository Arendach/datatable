# DataTable Component Documentation

## Overview
The `DataTable` component is a powerful and customizable data table for Vue 3, built using TypeScript and Vue Composition API. It supports client-side and server-side pagination, sorting, filtering, and dynamic column configuration.

## Installation

To use the `DataTable` component in your Vue project, install it via npm:

```sh
npm install ares-datatable
```

## Usage

Import the component in your Vue project:

```vue
<script setup>
import DataTable from "ares-datatable";
import { ref } from "vue";

const columns = ref([
  { field: "id", title: "ID", type: "number", show: true, sort: true },
  { field: "name", title: "Name", type: "string", show: true, filter: true },
  { field: "email", title: "Email", type: "string", show: true, filter: true },
]);

const data = ref([
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Doe", email: "jane@example.com" },
]);
</script>

<template>
  <DataTable :uniqueId="'user-table'" :columns="columns" :data="data" />
</template>
```

---

## Props
The `DataTable` component accepts the following props:

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `uniqueId` | `string` | ✅ | Unique identifier for the table instance. |
| `columns` | `Column[]` | ✅ | Array of column definitions. |
| `data` | `any[]` | ❌ | Array of data objects (required in client mode). |
| `isServerMode` | `boolean` | ❌ | Enables server-side processing mode. |
| `pagination` | `PaginationProps` | ❌ | Object defining pagination settings. |
| `filters` | `FilterProps` | ❌ | Object defining filter settings. |
| `representation` | `RepresentationProps` | ❌ | Defines how the table is displayed. |

---

## Column Configuration
Each column in `columns` array should follow this structure:

```ts
interface Column {
  field: string;
  title: string;
  type?: ColumnType;
  show?: boolean;
  filter?: boolean;
  sort?: boolean;
  width?: string;
  maxWidth?: string;
  className?: string;
}
```

### Column Types
The supported column types are:
- `STRING`
- `NUMBER`
- `BOOLEAN`
- `DATE`
- `SELECT`
- `SELECT_MULTIPLE`

Example column definition:
```js
{
  field: "status",
  title: "Status",
  type: "SELECT",
  show: true,
  filter: true,
  sort: true,
}
```

---

## Events (`emits`)
The `DataTable` component emits several events:

| Event | Payload | Description |
|------|---------|-------------|
| `@update:filters` | `FilterProps` | Triggered when filters are updated. |
| `@update:pagination` | `PaginationProps` | Triggered when pagination changes. |
| `@sort` | `{ field: string, order: 'asc' | 'desc' }` | Triggered when sorting changes. |

---

## Server-Side Mode
If `isServerMode` is enabled, the component does not handle sorting, pagination, or filtering internally. Instead, it emits events that the parent component should handle to fetch data accordingly.

Example:

```vue
<DataTable
  :uniqueId="'server-table'"
  :columns="columns"
  :isServerMode="true"
  @update:pagination="fetchData"
  @update:filters="fetchData"
  @sort="fetchData"
/>
```

---

## Filtering
The table supports multiple filter types based on column type:

- `STRING_INPUT` (Text Input)
- `NUMBER_INPUT` (Number Input)
- `SELECT` (Single Select Dropdown)
- `SELECT_MULTIPLE` (Multi-Select Dropdown)
- `DATE_PICKER` (Date Picker)
- `DATE_RANGE` (Date Range Picker)

Example filter configuration:
```js
{
  field: "category",
  title: "Category",
  type: "SELECT_MULTIPLE",
  filter: true,
  options: [{ value: "books", label: "Books" }, { value: "electronics", label: "Electronics" }]
}
```

---

## Pagination
Pagination settings can be configured via the `pagination` prop:
```ts
interface PaginationProps {
  page: number;
  perPage: number;
  total: number;
}
```
Example:
```js
pagination: {
  page: 1,
  perPage: 10,
  total: 100,
}
```

---

## Styling & Customization
The `DataTable` component can be styled using custom CSS. It is built with Bootstrap-friendly classes, allowing seamless integration with Bootstrap themes.

To override styles, use scoped CSS in your Vue component:

```css
.data-table th {
  background-color: #f8f9fa;
  font-weight: bold;
}

.data-table tbody tr:hover {
  background-color: #f1f1f1;
}
```

---

## Conclusion
This `DataTable` component provides a powerful and flexible way to display tabular data in Vue applications, with support for filtering, sorting, pagination, and server-side processing. Customize it with various props and events to fit your specific needs.

