import dateFormat from "dateformat"
import useRepresentationStore from "@/stores/representation-store"

function displayDateRange(inputDate: Array<string>): string {
  const representation = useRepresentationStore()
  const format = representation.dateFormat

  if (inputDate.length === 0) {
    return ''
  }

  if (inputDate.length === 1) {
    return dateFormat(new Date(inputDate[0]), format)
  }

  if (inputDate.length === 2) {
    if (dateFormat(inputDate[0]) === dateFormat(inputDate[1])) {
      return dateFormat(new Date(inputDate[0]), format)
    }

    return dateFormat(new Date(inputDate[0]), format) + " - " + dateFormat(new Date(inputDate[1]), format)
  }

  if (inputDate.length > 2) {
    return inputDate.map(date => dateFormat(new Date(date), format)).join(', ')
  }
}

export default displayDateRange
