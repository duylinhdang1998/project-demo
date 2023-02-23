import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { createDayOff } from 'services/Staff/Company/createDayOff';
import { getStaff } from 'services/Staff/Company/getStaff';
import { staffsActions } from '../staffsSlice';

function* handleRemoveDayActive({ payload }: ReturnType<typeof staffsActions.removeDayActiveRequest>) {
  const { data, onFailure, onSuccess } = payload;
  try {
    yield retry(3, 1000, createDayOff, data);
    const response: SagaReturnType<typeof getStaff> = yield retry(3, 1000, getStaff, { id: data.staffId });
    yield put(
      staffsActions.removeDayActiveSuccess({
        data: response.data,
      }),
    );
    onSuccess();
  } catch (error) {
    console.log('watchRemoveDayActive.ts', error);
    yield put(staffsActions.removeDayActiveFailure({}));
    onFailure();
  }
}

export function* watchRemoveDayActive() {
  yield takeLeading(staffsActions.removeDayActiveRequest, handleRemoveDayActive);
}
