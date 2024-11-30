const displayCellValue = (item: object, field: string): any => {
    return field?.split('.').reduce((obj, key) => obj?.[key], item)
}

export default displayCellValue
