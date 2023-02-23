export type AnyObject = Record<string, any>;

export type Sorter<T extends AnyObject> = Partial<Record<keyof T, 'desc' | 'asc'>>;

export type SearcherOperator = 'gte' | 'lte' | 'eq' | 'in' | 'contains' | 'or';

export type Searcher<T extends AnyObject> = Partial<
  Record<
    keyof T,
    {
      operator: SearcherOperator;
      value?: string;
    }
  >
>;

// Bắt đầu từ 0
export type Pagination = number;
