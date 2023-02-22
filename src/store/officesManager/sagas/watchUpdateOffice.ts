import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { getOffice } from 'services/OfficesManager/Company/getOffice';
import { updateOffice } from 'services/OfficesManager/Company/updateOffice';
import { officesManagerActions } from '../officesManagerSlice';

function* handleUpdateOffice({ payload }: ReturnType<typeof officesManagerActions.updateOfficeRequest>) {
  const { id, data, onFailure, onSuccess } = payload;
  try {
    yield retry(3, 1000, updateOffice, { data, id });
    const response: SagaReturnType<typeof getOffice> = yield retry(3, 1000, getOffice, { id });
    yield put(
      officesManagerActions.updateOfficeSuccess({
        data: response.data,
      }),
    );
    onSuccess();
  } catch (error) {
    console.log('watchUpdateOffice.ts', error);
    yield put(officesManagerActions.updateOfficeFailure({ id }));
    onFailure();
  }
}

export function* watchUpdateOffice() {
  yield takeLeading(officesManagerActions.updateOfficeRequest, handleUpdateOffice);
}
