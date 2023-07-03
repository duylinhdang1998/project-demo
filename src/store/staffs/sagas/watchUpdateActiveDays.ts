import { call, put, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { createPresenceDay } from 'services/Staff/Company/createPresenceDay';
import { ServiceException } from 'services/utils/ServiceException';
import { staffsActions } from '../staffsSlice';

function* handleUpdateActiveDays({ payload }: ReturnType<typeof staffsActions.updateActiveDaysRequest>) {
  const { data, onFailure, onSuccess } = payload;
  try {
    const response: SagaReturnType<typeof createPresenceDay> = yield call(createPresenceDay, data);
    yield put(staffsActions.updateActiveDaysSuccess({ data: response.data }));
    onSuccess();
  } catch (error) {
    console.log('watchUpdateActiveDays.ts', error);
    yield put(staffsActions.updateActiveDaysFailure({}));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchUpdateActiveDays() {
  yield takeLeading(staffsActions.updateActiveDaysRequest, handleUpdateActiveDays);
}
