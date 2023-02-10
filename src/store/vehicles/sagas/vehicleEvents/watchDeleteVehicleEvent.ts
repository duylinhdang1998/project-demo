import { put, retry, takeLeading } from 'redux-saga/effects';
import { deleteVehicleEvent } from 'services/Vehicle/Company/deleteVehicleEvent';
import { vehicleEventsActions } from 'store/vehicles/vehicleEventsSlice';

function* handleDeleteVehicleEvent({ payload }: ReturnType<typeof vehicleEventsActions.deleteVehicleEventRequest>) {
  const { id, onFailure, onSuccess } = payload;
  try {
    yield retry(3, 1000, deleteVehicleEvent, payload);
    yield put(vehicleEventsActions.deleteVehicleEventSuccess({ id }));
    onSuccess();
  } catch (error) {
    console.log('watchDeleteVehicleEvent.ts', error);
    yield put(vehicleEventsActions.deleteVehicleEventFailure({ id }));
    onFailure();
  }
}

export function* watchDeleteVehicleEvent() {
  yield takeLeading(vehicleEventsActions.deleteVehicleEventRequest, handleDeleteVehicleEvent);
}
