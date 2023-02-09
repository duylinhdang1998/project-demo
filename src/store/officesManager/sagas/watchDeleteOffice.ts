import { put, retry, takeLeading } from 'redux-saga/effects';
import { deleteOffice } from 'services/OfficesManager/Company/deleteOffice';
import { officesManagerActions } from '../officesManagerSlice';

function* handleDeleteOffice({ payload }: ReturnType<typeof officesManagerActions.deleteOfficeRequest>) {
  const { id, onFailure, onSuccess } = payload;
  try {
    yield retry(3, 1000, deleteOffice, payload);
    yield put(officesManagerActions.deleteOfficeSuccess({ id }));
    onSuccess();
  } catch (error) {
    console.log('watchDeleteOffice.ts', error);
    yield put(officesManagerActions.deleteOfficeFailure({ id }));
    onFailure();
  }
}

export function* watchDeleteOffice() {
  yield takeLeading(officesManagerActions.deleteOfficeRequest, handleDeleteOffice);
}
