import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { getVehicle } from 'services/Vehicle/Company/getVehicle';
import { vehiclesActions } from 'store/vehicles/vehiclesSlice';

function* handleGetVehicle({ payload }: ReturnType<typeof vehiclesActions.getVehicleRequest>) {
  const { id } = payload;
  try {
    const { data }: SagaReturnType<typeof getVehicle> = yield retry(3, 1000, getVehicle, { id });
    yield put(vehiclesActions.getVehicleSuccess({ data }));
  } catch (error) {
    console.log('watchGetVehicle.ts', error);
    yield put(vehiclesActions.getVehicleFailure({}));
  }
}

export function* watchGetVehicle() {
  yield takeLeading(vehiclesActions.getVehicleRequest, handleGetVehicle);
}
