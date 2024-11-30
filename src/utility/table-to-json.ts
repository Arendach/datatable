function tableToJson(table: any) {
  let data = []

  let headers = []
  for (let i = 0; i < table.rows[0].cells.length; i++) {
    if (!table.rows[0].cells[i].classList.contains('exportable')) continue

    headers.push(table.rows[0].cells[i].innerText)
  }

  data.push(headers)

  // go through cells
  for (let i = 1; i < table.rows.length; i++) {
    let tableRow = table.rows[i]
    let rowData = []

    if (!tableRow.classList.contains('exportable')) continue

    for (let j = 0; j < tableRow.cells.length; j++) {
      let cell = tableRow.cells[j]
      if (!cell.classList.contains('exportable')) continue
      rowData.push(tableRow.cells[j].innerText);
    }

    data.push(rowData)
  }

  return data
}

export default tableToJson
