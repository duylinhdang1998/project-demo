import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Subscription, SubscriptionPlan } from 'services/models/Subscription';
import { GetPlansFailure, GetPlansRequest, GetPlansSuccess } from './actions/GetPlans';
import { GetSubscriptionsFailure, GetSubscriptionsRequest, GetSubscriptionsSuccess } from './actions/GetSubscriptions';

interface SubscriptionsState {
  statusGetSubscriptions: Status;
  statusGetPlans: Status;
  subscriptions: Subscription[];
  plans: SubscriptionPlan[];
}

const initialState: SubscriptionsState = {
  plans: [],
  subscriptions: [],
  statusGetPlans: 'idle',
  statusGetSubscriptions: 'idle',
};

const subscriptionsSlice = createSlice({
  name: '@Subscription',
  initialState,
  reducers: {
    getSubscriptionsRequest: (state, _action: PayloadAction<GetSubscriptionsRequest>) => {
      return {
        ...state,
        statusGetSubscriptions: 'loading',
      };
    },
    getSubscriptionsSuccess: (state, action: PayloadAction<GetSubscriptionsSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        subscriptions: data,
        statusGetSubscriptions: 'success',
      };
    },
    getSubscriptionsFailure: (state, _action: PayloadAction<GetSubscriptionsFailure>) => {
      return {
        ...state,
        statusGetSubscriptions: 'failure',
      };
    },
    getPlansRequest: (state, _action: PayloadAction<GetPlansRequest>) => {
      return {
        ...state,
        statusGetPlans: 'loading',
      };
    },
    getPlansSuccess: (state, action: PayloadAction<GetPlansSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        plans: data,
        statusGetPlans: 'success',
      };
    },
    getPlansFailure: (state, _action: PayloadAction<GetPlansFailure>) => {
      return {
        ...state,
        statusGetSubscriptions: 'failure',
      };
    },
  },
});

export const subscriptionsActions = subscriptionsSlice.actions;
export const subscriptionsReducer = subscriptionsSlice.reducer;
