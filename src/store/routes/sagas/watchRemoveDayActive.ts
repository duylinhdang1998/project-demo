import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { getRoute } from 'services/Route/Company/getRoute';
import { removeDayActive } from 'services/Route/Company/removeDayActive';
import { routesActions } from '../routesSlice';

function* handleRemoveDayActive({ payload }: ReturnType<typeof routesActions.removeDayActiveRequest>) {
  const { data, routeId, onFailure, onSuccess } = payload;
  try {
    yield retry(3, 1000, removeDayActive, data);
    const response: SagaReturnType<typeof getRoute> = yield retry(3, 1000, getRoute, { id: routeId });
    yield put(
      routesActions.removeDayActiveSuccess({
        data: response.data,
      }),
    );
    onSuccess();
  } catch (error) {
    console.log('watchRemoveDayActive.ts', error);
    yield put(routesActions.removeDayActiveFailure({}));
    onFailure();
  }
}

export function* watchRemoveDayActive() {
  yield takeLeading(routesActions.removeDayActiveRequest, handleRemoveDayActive);
}
