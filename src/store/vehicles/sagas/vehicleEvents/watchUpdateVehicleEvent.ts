import { call, put, takeLeading } from 'redux-saga/effects';
import { ServiceException } from 'services/utils/ServiceException';
import { updateVehicleEvent } from 'services/Vehicle/Company/updateVehicleEvent';
import { vehicleEventsActions } from 'store/vehicles/vehicleEventsSlice';

function* handleUpdateVehicleEvent({ payload }: ReturnType<typeof vehicleEventsActions.updateVehicleEventRequest>) {
  const { id, data, targetVehicleEvent, onFailure, onSuccess } = payload;
  try {
    yield call(updateVehicleEvent, { data, id });
    yield put(
      vehicleEventsActions.updateVehicleEventSuccess({
        data: {
          ...targetVehicleEvent,
          reminderDate: data.reminderDate,
          fuelFees: data.fuelFees,
          extraFees: data.extraFees,
          totalKilometers: data.totalKilometers,
          description: data.description,
          attach: data.attach,
        },
      }),
    );
    onSuccess();
  } catch (error) {
    console.log('watchUpdateVehicleEvent.ts', error);
    yield put(vehicleEventsActions.updateVehicleEventFailure({ id }));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchUpdateVehicleEvent() {
  yield takeLeading(vehicleEventsActions.updateVehicleEventRequest, handleUpdateVehicleEvent);
}
