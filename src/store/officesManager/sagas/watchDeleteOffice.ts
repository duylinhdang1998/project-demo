import { call, put, takeLeading } from 'redux-saga/effects';
import { deleteOffice } from 'services/OfficesManager/Company/deleteOffice';
import { ServiceException } from 'services/utils/ServiceException';
import { officesManagerActions } from '../officesManagerSlice';

function* handleDeleteOffice({ payload }: ReturnType<typeof officesManagerActions.deleteOfficeRequest>) {
  const { id, onFailure, onSuccess } = payload;
  try {
    yield call(deleteOffice, payload);
    yield put(officesManagerActions.deleteOfficeSuccess({ id }));
    onSuccess();
  } catch (error) {
    console.log('watchDeleteOffice.ts', error);
    yield put(officesManagerActions.deleteOfficeFailure({ id }));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchDeleteOffice() {
  yield takeLeading(officesManagerActions.deleteOfficeRequest, handleDeleteOffice);
}
