import * as XLSX from "xlsx"
import dateFormat from "dateformat"
import tableToJson from "@/utility/table-to-json"

const exportToEXCEL = () => {
    let table = document.querySelector(`#${this.uniqueId}`)
    const data = tableToJson(table)
    const date = dateFormat(new Date, 'dd-mm-yyyy_H-MM')

    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Data")
    XLSX.writeFileXLSX(wb, `${this.uniqueId}_${date}.xlsx`)
}

export default exportToEXCEL
