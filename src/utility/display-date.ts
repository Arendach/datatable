import dateFormat from "dateformat"
import useRepresentationStore from "@/stores/representation-store"

function displayDate(inputDate: string): string {
  const representation = useRepresentationStore()
  const date = new Date(inputDate)

  return dateFormat(date, representation.dateFormat)
}

export default displayDate
