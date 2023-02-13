import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { createVehicle } from 'services/Vehicle/Company/createVehicle';
import { vehiclesActions } from 'store/vehicles/vehiclesSlice';

function* handleCreateVehicle({ payload }: ReturnType<typeof vehiclesActions.createVehicleRequest>) {
  const { data: formData, onFailure, onSuccess } = payload;
  try {
    const { data }: SagaReturnType<typeof createVehicle> = yield retry(3, 1000, createVehicle, formData);
    yield put(vehiclesActions.createVehicleSuccess({ data }));
    onSuccess();
  } catch (error) {
    console.log('watchCreateVehicle.ts', error);
    yield put(vehiclesActions.createVehicleFailure({}));
    // FIXME: Hiển thị lỗi giá trị đã tồn tại -> Backend đang check uniq nhưng chưa trả về thông tin lỗi
    onFailure();
  }
}

export function* watchCreateVehicle() {
  yield takeLeading(vehiclesActions.createVehicleRequest, handleCreateVehicle);
}
