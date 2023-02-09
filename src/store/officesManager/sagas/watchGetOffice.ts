import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { getOffice } from 'services/OfficesManager/Company/getOffice';
import { officesManagerActions } from '../officesManagerSlice';

function* handleGetOffice({ payload }: ReturnType<typeof officesManagerActions.getOfficeRequest>) {
  const { id } = payload;
  try {
    const { data }: SagaReturnType<typeof getOffice> = yield retry(3, 1000, getOffice, { id });
    yield put(officesManagerActions.getOfficeSuccess({ data }));
  } catch (error) {
    console.log('watchGetOffice.ts', error);
    yield put(officesManagerActions.getOfficeFailure({}));
  }
}

export function* watchGetOffice() {
  yield takeLeading(officesManagerActions.getOfficeRequest, handleGetOffice);
}
