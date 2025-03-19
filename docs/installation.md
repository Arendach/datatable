# 📦 Installation Guide

## 🚀 Getting Started with AresDataTable

DataTable is a powerful and customizable Vue 3 component for handling tabular data.

### 📌 Prerequisites

Ensure you have **Node.js** installed. We recommend using **Node.js 18+**.

You can check your version with:
```sh
node -v
```

### Install via npm

To install DataTable, run the following command:
```sh
npm install ares-datatable
```

Or using **yarn**:
```sh
yarn add ares-datatable
```

### Install via pnpm

If you're using **pnpm**, run:
```sh
pnpm add ares-datatable
```

---

## 🔧 Basic Setup

### 1️⃣ Import AresDataTable Component

In your Vue 3 project, import the **DataTable** component:

```vue
<script setup>
import DataTable from 'ares-datatable'
</script>
```

### 2️⃣ Register in Vue Component

Now, add the `<DataTable />` component inside your template:

```vue
<template>
  <DataTable :is-server-mode="false" :columns="columns" :data="users" />
</template>
```
