import { AnyObject, Searcher } from 'services/@types/SearchParams';

export const getSearchParams = <T extends AnyObject>(searcher: Searcher<T>) => {
  return Object.keys(searcher).reduce<Record<string, string>>((res, searchKey) => {
    const searchItem = searcher[searchKey];
    if (searchItem) {
      const { operator, value } = searchItem;
      const key = `${searchKey}[${operator}]`;
      return {
        ...res,
        [key]: value,
      };
    }
    return res;
  }, {});
};
