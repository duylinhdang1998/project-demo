type AnyObject = Record<string, any>;

export type Sorter = Record<string, 'desc' | 'asc'>;

export type Searcher<T extends AnyObject> = Partial<Record<keyof T, string>>;

// Bắt đầu từ 0
export type Pagination = number;
