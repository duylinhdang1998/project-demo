import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { createStaff } from 'services/Staff/Company/createStaff';
import { ServiceException } from 'services/utils/ServiceException';
import { staffsActions } from '../staffsSlice';

function* handleCreateStaff({ payload }: ReturnType<typeof staffsActions.createStaffRequest>) {
  const { data, onFailure, onSuccess } = payload;
  try {
    const response: SagaReturnType<typeof createStaff> = yield retry(3, 1000, createStaff, data);
    yield put(staffsActions.createStaffSuccess({ data: response.data }));
    onSuccess();
  } catch (error) {
    console.log('watchCreateStaff.ts', error);
    yield put(staffsActions.createStaffFailure({}));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchCreateStaff() {
  yield takeLeading(staffsActions.createStaffRequest, handleCreateStaff);
}
