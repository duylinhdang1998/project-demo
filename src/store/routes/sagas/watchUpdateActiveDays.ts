import { put, retry, SagaReturnType, select, takeLeading } from 'redux-saga/effects';
import { getRoute } from 'services/Route/Company/getRoute';
import { updateActiveDays } from 'services/Route/Company/updateActiveDays';
import { routesActions } from '../routesSlice';
import { selectRoutes } from '../selectors';

function* handleUpdateActiveDays({ payload }: ReturnType<typeof routesActions.updateActiveDaysRequest>) {
  const { data, onFailure, onSuccess } = payload;
  try {
    const { route }: SagaReturnType<typeof selectRoutes> = yield select(selectRoutes);
    const response: SagaReturnType<typeof updateActiveDays> = yield retry(3, 1000, updateActiveDays, data);
    if (route) {
      yield put(
        routesActions.updateActiveDaysSuccess({
          data: {
            ...route,
            ...response.data,
          },
        }),
      );
      onSuccess();
    } else {
      const detailResponse: SagaReturnType<typeof getRoute> = yield retry(3, 1000, getRoute, {
        routeCode: response.data.routeCode,
      });
      yield put(
        routesActions.updateActiveDaysSuccess({
          data: detailResponse.data,
        }),
      );
      onSuccess();
    }
  } catch (error) {
    console.log('watchUpdateActiveDays.ts', error);
    yield put(routesActions.updateActiveDaysFailure({}));
    onFailure();
  }
}

export function* watchUpdateActiveDays() {
  yield takeLeading(routesActions.updateActiveDaysRequest, handleUpdateActiveDays);
}
