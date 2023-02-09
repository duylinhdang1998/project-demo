import { put, retry, SagaReturnType, select, takeLeading } from 'redux-saga/effects';
import { updateOffice } from 'services/OfficesManager/Company/updateOffice';
import { officesManagerActions } from '../officesManagerSlice';
import { selectOfficesManager } from '../selectors';

function* handleUpdateOffice({ payload }: ReturnType<typeof officesManagerActions.updateOfficeRequest>) {
  const { id, data, onFailure, onSuccess } = payload;
  const officesManagerStates: SagaReturnType<typeof selectOfficesManager> = yield select(selectOfficesManager);
  try {
    if (officesManagerStates.office) {
      yield retry(3, 1000, updateOffice, payload);
      yield put(
        officesManagerActions.updateOfficeSuccess({
          data: {
            ...officesManagerStates.office,
            ...data,
          },
        }),
      );
      onSuccess();
    } else {
      yield put(officesManagerActions.updateOfficeFailure({ id }));
      onFailure();
    }
  } catch (error) {
    console.log('watchUpdateOffice.ts', error);
    // FIXME: Hiển thị lỗi giá trị đã tồn tại -> Backend đang check uniq nhưng chưa trả về thông tin lỗi
    yield put(officesManagerActions.updateOfficeFailure({ id }));
    onFailure();
  }
}

export function* watchUpdateOffice() {
  yield takeLeading(officesManagerActions.updateOfficeRequest, handleUpdateOffice);
}
