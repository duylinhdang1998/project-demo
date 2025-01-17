import { call, put, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { createOffice } from 'services/OfficesManager/Company/createOffice';
import { ServiceException } from 'services/utils/ServiceException';
import { officesManagerActions } from '../officesManagerSlice';

function* handleCreateOffice({ payload }: ReturnType<typeof officesManagerActions.createOfficeRequest>) {
  const { data: formData, onFailure, onSuccess } = payload;
  try {
    const { data }: SagaReturnType<typeof createOffice> = yield call(createOffice, formData);
    yield put(officesManagerActions.createOfficeSuccess({ data }));
    onSuccess();
  } catch (error) {
    console.log('watchCreateOffice.ts', error);
    yield put(officesManagerActions.createOfficeFailure({}));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchCreateOffice() {
  yield takeLeading(officesManagerActions.createOfficeRequest, handleCreateOffice);
}
