import { call, put, takeLeading } from 'redux-saga/effects';
import { deleteStaff } from 'services/Staff/Company/deleteStaff';
import { ServiceException } from 'services/utils/ServiceException';
import { staffsActions } from '../staffsSlice';

function* handleDeleteStaff({ payload }: ReturnType<typeof staffsActions.deleteStaffRequest>) {
  const { id, onFailure, onSuccess } = payload;
  try {
    yield call(deleteStaff, payload);
    yield put(staffsActions.deleteStaffSuccess({ id }));
    onSuccess();
  } catch (error) {
    console.log('watchDeleteStaff.ts', error);
    yield put(staffsActions.deleteStaffFailure({ id }));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchDeleteStaff() {
  yield takeLeading(staffsActions.deleteStaffRequest, handleDeleteStaff);
}
