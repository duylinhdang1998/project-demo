import { call, put, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { ServiceException } from 'services/utils/ServiceException';
import { createVehicleEvent } from 'services/Vehicle/Company/createVehicleEvent';
import { vehicleEventsActions } from 'store/vehicles/vehicleEventsSlice';

function* handleCreateVehicleEvent({ payload }: ReturnType<typeof vehicleEventsActions.createVehicleEventRequest>) {
  const { data: formData, onFailure, onSuccess } = payload;
  try {
    const { data }: SagaReturnType<typeof createVehicleEvent> = yield call(createVehicleEvent, formData);
    yield put(vehicleEventsActions.createVehicleEventSuccess({ data }));
    onSuccess();
  } catch (error) {
    console.log('watchCreateVehicleEvent.ts', error);
    yield put(vehicleEventsActions.createVehicleEventFailure({}));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchCreateVehicleEvent() {
  yield takeLeading(vehicleEventsActions.createVehicleEventRequest, handleCreateVehicleEvent);
}
