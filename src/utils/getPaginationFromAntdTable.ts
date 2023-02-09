import { TableCurrentDataSource, TablePaginationConfig } from 'antd/lib/table/interface';

interface GetPaginationFromAntdTable<T> {
  extra: TableCurrentDataSource<T>;
  pagination: TablePaginationConfig;
}

export const getPaginationFromAntdTable = <T>({ extra, pagination }: GetPaginationFromAntdTable<T>) => {
  const isFilterAction = extra.action === 'filter';
  if (isFilterAction) {
    return 0;
  }
  if (!pagination.current) {
    return 0;
  }
  return pagination.current - 1;
};
