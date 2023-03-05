import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { getCurrentSubscription } from 'services/Subscription/getCurrentSubscription';
import { subscriptionsActions } from '../subscriptionsSlice';

function* handleGetCurrentSubscription(_: ReturnType<typeof subscriptionsActions.getCurrentSubscriptionRequest>) {
  try {
    const response: SagaReturnType<typeof getCurrentSubscription> = yield retry(3, 1000, getCurrentSubscription, {});
    yield put(subscriptionsActions.getCurrentSubscriptionSuccess({ data: response.data }));
  } catch (error) {
    console.log('watchGetCurrentSubscription', error);
    yield put(subscriptionsActions.getCurrentSubscriptionFailure({}));
  }
}

export function* watchGetCurrentSubscription() {
  yield takeLatest(subscriptionsActions.getCurrentSubscriptionRequest, handleGetCurrentSubscription);
}
