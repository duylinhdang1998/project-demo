import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { getPlans } from 'services/Subscription/getPlans';
import { subscriptionsActions } from '../subscriptionsSlice';

function* handleGetPlans({ payload }: ReturnType<typeof subscriptionsActions.getPlansRequest>) {
  const { subscriptionType } = payload;
  try {
    const response: SagaReturnType<typeof getPlans> = yield retry(3, 1000, getPlans, { subscriptionType });
    yield put(subscriptionsActions.getPlansSuccess({ data: response.data }));
  } catch (error) {
    console.log('watchGetPlans', error);
    yield put(subscriptionsActions.getPlansFailure({}));
  }
}

export function* watchGetPlans() {
  yield takeLatest(subscriptionsActions.getPlansRequest, handleGetPlans);
}
