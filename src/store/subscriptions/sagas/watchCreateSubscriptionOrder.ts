import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { createSubscriptionOrder } from 'services/Subscription/createSubscriptionOrder';
import { subscriptionsActions } from '../subscriptionsSlice';

function* handleCreateSubscriptionOrder({ payload }: ReturnType<typeof subscriptionsActions.createSubscriptionOrderRequest>) {
  try {
    const response: SagaReturnType<typeof createSubscriptionOrder> = yield retry(3, 1000, createSubscriptionOrder, payload);
    yield put(subscriptionsActions.createSubscriptionOrderSuccess({ data: response.data }));
  } catch (error) {
    console.log('watchCreateSubscriptionOrder', error);
    yield put(subscriptionsActions.createSubscriptionOrderFailure({}));
  }
}

export function* watchCreateSubscriptionOrder() {
  yield takeLatest(subscriptionsActions.createSubscriptionOrderRequest, handleCreateSubscriptionOrder);
}
