import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { getVehicleEvent } from 'services/Vehicle/Company/getVehicleEvent';
import { vehicleEventsActions } from 'store/vehicles/vehicleEventsSlice';

function* handleGetVehicleEvent({ payload }: ReturnType<typeof vehicleEventsActions.getVehicleEventRequest>) {
  const { id } = payload;
  try {
    const getVehicleEventResponse: SagaReturnType<typeof getVehicleEvent> = yield retry(3, 1000, getVehicleEvent, { id });

    yield put(
      vehicleEventsActions.getVehicleEventSuccess({
        vehicleEvent: getVehicleEventResponse.data,
      }),
    );
  } catch (error) {
    console.log('watchGetVehicleEvent.ts', error);
    yield put(vehicleEventsActions.getVehicleEventFailure({}));
  }
}

export function* watchGetVehicleEvent() {
  yield takeLeading(vehicleEventsActions.getVehicleEventRequest, handleGetVehicleEvent);
}
