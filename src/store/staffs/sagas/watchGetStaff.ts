import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { getStaff } from 'services/Staff/Company/getStaff';
import { staffsActions } from '../staffsSlice';

function* handleGetStaff({ payload }: ReturnType<typeof staffsActions.getStaffRequest>) {
  const { id } = payload;
  try {
    const { data }: SagaReturnType<typeof getStaff> = yield retry(3, 1000, getStaff, { id });
    yield put(staffsActions.getStaffSuccess({ data }));
  } catch (error) {
    console.log('watchGetStaff.ts', error);
    yield put(staffsActions.getStaffFailure({}));
  }
}

export function* watchGetStaff() {
  yield takeLeading(staffsActions.getStaffRequest, handleGetStaff);
}
