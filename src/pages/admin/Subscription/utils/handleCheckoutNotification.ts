import { storage } from 'utils/storage';

const HIDDEN_TRIAL_NOTIFICATION_KEY = 'HIDDEN_TRIAL_NOTIFICATION';
const CHECKOUT_NOTIFICATION_KEY = 'CHECKOUT_NOTIFICATION';
const CHECKOUT_NOTIFICATION_VALUE = 'NOTIFY';

export const setCheckoutNotification = (isClearAction: boolean) => {
  if (isClearAction) {
    storage.removeItem(CHECKOUT_NOTIFICATION_KEY);
  } else {
    storage.setItem(CHECKOUT_NOTIFICATION_KEY, CHECKOUT_NOTIFICATION_VALUE);
  }
};

export const getCheckoutNotification = () => !!storage.getItem(CHECKOUT_NOTIFICATION_KEY);

export const setHiddenTrialNotification = (visible: boolean) => {
  if (visible) {
    storage.setItem(HIDDEN_TRIAL_NOTIFICATION_KEY, JSON.stringify(visible));
  } else {
    storage.removeItem(HIDDEN_TRIAL_NOTIFICATION_KEY);
  }
};
export const getHiddenTrialNotification = () => !!storage.getItem(HIDDEN_TRIAL_NOTIFICATION_KEY);
