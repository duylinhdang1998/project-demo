import { storage } from 'utils/storage';

const KEY = 'CHECKOUT_NOTIFICATION';
const VALUE = 'NOTIFY';

export const setCheckoutNotification = (isClearAction: boolean) => {
  if (isClearAction) {
    storage.removeItem(KEY);
  } else {
    storage.setItem(KEY, VALUE);
  }
};

export const getCheckoutNotification = () => !!storage.getItem(KEY);
