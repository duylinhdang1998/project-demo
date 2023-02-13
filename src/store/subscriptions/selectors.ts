import { RootState } from 'store/configureStore';

export const selectSubscriptions = (state: RootState) => state.subscriptions;
