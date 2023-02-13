import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { createOffice } from 'services/OfficesManager/Company/createOffice';
import { officesManagerActions } from '../officesManagerSlice';

function* handleCreateOffice({ payload }: ReturnType<typeof officesManagerActions.createOfficeRequest>) {
  const { data: formData, onFailure, onSuccess } = payload;
  try {
    const { data }: SagaReturnType<typeof createOffice> = yield retry(3, 1000, createOffice, formData);
    yield put(officesManagerActions.createOfficeSuccess({ data }));
    onSuccess();
  } catch (error) {
    console.log('watchCreateOffice.ts', error);
    yield put(officesManagerActions.createOfficeFailure({}));
    // FIXME: Hiển thị lỗi giá trị đã tồn tại -> Backend đang check uniq nhưng chưa trả về thông tin lỗi
    onFailure();
  }
}

export function* watchCreateOffice() {
  yield takeLeading(officesManagerActions.createOfficeRequest, handleCreateOffice);
}
