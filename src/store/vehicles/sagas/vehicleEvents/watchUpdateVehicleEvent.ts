import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { getVehicleEvent } from 'services/Vehicle/Company/getVehicleEvent';
import { updateVehicleEvent } from 'services/Vehicle/Company/updateVehicleEvent';
import { vehicleEventsActions } from 'store/vehicles/vehicleEventsSlice';

function* handleUpdateVehicleEvent({ payload }: ReturnType<typeof vehicleEventsActions.updateVehicleEventRequest>) {
  const { id, data, onFailure, onSuccess } = payload;
  try {
    yield retry(3, 1000, updateVehicleEvent, { data, id });
    const response: SagaReturnType<typeof getVehicleEvent> = yield retry(3, 1000, getVehicleEvent, { id });
    yield put(
      vehicleEventsActions.updateVehicleEventSuccess({
        data: response.data,
      }),
    );
    onSuccess();
  } catch (error) {
    console.log('watchUpdateVehicleEvent.ts', error);
    yield put(vehicleEventsActions.updateVehicleEventFailure({ id }));
    onFailure();
  }
}

export function* watchUpdateVehicleEvent() {
  yield takeLeading(vehicleEventsActions.updateVehicleEventRequest, handleUpdateVehicleEvent);
}
