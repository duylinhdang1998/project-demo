import { AnyObject, Sorter } from 'services/@types/SearchParams';

export const getSortParams = <T extends AnyObject>(sorter: Sorter<T>, withDefault = true) => {
  return Object.keys(sorter).reduce<Sorter<T>>(
    (res, sorterKey) => {
      const key = `${sorterKey}[sort]`;
      return {
        ...res,
        [key]: sorter[sorterKey],
      };
    },
    withDefault
      ? ({
          'createdAt[sort]': 'desc',
        } as Sorter<T>)
      : {},
  );
};
