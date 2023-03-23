import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { createMultipleStopTrip } from 'services/Route/Company/createMultipleStopTrip';
import { getRoute } from 'services/Route/Company/getRoute';
import { routesActions } from '../routesSlice';

function* handleCreateMultipleStopTrip({ payload }: ReturnType<typeof routesActions.createMultipleStopTripRequest>) {
  const { data, onFailure, onSuccess } = payload;
  try {
    const response: SagaReturnType<typeof createMultipleStopTrip> = yield retry(3, 1000, createMultipleStopTrip, data);
    const detailResponse: SagaReturnType<typeof getRoute> = yield retry(3, 1000, getRoute, {
      routeCode: response.data.routeCode,
    });
    yield put(routesActions.createMultipleStopTripSuccess({ data: detailResponse.data }));
    onSuccess();
  } catch (error) {
    console.log('watchCreateMultipleStopTrip.ts', error);
    yield put(routesActions.createMultipleStopTripFailure({}));
    onFailure();
  }
}

export function* watchCreateMultipleStopTrip() {
  yield takeLeading(routesActions.createMultipleStopTripRequest, handleCreateMultipleStopTrip);
}
