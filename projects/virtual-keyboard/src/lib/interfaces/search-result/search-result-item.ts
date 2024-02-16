export interface SearchResultItem<T> {
    index?: number;
    text: string;
    item?:T;
}
