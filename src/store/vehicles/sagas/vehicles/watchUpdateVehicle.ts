import { put, retry, SagaReturnType, select, takeLeading } from 'redux-saga/effects';
import { updateVehicle } from 'services/Vehicle/Company/updateVehicle';
import { selectVehicles } from 'store/vehicles/selectors';
import { vehiclesActions } from 'store/vehicles/vehiclesSlice';

function* handleUpdateVehicle({ payload }: ReturnType<typeof vehiclesActions.updateVehicleRequest>) {
  const { id, data, onFailure, onSuccess } = payload;
  const vehiclesStates: SagaReturnType<typeof selectVehicles> = yield select(selectVehicles);
  try {
    if (vehiclesStates.office) {
      yield retry(3, 1000, updateVehicle, payload);
      yield put(
        vehiclesActions.updateVehicleSuccess({
          data: {
            ...vehiclesStates.office,
            ...data,
          },
        }),
      );
      onSuccess();
    } else {
      yield put(vehiclesActions.updateVehicleFailure({ id }));
      onFailure();
    }
  } catch (error) {
    console.log('watchUpdateVehicle.ts', error);
    // FIXME: Hiển thị lỗi giá trị đã tồn tại -> Backend đang check uniq nhưng chưa trả về thông tin lỗi
    yield put(vehiclesActions.updateVehicleFailure({ id }));
    onFailure();
  }
}

export function* watchUpdateVehicle() {
  yield takeLeading(vehiclesActions.updateVehicleRequest, handleUpdateVehicle);
}
