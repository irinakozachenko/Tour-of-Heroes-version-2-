export interface ColumnConfigTable {
    name: string,
    visibleName?: string,
    hidden?: boolean,
    type?: ColumnTypeTable
}

export interface SortTable {
    column: string,
    desc: boolean
}

export enum ColumnTypeTable {
    String,
    Date, 
    Number,
    
}