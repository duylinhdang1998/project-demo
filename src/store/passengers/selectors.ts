import { RootState } from 'store/configureStore';

export const selectPassengers = (state: RootState) => state.passengers;

export const orderConfirmSelector = (state: RootState) => state.packageSales.data;
