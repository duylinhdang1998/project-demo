import { SorterResult } from 'antd/lib/table/interface';
import { AnyObject, Sorter } from 'services/@types/SearchParams';

interface GetSorterParamsFromAntdTable<T> {
  sorter: SorterResult<T> | Array<SorterResult<T>>;
}
export const getSorterParamsFromAntdTable = <T extends AnyObject>({ sorter }: GetSorterParamsFromAntdTable<T>): Sorter<T> => {
  console.log(sorter);
  const sorter_: Sorter<T> = Array.isArray(sorter)
    ? sorter.reduce<Sorter<T>>((res, sortComlumn) => {
        if (sortComlumn.columnKey) {
          return {
            ...res,
            [sortComlumn.columnKey]: sortComlumn.order === 'ascend' ? 'acs' : 'desc',
          } as Sorter<T>;
        }
        return res;
      }, {})
    : sorter.columnKey
    ? ({ [sorter.columnKey]: sorter.order === 'ascend' ? 'acs' : 'desc' } as Sorter<T>)
    : {};
  return sorter_;
};
