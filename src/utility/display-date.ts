import dateFormat from "dateformat"
import useRepresentationStore from "@/stores/representation-store"

function displayDate(inputDate: string | null): string {
  if (!inputDate) return null

  const representation = useRepresentationStore()
  const date = new Date(inputDate)

  return dateFormat(date, representation.dateFormat)
}

export default displayDate
