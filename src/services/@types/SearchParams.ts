export type AnyObject = Record<string, any>;
type AnyArray = any[];
type PrimitiveType = string | number | boolean | null | undefined | AnyObject | AnyArray;

type PickKeysByValue<T, V> = { [K in keyof T]: T[K] extends V ? K : never }[keyof T];
type PickProperties<T, P> = Pick<T, PickKeysByValue<T, P>>;
type GetKeyWithTypes<T, P> = Exclude<keyof PickProperties<T, P>, undefined>;

type SubKeys<T, K extends string> = K extends keyof T ? `${K}.${PathKeyOfObject<T[K]>}` : never;

type PathKeyOfObject<T> = object extends T
  ? string
  : T extends any[]
  ? Extract<GetKeyWithTypes<T[number], PrimitiveType>, string> | SubKeys<T, Extract<GetKeyWithTypes<T[number], PrimitiveType>, string>>
  : T extends object
  ? Extract<GetKeyWithTypes<T, PrimitiveType>, string> | SubKeys<T, Extract<GetKeyWithTypes<T, PrimitiveType>, string>>
  : never;

type Path<T> = PathKeyOfObject<T>;

export type Sorter<T extends AnyObject> = Partial<Record<Path<T>, 'desc' | 'asc'>>;

export type SearcherOperator = 'gte' | 'lte' | 'eq' | 'in' | 'contains' | 'or';

export type Searcher<T extends AnyObject> = Partial<
  Record<
    Path<T>,
    {
      operator: SearcherOperator;
      value?: string;
    }
  >
>;

// Bắt đầu từ 0
export type Pagination = number;
