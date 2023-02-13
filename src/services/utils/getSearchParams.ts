import { AnyObject, Searcher } from 'services/@types/SearchParams';

export const getSearchParams = <T extends AnyObject>(searcher: Searcher<T>) => {
  return Object.keys(searcher).reduce<Record<string, string>>((res, searchKey) => {
    const key = `${searchKey}[contains]`;
    const value = searcher[searchKey];
    if (value) {
      return {
        ...res,
        [key]: value,
      };
    }
    return res;
  }, {});
};
