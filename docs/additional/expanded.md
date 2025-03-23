# Expanded Rows

The `AresDataTable` component supports **expandable rows** via the `expand` slot. This allows you to display additional content below each row, such as details, nested tables, or actions.

---

## 💡 How It Works

When the `expand` slot is used, each row becomes expandable. Clicking the toggle control (typically a small arrow or button in the first column) will reveal the content provided by the `expand` slot.

The slot receives a single prop:

- `value`: The original row object from the table data.

---

## ✅ Example Usage

```vue
<DataTable
  ref="datatable"
  unique-id="orders"
  :columns="columns"
  :is-server-mode="true"
>
  <template #expand="{ value }">
    <div class="p-2 bg-light border rounded">
      <strong>Name:</strong> <span v-html="value.name"></span><br>
      <strong>Email:</strong> <span v-html="value.email"></span><br>
      <strong>Details:</strong> {{ value.details }}
    </div>
  </template>
</DataTable>
```

---

## 📦 Notes

- The component automatically detects whether the `expand` slot is present and adjusts the table accordingly.
- To check if the slot is registered, the internal logic uses:
  ```ts
  slotsStore.hasSlot('expand')
  ```
- You can combine this with conditional rendering inside the slot if only certain rows should show additional data.

---

## 📚 Related

- [Custom Slots](/additional/slots)
- [Column Configuration](/base/columns)
