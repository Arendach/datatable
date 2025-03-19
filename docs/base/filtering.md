# Column Filtering

Each column in the **DataTable** can have its own filtering options using the `filter` property. Below is a breakdown of the available options.

## Example Usage
```vue
<script setup>
const columns = [
  {
    field: 'name',
    title: 'Name',
    filter: {
      use: true,
      searchable: true,
      condition: 'contain',
      type: 'string-input'
    }
  },
  {
    field: 'status',
    title: 'Status',
    filter: {
      use: true,
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' }
      ]
    }
  }
];
</script>

<template>
  <AresDataTable
    uniqueId="example-table"
    :columns="columns"
    :isServerMode="false"
  />
</template>
```

## Column Filter Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `use` | `boolean` | `false` | Enables filtering for the column. |
| `searchable` | `boolean` | `false` | Determines if the column is included in the global search. |
| `condition` | `Condition` | `null` | Defines the filter condition (see [Filter Conditions](#filter-conditions)). |
| `value` | `any` | `null` | Initial filter value. |
| `type` | `FilterType` | `null` | The type of filter input (see [Filter Types](#filter-types)). |
| `options` | `FilterOption[] | () => FilterOption[]` | `null` | List of options for select-type filters. |
| `by` | `string` | `null` | Backend field name used for filtering (useful in `server-mode`). |

## Filter Conditions
The `condition` prop defines how the filter is applied. Available conditions:

- **WITHOUT** (`''`) – No condition applied.
- **CONTAIN** (`contain`) – Checks if the value contains a specific string.
- **NOT_CONTAIN** (`not_contain`) – Checks if the value does not contain a specific string.
- **EQUAL** (`equal`) – Exact match.
- **NOT_EQUAL** (`not_equal`) – Does not match the given value.
- **START_WITH** (`start_with`) – Starts with the given value.
- **END_WITH** (`end_with`) – Ends with the given value.
- **GREATER_THAN** (`greater_than`) – Greater than a specified value.
- **GREATER_THAN_EQUAL** (`greater_than_equal`) – Greater than or equal to a value.
- **LESS_THAN** (`less_than`) – Less than a specified value.
- **LESS_THAN_EQUAL** (`less_than_equal`) – Less than or equal to a value.
- **IS_EMPTY** (`is_empty`) – Checks if the value is empty.
- **IS_NOT_EMPTY** (`is_not_empty`) – Checks if the value is not empty.
- **BETWEEN** (`between`) – Checks if the value is between two values.
- **IN** (`in`) – Checks if the value is in a list of values.

## Filter Types
The `type` prop determines the input type used for filtering:

- **NUMBER_INPUT** (`number-input`) – Numeric input.
- **STRING_INPUT** (`string-input`) – Text input.
- **SELECT** (`select`) – Dropdown selection (single choice).
- **SELECT_MULTIPLE** (`select-multiple`) – Dropdown selection (multiple choices).
- **SELECT_BOOLEAN** (`select-boolean`) – Boolean dropdown (`true`/`false`).
- **SLIDER_BOOLEAN** (`slider-boolean`) – Toggle switch (`on`/`off`).
- **DATE_PICKER** (`date-picker`) – Date selection input.
- **DATE_RANGE** (`date-range`) – Selects a date range.

## Filter Options Structure
For **select-type filters**, `options` should be an array of objects structured as:

| Property | Type | Description |
|----------|------|-------------|
| `label` | `string` | The text displayed in the select dropdown. |
| `value` | `any` | The value used for filtering. |

Example:
```js
options: [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' }
]
```

or as a function:
```js
options: () => fetchFilterOptions()
```

## Server Mode Filtering
When `isServerMode` is enabled, filtering is handled on the server. The `by` property allows specifying a different backend field for filtering.

Example:
```js
{
  field: 'user.name',
  title: 'User',
  filter: {
    use: true,
    type: 'select',
    by: 'user.id',
    options: [
      { label: 'John Doe', value: 1 },
      { label: 'Jane Smith', value: 2 }
    ]
  }
}
```
This ensures that filtering is applied based on `user.id`, even though the displayed column is `user.name`.

For more details, see the [Server Mode Guide](/server-mode/index).
