export interface ColumnConfigTable {
    name: string,
    visibleName?: string,
    hidden?: boolean,
    type?: ColumnTypeTable,
    component?: any,
    notSortable?: boolean
}

export interface SortTable {
    column: string,
    desc: boolean
}

export enum ColumnTypeTable {
    String,
    Date, 
    Number,
    Custom
}

export interface PagingTable {
    currentPage: number,
    totalItems?: number,
    pageSize: number
}

export interface ContextFilterTable {
    columnName: string,
    type?: ContextFilterTypeTable,
    hidden?: boolean,
    operation?: ContextFilterOperationTable,
    options?: string[]
}

export enum ContextFilterTypeTable {
    String, 
    Date,
    Select,
    Number
}

export enum ContextFilterOperationTable {
    Equality,
    Include
}

export interface SearchValueTable {
    columnName: string,
    value: string,
    operation: ContextFilterOperationTable
}