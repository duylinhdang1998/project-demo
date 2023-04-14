import { AnyObject, Pagination, Searcher, Sorter } from 'services/@types/SearchParams';
import { StringMappingToStatusCode } from './StatusCode';

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

export interface ResponseFailure {
  code: (typeof StringMappingToStatusCode)[keyof typeof StringMappingToStatusCode];
  timestamp: string;
  path: string;
  message: string;
}

export interface ParamsSettings<T extends AnyObject> {
  page: Pagination;
  sorter: Sorter<T>;
  searcher: Searcher<T>;
}
