import { AnyObject, Pagination, Searcher, Sorter } from 'services/@types/SearchParams';

export interface ResponseSuccess<T> {
  code: number;
  data: {
    hits: T[];
    pagination: {
      totalRows: number;
      totalPages: number;
    };
  };
}

export interface ResponseDetailSuccess<T> {
  code: number;
  data: T;
}
export interface ParamsSettings<T extends AnyObject> {
  page: Pagination;
  sorter: Sorter<T>;
  searcher: Searcher<T>;
}
