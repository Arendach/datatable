# Column Configuration

Each column in the **DataTable** is defined using the `Column` interface. Below is a detailed explanation of the available column properties.

## Example Usage
```vue
<script setup>
  const columns = [
    {
      field: 'id',
      title: 'ID',
      type: 'number',
      sort: true,
      isUnique: true
    },
    {
      field: 'name',
      title: 'Name',
      type: 'string',
      filter: true
    },
    {
      field: 'price',
      title: 'Price',
      type: 'number',
      sort: true,
      width: '100px'
    },
    {
      field: 'user.name',
      title: 'User Name',
      type: 'string',
      filter: true
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

## Column Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `field` | `string` | — | The key in the dataset representing the column’s data. Supports **nested fields** like `user.name` or `user.country.name`. |
| `title` | `string` | — | The title of the column displayed in the header. |
| `type` | `ColumnType` | `null` | Specifies the type of data (e.g., `string`, `number`, `date`). See [Column Types](#column-types). |
| `filter` | `ColumnFilter | boolean` | `false` | Enables filtering for this column (see [Column Filtering](/base/filtering)). |
| `html` | `boolean` | `false` | If `true`, renders the field as HTML content. |
| `sort` | `boolean` | `false` | Enables sorting for this column. |
| `isUnique` | `boolean` | `false` | Marks the field as unique. |
| `show` | `boolean` | `true` | Determines whether the column is visible in the table. |
| `selectable` | `boolean` | `false` | Allows selecting the column for mass actions. |
| `cellRender` | `Function` | `null` | A custom function to render cell content. Alternatively, use named slots for rendering (see [Slots](/additional/slots)). |
| `className` | `string` | `null` | Adds a custom class to the column. |
| `width` | `string` | `null` | Specifies a fixed width for the column. |
| `maxWidth` | `string` | `null` | Specifies the maximum width of the column. |

## Column Types
The `type` property defines how data is rendered and affects filtering behavior.

| Column Type | Default Filter Type | Default Condition | Sorting | Searchable |
|------------|------------------|----------------|---------|------------|
| `NUMBER` | `number-input` | `equal` | ✅ | ✅ |
| `STRING` | `string-input` | `contain` | ✅ | ✅ |
| `BOOLEAN` | `select-boolean` | `equal` | ✅ | ✅ |
| `DATE` | `date-picker` | `equal` (or `between` for `date-range`) | ✅ | ✅ |
| `PICTURE` | `—` | `—` | ❌ | ❌ |

- **NUMBER** – Uses a numeric input field and default equality filtering.
- **STRING** – Uses a text input with a default `contain` filter.
- **BOOLEAN** – Uses a boolean select dropdown with `equal` condition.
- **DATE** – Uses a date picker, allowing either exact matching or a date range.
- **PICTURE** – Filtering and sorting are disabled for images.

## Custom Cell Rendering
You can customize how a cell is rendered using a slot:
```vue
<template #user.name="{ value }">
  <a :href="`/users/${value.id}`">{{ value.name }}</a>
</template>
```
For more details, see the [Slots Guide](/additional/slots).

Alternatively, you can use the `cellRender` function:
```js
{
  field: 'actions',
  title: 'Actions',
  cellRender: (row) => `<button>Edit ${row.name}</button>`
}
```

## Column Visibility
The `show` property allows toggling column visibility dynamically:
```js
{
  field: 'email',
  title: 'Email',
  show: false // Hidden by default
}
```

For additional customization options, refer to the [Column Filtering Guide](/base/filtering).
