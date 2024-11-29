# Ares DataTable

Datatable using vue3 and Bootstrap 5

## Installation

```bash
npm install ares-datatable
```

## Usage
```vue
<template>
  <DataTable :data="myData" :columns="columns" />
</template>

<script>
import DataTable from 'ares-datable';

export default {
  components: {
    DataTable,
  },
  data() {
    return {
      myData: [...],
      columns: [...],
    };
  },
};
</script>
```
