import { put, retry, SagaReturnType, select, takeLeading } from 'redux-saga/effects';
import { updateVehicleEvent } from 'services/Vehicle/Company/updateVehicleEvent';
import { selectVehicleEvents } from 'store/vehicles/selectors';
import { vehicleEventsActions } from 'store/vehicles/vehicleEventsSlice';

function* handleUpdateVehicleEvent({ payload }: ReturnType<typeof vehicleEventsActions.updateVehicleEventRequest>) {
  const { id, data, onFailure, onSuccess } = payload;
  const vehicleEventsStates: SagaReturnType<typeof selectVehicleEvents> = yield select(selectVehicleEvents);
  try {
    if (vehicleEventsStates.vehicleEvent) {
      yield retry(3, 1000, updateVehicleEvent, payload);
      yield put(
        vehicleEventsActions.updateVehicleEventSuccess({
          data: {
            ...vehicleEventsStates.vehicleEvent,
            ...data,
          },
        }),
      );
      onSuccess();
    } else {
      yield put(vehicleEventsActions.updateVehicleEventFailure({ id }));
      onFailure();
    }
  } catch (error) {
    console.log('watchUpdateVehicleEvent.ts', error);
    // FIXME: Hiển thị lỗi giá trị đã tồn tại -> Backend đang check uniq nhưng chưa trả về thông tin lỗi
    yield put(vehicleEventsActions.updateVehicleEventFailure({ id }));
    onFailure();
  }
}

export function* watchUpdateVehicleEvent() {
  yield takeLeading(vehicleEventsActions.updateVehicleEventRequest, handleUpdateVehicleEvent);
}
