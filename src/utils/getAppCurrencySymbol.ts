import { CURRENCY_LOCAL_KEY } from './constant';
import { CurrencyIF } from '../models/Profile';

export const getAppCurrencySymbol = (): CurrencyIF => {
  const currency = localStorage.getItem(CURRENCY_LOCAL_KEY);
  return JSON.parse(currency || '""');
};
