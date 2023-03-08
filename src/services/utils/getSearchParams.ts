import { AnyObject, Searcher } from 'services/@types/SearchParams';
import { get } from 'lodash';

export const getSearchParams = <T extends AnyObject>(searcher: Searcher<T>) => {
  return Object.keys(searcher).reduce<Record<string, string>>((res, searchKey) => {
    const searchItem = get(searcher, searchKey);
    if (searchItem) {
      const { operator, value } = searchItem;
      const key = `${searchKey}[${operator}]`;
      if (value) {
        return {
          ...res,
          [key]: value,
        };
      }
      return res;
    }
    return res;
  }, {});
};
