import { AnyObject, Searcher } from 'services/@types/SearchParams';

export const getSearchParams = <T extends AnyObject>(searcher: Searcher<T>) => {
  return Object.keys(searcher).reduce<Partial<Record<keyof T, string>>>((res, searchKey) => {
    const searchItem = searcher[searchKey];
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
