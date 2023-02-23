import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { createPresenceDay } from 'services/Staff/Company/createPresenceDay';
import { staffsActions } from '../staffsSlice';

function* handleUpdateActiveDays({ payload }: ReturnType<typeof staffsActions.updateActiveDaysRequest>) {
  const { data, onFailure, onSuccess } = payload;
  try {
    const response: SagaReturnType<typeof createPresenceDay> = yield retry(3, 1000, createPresenceDay, data);
    yield put(staffsActions.updateActiveDaysSuccess({ data: response.data }));
    onSuccess();
  } catch (error) {
    console.log('watchUpdateActiveDays.ts', error);
    yield put(staffsActions.updateActiveDaysFailure({}));
    onFailure();
  }
}

export function* watchUpdateActiveDays() {
  yield takeLeading(staffsActions.updateActiveDaysRequest, handleUpdateActiveDays);
}