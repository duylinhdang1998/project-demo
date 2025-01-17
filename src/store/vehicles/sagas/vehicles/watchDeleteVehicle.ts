import { call, put, takeLeading } from 'redux-saga/effects';
import { ServiceException } from 'services/utils/ServiceException';
import { deleteVehicle } from 'services/Vehicle/Company/deleteVehicle';
import { vehiclesActions } from 'store/vehicles/vehiclesSlice';

function* handleDeleteVehicle({ payload }: ReturnType<typeof vehiclesActions.deleteVehicleRequest>) {
  const { id, onFailure, onSuccess } = payload;
  try {
    yield call(deleteVehicle, payload);
    yield put(vehiclesActions.deleteVehicleSuccess({ id }));
    onSuccess();
  } catch (error) {
    console.log('watchDeleteVehicle.ts', error);
    yield put(vehiclesActions.deleteVehicleFailure({ id }));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchDeleteVehicle() {
  yield takeLeading(vehiclesActions.deleteVehicleRequest, handleDeleteVehicle);
}
