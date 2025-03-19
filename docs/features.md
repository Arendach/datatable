# Features

The **DataTable** component provides flexible configuration options through various props. Below is a detailed
explanation of its features.

## Example Usage

```vue

<template>
  <DataTable
    uniqueId="example-table"
    :columns="columns"
    :isServerMode="true"
    endpoint="https://api.example.com/data"
    :pagination="pagination"
    :filter="filter"
    :representation="representation"
  />
</template>

<script setup>
  import DataTable from "ares-datatable"

  const columns = [
    {field: 'id', title: 'ID', sort: true},
    {field: 'name', title: 'Name', filter: true},
    {field: 'price', title: 'Price', type: 'number', sort: true}
  ];

  const pagination = {
    page: 1,
    pageSize: 20,
    usePagination: true,
    showNumbersCount: 5
  };

  const filter = {
    search: '',
    useSorting: true,
    sortColumn: 'name',
    sortDirection: 'asc'
  };

  const representation = {
    height: '500px',
    hasCheckbox: true
  };
</script>

```

## Basic Props

| Prop           | Type       | Required | Description                                                                                                   |
|----------------|------------|----------|---------------------------------------------------------------------------------------------------------------|
| `uniqueId`     | `string`   | ✅        | A required unique identifier to prevent conflicts between multiple tables.                                    |
| `columns`      | `Column[]` | ✅        | Defines the structure and representation of table columns. See [Column Configuration](#column-configuration). |
| `isServerMode` | `boolean`  | ✅        | Determines whether data should be fetched from an API (`true`) or handled locally (`false`).                  |
| `rows`         | `Object[]` | ❌        | Used only when `isServerMode = false` to provide local data.                                                  |
| `endpoint`     | `string`   | ❌        | Used only when `isServerMode = true`, specifies the API endpoint to fetch data.                               |

## Column Configuration

Each column in the `columns` array should be an object of type `Column`:

| Prop        | Type          | Default  | Description                                            |
|-------------|---------------|----------|--------------------------------------------------------|
| `field`     | `string`      | —        | The field in the data object that should be displayed. |
| `title`     | `string`      | —        | The title/header of the column.                        |
| `type`      | `ColumnType`  | —        | Defines the type of column (e.g., text, number, date). |
| `filter`    | `ColumnFilter | boolean` | `false`                                                | Enables filtering for the column. |
| `html`      | `boolean`     | `false`  | Allows rendering HTML content inside the column.       |
| `sort`      | `boolean`     | `false`  | Enables sorting for this column.                       |
| `className` | `string`      | —        | Adds a custom class to the column.                     |
| `width`     | `string`      | —        | Sets a fixed width for the column.                     |

## Pagination Settings

The `pagination` prop allows you to control how table pagination works.

| Prop               | Type      | Default               | Description                                                 |
|--------------------|-----------|-----------------------|-------------------------------------------------------------|
| `page`             | `number`  | `1`                   | The initial page when the table is loaded.                  |
| `pageSize`         | `number`  | `20`                  | Number of items per page.                                   |
| `usePagination`    | `boolean` | `false`               | Enables or disables pagination.                             |
| `showNumbersCount` | `number`  | `4`                   | Number of page numbers displayed between navigation arrows. |
| `noDataContent`    | `string`  | `'No data available'` | Message displayed when there is no data due to filtering.   |

For more details, refer to the [Pagination Guide](/base/pagination).

## Filtering and Sorting Settings

The `filter` prop enables advanced data manipulation.

| Prop                  | Type            | Default | Description                              |
|-----------------------|-----------------|---------|------------------------------------------|
| `search`              | `string         | null`   | `null`                                   | The search query applied to the table. |
| `useSorting`          | `boolean`       | `false` | Enables sorting functionality.           |
| `sortColumn`          | `string         | null`   | `null`                                   | Specifies which column is sorted initially. |
| `sortDirection`       | `SortDirection` | `'asc'` | Sorting direction (`asc` or `desc`).     |
| `useFiltering`        | `boolean`       | `false` | Enables filtering functionality.         |

## Representation Settings

The `representation` prop customizes the table’s appearance and behavior.

| Prop                  | Type      | Default   | Description                                                  |
|-----------------------|-----------|-----------|--------------------------------------------------------------|
| `skin`                | `string`  | —         | Defines a custom theme or styling preset.                    |
| `rowClass`            | `string   | function` | —                                                            | Sets a class for table rows (can be a function). |
| `cellClass`           | `string   | function` | —                                                            | Sets a class for table cells (can be a function). |
| `height`              | `string`  | —         | Defines the height of the table.                             |
| `loading`             | `boolean` | `false`   | Displays a loading state when fetching data.                 |
| `hasAutoListing`      | `boolean` | `false`   | Automatically loads more data when scrolling.                |
| `hasCheckbox`         | `boolean` | `false`   | Enables checkboxes for row selection.                        |
| `cloneHeaderInFooter` | `boolean` | `false`   | Clones the table header in the footer for better visibility. |

---

This guide provides an overview of the main features available in the `DataTable` component. For further details, check
the individual guides on [Pagination](/base/pagination), [Filtering](/base/filtering), and [Server Mode](/server-mode).
