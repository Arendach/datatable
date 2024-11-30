enum ColumnType {
    DATE = 'date',
    STRING = 'string',
    NUMBER = 'number'
}

export interface Column {
    field: string
    title: string
    filter: boolean
    type: ColumnType
    sort: boolean
}
