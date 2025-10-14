export interface ColumnConfigTable {
    name: string,
    visibleName?: string,
    hidden?: boolean
}

export interface SortTable {
    column: string,
    desc: boolean
}