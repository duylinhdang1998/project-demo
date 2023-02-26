import { RootState } from 'store/configureStore';

export const selectPassengers = (state: RootState) => state.passengers;
