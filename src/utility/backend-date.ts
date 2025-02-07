import dateFormat from "dateformat"

const backendDate = (date: Date): string => {
  return dateFormat(date, "yyyy-mm-dd")
}

export default backendDate
