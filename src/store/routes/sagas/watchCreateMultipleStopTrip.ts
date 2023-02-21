import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { createMultipleStopTrip } from 'services/Route/Company/createMultipleStopTrip';
import { routesActions } from '../routesSlice';

function* handleCreateMultipleStopTrip({ payload }: ReturnType<typeof routesActions.createMultipleStopTripRequest>) {
  const { data, onFailure, onSuccess } = payload;
  try {
    const response: SagaReturnType<typeof createMultipleStopTrip> = yield retry(3, 1000, createMultipleStopTrip, data);
    yield put(routesActions.createMultipleStopTripSuccess({ data: response.data }));
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
