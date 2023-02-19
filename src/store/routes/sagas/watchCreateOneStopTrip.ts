import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { createOneStopTrip } from 'services/Route/Company/createOneStopTrip';
import { routesActions } from '../routesSlice';

function* handleCreateOneStopTrip({ payload }: ReturnType<typeof routesActions.createOneStopTripRequest>) {
  const { data, onFailure, onSuccess } = payload;
  try {
    const response: SagaReturnType<typeof createOneStopTrip> = yield retry(3, 1000, createOneStopTrip, data);
    yield put(routesActions.createOneStopTripSuccess({ data: response.data }));
    onSuccess();
  } catch (error) {
    console.log('watchCreateOneStopTrip.ts', error);
    yield put(routesActions.createOneStopTripFailure({}));
    onFailure();
  }
}

export function* watchCreateOneStopTrip() {
  yield takeLeading(routesActions.createOneStopTripRequest, handleCreateOneStopTrip);
}
