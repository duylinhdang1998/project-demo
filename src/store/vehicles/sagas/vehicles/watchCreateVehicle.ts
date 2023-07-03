import { call, put, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { ServiceException } from 'services/utils/ServiceException';
import { createVehicle } from 'services/Vehicle/Company/createVehicle';
import { vehiclesActions } from 'store/vehicles/vehiclesSlice';

function* handleCreateVehicle({ payload }: ReturnType<typeof vehiclesActions.createVehicleRequest>) {
  const { data: formData, onFailure, onSuccess } = payload;
  try {
    const { data }: SagaReturnType<typeof createVehicle> = yield call(createVehicle, formData);
    yield put(vehiclesActions.createVehicleSuccess({ data }));
    onSuccess();
  } catch (error) {
    console.log('watchCreateVehicle.ts', error);
    yield put(vehiclesActions.createVehicleFailure({}));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchCreateVehicle() {
  yield takeLeading(vehiclesActions.createVehicleRequest, handleCreateVehicle);
}
