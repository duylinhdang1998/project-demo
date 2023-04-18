import { put, retry, takeLeading } from 'redux-saga/effects';
import { ServiceException } from 'services/utils/ServiceException';
import { updateVehicle } from 'services/Vehicle/Company/updateVehicle';
import { vehiclesActions } from 'store/vehicles/vehiclesSlice';

function* handleUpdateVehicle({ payload }: ReturnType<typeof vehiclesActions.updateVehicleRequest>) {
  const { id, data, targetVehicle, onFailure, onSuccess } = payload;
  try {
    yield retry(3, 1000, updateVehicle, { data, id });
    yield put(
      vehiclesActions.updateVehicleSuccess({
        data: {
          ...targetVehicle,
          ECOseats: data.ECOseats,
          VIPseats: data.VIPseats,
          attach: data.attach,
          brand: data.brand,
          merchandises: data.merchandises,
          model: data.model,
          registrationId: data.registrationId,
          services: data.services,
        },
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
