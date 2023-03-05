import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrentSubscription, Subscription, SubscriptionOrder, SubscriptionPlan } from 'services/models/Subscription';
import { CreateSubscriptionOrderFailure, CreateSubscriptionOrderRequest, CreateSubscriptionOrderSuccess } from './actions/CreateSubscriptionOrder';
import { GetCurrentSubscriptionFailure, GetCurrentSubscriptionRequest, GetCurrentSubscriptionSuccess } from './actions/GetCurrentSubscription';
import { GetPlansFailure, GetPlansRequest, GetPlansSuccess } from './actions/GetPlans';
import { GetSubscriptionsFailure, GetSubscriptionsRequest, GetSubscriptionsSuccess } from './actions/GetSubscriptions';

interface SubscriptionsState {
  statusGetSubscriptions: Status;
  statusGetPlans: Status;
  statusGetCurrentSubscription: Status;
  statusCreateSubscriptionOrder: Status;
  currentSubscription: CurrentSubscription | null;
  subscriptionOrder: SubscriptionOrder | null;
  subscriptions: Subscription[];
  plans: SubscriptionPlan[];
}

const initialState: SubscriptionsState = {
  plans: [],
  subscriptions: [],
  currentSubscription: null,
  subscriptionOrder: null,
  statusGetPlans: 'idle',
  statusGetSubscriptions: 'idle',
  statusCreateSubscriptionOrder: 'idle',
  statusGetCurrentSubscription: 'idle',
};

const subscriptionsSlice = createSlice({
  name: '@Subscriptions',
  initialState,
  reducers: {
    //
    getCurrentSubscriptionRequest: (state, _action: PayloadAction<GetCurrentSubscriptionRequest>) => {
      return {
        ...state,
        currentSubscription: null,
        statusGetCurrentSubscription: 'loading',
      };
    },
    getCurrentSubscriptionSuccess: (state, action: PayloadAction<GetCurrentSubscriptionSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        currentSubscription: data,
        statusGetCurrentSubscription: 'success',
      };
    },
    getCurrentSubscriptionFailure: (state, _action: PayloadAction<GetCurrentSubscriptionFailure>) => {
      return {
        ...state,
        statusGetCurrentSubscription: 'failure',
      };
    },

    //
    getSubscriptionsRequest: (state, _action: PayloadAction<GetSubscriptionsRequest>) => {
      return {
        ...state,
        statusGetSubscriptions: 'loading',
        subscriptions: [],
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

    //
    getPlansRequest: (state, _action: PayloadAction<GetPlansRequest>) => {
      return {
        ...state,
        statusGetPlans: 'loading',
        plans: [],
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

    //
    createSubscriptionOrderRequest: (state, _action: PayloadAction<CreateSubscriptionOrderRequest>) => {
      return {
        ...state,
        subscriptionOrder: null,
        statusCreateSubscriptionOrder: 'loading',
      };
    },
    createSubscriptionOrderSuccess: (state, action: PayloadAction<CreateSubscriptionOrderSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        subscriptionOrder: data,
        statusCreateSubscriptionOrder: 'success',
      };
    },
    createSubscriptionOrderFailure: (state, _action: PayloadAction<CreateSubscriptionOrderFailure>) => {
      return {
        ...state,
        statusCreateSubscriptionOrder: 'failure',
      };
    },
  },
});

export const subscriptionsActions = subscriptionsSlice.actions;
export const subscriptionsReducer = subscriptionsSlice.reducer;
