import { SorterResult } from 'antd/lib/table/interface';
import { Sorter } from 'services/@types/SearchParams';

interface GetSorterParamsFromAntdTable<T> {
  sorter: SorterResult<T> | Array<SorterResult<T>>;
}
export const getSorterParamsFromAntdTable = <T>({ sorter }: GetSorterParamsFromAntdTable<T>): Sorter => {
  const sorter_: Sorter = Array.isArray(sorter)
    ? sorter.reduce<Sorter>((res, sortComlumn) => {
        if (sortComlumn.columnKey) {
          return {
            ...res,
            [sortComlumn.columnKey]: sortComlumn.order === 'ascend' ? 'acs' : 'desc',
          } as Sorter;
        }
        return res;
      }, {})
    : sorter.columnKey
    ? ({ [sorter.columnKey]: sorter.order === 'ascend' ? 'acs' : 'desc' } as Sorter)
    : {};
  return sorter_;
};
