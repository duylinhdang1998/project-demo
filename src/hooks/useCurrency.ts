import { useSelector } from 'react-redux';
import { selectProfile } from '../store/profile/selectors';

const defaultCurrency = {
  currency: 'USD',
  symbol: '$',
};

export function useCurrency() {
  const { profile } = useSelector(selectProfile);

  const currencyFormat = (value: number | string | undefined) => {
    const symbol = profile?.currency?.symbol || defaultCurrency.symbol;
    return `${value || 0} ${symbol}`;
  };

  return {
    currency: profile?.currency?.currency || defaultCurrency.currency,
    symbol: profile?.currency?.symbol || defaultCurrency.symbol,
    currencyFormat,
  };
}
