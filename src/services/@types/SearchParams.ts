export type AnyObject = Record<string, any>;

export type Sorter<T extends AnyObject> = Partial<Record<keyof T, 'desc' | 'asc'>>;

export type Searcher<T extends AnyObject> = Partial<Record<keyof T, string>>;

// Bắt đầu từ 0
export type Pagination = number;
