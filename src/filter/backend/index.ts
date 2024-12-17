import useDataTableStore from "@/stores/data-table-store"
import useApi from "@/utility/use-api"

export default function applyBackendFilter() {
  const datatable = useDataTableStore()
  const api = useApi()

  fetch('http://simplify.local/api/companies', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    mode: 'cors',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
