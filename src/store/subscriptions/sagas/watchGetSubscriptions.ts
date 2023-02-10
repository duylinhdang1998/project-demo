import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { getSubscriptions } from 'services/Subscription/getSubscriptions';
import { subscriptionsActions } from '../subscriptionsSlice';

function* handleGetSubscriptions(_: ReturnType<typeof subscriptionsActions.getSubscriptionsRequest>) {
  try {
    const response: SagaReturnType<typeof getSubscriptions> = yield retry(3, 1000, getSubscriptions, {});
    yield put(subscriptionsActions.getSubscriptionsSuccess({ data: response.data }));
  } catch (error) {
    console.log('watchGetSubscriptions', error);
    yield put(subscriptionsActions.getSubscriptionsFailure({}));
  }
}

export function* watchGetSubscriptions() {
  yield takeLatest(subscriptionsActions.getSubscriptionsRequest, handleGetSubscriptions);
}
