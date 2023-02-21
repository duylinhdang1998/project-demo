import { put, retry, takeLeading } from 'redux-saga/effects';
import { deleteStaff } from 'services/Staff/Company/deleteStaff';
import { staffsActions } from '../staffsSlice';

function* handleDeleteStaff({ payload }: ReturnType<typeof staffsActions.deleteStaffRequest>) {
  const { id, onFailure, onSuccess } = payload;
  try {
    yield retry(3, 1000, deleteStaff, payload);
    yield put(staffsActions.deleteStaffSuccess({ id }));
    onSuccess();
  } catch (error) {
    console.log('watchDeleteStaff.ts', error);
    yield put(staffsActions.deleteStaffFailure({ id }));
    onFailure();
  }
}

export function* watchDeleteStaff() {
  yield takeLeading(staffsActions.deleteStaffRequest, handleDeleteStaff);
}
