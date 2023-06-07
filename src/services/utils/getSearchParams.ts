import { AnyObject, Searcher } from 'services/@types/SearchParams';
import { get } from 'lodash-es';

export const getSearchParams = <T extends AnyObject>(searcher: Searcher<T>) => {
  return Object.keys(searcher).reduce<Record<string, string>>((res, searchKey) => {
    const searchItem = get(searcher, searchKey);
    if (searchItem && !Array.isArray(searchItem)) {
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
    if (searchItem && Array.isArray(searchItem)) {
      const groupParams = searchItem.reduce<Record<string, string>>((result, item) => {
        const { operator, value } = item;
        const key = `${searchKey}[${operator}]`;
        return {
          ...result,
          [key]: value,
        };
      }, {});

      return {
        ...res,
        ...groupParams,
      };
    }
    return res;
  }, {});
};
