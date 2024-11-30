function dateFormat(date: string): string {
    if (!date) return ''

    try {
        const dt = new Date(date)
        if (isNaN(dt.getTime())) throw new Error("Invalid date")

        const day = String(dt.getDate()).padStart(2, '0')
        const month = String(dt.getMonth() + 1).padStart(2, '0')
        const year = dt.getFullYear()

        return `${year}-${month}-${day}`
    } catch {
        return ''
    }
}

export default dateFormat
