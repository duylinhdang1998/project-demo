import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { ServiceException } from 'services/utils/ServiceException';
import { getVehicle } from 'services/Vehicle/Company/getVehicle';
import { updateVehicle } from 'services/Vehicle/Company/updateVehicle';
import { vehiclesActions } from 'store/vehicles/vehiclesSlice';

function* handleUpdateVehicle({ payload }: ReturnType<typeof vehiclesActions.updateVehicleRequest>) {
  const { id, data, onFailure, onSuccess } = payload;
  try {
    yield retry(3, 1000, updateVehicle, { data, id });
    const response: SagaReturnType<typeof getVehicle> = yield retry(3, 1000, getVehicle, { id });
    yield put(
      vehiclesActions.updateVehicleSuccess({
        data: response.data,
      }),
    );
    onSuccess();
  } catch (error) {
    console.log('watchUpdateVehicle.ts', error);
    yield put(vehiclesActions.updateVehicleFailure({ id }));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchUpdateVehicle() {
  yield takeLeading(vehiclesActions.updateVehicleRequest, handleUpdateVehicle);
}
