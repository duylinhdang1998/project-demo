import { put, retry, SagaReturnType, select, takeLeading } from 'redux-saga/effects';
import { removeDayActive } from 'services/Route/Company/removeDayActive';
import { routesActions } from '../routesSlice';
import { selectRoutes } from '../selectors';

function* handleRemoveDayActive({ payload }: ReturnType<typeof routesActions.removeDayActiveRequest>) {
  const { data, onFailure, onSuccess } = payload;
  const { route }: SagaReturnType<typeof selectRoutes> = yield select(selectRoutes);
  try {
    if (route) {
      yield retry(3, 1000, removeDayActive, data);
      yield put(
        routesActions.removeDayActiveSuccess({
          data: {
            ...route,
            dayoffs: route?.dayoffs.concat(payload.data.dayoff),
          },
        }),
      );
      onSuccess();
    } else {
      yield put(routesActions.removeDayActiveFailure({}));
      onFailure();
    }
  } catch (error) {
    console.log('watchRemoveDayActive.ts', error);
    yield put(routesActions.removeDayActiveFailure({}));
    onFailure();
  }
}

export function* watchRemoveDayActive() {
  yield takeLeading(routesActions.removeDayActiveRequest, handleRemoveDayActive);
}
