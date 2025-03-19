# Ares DataTable

Ares DataTable is a powerful, flexible, and customizable Vue 3 data table component. It supports both client-side and server-side data handling, advanced filtering, sorting, and pagination.

## 📖 Documentation
Full documentation is available at: [Ares DataTable Docs](https://arendach.github.io/datatable/)

## 🚀 Features
- **Client & Server Mode** – Easily switch between handling data locally or fetching from an API.
- **Pagination, Sorting, Filtering** – Built-in utilities for data manipulation.
- **Custom Cell Rendering** – Use named slots or `cellRender` functions for advanced customization.
- **Nested Data Support** – Access related object fields (e.g., `user.name`, `user.country.name`).
- **Highly Configurable** – Fine-tune table behavior through props like `columns`, `pagination`, `filter`, and `representation`.

## 📦 Installation
```sh
npm install ares-datatable
```

## 🛠 Usage Example
```vue
<script setup>
import AresDataTable from 'ares-datatable';

const columns = [
  { field: 'id', title: 'ID', sort: true },
  { field: 'name', title: 'Name', filter: true },
  { field: 'price', title: 'Price', type: 'number', sort: true }
];
</script>

<template>
  <AresDataTable
    uniqueId="example-table"
    :columns="columns"
    :isServerMode="false"
    :rows="[{ id: 1, name: 'Item 1', price: 100 }, { id: 2, name: 'Item 2', price: 150 }]"
  />
</template>
```

## 💡 Contributing
Contributions are welcome! Feel free to submit issues or pull requests.

## 📜 License
MIT License
