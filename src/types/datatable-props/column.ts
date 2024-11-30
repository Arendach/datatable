export enum ColumnType {
    DATE = 'date',
    STRING = 'string',
    NUMBER = 'number',
    BOOLEAN = 'boolean'
}

export interface Column {
    // field from object for display
    field: string

    // title of table column
    title: string

    // field type
    type?: ColumnType

    // use filter for column
    filter?: boolean

    // use this field for search
    search?: boolean

    // display field as html
    html?: boolean

    // use sorting this field
    sort?: boolean

    // field is unique?
    isUnique?: boolean

    // show on table (switch in table header)
    show?: boolean

    // export to EXCEL
    exportable?: boolean

    // selectable (example: for mass editing)
    selectable?: boolean

    // filter condition
    condition?: string

    // callback for render cell
    cellRender?: Function

    // class of cell
    className?: string
}
